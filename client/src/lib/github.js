import api from "./axios";

export async function getGithubInsights(username) {
  const { data } = await api.get(`/github/insights/${encodeURIComponent(username)}`);
  return data;
}

export async function getGithubRecommendations(username) {
  const { data } = await api.get(`/github/recommendations/${encodeURIComponent(username)}`);
  return data;
}

export async function getAIInsights(username) {
  const { data } = await api.get(`/github/ai-insights/${encodeURIComponent(username)}`);
  return data;
}

export async function getRepositoryInsights(owner, repo) {
  const { data } = await api.get(
    `/repository/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`
  );
  return data;
}
