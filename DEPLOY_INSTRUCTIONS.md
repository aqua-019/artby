# 🚀 DEPLOY INSTRUCTIONS - GitHub & Vercel

**Complete step-by-step guide to deploy your Artby Complaints App**

---

## 📋 Prerequisites

- GitHub account ([Sign up](https://github.com/join))
- Git installed ([Download](https://git-scm.com/downloads))
- Vercel account ([Sign up](https://vercel.com/signup)) - Optional but recommended

---

## 🐙 STEP 1: Push to GitHub

### **A. Create GitHub Repository**

1. Go to [github.com/new](https://github.com/new)
2. Fill in:
   - **Repository name:** `artby-complaints-app`
   - **Description:** `Static forest green complaints management app - mobile optimized`
   - **Visibility:** Public ✅ (or Private)
   - **⚠️ DO NOT** initialize with README, .gitignore, or license (we have these!)
3. Click **"Create repository"**

### **B. Connect Local Repo to GitHub**

```bash
# Navigate to your project
cd artby-complaints-app

# Add GitHub remote (REPLACE YOUR_USERNAME!)
git remote add origin https://github.com/YOUR_USERNAME/artby-complaints-app.git

# Verify remote
git remote -v

# Push to GitHub
git push -u origin main
```

**🎉 Your code is now on GitHub!**

Visit: `https://github.com/YOUR_USERNAME/artby-complaints-app`

---

## ⚡ STEP 2: Deploy to Vercel

### **Method 1: One-Click Deploy (Easiest)**

1. Click this button: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/artby-complaints-app)
2. Sign in with GitHub
3. Click **"Deploy"**
4. ✅ **DONE! Live in 30 seconds!**

### **Method 2: Vercel CLI (Fastest)**

```bash
# Install Vercel CLI (one-time)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Follow prompts:
# ? Set up and deploy? [Y/n] y
# ? Which scope? Your Account
# ? Link to existing project? [y/N] n
# ? What's your project's name? artby-complaints-app
# ? In which directory is your code located? ./
```

**✅ Your app is now live!**

You'll get a URL like: `https://artby-complaints-app.vercel.app`

### **Method 3: Vercel Dashboard (Most Control)**

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select your GitHub repo: `YOUR_USERNAME/artby-complaints-app`
4. Click **"Import"**
5. Configure:
   - **Framework Preset:** Other
   - **Build Command:** (leave empty)
   - **Output Directory:** `.` (just a period)
   - **Install Command:** (leave empty)
6. Click **"Deploy"**

**✅ Auto-deploys on every git push!**

---

## 🌐 STEP 3: Custom Domain (Optional)

### **Add Custom Domain to Vercel**

1. Go to your project dashboard on Vercel
2. Click **"Settings"** → **"Domains"**
3. Enter your domain: `yourdomain.com`
4. Click **"Add"**
5. Update DNS records at your registrar:

**For Vercel:**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

6. Wait 24-48 hours for DNS propagation
7. ✅ **Live at your custom domain!**

---

## 📊 STEP 4: Verify Deployment

### **Check These:**

- [ ] Visit your Vercel URL
- [ ] Submit a test complaint
- [ ] Verify complaint appears in list
- [ ] Test save button (download TXT/HTML)
- [ ] Test on mobile device (iOS/Android)
- [ ] Check haptic feedback works
- [ ] Verify LocalStorage persists on reload
- [ ] Test share sheet on mobile

### **Run Performance Tests:**

```bash
# Lighthouse audit
lighthouse https://your-app-url.vercel.app --view

# Or use web interface:
# Visit: https://pagespeed.web.dev/
# Enter your URL
```

**Target Scores:**
- Performance: 95+ ✅
- Accessibility: 100 ✅
- Best Practices: 100 ✅
- SEO: 100 ✅

---

## 🔄 STEP 5: Update Your URLs

After deployment, update these files with your actual URLs:

### **README.md**
```markdown
- **Live Demo:** https://artby-complaints-app.vercel.app
- **GitHub Repo:** https://github.com/YOUR_USERNAME/artby-complaints-app
```

### **package.json**
```json
{
  "repository": {
    "url": "git+https://github.com/YOUR_USERNAME/artby-complaints-app.git"
  },
  "homepage": "https://artby-complaints-app.vercel.app"
}
```

### **Commit Updates:**
```bash
git add README.md package.json
git commit -m "Update URLs with deployed links"
git push
```

Vercel will auto-deploy the changes! ✅

---

## 🎯 STEP 6: Enable Auto-Deploy

**Already enabled if using Method 2 or 3!**

Every time you push to GitHub:
```bash
git add .
git commit -m "Fix: Updated button color"
git push
```

Vercel automatically:
1. Detects the push
2. Builds your app
3. Deploys to production
4. **Live in ~30 seconds!**

---

## 🆘 Troubleshooting

### **Issue: Git Push Fails**

```bash
# If authentication fails:
# Use Personal Access Token (PAT)
# Generate at: https://github.com/settings/tokens

git remote set-url origin https://YOUR_USERNAME:YOUR_PAT@github.com/YOUR_USERNAME/artby-complaints-app.git
git push -u origin main
```

### **Issue: Vercel Build Fails**

Check Vercel build logs:
1. Go to Vercel dashboard
2. Click on your project
3. Click on failed deployment
4. Check **"Build Logs"**

**Common fixes:**
- Ensure `vercel.json` is committed
- Check file paths are correct
- Verify no typos in filenames

### **Issue: CSS/JS Not Loading**

Check `index.html` has relative paths:

```html
<!-- Correct ✅ -->
<link rel="stylesheet" href="styles.css">
<script src="app.js"></script>

<!-- Incorrect ❌ -->
<link rel="stylesheet" href="/styles.css">
<script src="/app.js"></script>
```

### **Issue: Mobile Share Not Working**

1. Test in private/incognito mode
2. Check browser console for errors
3. Verify browser supports Web Share API
4. Grant necessary permissions (iOS Settings)

---

## 📈 Post-Deployment Checklist

- [ ] GitHub repo is public (or collaborators added)
- [ ] Vercel deployment successful
- [ ] Live URL accessible
- [ ] All features working
- [ ] Mobile tested (iOS + Android)
- [ ] Performance scores 95+
- [ ] Custom domain configured (optional)
- [ ] URLs updated in files
- [ ] Auto-deploy enabled
- [ ] README badges updated

---

## 🎉 You're Live!

Your app is now:
- ✅ Hosted on Vercel (free tier)
- ✅ Auto-deployed on git push
- ✅ HTTPS enabled (automatic)
- ✅ CDN distributed globally
- ✅ 99.99% uptime guaranteed

**Share your URL:**
- `https://artby-complaints-app.vercel.app`
- `https://YOUR_USERNAME.github.io/artby-complaints-app` (if using Pages)
- `https://yourdomain.com` (if custom domain)

---

## 🔗 Quick Links

- **Vercel Dashboard:** [vercel.com/dashboard](https://vercel.com/dashboard)
- **GitHub Repo Settings:** `https://github.com/YOUR_USERNAME/artby-complaints-app/settings`
- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **GitHub Docs:** [docs.github.com](https://docs.github.com)

---

## 📞 Need Help?

- **Vercel Support:** [vercel.com/support](https://vercel.com/support)
- **GitHub Discussions:** [github.community](https://github.community)
- **Issue Tracker:** `https://github.com/YOUR_USERNAME/artby-complaints-app/issues`

---

**Deployment complete! 🎉**

**Built with 💚 by Aquatic**
