// Content script that runs on GitHub pages
console.log("en-git content script loaded");

let settings = null;

// Load settings from storage
chrome.storage.sync.get(["extensionSettings"], (result) => {
  if (result.extensionSettings) {
    settings = result.extensionSettings;
    applySettings(settings);
  }
});

// Listen for settings updates
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "applySettings") {
    settings = request.settings;
    applySettings(settings);
    sendResponse({ success: true });
    return true;
  }
  return false; // Don't keep channel open if we're not handling the message
});

// Apply custom theme and enhancements
function applySettings(settings) {
  if (!settings) return;

  // Apply custom theme
  if (settings.theme && settings.theme.enabled) {
    applyCustomTheme(settings.theme);
  } else {
    removeCustomTheme();
  }

  // Apply custom font
  if (settings.font && settings.font.enabled) {
    applyCustomFont(settings.font);
  } else {
    removeCustomFont();
  }

  // Apply enhancements
  if (settings.enhancements) {
    if (settings.enhancements.contributionStats) {
      enhanceContributionGraph();
    }
    if (settings.enhancements.repoCards) {
      enhanceRepoCards();
    }
    if (settings.enhancements.enhancedProfile) {
      enhanceProfile();
    }
  }
}

// Apply custom theme colors
function applyCustomTheme(theme) {
  let styleEl = document.getElementById("en-git-custom-theme");
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "en-git-custom-theme";
    document.head.appendChild(styleEl);
  }

  styleEl.textContent = `
    /* CSS Variables Override */
    :root,
    [data-color-mode="dark"],
    [data-color-mode="light"] {
      --color-accent-fg: ${theme.primaryColor} !important;
      --color-accent-emphasis: ${theme.accentColor} !important;
      --color-canvas-default: ${theme.backgroundColor} !important;
      --color-canvas-subtle: ${theme.backgroundColor} !important;
      --color-fg-default: ${theme.textColor} !important;
      --color-fg-muted: ${theme.textColor}cc !important;
      --color-border-default: ${theme.primaryColor}33 !important;
      --bgColor-default: ${theme.backgroundColor} !important;
      --fgColor-default: ${theme.textColor} !important;
    }
    
    /* Main body background only */
    body {
      background-color: ${theme.backgroundColor} !important;
      color: ${theme.textColor} !important;
    }
    
    /* Main content areas */
    .application-main,
    #js-repo-pjax-container,
    #js-pjax-container,
    .repository-content,
    main[class*="Layout-main"],
    .Layout-main {
      background-color: ${theme.backgroundColor} !important;
    }
    
    /* Header */
    .Header,
    .AppHeader,
    header[role="banner"] {
      background-color: ${theme.backgroundColor} !important;
      border-bottom-color: ${theme.primaryColor}55 !important;
    }
    
    /* Primary buttons only */
    .btn-primary,
    button.btn-primary,
    a.btn-primary {
      background-color: ${theme.accentColor} !important;
      border-color: ${theme.accentColor} !important;
      color: white !important;
    }
    
    .btn-primary:hover,
    .btn-primary:focus {
      background-color: ${theme.primaryColor} !important;
      border-color: ${theme.primaryColor} !important;
    }
    
    /* Links */
    a:not(.btn):not([class*="Button"]) {
      color: ${theme.primaryColor} !important;
    }
    
    a:not(.btn):not([class*="Button"]):hover {
      color: ${theme.accentColor} !important;
    }
    
    /* Content boxes - be selective */
    .Box:not(.color-bg-default):not(.color-bg-subtle),
    .markdown-body,
    .comment-body {
      background-color: ${theme.backgroundColor}f8 !important;
      border-color: ${theme.primaryColor}22 !important;
    }
    
    /* Navigation tabs */
    .UnderlineNav-item[aria-current],
    .UnderlineNav-item.selected {
      border-bottom-color: ${theme.primaryColor} !important;
      color: ${theme.primaryColor} !important;
    }
    
    /* Code viewer */
    .blob-wrapper,
    .blob-code-inner,
    pre,
    code:not(.hljs *) {
      background-color: ${theme.backgroundColor}ee !important;
      color: ${theme.textColor} !important;
    }
    
    /* Forms */
    input[type="text"]:not([class*="color-bg-"]),
    input[type="search"],
    textarea:not([class*="color-bg-"]) {
      background-color: ${theme.backgroundColor}dd !important;
      color: ${theme.textColor} !important;
      border-color: ${theme.primaryColor}44 !important;
    }
    
    input:focus,
    textarea:focus {
      border-color: ${theme.primaryColor} !important;
      box-shadow: 0 0 0 3px ${theme.primaryColor}33 !important;
    }
    
    /* Dropdowns */
    .SelectMenu-modal,
    .dropdown-menu {
      background-color: ${theme.backgroundColor}f5 !important;
      border-color: ${theme.primaryColor}33 !important;
    }
    
    /* Don't override these - let them keep their natural state */
    .Label,
    .IssueLabel,
    .State,
    [class*="color-bg-"],
    [class*="color-fg-"],
    [data-color-mode] [class*="color-"],
    .avatar,
    img,
    svg {
      /* Preserve original colors for labels, states, and images */
    }
  `;
}

