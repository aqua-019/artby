#!/bin/bash

# ============================================
# PUSH TO GITHUB - Automated Script
# ============================================

echo "🟢 Artby Complaints App - GitHub Push Script"
echo "=============================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Error: Git is not installed"
    echo "Install from: https://git-scm.com/downloads"
    exit 1
fi

# Prompt for GitHub username
echo "📝 Enter your GitHub username:"
read -r GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ Error: GitHub username cannot be empty"
    exit 1
fi

echo ""
echo "✅ GitHub username: $GITHUB_USERNAME"
echo ""

# Update repository URL in package.json
if [ -f "package.json" ]; then
    echo "📝 Updating package.json with your GitHub username..."
    sed -i.bak "s/YOUR_USERNAME/$GITHUB_USERNAME/g" package.json
    rm -f package.json.bak
    echo "✅ package.json updated"
fi

# Update repository URL in README.md
if [ -f "README.md" ]; then
    echo "📝 Updating README.md with your GitHub username..."
    sed -i.bak "s/YOUR_USERNAME/$GITHUB_USERNAME/g" README.md
    rm -f README.md.bak
    echo "✅ README.md updated"
fi

echo ""
echo "=============================================="
echo "🌐 Create GitHub Repository Now"
echo "=============================================="
echo ""
echo "1. Go to: https://github.com/new"
echo "2. Repository name: artby-complaints-app"
echo "3. Description: Static forest green complaints app - mobile optimized"
echo "4. Visibility: Public"
echo "5. ⚠️  DO NOT initialize with README, .gitignore, or license"
echo "6. Click 'Create repository'"
echo ""
echo "Press ENTER when repository is created..."
read -r

# Add remote
echo ""
echo "🔗 Adding GitHub remote..."
git remote remove origin 2>/dev/null
git remote add origin "https://github.com/$GITHUB_USERNAME/artby-complaints-app.git"

if [ $? -eq 0 ]; then
    echo "✅ Remote added successfully"
else
    echo "❌ Error adding remote"
    exit 1
fi

# Verify remote
echo ""
echo "🔍 Verifying remote..."
git remote -v

# Commit URL updates
echo ""
echo "💾 Committing URL updates..."
git add package.json README.md
git commit -m "Update URLs with GitHub username: $GITHUB_USERNAME" || true

# Push to GitHub
echo ""
echo "🚀 Pushing to GitHub..."
echo "⚠️  You may be prompted for GitHub credentials"
echo ""

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "=============================================="
    echo "🎉 SUCCESS! Your code is on GitHub!"
    echo "=============================================="
    echo ""
    echo "📍 Repository URL:"
    echo "   https://github.com/$GITHUB_USERNAME/artby-complaints-app"
    echo ""
    echo "📍 Next Steps:"
    echo "   1. Deploy to Vercel: ./deploy-vercel.sh"
    echo "   2. Or visit: https://vercel.com/new"
    echo "   3. Import your GitHub repo"
    echo ""
    echo "=============================================="
else
    echo ""
    echo "=============================================="
    echo "❌ Push Failed"
    echo "=============================================="
    echo ""
    echo "Common fixes:"
    echo "1. Check your GitHub credentials"
    echo "2. Create a Personal Access Token:"
    echo "   https://github.com/settings/tokens"
    echo "3. Use token as password when prompted"
    echo ""
    echo "Or try SSH:"
    echo "   git remote set-url origin git@github.com:$GITHUB_USERNAME/artby-complaints-app.git"
    echo "   git push -u origin main"
    echo ""
fi
