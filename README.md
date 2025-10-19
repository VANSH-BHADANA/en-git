# en-git 🚀

**AI-Powered GitHub Analytics Platform**

en-git transforms your GitHub data into actionable insights with advanced analytics, gamification, AI-powered career advice, and beautiful visualizations.

[![GitHub](https://img.shields.io/badge/GitHub-TejasS1233-blue?logo=github)](https://github.com/TejasS1233)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/react-18.3.1-61DAFB?logo=react)](https://reactjs.org/)

## ✨ Features

### 📊 Core Analytics

-  **Language Analysis** - Top 3 programming languages with usage percentages
-  **Repository Insights** - Most starred & active repositories
-  **Contribution Calendar** - Interactive heatmap of your coding activity
-  **Activity Patterns** - Weekly & hourly contribution charts
-  **Coding Profile** - Early bird vs night coder detection
-  **Topics & Tags** - Popular technologies in your projects
-  **Domain Detection** - Skill classification (Web Dev, AI/ML, DevOps, Mobile, etc.)

### 🎮 Gamification & Achievements

- **Achievement Badges** - Unlock badges based on your activity
  -  Polyglot (Bronze/Silver/Gold)
  -  Night Owl / 🐦 Early Bird
  -  Open Source Hero
  -  Consistent Coder
  -  Star Collector
  -  Early Adopter
  -  Collaborator
  -  Issue Hunter
-  **Skill Radar Chart** - 6-dimensional visualization of technical expertise
-  **Tech Stack Badges** - Auto-generated shields.io badges for your README

### 🤖 AI-Powered Features

-  **Career Insights** - Personalized career advice from Google Gemini AI
-  **6-Month Learning Roadmap** - Customized skill development plan
-  **Strengths & Growth Areas** - Identify what you excel at and where to improve
-  **Project Recommendations** - AI-suggested projects to build next
-  **Career Paths** - Job titles and specializations matched to your profile

### 🎨 Social & Sharing

-  **Share Cards** - Generate beautiful 1200x630 images for social media
-  **Bookmarks** - Save favorite profiles for quick access
-  **Search History** - Track recently viewed profiles
-  **PDF Export** - Download comprehensive reports
## 🛠️ Tech Stack

**Frontend:**

- React 19 + Vite
- React Router
- Shadcn/UI + Radix UI
- Tailwind CSS
- Recharts (for analytics charts)
- Axios
- Socket.io-client

**Backend:**

- Node.js + Express
- MongoDB + Mongoose
- Socket.io
- JWT + bcrypt
- Razorpay
- Cloudinary
- Ethers.js
- Axios + Cheerio (GitHub trending scrape)
- Node-Cache (in-memory cache for GitHub API)

---

## 📦 Setup

### Prerequisites

- Node.js 18+
- MongoDB running (local or Atlas)
- GitHub personal access token (optional, for higher rate limits)

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd Github
```

### 2. Install dependencies

**Server:**

```bash
cd server
npm install
```

**Client:**

```bash
cd client
npm install
```

### 3. Configure environment variables

Create `server/.env`:

```bash
PORT=8000
CORS_ORIGIN=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/need_for_code
JWT_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_EXPIRY=7d

# Optional: GitHub token for higher rate limits (5000/hr vs 60/hr)
GITHUB_TOKEN=ghp_YourPersonalAccessToken

# Razorpay
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

# Twilio (optional)
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=your_number

# Nodemailer (optional)
EMAIL_USER=your_email
EMAIL_PASS=your_password
```

Create `client/.env`:

```bash
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### 4. Run the application

**Option A: Use the batch script (Windows)**

```bash
start_dev.bat
```

**Option B: Run manually**

Terminal 1 (server):

```bash
cd server
npm run dev
```

Terminal 2 (client):

```bash
cd client
npm run dev
```

### 5. Open in browser

- Client: http://localhost:5173
- Server: http://localhost:8000/api/v1/healthcheck
- GitHub Insights: http://localhost:5173/github-insights

---

## 📊 GitHub Insights Usage

1. Navigate to `/github-insights` in the app
2. Enter any public GitHub username (e.g., `octocat`, `torvalds`, `gaearon`)
3. Click **Analyze**
4. View:
   - **Profile Summary**: avatar, bio, followers, domain classification
   - **Top Languages**: pie chart with percentages
   - **Most Starred/Active Repos**: ranked lists
   - **Popular Topics**: tag cloud
   - **Commit Timing**: hourly bar chart + profile badge (early-bird / night-coder)
   - **Weekly Activity**: recent events by week
   - **Recommendations**:
     - Trending projects that match your skills
     - Personal project ideas based on your top topics
     - Today's trending repos

**Tips:**

- Add a `GITHUB_TOKEN` to `.env` for higher API rate limits (5000/hr)
- Without a token, public API allows 60 requests/hour
- Results are cached for 5 minutes server-side to reduce API calls

---


## 🧩 Project Structure

```
Github/
├── client/            # React frontend
│   ├── src/
│   │   ├── components/   # UI components (shadcn)
│   │   ├── pages/        # Routes (Home, Dashboard, GitHubInsights, etc.)
│   │   ├── lib/          # axios, github, auth, utils
│   │   └── ...
│   └── package.json
├── server/            # Express backend
│   ├── src/
│   │   ├── controllers/  # Route handlers
│   │   ├── routes/       # Express routes
│   │   ├── models/       # Mongoose schemas
│   │   ├── services/     # External APIs (github.service.js)
│   │   ├── utils/        # Helpers (githubAnalytics, skillDomain, etc.)
│   │   └── app.js
│   └── package.json
├── README.md
└── start_dev.bat
```

---

