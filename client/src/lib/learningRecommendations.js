// Dynamic learning recommendations based on skill gaps and GitHub activity

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
// Course platforms
export const PLATFORMS = {
  YOUTUBE: "YouTube",
  UDEMY: "Udemy",
  COURSERA: "Coursera",
  NPTEL: "NPTEL",
  FREECODECAMP: "freeCodeCamp",
  UDACITY: "Udacity",
  PLURALSIGHT: "Pluralsight",
  EDEX: "edX",
};

async function fetchYouTubeCourses(query, maxResults = 5) {
  try {
    const searchQuery = encodeURIComponent(`${query} tutorial course programming`);
    const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${searchQuery}`;

    return [
      {
        title: `${query.charAt(0).toUpperCase() + query.slice(1)} Tutorial - Full Course`,
        platform: PLATFORMS.YOUTUBE,
        url: youtubeSearchUrl,
        level: "Beginner to Advanced",
        duration: "Varies",
        free: true,
        description: `Comprehensive ${query} tutorials and courses on YouTube`,
      },
    ];
  } catch (error) {
    console.error("Error fetching YouTube courses:", error);
    return [];
  }
}

// Fetch courses from freeCodeCamp
async function fetchFreeCodeCampCourses(query) {
  const fccCourses = {
    javascript: {
      title: "JavaScript Algorithms and Data Structures",
      url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
      duration: "300 hours",
    },
    python: {
      title: "Scientific Computing with Python",
      url: "https://www.freecodecamp.org/learn/scientific-computing-with-python/",
      duration: "300 hours",
    },
    react: {
      title: "Front End Development Libraries",
      url: "https://www.freecodecamp.org/learn/front-end-development-libraries/",
      duration: "300 hours",
    },
    nodejs: {
      title: "Back End Development and APIs",
      url: "https://www.freecodecamp.org/learn/back-end-development-and-apis/",
      duration: "300 hours",
    },
  };

  const course = fccCourses[query.toLowerCase()];
  if (course) {
    return [
      {
        ...course,
        platform: PLATFORMS.FREECODECAMP,
        level: "Beginner to Intermediate",
        free: true,
      },
    ];
  }
  return [];
}

// Fetch courses from Udemy (using search URL)
async function fetchUdemyCourses(query) {
  const searchQuery = encodeURIComponent(query);
  return [
    {
      title: `${query.charAt(0).toUpperCase() + query.slice(1)} - Complete Course`,
      platform: PLATFORMS.UDEMY,
      url: `https://www.udemy.com/courses/search/?q=${searchQuery}&sort=relevance`,
      level: "All Levels",
      description: `Browse top-rated ${query} courses on Udemy`,
    },
  ];
}

// Fetch courses from Coursera
async function fetchCourseraCourses(query) {
  const searchQuery = encodeURIComponent(query);
  return [
    {
      title: `${query.charAt(0).toUpperCase() + query.slice(1)} Specialization`,
      platform: PLATFORMS.COURSERA,
      url: `https://www.coursera.org/search?query=${searchQuery}`,
      level: "Beginner to Advanced",
      description: `University-level ${query} courses on Coursera`,
    },
  ];
}

// Fetch courses from NPTEL
async function fetchNPTELCourses(query) {
  const nptelMap = {
    python: "Programming in Python",
    java: "Programming in Java",
    "machine-learning": "Machine Learning",
    "data-structures": "Data Structures and Algorithms",
    sql: "Database Management System",
    "c++": "Programming in C++",
  };

  const courseName = nptelMap[query.toLowerCase()];
  if (courseName) {
    return [
      {
        title: courseName,
        platform: PLATFORMS.NPTEL,
        url: `https://nptel.ac.in/courses`,
        level: "Intermediate to Advanced",
        duration: "12 weeks",
        free: true,
        description: "IIT/IISc professors teaching",
      },
    ];
  }
  return [];
}

