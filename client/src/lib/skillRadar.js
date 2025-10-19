// Calculate skill scores for radar chart visualization

const SKILL_CATEGORIES = {
  frontend: {
    languages: ["JavaScript", "TypeScript", "HTML", "CSS"],
    topics: ["react", "vue", "angular", "svelte", "nextjs", "tailwind", "frontend", "ui", "ux"],
  },
  backend: {
    languages: ["JavaScript", "TypeScript", "Python", "Java", "Go", "Ruby", "PHP", "C#"],
    topics: ["nodejs", "express", "django", "flask", "spring", "backend", "api", "rest", "graphql"],
  },
  mobile: {
    languages: ["Swift", "Kotlin", "Dart", "Java"],
    topics: ["ios", "android", "flutter", "react-native", "mobile", "app"],
  },
  devops: {
    languages: ["Shell", "Python", "Go"],
    topics: [
      "docker",
      "kubernetes",
      "ci",
      "cd",
      "terraform",
      "ansible",
      "devops",
      "aws",
      "azure",
      "gcp",
    ],
  },
  data: {
    languages: ["Python", "R", "Julia", "SQL"],
    topics: [
      "data-science",
      "machine-learning",
      "deep-learning",
      "ai",
      "ml",
      "pandas",
      "numpy",
      "tensorflow",
      "pytorch",
    ],
  },
  database: {
    languages: ["SQL", "MongoDB"],
    topics: ["database", "sql", "nosql", "mongodb", "postgresql", "mysql", "redis"],
  },
};

export function calculateSkillRadar(insights) {
  const skills = {};

  // Get language percentages
  const langMap = new Map(insights.languages?.percentages || []);
  const topicSet = new Set(insights.topics?.map(([t]) => t.toLowerCase()) || []);

  // Calculate score for each category
  Object.entries(SKILL_CATEGORIES).forEach(([category, { languages, topics }]) => {
    let score = 0;

    // Language score (0-50 points)
    languages.forEach((lang) => {
      const percent = langMap.get(lang) || 0;
      score += percent * 0.5;
    });

    // Topic score (0-50 points)
    topics.forEach((topic) => {
      if (Array.from(topicSet).some((t) => t.includes(topic))) {
        score += 10;
      }
    });

    // Normalize to 0-100
    skills[category] = Math.min(Math.round(score), 100);
  });

  return [
    { skill: "Frontend", value: skills.frontend || 0 },
    { skill: "Backend", value: skills.backend || 0 },
    { skill: "Mobile", value: skills.mobile || 0 },
    { skill: "DevOps", value: skills.devops || 0 },
    { skill: "Data/AI", value: skills.data || 0 },
    { skill: "Database", value: skills.database || 0 },
  ];
}

export function getPrimarySkill(radarData) {
  const sorted = [...radarData].sort((a, b) => b.value - a.value);
  return sorted[0]?.skill || "Generalist";
}
