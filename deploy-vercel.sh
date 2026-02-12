#!/bin/bash

# ============================================
# DEPLOY TO VERCEL - Automated Script
# ============================================

echo "⚡ Artby Complaints App - Vercel Deploy Script"
echo "=============================================="
echo ""

# Check if vercel is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Vercel CLI not found. Installing..."
    npm install -g vercel
    
    if [ $? -ne 0 ]; then
        echo "❌ Error: Failed to install Vercel CLI"
        echo "Install manually: npm install -g vercel"
        exit 1
    fi
    
    echo "✅ Vercel CLI installed"
fi

echo ""
echo "=============================================="
echo "🚀 Deploying to Vercel"
echo "=============================================="
echo ""

# Login to Vercel
echo "🔐 Logging into Vercel..."
echo "⚠️  A browser window will open for authentication"
echo ""
vercel login

if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to login to Vercel"
    exit 1
fi

echo ""
echo "✅ Logged in successfully"
echo ""

# Deploy to production
echo "🚀 Deploying to production..."
echo ""
vercel --prod

if [ $? -eq 0 ]; then
    echo ""
    echo "=============================================="
    echo "🎉 SUCCESS! Your app is LIVE!"
    echo "=============================================="
    echo ""
    echo "Your app is now deployed to Vercel!"
    echo ""
    echo "📍 Next Steps:"
    echo "   1. Visit your Vercel dashboard"
    echo "   2. Copy your production URL"
    echo "   3. Test all features"
    echo "   4. Share your URL!"
    echo ""
    echo "🔗 Vercel Dashboard:"
    echo "   https://vercel.com/dashboard"
    echo ""
    echo "=============================================="
else
    echo ""
    echo "=============================================="
    echo "❌ Deployment Failed"
    echo "=============================================="
    echo ""
    echo "Common fixes:"
    echo "1. Check internet connection"
    echo "2. Verify vercel.json is present"
    echo "3. Check build logs in Vercel dashboard"
    echo ""
    echo "Manual deployment:"
    echo "   vercel --prod"
    echo ""
    echo "Or use Vercel dashboard:"
    echo "   https://vercel.com/new"
    echo ""
fi
