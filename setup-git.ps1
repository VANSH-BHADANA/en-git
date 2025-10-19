# ===========================================
# Git Repository Setup Script (PowerShell)
# ===========================================
# This script initializes the repository and 
# pushes to GitHub with proper safety checks
# ===========================================

Write-Host "`n🚀 Starting Git Repository Setup...`n" -ForegroundColor Cyan

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "📦 Initializing Git repository..." -ForegroundColor Yellow
    git init
} else {
    Write-Host "✅ Git repository already initialized" -ForegroundColor Green
}

# Check for sensitive files
Write-Host "`n🔍 Checking for sensitive files..." -ForegroundColor Yellow

$sensitivePatterns = @(
    "*.env",
    "*.pem",
    "*.key",
    "*service-account.json",
    "*firebase-adminsdk.json"
)

$foundSensitive = $false
foreach ($pattern in $sensitivePatterns) {
    $files = Get-ChildItem -Path . -Filter $pattern -Recurse -File -ErrorAction SilentlyContinue
    if ($files) {
        Write-Host "⚠️  WARNING: Found sensitive files: $($files.Name -join ', ')" -ForegroundColor Red
        $foundSensitive = $true
    }
}

# Check if .env files are tracked
$trackedEnv = git ls-files "*.env" 2>$null
if ($trackedEnv) {
    Write-Host "⚠️  WARNING: .env files are being tracked!" -ForegroundColor Red
    Write-Host $trackedEnv -ForegroundColor Red
    $foundSensitive = $true
}

if ($foundSensitive) {
    Write-Host "`n❌ STOP! Remove sensitive files before continuing!" -ForegroundColor Red
    Write-Host "Run: git rm --cached <file> to unstage them" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ No sensitive files detected in staging`n" -ForegroundColor Green

# Verify .gitignore exists
if (-not (Test-Path ".gitignore")) {
    Write-Host "⚠️  No root .gitignore found! Please create one." -ForegroundColor Yellow
}

# Show current status
Write-Host "📋 Current Git Status:" -ForegroundColor Cyan
git status --short

# Confirm before proceeding
Write-Host "`n"
$confirm = Read-Host "Do you want to continue? (y/n)"
if ($confirm -ne 'y' -and $confirm -ne 'Y') {
    Write-Host "❌ Aborted by user" -ForegroundColor Red
    exit 0
}

# Add all files
Write-Host "`n📝 Adding files to staging..." -ForegroundColor Yellow
git add .

# Show what will be committed
Write-Host "`n📋 Files to be committed:" -ForegroundColor Cyan
git status --short

# Confirm commit
Write-Host "`n"
$confirmCommit = Read-Host "Proceed with commit? (y/n)"
if ($confirmCommit -ne 'y' -and $confirmCommit -ne 'Y') {
    Write-Host "❌ Aborted by user" -ForegroundColor Red
    exit 0
}

# Commit
$commitMsg = Read-Host "`nEnter commit message (press Enter for 'Initial commit')"
if ([string]::IsNullOrWhiteSpace($commitMsg)) {
    $commitMsg = "Initial commit"
}

Write-Host "`n💾 Creating commit..." -ForegroundColor Yellow
git commit -m $commitMsg

# Set main branch
Write-Host "`n🌿 Setting main branch..." -ForegroundColor Yellow
git branch -M main

# Add remote
Write-Host "`n🔗 Adding remote origin..." -ForegroundColor Yellow
$remoteUrl = "https://github.com/TejasS1233/en-git.git"

# Check if remote already exists
$existingRemote = git remote 2>$null | Where-Object { $_ -eq "origin" }
if ($existingRemote) {
    Write-Host "Remote origin already exists. Updating..." -ForegroundColor Yellow
    git remote set-url origin $remoteUrl
} else {
    git remote add origin $remoteUrl
}

Write-Host "Remote set to: $remoteUrl" -ForegroundColor Green

# Push to GitHub
Write-Host "`n🚀 Pushing to GitHub..." -ForegroundColor Cyan
Write-Host "Note: You may need to authenticate with GitHub" -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "🎉 Repository is now live at: $remoteUrl" -ForegroundColor Cyan
} else {
    Write-Host "`n❌ Push failed. Please check your credentials and try again." -ForegroundColor Red
    Write-Host "You may need to set up a Personal Access Token (PAT):" -ForegroundColor Yellow
    Write-Host "https://github.com/settings/tokens" -ForegroundColor Blue
    exit 1
}

Write-Host "`n✨ Setup complete!`n" -ForegroundColor Green
