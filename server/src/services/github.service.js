import axios from "axios";
import NodeCache from "node-cache";
import pLimit from "p-limit";

const cache = new NodeCache({ stdTTL: 60 * 5, checkperiod: 60 }); // 5 minutes

const gh = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github+json",
  },
  timeout: 15000,
});

function authHeader() {
  const token = process.env.GITHUB_TOKEN;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function cachedGet(key, url, params = {}) {
  const hit = cache.get(key);
  if (hit) return hit;
  const { data } = await gh.get(url, { params, headers: authHeader() });
  cache.set(key, data);
  return data;
}

export async function fetchUser(username) {
  return cachedGet(`user:${username}`, `/users/${username}`);
}

export async function fetchUserRepos(username, per_page = 100) {
  // paginate up to 300 repos
  const pages = [1, 2, 3];
  const limit = pLimit(2);
  const results = await Promise.all(
    pages.map((page) =>
      limit(() =>
        cachedGet(`repos:${username}:${page}`, `/users/${username}/repos`, {
          per_page,
          page,
          sort: "updated",
        })
      )
    )
  );
  return results.flat().filter(Boolean);
}

export async function fetchRepoLanguages(owner, repo) {
  return cachedGet(`lang:${owner}/${repo}`, `/repos/${owner}/${repo}/languages`);
}

export async function fetchRepoStats(owner, repo) {
  const [commits, issues, pulls] = await Promise.all([
    cachedGet(`commits:${owner}/${repo}`, `/repos/${owner}/${repo}/commits`, { per_page: 100 }),
    cachedGet(`issues:${owner}/${repo}`, `/repos/${owner}/${repo}/issues`, {
      state: "all",
      per_page: 100,
    }),
    cachedGet(`prs:${owner}/${repo}`, `/repos/${owner}/${repo}/pulls`, {
      state: "all",
      per_page: 100,
    }),
  ]);
  return { commits, issues, pulls };
}

export async function fetchUserEvents(username) {
  return cachedGet(`events:${username}`, `/users/${username}/events`, { per_page: 100 });
}

// Lightweight trending scrape (no official API)
import { load } from "cheerio";

export async function fetchTrending(language = "", since = "daily") {
  const key = `trending:${language}:${since}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const url = `https://github.com/trending${language ? "/" + encodeURIComponent(language) : ""}?since=${since}`;
  const { data: html } = await axios.get(url, { timeout: 15000 });
  const $ = load(html);
  const items = [];
  $("article.Box-row").each((_, el) => {
    const $el = $(el);
    const fullName = $el.find("h2 a").text().trim().replace(/\s/g, "");
    const description = $el.find("p").text().trim();
    const stars =
      Number(
        $el.find("a.Link--muted[href$='stargazers']").first().text().trim().replace(/,/g, "")
      ) || 0;
    const lang = $el.find("span[itemprop='programmingLanguage']").text().trim();
    const href = "https://github.com/" + fullName;
    if (fullName) items.push({ fullName, description, stars, language: lang, url: href });
  });
  cache.set(key, items, 60 * 30); // 30 minutes
  return items;
}
