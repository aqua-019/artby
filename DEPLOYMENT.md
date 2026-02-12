# 🚀 Deployment Guide - Artby Complaints App

Complete deployment instructions for multiple platforms.

---

## 📋 Table of Contents

1. [Vercel Deployment](#-vercel-deployment-recommended)
2. [GitHub Pages](#-github-pages)
3. [Netlify](#-netlify)
4. [Custom Server](#-custom-server)
5. [Docker](#-docker)
6. [Post-Deployment Checklist](#-post-deployment-checklist)

---

## 🟢 Vercel Deployment (Recommended)

**Best for:** Zero-config, instant deployment, automatic HTTPS

### **Method 1: One-Click Deploy**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/artby-complaints-app)

1. Click the button above
2. Sign in with GitHub
3. Deploy → Live in 30 seconds! 🎉

### **Method 2: Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to project directory
cd artby-complaints-app

# Deploy
vercel

# Follow prompts:
# ? Set up and deploy "artby-complaints-app"? [Y/n] y
# ? Which scope? Your Account
# ? Link to existing project? [y/N] n
# ? What's your project's name? artby-complaints-app
# ? In which directory is your code located? ./

# Production deployment
vercel --prod
```

### **Method 3: GitHub Integration**

1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repo
5. Click "Deploy"

**Your app will be live at:** `https://artby-complaints-app.vercel.app`

---

## 🐙 GitHub Pages

**Best for:** Free hosting, simple static sites

### **Setup Steps**

```bash
# 1. Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit"

# 2. Create GitHub repo
# Go to github.com → New Repository → artby-complaints-app

# 3. Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/artby-complaints-app.git
git branch -M main
git push -u origin main

# 4. Enable GitHub Pages
# Go to: Settings → Pages → Source: main branch → Save
```

**Your app will be live at:** `https://YOUR_USERNAME.github.io/artby-complaints-app`

**⏱️ Deploy Time:** 2-5 minutes after push

---

## 🎯 Netlify

**Best for:** Drag-and-drop deployment, form handling

### **Method 1: Drag & Drop**

1. Visit [netlify.com](https://netlify.com)
2. Drag your project folder to the deploy zone
3. Live in 60 seconds! 🎉

### **Method 2: Netlify CLI**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy

# Follow prompts:
# ? What would you like to do? Create & configure a new site
# ? Team: Your Team
# ? Site name: artby-complaints-app
# ? Publish directory: .

# Production deployment
netlify deploy --prod
```

### **Method 3: GitHub Integration**

1. Push to GitHub
2. Visit [app.netlify.com](https://app.netlify.com)
3. "New site from Git" → Select repo
4. Deploy settings:
   - Build command: (leave empty)
   - Publish directory: `.`
5. Deploy site

**Your app will be live at:** `https://artby-complaints-app.netlify.app`

---

## 🖥️ Custom Server

**Best for:** Full control, custom domain, server-side features

### **Node.js + Express**

```bash
# Install dependencies
npm install express

# Create server.js
```

```javascript
// server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static(__dirname));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🟢 Server running at http://localhost:${PORT}`);
});
```

```bash
# Run server
node server.js
```

### **Python HTTP Server**

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Visit: `http://localhost:8000`

### **Apache**

```bash
# Copy files to Apache directory
sudo cp -r artby-complaints-app /var/www/html/

# Set permissions
sudo chown -R www-data:www-data /var/www/html/artby-complaints-app
sudo chmod -R 755 /var/www/html/artby-complaints-app

# Restart Apache
sudo systemctl restart apache2
```

Visit: `http://your-server-ip/artby-complaints-app`

### **Nginx**

```nginx
# /etc/nginx/sites-available/artby-complaints
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/artby-complaints-app;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(css|js|jpg|png|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/artby-complaints /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 🐳 Docker

**Best for:** Containerized deployment, consistency

### **Dockerfile**

```dockerfile
# Dockerfile
FROM nginx:alpine

# Copy files
COPY . /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

### **Build & Run**

```bash
# Build image
docker build -t artby-complaints-app .

# Run container
docker run -d -p 8000:80 --name artby-app artby-complaints-app

# Visit http://localhost:8000
```

### **Docker Compose**

```yaml
# docker-compose.yml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "8000:80"
    restart: unless-stopped
```

```bash
# Deploy
docker-compose up -d
```

---

## ✅ Post-Deployment Checklist

### **1. Verify Functionality**

- [ ] Page loads correctly
- [ ] All animations work
- [ ] Form submission works
- [ ] Complaints appear in list
- [ ] LocalStorage persists data
- [ ] Mobile responsive
- [ ] Haptic feedback works (mobile)

### **2. Performance Testing**

```bash
# Lighthouse audit
lighthouse https://your-app-url.com --view

# PageSpeed Insights
# Visit: https://pagespeed.web.dev/
# Enter your URL
```

**Target Scores:**
- Performance: >90
- Accessibility: >95
- Best Practices: >95
- SEO: >90

### **3. Browser Testing**

Test on:
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### **4. Security Headers**

Verify headers (already in `vercel.json`):

```bash
curl -I https://your-app-url.com
```

Should include:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`

### **5. Custom Domain Setup**

#### **Vercel**

```bash
# Add domain
vercel domains add your-domain.com

# Update DNS records at your registrar:
# Type: A, Name: @, Value: 76.76.21.21
# Type: CNAME, Name: www, Value: cname.vercel-dns.com
```

#### **GitHub Pages**

```bash
# 1. Create file: CNAME (no extension)
echo "your-domain.com" > CNAME

# 2. Commit and push
git add CNAME
git commit -m "Add custom domain"
git push

# 3. Update DNS at registrar:
# Type: A, Name: @, Value: 185.199.108.153
# Type: A, Name: @, Value: 185.199.109.153
# Type: A, Name: @, Value: 185.199.110.153
# Type: A, Name: @, Value: 185.199.111.153
# Type: CNAME, Name: www, Value: YOUR_USERNAME.github.io
```

---

## 🔧 Troubleshooting

### **Issue: 404 on Vercel**

**Solution:** Check `vercel.json` routing config

```json
{
  "routes": [
    { "src": "/(.*)", "dest": "/$1" }
  ]
}
```

### **Issue: CSS/JS Not Loading**

**Solution:** Check file paths are relative:

```html
<!-- Correct ✅ -->
<link rel="stylesheet" href="styles.css">
<script src="app.js"></script>

<!-- Incorrect ❌ -->
<link rel="stylesheet" href="/styles.css">
<script src="/app.js"></script>
```

### **Issue: LocalStorage Not Working**

**Solution:** Check browser privacy settings:
- Disable "Block third-party cookies"
- Ensure site not in Incognito/Private mode

### **Issue: Animations Laggy**

**Solution:** Enable hardware acceleration:

```css
* {
    transform: translateZ(0);
    will-change: transform;
}
```

---

## 📊 Deployment Comparison

| Platform | Deploy Time | Cost | Ease | Custom Domain | HTTPS |
|----------|-------------|------|------|---------------|-------|
| **Vercel** | 30s | Free | ⭐⭐⭐⭐⭐ | ✅ Free | ✅ Auto |
| **GitHub Pages** | 2-5min | Free | ⭐⭐⭐⭐ | ✅ Free | ✅ Auto |
| **Netlify** | 60s | Free | ⭐⭐⭐⭐⭐ | ✅ Free | ✅ Auto |
| **Custom Server** | Varies | $5-50/mo | ⭐⭐⭐ | ✅ | ⚙️ Manual |
| **Docker** | 5min | Varies | ⭐⭐ | ✅ | ⚙️ Manual |

**Recommendation:** Use **Vercel** for fastest, easiest deployment with best DX.

---

## 🎯 Next Steps

After deployment:

1. ✅ Test all features
2. ✅ Run Lighthouse audit
3. ✅ Set up custom domain (optional)
4. ✅ Enable analytics (optional)
5. ✅ Share your URL!

---

**Need help?** Open an issue on [GitHub](https://github.com/YOUR_USERNAME/artby-complaints-app/issues)

**Built with 💚 by Aquatic**