// Main function to fetch courses from multiple platforms
export async function fetchCoursesForTechnology(technology) {
  try {
    const [youtube, fcc, udemy, coursera, nptel] = await Promise.all([
      fetchYouTubeCourses(technology),
      fetchFreeCodeCampCourses(technology),
      fetchUdemyCourses(technology),
      fetchCourseraCourses(technology),
      fetchNPTELCourses(technology),
    ]);

    return [...youtube, ...fcc, ...udemy, ...coursera, ...nptel].filter(Boolean);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}

// Analyze user's GitHub data and suggest courses dynamically
export async function analyzeSkillGaps(insights) {
  if (!insights) return [];

  const userLanguages = insights.languages?.percentages?.map((lang) => lang[0].toLowerCase()) || [];
  const topLanguages = insights.languages?.top3?.map((lang) => lang[0].toLowerCase()) || [];

  const recommendations = [];

  // Popular languages user doesn't have
  const popularLanguages = [
    "javascript",
    "python",
    "java",
    "typescript",
    "go",
    "rust",
    "c++",
    "kotlin",
    "swift",
  ];
  const missingLanguages = popularLanguages.filter((lang) => !userLanguages.includes(lang));

  // Fetch courses for missing popular languages (top 3)
  const missingLangPromises = missingLanguages.slice(0, 3).map(async (lang) => {
    const courses = await fetchCoursesForTechnology(lang);
    return {
      category: "Expand Your Skills",
      reason: `Learn ${lang.charAt(0).toUpperCase() + lang.slice(1)} to broaden your tech stack`,
      technology: lang,
      courses: courses.slice(0, 5),
      priority: "medium",
    };
  });

  // Fetch advanced courses for existing skills (top 2)
  const existingSkillPromises = topLanguages.slice(0, 2).map(async (lang) => {
    const courses = await fetchCoursesForTechnology(lang);
    return {
      category: "Master Your Skills",
      reason: `Advanced ${lang} courses to deepen your expertise`,
      technology: lang,
      courses: courses.slice(0, 5),
      priority: "high",
    };
  });

  // Suggest complementary technologies
  const complementaryPromises = [];

  if (userLanguages.includes("javascript") || userLanguages.includes("typescript")) {
    if (!userLanguages.includes("react") && !userLanguages.includes("vue")) {
      complementaryPromises.push(
        fetchCoursesForTechnology("react").then((courses) => ({
          category: "Frontend Frameworks",
          reason: "Learn React to build modern, interactive UIs",
          technology: "react",
          courses: courses.slice(0, 5),
          priority: "high",
        }))
      );
    }

    if (!userLanguages.includes("nodejs")) {
      complementaryPromises.push(
        fetchCoursesForTechnology("nodejs").then((courses) => ({
          category: "Backend Development",
          reason: "Learn Node.js for full-stack JavaScript development",
          technology: "nodejs",
          courses: courses.slice(0, 5),
          priority: "medium",
        }))
      );
    }
  }

  // Suggest DevOps if user has backend experience
  if (
    userLanguages.some((lang) => ["python", "java", "go", "rust", "nodejs", "php"].includes(lang))
  ) {
    if (!userLanguages.includes("docker")) {
      complementaryPromises.push(
        fetchCoursesForTechnology("docker").then((courses) => ({
          category: "DevOps & Deployment",
          reason: "Learn Docker for containerization and modern deployment",
          technology: "docker",
          courses: courses.slice(0, 5),
          priority: "medium",
        }))
      );
    }
  }

  // Suggest ML/AI if user has Python
  if (userLanguages.includes("python")) {
    if (!userLanguages.includes("tensorflow") && !userLanguages.includes("pytorch")) {
      complementaryPromises.push(
        fetchCoursesForTechnology("machine-learning").then((courses) => ({
          category: "Machine Learning & AI",
          reason: "Leverage Python for ML and AI development",
          technology: "machine-learning",
          courses: courses.slice(0, 5),
          priority: "medium",
        }))
      );
    }
  }

  // Suggest mobile development
  if (userLanguages.includes("javascript") || userLanguages.includes("typescript")) {
    if (!userLanguages.includes("react-native") && !userLanguages.includes("flutter")) {
      complementaryPromises.push(
        fetchCoursesForTechnology("react-native").then((courses) => ({
          category: "Mobile Development",
          reason: "Build mobile apps with your JavaScript skills",
          technology: "react-native",
          courses: courses.slice(0, 5),
          priority: "low",
        }))
      );
    }
  }

  // Wait for all promises to resolve
  const [missingLangRecs, existingSkillRecs, complementaryRecs] = await Promise.all([
    Promise.all(missingLangPromises),
    Promise.all(existingSkillPromises),
    Promise.all(complementaryPromises),
  ]);

  recommendations.push(...existingSkillRecs, ...complementaryRecs, ...missingLangRecs);

  // Filter out recommendations with no courses
  const filteredRecs = recommendations.filter((rec) => rec.courses && rec.courses.length > 0);

  // Sort by priority
  return filteredRecs.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

// Get project ideas based on skills
export function getProjectIdeas(insights) {
  const userLanguages = insights?.languages?.top3?.map((lang) => lang[0].toLowerCase()) || [];
  const projects = [];

  if (userLanguages.includes("javascript") || userLanguages.includes("typescript")) {
    projects.push({
      title: "Build a Full-Stack Web App",
      description: "Create a MERN/MEAN stack application with authentication",
      difficulty: "Intermediate",
      skills: ["React/Angular", "Node.js", "MongoDB", "REST APIs"],
    });
  }

  if (userLanguages.includes("python")) {
    projects.push({
      title: "Data Analysis Dashboard",
      description: "Build an interactive dashboard using Python and visualization libraries",
      difficulty: "Intermediate",
      skills: ["Python", "Pandas", "Plotly", "Streamlit"],
    });
  }

  if (userLanguages.includes("java")) {
    projects.push({
      title: "Spring Boot Microservices",
      description: "Build a microservices architecture with Spring Boot",
      difficulty: "Advanced",
      skills: ["Java", "Spring Boot", "Docker", "Kubernetes"],
    });
  }

  return projects;
}
