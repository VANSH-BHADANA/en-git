// Content script that runs on GitHub pages
console.log("en-git content script loaded");

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
    chrome.runtime.sendMessage({
      action: "analyzeProfile",
      username: username,
    });
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

  // Create button
  const button = document.createElement("button");
  button.className = "en-git-repo-btn";
  button.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 4px;">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
    Deep Dive
  `;
  button.style.cssText = `
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
    margin-left: 8px;
  `;

  button.onclick = () => {
    chrome.runtime.sendMessage({
      action: "analyzeRepo",
      owner: repoInfo.owner,
      repo: repoInfo.repo,
    });
  };

  repoActions.prepend(button);
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
