# 🐙 GitHub Repository Setup Guide

Complete step-by-step instructions to push your Artby Complaints App to GitHub.

---

## 📋 Prerequisites

- Git installed on your machine
- GitHub account created
- Project files downloaded/extracted

---

## 🚀 Quick Setup (5 Minutes)

### **Step 1: Initialize Git Repository**

```bash
# Navigate to your project directory
cd artby-complaints-app

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Tactile maximalist complaints app with kinetic typography"
```

### **Step 2: Create GitHub Repository**

**Option A: Via GitHub Website**

1. Go to [github.com](https://github.com)
2. Click the **"+"** icon (top right) → **"New repository"**
3. Fill in details:
   - **Repository name:** `artby-complaints-app`
   - **Description:** `Tactile maximalist web app for managing residence complaints with kinetic typography`
   - **Visibility:** Public (or Private)
   - **⚠️ DO NOT** initialize with README, .gitignore, or license (we already have these!)
4. Click **"Create repository"**

**Option B: Via GitHub CLI**

```bash
# Install GitHub CLI (if not installed)
# macOS: brew install gh
# Windows: winget install --id GitHub.cli
# Linux: See https://github.com/cli/cli#installation

# Login to GitHub
gh auth login

# Create repository
gh repo create artby-complaints-app --public --source=. --remote=origin --push
```

### **Step 3: Connect Local Repo to GitHub**

```bash
# Add remote origin (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/artby-complaints-app.git

# Verify remote
git remote -v

# Should show:
# origin  https://github.com/YOUR_USERNAME/artby-complaints-app.git (fetch)
# origin  https://github.com/YOUR_USERNAME/artby-complaints-app.git (push)

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**🎉 Done! Your repository is now live on GitHub!**

Visit: `https://github.com/YOUR_USERNAME/artby-complaints-app`

---

## 🔧 Common Issues & Solutions

### **Issue: Authentication Failed**

**Solution 1: Use Personal Access Token (PAT)**

```bash
# 1. Generate PAT at: https://github.com/settings/tokens
# Scopes needed: repo (all)

# 2. Use PAT as password when prompted:
git push -u origin main
Username: YOUR_USERNAME
Password: ghp_YOUR_PERSONAL_ACCESS_TOKEN
```

**Solution 2: Use SSH**

```bash
# 1. Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# 2. Add SSH key to GitHub
# https://github.com/settings/keys
cat ~/.ssh/id_ed25519.pub
# Copy output and paste in GitHub

# 3. Change remote to SSH
git remote set-url origin git@github.com:YOUR_USERNAME/artby-complaints-app.git

# 4. Push
git push -u origin main
```

### **Issue: Remote Already Exists**

```bash
# Remove existing remote
git remote remove origin

# Add new remote
git remote add origin https://github.com/YOUR_USERNAME/artby-complaints-app.git

# Push
git push -u origin main
```

### **Issue: Non-fast-forward Error**

```bash
# Pull first
git pull origin main --allow-unrelated-histories

# Then push
git push -u origin main
```

---

## 📝 Update README URLs

After creating your GitHub repo, update these files:

### **README.md**

Replace placeholders:

```markdown
<!-- Before -->
- **GitHub Repo:** [Add your GitHub URL here]

<!-- After -->
- **GitHub Repo:** https://github.com/YOUR_USERNAME/artby-complaints-app
```

### **package.json**

```json
{
  "repository": {
    "type": "git",
    "url": "git+https://github.com/YOUR_USERNAME/artby-complaints-app.git"
  },
  "bugs": {
    "url": "https://github.com/YOUR_USERNAME/artby-complaints-app/issues"
  },
  "homepage": "https://github.com/YOUR_USERNAME/artby-complaints-app#readme"
}
```

### **Commit Updates**

```bash
git add README.md package.json
git commit -m "Update repository URLs"
git push
```

---

## 🎨 Add Repository Assets

### **1. Add Topics/Tags**

On GitHub repository page:
1. Click **⚙️ (gear icon)** next to "About"
2. Add topics:
   - `tactile-maximalism`
   - `kinetic-typography`
   - `javascript`
   - `html-css-javascript`
   - `vercel`
   - `complaints-management`
   - `residence-management`
   - `squishy-ui`
   - `haptic-feedback`

### **2. Update Repository Description**

```
Tactile maximalist web app for managing residence complaints with kinetic typography and squishy UI. Built with pure HTML/CSS/JS - zero dependencies.
```

### **3. Add Website URL**

If deployed to Vercel/Netlify:
1. Click **⚙️ (gear icon)** next to "About"
2. Add your deployment URL
3. ✅ Check "Use your GitHub Pages website"

---

## 🌟 Recommended Repository Settings

### **Enable GitHub Pages**

```bash
# 1. Go to Settings → Pages
# 2. Source: Deploy from a branch
# 3. Branch: main
# 4. Folder: / (root)
# 5. Save

# Your site will be live at:
# https://YOUR_USERNAME.github.io/artby-complaints-app
```

### **Enable Issues**

```bash
# Settings → Features → ✅ Issues
```

### **Add Repository Social Preview**

1. Go to Settings → General
2. Scroll to "Social preview"
3. Upload image (1200x630px)
   - Create screenshot of your app
   - Or use logo/banner

### **Protect Main Branch** (Optional)

```bash
# Settings → Branches → Add rule
# Branch name pattern: main
# ✅ Require pull request reviews before merging
# ✅ Require status checks to pass before merging
# Save changes
```

---

## 🔄 Daily Workflow

### **Making Changes**

```bash
# 1. Make changes to files
nano index.html  # or your editor

# 2. Check status
git status

# 3. Stage changes
git add .

# 4. Commit with descriptive message
git commit -m "Fix: Reduce glow intensity by 50%"

# 5. Push to GitHub
git push
```

### **Useful Git Commands**

```bash
# View commit history
git log --oneline

# Create new branch
git checkout -b feature/new-animation

# Switch branches
git checkout main

# Merge branch
git merge feature/new-animation

# Pull latest changes
git pull origin main

# View differences
git diff

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

---

## 📊 Repository Statistics

After setup, you'll have:

```
✅ Public repository
✅ MIT License
✅ Comprehensive README
✅ Professional .gitignore
✅ Deployment ready (Vercel/GitHub Pages)
✅ Complete documentation
✅ Clean commit history
```

---

## 🎯 Next Steps After GitHub Setup

1. ✅ **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

2. ✅ **Enable GitHub Discussions** (optional)
   - Settings → Features → ✅ Discussions

3. ✅ **Add GitHub Actions** (optional CI/CD)
   ```yaml
   # .github/workflows/deploy.yml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [ main ]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - name: Deploy
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./
   ```

4. ✅ **Add Badges to README**
   ```markdown
   ![GitHub](https://img.shields.io/github/license/YOUR_USERNAME/artby-complaints-app)
   ![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/artby-complaints-app)
   ![GitHub forks](https://img.shields.io/github/forks/YOUR_USERNAME/artby-complaints-app)
   ```

---

## 🆘 Get Help

**GitHub Resources:**
- [GitHub Docs](https://docs.github.com)
- [Git Handbook](https://guides.github.com/introduction/git-handbook/)
- [GitHub Skills](https://skills.github.com/)

**Need Help?**
- Open an issue: `https://github.com/YOUR_USERNAME/artby-complaints-app/issues`
- GitHub Community: [community.github.com](https://github.community)

---

**Your repository is ready! 🎉**

**Repository URL:** `https://github.com/YOUR_USERNAME/artby-complaints-app`

**Built with 💚 by Aquatic**
