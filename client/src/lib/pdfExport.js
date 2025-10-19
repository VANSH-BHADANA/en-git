import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export async function exportToPDF(insights, recommendations, aiInsights = null) {
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let yPos = 20;

  // Header
  pdf.setFontSize(24);
  pdf.setFont(undefined, "bold");
  pdf.text("en-git Insights Report", pageWidth / 2, yPos, { align: "center" });

  yPos += 10;
  pdf.setFontSize(12);
  pdf.setFont(undefined, "normal");
  pdf.text(`Generated on ${new Date().toLocaleDateString()}`, pageWidth / 2, yPos, {
    align: "center",
  });

  yPos += 15;

  // User Info
  const user = insights.user;
  pdf.setFontSize(16);
  pdf.setFont(undefined, "bold");
  pdf.text(`${user.name || user.login}`, 20, yPos);

  yPos += 8;
  pdf.setFontSize(10);
  pdf.setFont(undefined, "normal");
  pdf.text(`@${user.login}`, 20, yPos);

  yPos += 6;
  if (user.bio) {
    const bioLines = pdf.splitTextToSize(user.bio, pageWidth - 40);
    pdf.text(bioLines, 20, yPos);
    yPos += bioLines.length * 5;
  }

  yPos += 10;

  // Stats Summary
  pdf.setFontSize(14);
  pdf.setFont(undefined, "bold");
  pdf.text("Profile Summary", 20, yPos);
  yPos += 8;

  pdf.setFontSize(10);
  pdf.setFont(undefined, "normal");
  pdf.text(`Repositories: ${insights.reposCount}`, 20, yPos);
  yPos += 6;
  pdf.text(`Followers: ${user.followers || 0}`, 20, yPos);
  yPos += 6;
  pdf.text(`Following: ${user.following || 0}`, 20, yPos);
  yPos += 6;
  pdf.text(`Domain: ${insights.domain?.domain || "Generalist"}`, 20, yPos);
  yPos += 6;
  pdf.text(
    `Coding Style: ${insights.commitTimes?.profile === "night-coder" ? "Night Coder" : "Early Bird"}`,
    20,
    yPos
  );

  yPos += 12;

  // Top Languages
  if (insights.languages?.top3?.length > 0) {
    pdf.setFontSize(14);
    pdf.setFont(undefined, "bold");
    pdf.text("Top Programming Languages", 20, yPos);
    yPos += 8;

    pdf.setFontSize(10);
    pdf.setFont(undefined, "normal");
    insights.languages.top3.forEach(([lang, percent]) => {
      pdf.text(`• ${lang}: ${percent}%`, 25, yPos);
      yPos += 6;
    });
  }

  yPos += 10;

  // Check if we need a new page
  if (yPos > pageHeight - 40) {
    pdf.addPage();
    yPos = 20;
  }

  // Top Starred Repos
  if (insights.topStarred?.length > 0) {
    pdf.setFontSize(14);
    pdf.setFont(undefined, "bold");
    pdf.text("Most Starred Repositories", 20, yPos);
    yPos += 8;

    pdf.setFontSize(10);
    pdf.setFont(undefined, "normal");
    insights.topStarred.slice(0, 5).forEach((repo) => {
      if (yPos > pageHeight - 20) {
        pdf.addPage();
        yPos = 20;
      }
      pdf.text(`• ${repo.name} (${repo.stargazers_count} stars)`, 25, yPos);
      yPos += 6;
    });
  }

  yPos += 10;

  // Top Topics
  if (insights.topics?.length > 0) {
    if (yPos > pageHeight - 40) {
      pdf.addPage();
      yPos = 20;
    }

    pdf.setFontSize(14);
    pdf.setFont(undefined, "bold");
    pdf.text("Popular Topics", 20, yPos);
    yPos += 8;

    pdf.setFontSize(10);
    pdf.setFont(undefined, "normal");
    const topicsText = insights.topics
      .slice(0, 15)
      .map(([t]) => t)
      .join(", ");
    const topicsLines = pdf.splitTextToSize(topicsText, pageWidth - 40);
    pdf.text(topicsLines, 20, yPos);
    yPos += topicsLines.length * 5 + 10;
  }

  // AI Career Insights
  if (aiInsights?.insights) {
    if (yPos > pageHeight - 40) {
      pdf.addPage();
      yPos = 20;
    }

    // AI Summary
    pdf.setFontSize(14);
    pdf.setFont(undefined, "bold");
    pdf.setTextColor(138, 43, 226); // Purple color
    pdf.text("🤖 AI Career Insights", 20, yPos);
    pdf.setTextColor(0);
    yPos += 10;

    if (aiInsights.insights.summary) {
      pdf.setFontSize(10);
      pdf.setFont(undefined, "normal");
      const summaryLines = pdf.splitTextToSize(aiInsights.insights.summary, pageWidth - 40);
      pdf.text(summaryLines, 20, yPos);
      yPos += summaryLines.length * 5 + 8;
    }

    // Strengths
    if (aiInsights.insights.strengths?.length > 0) {
      if (yPos > pageHeight - 50) {
        pdf.addPage();
        yPos = 20;
      }
      
      pdf.setFontSize(12);
      pdf.setFont(undefined, "bold");
      pdf.setTextColor(34, 197, 94); // Green
      pdf.text("💪 Your Strengths", 20, yPos);
      pdf.setTextColor(0);
      yPos += 7;

      pdf.setFontSize(10);
      pdf.setFont(undefined, "normal");
      aiInsights.insights.strengths.forEach((strength, idx) => {
        if (yPos > pageHeight - 15) {
          pdf.addPage();
          yPos = 20;
        }
        const strengthLines = pdf.splitTextToSize(`${idx + 1}. ${strength}`, pageWidth - 45);
        pdf.text(strengthLines, 25, yPos);
        yPos += strengthLines.length * 5 + 3;
      });
      yPos += 5;
    }

    // Growth Areas
    if (aiInsights.insights.growthAreas?.length > 0) {
      if (yPos > pageHeight - 50) {
        pdf.addPage();
        yPos = 20;
      }

      pdf.setFontSize(12);
      pdf.setFont(undefined, "bold");
      pdf.setTextColor(249, 115, 22); // Orange
      pdf.text("🎯 Growth Opportunities", 20, yPos);
      pdf.setTextColor(0);
      yPos += 7;

      pdf.setFontSize(10);
      pdf.setFont(undefined, "normal");
      aiInsights.insights.growthAreas.forEach((area, idx) => {
        if (yPos > pageHeight - 15) {
          pdf.addPage();
          yPos = 20;
        }
        const areaLines = pdf.splitTextToSize(`${idx + 1}. ${area}`, pageWidth - 45);
        pdf.text(areaLines, 25, yPos);
        yPos += areaLines.length * 5 + 3;
      });
      yPos += 5;
    }

    // Recommended Projects
    if (aiInsights.insights.projects?.length > 0) {
      if (yPos > pageHeight - 50) {
        pdf.addPage();
        yPos = 20;
      }

      pdf.setFontSize(12);
      pdf.setFont(undefined, "bold");
      pdf.setTextColor(59, 130, 246); // Blue
      pdf.text("💡 Recommended Projects", 20, yPos);
      pdf.setTextColor(0);
      yPos += 7;

      pdf.setFontSize(10);
      pdf.setFont(undefined, "normal");
      aiInsights.insights.projects.forEach((project, idx) => {
        if (yPos > pageHeight - 15) {
          pdf.addPage();
          yPos = 20;
        }
        const projectLines = pdf.splitTextToSize(`${idx + 1}. ${project}`, pageWidth - 45);
        pdf.text(projectLines, 25, yPos);
        yPos += projectLines.length * 5 + 3;
      });
      yPos += 5;
    }

    // Career Paths
    if (aiInsights.insights.careerPaths?.length > 0) {
      if (yPos > pageHeight - 50) {
        pdf.addPage();
        yPos = 20;
      }

      pdf.setFontSize(12);
      pdf.setFont(undefined, "bold");
      pdf.setTextColor(168, 85, 247); // Purple
      pdf.text("💼 Career Path Suggestions", 20, yPos);
      pdf.setTextColor(0);
      yPos += 7;

      pdf.setFontSize(10);
      pdf.setFont(undefined, "normal");
      aiInsights.insights.careerPaths.forEach((path, idx) => {
        if (yPos > pageHeight - 15) {
          pdf.addPage();
          yPos = 20;
        }
        pdf.text(`${idx + 1}. ${path}`, 25, yPos);
        yPos += 6;
      });
      yPos += 8;
    }

    // Learning Path
    if (aiInsights.learningPath?.phases?.length > 0) {
      if (yPos > pageHeight - 50) {
        pdf.addPage();
        yPos = 20;
      }

      pdf.setFontSize(12);
      pdf.setFont(undefined, "bold");
      pdf.setTextColor(236, 72, 153); // Pink
      pdf.text("📚 6-Month Learning Roadmap", 20, yPos);
      pdf.setTextColor(0);
      yPos += 7;

      pdf.setFontSize(10);
      aiInsights.learningPath.phases.forEach((phase, idx) => {
        if (yPos > pageHeight - 40) {
          pdf.addPage();
          yPos = 20;
        }

        pdf.setFont(undefined, "bold");
        pdf.text(`Phase ${idx + 1}: ${phase.months || phase.title || ''}`, 25, yPos);
        yPos += 6;

        pdf.setFont(undefined, "normal");
        if (phase.skills?.length > 0) {
          pdf.text(`Skills: ${phase.skills.join(", ")}`, 27, yPos);
          yPos += 5;
        }
        if (phase.project) {
          const projectLines = pdf.splitTextToSize(`Project: ${phase.project}`, pageWidth - 50);
          pdf.text(projectLines, 27, yPos);
          yPos += projectLines.length * 5 + 5;
        }
        yPos += 3;
      });
    }

    yPos += 5;
  }

  // Recommendations
  if (recommendations?.trendingMatches?.length > 0) {
    if (yPos > pageHeight - 40) {
      pdf.addPage();
      yPos = 20;
    }

    pdf.setFontSize(14);
    pdf.setFont(undefined, "bold");
    pdf.text("Recommended Trending Projects", 20, yPos);
    yPos += 8;

    pdf.setFontSize(10);
    pdf.setFont(undefined, "normal");
    recommendations.trendingMatches.slice(0, 5).forEach((item) => {
      if (yPos > pageHeight - 20) {
        pdf.addPage();
        yPos = 20;
      }
      pdf.text(`• ${item.fullName}`, 25, yPos);
      yPos += 5;
      const descLines = pdf.splitTextToSize(item.description || "No description", pageWidth - 50);
      pdf.setTextColor(100);
      pdf.text(descLines, 27, yPos);
      pdf.setTextColor(0);
      yPos += descLines.length * 5 + 4;
    });
  }

  // Footer
  pdf.setFontSize(8);
  pdf.setTextColor(150);
  pdf.text("en-git - AI-Powered GitHub Analytics", pageWidth / 2, pageHeight - 15, {
    align: "center",
  });
  pdf.text("Created by TejasS1233", pageWidth / 2, pageHeight - 10, {
    align: "center",
  });

  // Save
  pdf.save(`${user.login}-github-insights.pdf`);
}
