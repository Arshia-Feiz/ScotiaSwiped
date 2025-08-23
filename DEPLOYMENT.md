# Deploying ScotiaSwipe to Vercel

This guide will help you deploy your ScotiaSwipe app to Vercel for free hosting and automatic deployments.

## Prerequisites

- A GitHub account
- Your ScotiaSwipe code pushed to a GitHub repository
- A Vercel account (free)

## Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Push to GitHub

1. Initialize git (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: ScotiaSwipe app"
   ```

2. Create a new repository on GitHub and push your code:
   ```bash
   git remote add origin https://github.com/yourusername/scotia-swiped.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect it's a Next.js project
5. Click "Deploy"

### Step 3: Configure (Optional)

- **Project Name**: `scotia-swipe` (or your preferred name)
- **Framework Preset**: Next.js (auto-detected)
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm i -g vercel
```

### Step 2: Deploy

```bash
# Navigate to your project directory
cd ScotiaSwiped

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? [your-account]
# - Link to existing project? N
# - What's your project's name? scotia-swipe
# - In which directory is your code located? ./
# - Want to override the settings? N
```

### Step 3: Production Deploy

```bash
vercel --prod
```

## Environment Variables

For this demo app, no environment variables are required. However, if you add features that need API keys or other secrets:

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add your variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-api.com
   DATABASE_URL=your-database-url
   ```

## Custom Domain (Optional)

1. In your Vercel dashboard, go to Settings → Domains
2. Add your custom domain
3. Follow the DNS configuration instructions

## Automatic Deployments

Once deployed, Vercel will automatically:
- Deploy on every push to the `main` branch
- Create preview deployments for pull requests
- Optimize your Next.js app for production

## Performance Optimization

Vercel automatically optimizes your Next.js app:
- ✅ Automatic image optimization
- ✅ Code splitting
- ✅ Static generation where possible
- ✅ Edge functions support
- ✅ Global CDN

## Monitoring

Your Vercel dashboard provides:
- Deployment status
- Performance metrics
- Error tracking
- Analytics (with Vercel Analytics)

## Troubleshooting

### Build Errors

If you encounter build errors:

1. Check the build logs in Vercel dashboard
2. Test locally first: `npm run build`
3. Ensure all dependencies are in `package.json`

### Common Issues

- **Port 3000 already in use**: Vercel handles this automatically
- **Missing dependencies**: Make sure all imports are installed
- **TypeScript errors**: Fix any type errors before deploying

## Next Steps

After successful deployment:

1. **Test your app**: Visit your Vercel URL
2. **Share your app**: Use the provided URL to share with others
3. **Monitor performance**: Check Vercel analytics
4. **Set up custom domain**: Add your own domain if desired

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

---

Your ScotiaSwipe app should now be live on Vercel! 🚀
