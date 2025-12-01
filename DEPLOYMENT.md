# Vercel Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Your environment variables ready

## Quick Deployment Steps

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit - Ready for Vercel deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### 2. Deploy to Vercel

#### Option A: Via Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Add environment variables (see below)
6. Click **"Deploy"**

#### Option B: Via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

### 3. Configure Environment Variables

In Vercel Dashboard → Your Project → Settings → Environment Variables, add:

| Variable Name | Value | Where to Get It |
|--------------|-------|-----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Supabase Dashboard → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key | Supabase Dashboard → Project Settings → API |
| `GEMINI_API_KEY` | Your Google AI API key | [Google AI Studio](https://aistudio.google.com/app/apikey) |

**Important:** Make sure to add these for all environments (Production, Preview, Development)

### 4. Redeploy
After adding environment variables, trigger a new deployment:
- Go to Deployments tab
- Click the three dots on the latest deployment
- Click "Redeploy"

## Post-Deployment

### Update Supabase Redirect URLs
1. Go to Supabase Dashboard → Authentication → URL Configuration
2. Add your Vercel deployment URL to:
   - Site URL: `https://your-project.vercel.app`
   - Redirect URLs: 
     - `https://your-project.vercel.app/auth/callback`
     - `https://your-project.vercel.app/**` (for wildcards)

### Test Your Deployment
1. Visit your deployed URL
2. Test authentication (signup/login)
3. Test resume upload and analysis
4. Check that all features work

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Run `npm run build` locally to test

### Environment Variables Not Working
- Ensure variables are added to all environments
- Redeploy after adding variables
- Check variable names match exactly (case-sensitive)

### Authentication Issues
- Verify Supabase redirect URLs include your Vercel domain
- Check that `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct

### API Routes Failing
- Check function logs in Vercel dashboard
- Ensure `GEMINI_API_KEY` is set correctly
- Verify API route paths are correct

## Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update Supabase redirect URLs with new domain

## Automatic Deployments
Every push to your `main` branch will automatically deploy to production!
- Push to other branches creates preview deployments
- Pull requests get unique preview URLs

## Useful Commands
```bash
# Check deployment status
vercel ls

# View logs
vercel logs

# Pull environment variables locally
vercel env pull
```

## Support
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Supabase + Vercel Guide](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)
