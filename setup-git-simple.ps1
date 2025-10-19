# Git Repository Setup Script (PowerShell - Simple Version)
# Safe push to GitHub with security checks

Write-Host ""
Write-Host "Starting Git Repository Setup..." -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
} else {
    Write-Host "[OK] Git repository already initialized" -ForegroundColor Green
}

# Check for .env files being tracked
Write-Host ""
Write-Host "Checking for sensitive files..." -ForegroundColor Yellow

$trackedEnv = git ls-files "*.env" 2>$null
if ($trackedEnv) {
    Write-Host "[ERROR] .env files are being tracked!" -ForegroundColor Red
    Write-Host $trackedEnv -ForegroundColor Red
    Write-Host ""
    Write-Host "Run this to unstage them:" -ForegroundColor Yellow
    Write-Host "  git rm --cached server/.env client/.env" -ForegroundColor White
    exit 1
}

Write-Host "[OK] No .env files detected in staging" -ForegroundColor Green

# Show current status
Write-Host ""
Write-Host "Current Git Status:" -ForegroundColor Cyan
git status --short

# Confirm before proceeding
Write-Host ""
$confirm = Read-Host "Continue with git setup? (y/n)"
if ($confirm -ne 'y' -and $confirm -ne 'Y') {
    Write-Host "Aborted" -ForegroundColor Red
    exit 0
}

# Add all files
Write-Host ""
Write-Host "Adding files to staging..." -ForegroundColor Yellow
git add .

# Show what will be committed
Write-Host ""
Write-Host "Files to be committed:" -ForegroundColor Cyan
git status --short

# Confirm commit
Write-Host ""
$confirmCommit = Read-Host "Proceed with commit? (y/n)"
if ($confirmCommit -ne 'y' -and $confirmCommit -ne 'Y') {
    Write-Host "Aborted" -ForegroundColor Red
    exit 0
}

# Commit
$commitMsg = Read-Host "Enter commit message (press Enter for 'Initial commit')"
if ([string]::IsNullOrWhiteSpace($commitMsg)) {
    $commitMsg = "Initial commit"
}

Write-Host ""
Write-Host "Creating commit..." -ForegroundColor Yellow
git commit -m $commitMsg

# Set main branch
Write-Host ""
Write-Host "Setting main branch..." -ForegroundColor Yellow
git branch -M main

# Add remote
Write-Host ""
Write-Host "Adding remote origin..." -ForegroundColor Yellow
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
Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
Write-Host "Note: You may need to authenticate with GitHub" -ForegroundColor Yellow
Write-Host ""

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "[SUCCESS] Pushed to GitHub!" -ForegroundColor Green
    Write-Host "Repository: $remoteUrl" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "[ERROR] Push failed" -ForegroundColor Red
    Write-Host "You may need a Personal Access Token (PAT):" -ForegroundColor Yellow
    Write-Host "https://github.com/settings/tokens" -ForegroundColor Blue
    exit 1
}

Write-Host ""
Write-Host "Setup complete!" -ForegroundColor Green
Write-Host ""
