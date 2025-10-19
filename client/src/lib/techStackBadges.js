// Generate shield.io badges and markdown for tech stacks

const TECH_BADGES = {
  // Languages
  JavaScript: {
    badge: "javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E",
    color: "F7DF1E",
  },
  TypeScript: {
    badge: "typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white",
    color: "007ACC",
  },
  Python: {
    badge: "python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54",
    color: "3670A0",
  },
  Java: {
    badge: "java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white",
    color: "ED8B00",
  },
  Go: { badge: "go-%2300ADD8.svg?style=for-the-badge&logo=go&logoColor=white", color: "00ADD8" },
  Rust: {
    badge: "rust-%23000000.svg?style=for-the-badge&logo=rust&logoColor=white",
    color: "000000",
  },
  Ruby: {
    badge: "ruby-%23CC342D.svg?style=for-the-badge&logo=ruby&logoColor=white",
    color: "CC342D",
  },
  PHP: { badge: "php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white", color: "777BB4" },
  Swift: { badge: "swift-F54A2A?style=for-the-badge&logo=swift&logoColor=white", color: "F54A2A" },
  Kotlin: {
    badge: "kotlin-%237F52FF.svg?style=for-the-badge&logo=kotlin&logoColor=white",
    color: "7F52FF",
  },
  Dart: {
    badge: "dart-%230175C2.svg?style=for-the-badge&logo=dart&logoColor=white",
    color: "0175C2",
  },
  C: { badge: "c-%2300599C.svg?style=for-the-badge&logo=c&logoColor=white", color: "00599C" },
  "C++": {
    badge: "c++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white",
    color: "00599C",
  },
  "C#": {
    badge: "c%23-%23239120.svg?style=for-the-badge&logo=csharp&logoColor=white",
    color: "239120",
  },
  HTML: {
    badge: "html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white",
    color: "E34F26",
  },
  CSS: {
    badge: "css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white",
    color: "1572B6",
  },

  // Frameworks/Topics
  react: {
    badge: "react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB",
    name: "React",
  },
  vue: {
    badge: "vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D",
    name: "Vue.js",
  },
  angular: {
    badge: "angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white",
    name: "Angular",
  },
  nextjs: { badge: "Next-black?style=for-the-badge&logo=next.js&logoColor=white", name: "Next.js" },
  nodejs: {
    badge: "node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white",
    name: "Node.js",
  },
  express: {
    badge: "express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB",
    name: "Express",
  },
  django: {
    badge: "django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white",
    name: "Django",
  },
  flask: {
    badge: "flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white",
    name: "Flask",
  },
  spring: {
    badge: "spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white",
    name: "Spring",
  },
  docker: {
    badge: "docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white",
    name: "Docker",
  },
  kubernetes: {
    badge: "kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white",
    name: "Kubernetes",
  },
  mongodb: {
    badge: "MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white",
    name: "MongoDB",
  },
  postgresql: {
    badge: "postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white",
    name: "PostgreSQL",
  },
  redis: {
    badge: "redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white",
    name: "Redis",
  },
  tailwindcss: {
    badge: "tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white",
    name: "Tailwind CSS",
  },
  git: { badge: "git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white", name: "Git" },
  github: {
    badge: "github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white",
    name: "GitHub",
  },
  aws: {
    badge: "AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white",
    name: "AWS",
  },
  azure: {
    badge: "azure-%230072C6.svg?style=for-the-badge&logo=microsoftazure&logoColor=white",
    name: "Azure",
  },
  tensorflow: {
    badge: "TensorFlow-%23FF6F00.svg?style=for-the-badge&logo=TensorFlow&logoColor=white",
    name: "TensorFlow",
  },
  pytorch: {
    badge: "PyTorch-%23EE4C2C.svg?style=for-the-badge&logo=PyTorch&logoColor=white",
    name: "PyTorch",
  },
};

export function generateTechStackBadges(insights) {
  const techStack = [];

  // Add languages
  (insights.languages?.top3 || []).forEach(([lang]) => {
    if (TECH_BADGES[lang]) {
      techStack.push({
        name: lang,
        url: `https://img.shields.io/badge/${TECH_BADGES[lang].badge}`,
        type: "language",
      });
    }
  });

  // Add topics/frameworks
  (insights.topics || []).slice(0, 15).forEach(([topic]) => {
    const key = topic.toLowerCase();
    if (TECH_BADGES[key]) {
      techStack.push({
        name: TECH_BADGES[key].name || topic,
        url: `https://img.shields.io/badge/${TECH_BADGES[key].badge}`,
        type: "framework",
      });
    }
  });

  return techStack;
}

export function generateMarkdownBadges(techStack) {
  const languageBadges = techStack
    .filter((t) => t.type === "language")
    .map((t) => `![${t.name}](${t.url})`)
    .join(" ");

  const frameworkBadges = techStack
    .filter((t) => t.type === "framework")
    .map((t) => `![${t.name}](${t.url})`)
    .join(" ");

  return `## 💻 Tech Stack\n\n### Languages\n${languageBadges}\n\n### Frameworks & Tools\n${frameworkBadges}`;
}

export function generateHTMLBadges(techStack) {
  return techStack.map((t) => `<img src="${t.url}" alt="${t.name}" />`).join("\n");
}
