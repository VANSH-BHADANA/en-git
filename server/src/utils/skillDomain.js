const DOMAIN_MAP = {
  "Web Development": {
    languages: ["JavaScript", "TypeScript", "HTML", "CSS"],
    topics: ["react", "vite", "nextjs", "tailwindcss", "nodejs", "express", "frontend", "backend"],
  },
  "Data Science": {
    languages: ["Python", "R"],
    topics: ["pandas", "numpy", "matplotlib", "jupyter", "data-science"],
  },
  "AI/ML": {
    languages: ["Python"],
    topics: ["tensorflow", "pytorch", "scikit-learn", "machine-learning", "deep-learning"],
  },
  DevOps: {
    languages: ["Shell", "Dockerfile"],
    topics: ["docker", "kubernetes", "ci", "cd", "github-actions", "terraform", "ansible"],
  },
  Mobile: {
    languages: ["Kotlin", "Swift", "Dart", "Java"],
    topics: ["android", "ios", "flutter", "react-native"],
  },
};

export function inferDomain(languagePercents, topTopics) {
  // languagePercents: [ [lang, percent], ... ] sorted desc
  const langSet = new Set(languagePercents.map(([l]) => l));
  const topicSet = new Set(topTopics.map(([t]) => t));

  const scores = Object.fromEntries(Object.keys(DOMAIN_MAP).map((k) => [k, 0]));
  for (const [domain, { languages, topics }] of Object.entries(DOMAIN_MAP)) {
    for (const l of languages) if (langSet.has(l)) scores[domain] += 2;
    for (const t of topics) if (topicSet.has(t)) scores[domain] += 1;
  }

  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  const domain = best?.[0] || "Generalist";
  return { domain, scores };
}
