# 🔒 Pre-Commit Security Checklist

Before pushing to GitHub, verify:

## ✅ Environment Files

- [ ] `.env` files are NOT being tracked
  ```bash
  git ls-files "*.env"
  # Should return nothing
  ```

- [ ] `.gitignore` includes:
  ```
  .env
  .env.*
  !.env.example
  ```

- [ ] `.env.example` files exist with placeholder values

## ✅ Sensitive Data

Check for accidentally committed secrets:

- [ ] No API keys in code
  ```bash
  grep -r "API_KEY" . --exclude-dir=node_modules --exclude="*.example"
  ```

- [ ] No passwords or tokens in code
- [ ] No private keys (.pem, .key files)
- [ ] No service account JSONs (firebase, google cloud)
- [ ] No AWS credentials

## ✅ Dependencies

- [ ] `node_modules/` is in `.gitignore`
- [ ] Lock files decision made (keep or ignore)

## ✅ Git Status

Run before committing:
```bash
git status
```

Check the output for:
- [ ] No `.env` files in "Changes to be committed"
- [ ] No `node_modules/` folders
- [ ] No large binary files (unless intended)

## 🚀 Ready to Push?

If all checks pass:

**PowerShell:**
```powershell
.\setup-git.ps1
```

**Bash:**
```bash
./setup-git.sh
```

**Manual:**
```bash
git add .
git commit -m "Your commit message"
git push -u origin main
```

## ⚠️ If You Accidentally Committed Secrets

### Remove from current commit (before push):
```bash
git rm --cached .env
git commit --amend
```

### Remove from history (after push):
```bash
# Use git-filter-repo or BFG Repo Cleaner
# Then force push: git push -f origin main
# ⚠️ Warning: This rewrites history!
```

### Rotate compromised credentials:
1. Immediately revoke/regenerate API keys
2. Update services with new credentials
3. Update local `.env` file
4. Never commit the new credentials

## 📚 Resources

- [GitHub: Removing sensitive data](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)
- [Git-filter-repo](https://github.com/newren/git-filter-repo)
- [BFG Repo Cleaner](https://rtyley.github.io/bfg-repo-cleaner/)
