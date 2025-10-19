// Gamification badges and achievements system

export const BADGES = {
  POLYGLOT: {
    id: "polyglot",
    name: "Polyglot",
    description: "Master of multiple languages",
    icon: "🌐",
    levels: [
      { threshold: 3, tier: "Bronze", color: "#CD7F32" },
      { threshold: 5, tier: "Silver", color: "#C0C0C0" },
      { threshold: 8, tier: "Gold", color: "#FFD700" },
    ],
  },
  NIGHT_OWL: {
    id: "night_owl",
    name: "Night Owl",
    description: "Most productive after midnight",
    icon: "🦉",
    color: "#4A5568",
  },
  EARLY_BIRD: {
    id: "early_bird",
    name: "Early Bird",
    description: "Gets the worm before 9 AM",
    icon: "🐦",
    color: "#F6AD55",
  },
  OPEN_SOURCE_HERO: {
    id: "open_source_hero",
    name: "Open Source Hero",
    description: "Significant contributions to open source",
    icon: "🦸",
    levels: [
      { threshold: 50, tier: "Rising Star", color: "#4299E1" },
      { threshold: 100, tier: "Champion", color: "#9F7AEA" },
      { threshold: 500, tier: "Legend", color: "#F6AD55" },
    ],
  },
  CONSISTENT_CODER: {
    id: "consistent_coder",
    name: "Consistent Coder",
    description: "Regular contribution streak",
    icon: "🔥",
    levels: [
      { threshold: 7, tier: "Week Warrior", color: "#F6AD55" },
      { threshold: 30, tier: "Month Master", color: "#9F7AEA" },
      { threshold: 100, tier: "Century Champ", color: "#FFD700" },
    ],
  },
  STAR_COLLECTOR: {
    id: "star_collector",
    name: "Star Collector",
    description: "Popular repositories",
    icon: "⭐",
    levels: [
      { threshold: 10, tier: "Emerging", color: "#4299E1" },
      { threshold: 100, tier: "Notable", color: "#9F7AEA" },
      { threshold: 1000, tier: "Celebrity", color: "#FFD700" },
    ],
  },
  EARLY_ADOPTER: {
    id: "early_adopter",
    name: "Early Adopter",
    description: "Uses cutting-edge technologies",
    icon: "🚀",
    color: "#48BB78",
  },
  COLLABORATOR: {
    id: "collaborator",
    name: "Team Player",
    description: "Actively collaborates on projects",
    icon: "🤝",
    color: "#805AD5",
  },
  ISSUE_HUNTER: {
    id: "issue_hunter",
    name: "Issue Hunter",
    description: "Finds and reports bugs",
    icon: "🐛",
    color: "#E53E3E",
  },
};

export function calculateBadges(insights) {
  const earned = [];

  // Polyglot Badge
  const langCount = insights.languages?.top3?.length || 0;
  const polyglotLevel = BADGES.POLYGLOT.levels.reverse().find((l) => langCount >= l.threshold);
  if (polyglotLevel) {
    earned.push({
      ...BADGES.POLYGLOT,
      tier: polyglotLevel.tier,
      color: polyglotLevel.color,
      value: langCount,
    });
  }

  // Night Owl vs Early Bird
  const profile = insights.commitTimes?.profile;
  if (profile === "night-coder") {
    earned.push(BADGES.NIGHT_OWL);
  } else if (profile === "early-bird") {
    earned.push(BADGES.EARLY_BIRD);
  }

  // Star Collector
  const totalStars =
    insights.topStarred?.reduce((sum, r) => sum + (r.stargazers_count || 0), 0) || 0;
  const starLevel = BADGES.STAR_COLLECTOR.levels.reverse().find((l) => totalStars >= l.threshold);
  if (starLevel) {
    earned.push({
      ...BADGES.STAR_COLLECTOR,
      tier: starLevel.tier,
      color: starLevel.color,
      value: totalStars,
    });
  }

  // Open Source Hero (based on public repos and stars)
  const repoCount = insights.reposCount || 0;
  const heroLevel = BADGES.OPEN_SOURCE_HERO.levels.reverse().find((l) => totalStars >= l.threshold);
  if (heroLevel && repoCount >= 10) {
    earned.push({
      ...BADGES.OPEN_SOURCE_HERO,
      tier: heroLevel.tier,
      color: heroLevel.color,
      value: totalStars,
    });
  }

  // Early Adopter (check for trending/new tech in topics)
  const trendingTopics = ["ai", "llm", "blockchain", "web3", "rust", "deno", "bun", "astro"];
  const hasTrendingTech = insights.topics?.some(([topic]) =>
    trendingTopics.some((tt) => topic.toLowerCase().includes(tt))
  );
  if (hasTrendingTech) {
    earned.push(BADGES.EARLY_ADOPTER);
  }

  // Collaborator (if user has forks or many repos)
  if (repoCount >= 20) {
    earned.push(BADGES.COLLABORATOR);
  }

  return earned;
}

export function getScoreFromBadges(badges) {
  let score = 0;
  badges.forEach((badge) => {
    if (badge.tier) {
      if (
        badge.tier.includes("Gold") ||
        badge.tier.includes("Legend") ||
        badge.tier.includes("Celebrity")
      ) {
        score += 100;
      } else if (badge.tier.includes("Silver") || badge.tier.includes("Champion")) {
        score += 50;
      } else {
        score += 25;
      }
    } else {
      score += 20;
    }
  });
  return score;
}