function removeCustomTheme() {
  const styleEl = document.getElementById("en-git-custom-theme");
  if (styleEl) styleEl.remove();
}

// Apply custom font
function applyCustomFont(font) {
  let styleEl = document.getElementById("en-git-custom-font");
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "en-git-custom-font";
    document.head.appendChild(styleEl);
  }

  styleEl.textContent = `
    .blob-code,
    .blob-code-inner,
    textarea,
    pre,
    code,
    .CodeMirror {
      font-family: ${font.family} !important;
      font-size: ${font.size}px !important;
    }
  `;
}

function removeCustomFont() {
  const styleEl = document.getElementById("en-git-custom-font");
  if (styleEl) styleEl.remove();
}

// Enhance contribution graph with detailed stats
function enhanceContributionGraph() {
  const days = document.querySelectorAll(".ContributionCalendar-day");
  days.forEach((day) => {
    const count = day.getAttribute("data-count");
    const date = day.getAttribute("data-date");
    if (count && date) {
      day.addEventListener("mouseenter", () => {
        day.setAttribute("data-tooltip", `${count} contributions on ${date}`);
      });
    }
  });
}

// Enhance repository cards
function enhanceRepoCards() {
  const repoCards = document.querySelectorAll(
    '[data-hovercard-type="repository"]'
  );
  repoCards.forEach((card) => {
    if (card.querySelector(".en-git-enhanced")) return;

    const badge = document.createElement("span");
    badge.className = "en-git-enhanced";
    badge.style.cssText = `
      display: inline-block;
      padding: 2px 6px;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      color: white;
      border-radius: 4px;
      font-size: 10px;
      margin-left: 8px;
    `;
    badge.textContent = "✨ Enhanced";
    card.appendChild(badge);
  });
}

// Enhance profile page
function enhanceProfile() {
  const profileStats = document.querySelector(".js-profile-editable-area");
  if (profileStats && !document.querySelector(".en-git-profile-enhancement")) {
    const enhancement = document.createElement("div");
    enhancement.className = "en-git-profile-enhancement";
    enhancement.style.cssText = `
      margin-top: 16px;
      padding: 12px;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
      border-radius: 8px;
      border: 1px solid rgba(99, 102, 241, 0.3);
    `;
    enhancement.innerHTML = `
      <p style="margin: 0; font-size: 12px; color: #6366f1; font-weight: 600;">
        ✨ Enhanced by en-git
      </p>
    `;
    profileStats.prepend(enhancement);
  }
}

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (!settings || !settings.shortcuts || !settings.shortcuts.enabled) return;

  // Ctrl+K: Quick search
  if (e.ctrlKey && e.key === "k") {
    e.preventDefault();
    const searchInput = document.querySelector('input[name="q"]');
    if (searchInput) searchInput.focus();
  }

  // Ctrl+Shift+N: New repository
  if (e.ctrlKey && e.shiftKey && e.key === "N") {
    e.preventDefault();
    window.location.href = "https://github.com/new";
  }

  // Ctrl+Shift+I: View issues
  if (e.ctrlKey && e.shiftKey && e.key === "I") {
    e.preventDefault();
    if (window.location.pathname.includes("/")) {
      const parts = window.location.pathname.split("/").filter(Boolean);
      if (parts.length >= 2) {
        window.location.href = `https://github.com/${parts[0]}/${parts[1]}/issues`;
      }
    }
  }

  // Ctrl+Shift+D: Toggle dark mode
  if (e.ctrlKey && e.shiftKey && e.key === "D") {
    e.preventDefault();
    const themeToggle = document.querySelector("[data-color-mode-toggle]");
    if (themeToggle) themeToggle.click();
  }
});

// Function to extract username from GitHub profile page
function getUsernameFromPage() {
  // Check if we're on a user profile page
  const profileLink = document.querySelector(
    'meta[property="profile:username"]'
  );
  if (profileLink) {
    return profileLink.getAttribute("content");
  }

  // Fallback: parse from URL
  const path = window.location.pathname;
  const match = path.match(/^\/([^\/]+)\/?$/);
  return match ? match[1] : null;
}

// Function to extract repo info
function getRepoInfo() {
  const path = window.location.pathname;
  const match = path.match(/^\/([^\/]+)\/([^\/]+)/);
  if (match) {
    return { owner: match[1], repo: match[2] };
  }
  return null;
}

// Add "Analyze with en-git" button to GitHub profile pages
function addAnalyzeButton() {
  const username = getUsernameFromPage();
  if (!username) return;

  // Check if button already exists
  if (document.querySelector(".en-git-analyze-btn")) return;

  // Find the profile header
  const profileHeader =
    document.querySelector(".vcard-names-container") ||
    document.querySelector("h1.vcard-names");

  if (!profileHeader) return;

  // Create button container
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "en-git-analyze-btn";
  buttonContainer.style.cssText = "margin-top: 12px;";

  // Create button
  const button = document.createElement("button");
  button.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 6px;">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
    </svg>
    Analyze with en-git
  `;
  button.style.cssText = `
    padding: 8px 16px;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
  `;

  // Hover effects
  button.onmouseover = () => {
    button.style.transform = "translateY(-2px)";
    button.style.boxShadow = "0 4px 12px rgba(99, 102, 241, 0.4)";
  };
  button.onmouseout = () => {
    button.style.transform = "translateY(0)";
    button.style.boxShadow = "0 2px 8px rgba(99, 102, 241, 0.3)";
  };

  // Click handler
  button.onclick = () => {
    // Check if extension context is valid before sending message
    if (chrome.runtime?.id) {
      chrome.runtime.sendMessage(
        {
          action: "analyzeProfile",
          username: username,
        },
        (response) => {
          // Handle response or ignore errors if extension was reloaded
          if (chrome.runtime.lastError) {
            console.log("Extension context invalidated, please refresh the page");
          }
        }
      );
    } else {
      alert("Please reload the page - extension was updated");
    }
  };

  buttonContainer.appendChild(button);
  profileHeader.appendChild(buttonContainer);
}

// Add "Deep Dive" button to repository pages
function addRepoDiveButton() {
  const repoInfo = getRepoInfo();
  if (!repoInfo) return;

  // Check if button already exists
  if (document.querySelector(".en-git-repo-btn")) return;

  // Find repository header actions
  const repoActions =
    document.querySelector(".pagehead-actions") ||
    document.querySelector('[data-view-component="true"] ul');

  if (!repoActions) return;

  // Create button container
  const buttonContainer = document.createElement("div");
  buttonContainer.style.cssText =
    "display: inline-flex; gap: 8px; margin-left: 8px;";

  // Create Deep Dive button
  const diveButton = document.createElement("button");
  diveButton.className = "en-git-repo-btn";
  diveButton.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 4px;">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
    Deep Dive
  `;
  diveButton.style.cssText = `
    padding: 6px 12px;
    background: #6366f1;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
  `;

  diveButton.onclick = () => {
    // Check if extension context is valid before sending message
    if (chrome.runtime?.id) {
      chrome.runtime.sendMessage(
        {
          action: "analyzeRepo",
          owner: repoInfo.owner,
          repo: repoInfo.repo,
        },
        (response) => {
          // Handle response or ignore errors if extension was reloaded
          if (chrome.runtime.lastError) {
            console.log("Extension context invalidated, please refresh the page");
          }
        }
      );
    } else {
      alert("Please reload the page - extension was updated");
    }
  };

  // Create Bookmark button
  const bookmarkButton = document.createElement("button");
  bookmarkButton.className = "en-git-bookmark-btn";
  bookmarkButton.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle;">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
    </svg>
  `;
  bookmarkButton.style.cssText = `
    padding: 6px 10px;
    background: #8b5cf6;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 12px;
    display: inline-flex;
    align-items: center;
  `;

  // Check if already bookmarked
  chrome.storage.sync.get(["bookmarkedRepos"], (result) => {
    const bookmarks = result.bookmarkedRepos || [];
    const isBookmarked = bookmarks.some(
      (b) => b.owner === repoInfo.owner && b.repo === repoInfo.repo
    );

    if (isBookmarked) {
      bookmarkButton.style.background = "#22c55e";
      bookmarkButton.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" style="vertical-align: middle;">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
      `;
    }
  });

  bookmarkButton.onclick = () => {
    chrome.storage.sync.get(["bookmarkedRepos"], (result) => {
      let bookmarks = result.bookmarkedRepos || [];
      const index = bookmarks.findIndex(
        (b) => b.owner === repoInfo.owner && b.repo === repoInfo.repo
      );

      if (index > -1) {
        // Remove bookmark
        bookmarks.splice(index, 1);
        bookmarkButton.style.background = "#8b5cf6";
        bookmarkButton.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle;">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        `;
      } else {
        // Add bookmark
        const repoName =
          document.querySelector("strong[itemprop='name'] a")?.textContent ||
          repoInfo.repo;
        bookmarks.push({
          owner: repoInfo.owner,
          repo: repoInfo.repo,
          name: repoName,
          url: window.location.href,
        });
        bookmarkButton.style.background = "#22c55e";
        bookmarkButton.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" style="vertical-align: middle;">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        `;
      }

      chrome.storage.sync.set({ bookmarkedRepos: bookmarks });
    });
  };

  buttonContainer.appendChild(diveButton);
  buttonContainer.appendChild(bookmarkButton);
  repoActions.prepend(buttonContainer);
}

// Run when page loads
function init() {
  const path = window.location.pathname;

  // Profile page
  if (path.match(/^\/[^\/]+\/?$/)) {
    setTimeout(addAnalyzeButton, 1000);
  }

  // Repository page
  if (path.match(/^\/[^\/]+\/[^\/]+/)) {
    setTimeout(addRepoDiveButton, 1000);
  }
}

// Initialize
init();

// Re-run on navigation (GitHub uses PJAX)
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    init();
  }
}).observe(document, { subtree: true, childList: true });
