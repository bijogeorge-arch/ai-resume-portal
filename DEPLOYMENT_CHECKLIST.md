# Vercel Deployment Checklist

## ✅ Pre-Deployment Checklist

### Local Testing
- [ ] Project builds successfully (`npm run build`)
- [ ] All features work in development mode
- [ ] Environment variables are set in `.env.local`
- [ ] Database schema is applied in Supabase

### Code Repository
- [ ] Code is pushed to GitHub/GitLab/Bitbucket
- [ ] `.env.local` is in `.gitignore` (not committed)
- [ ] `.env.example` is committed (template for others)
- [ ] README.md is updated

### Supabase Setup
- [ ] Supabase project is created
- [ ] Database schema from `supabase_schema.sql` is applied
- [ ] Storage bucket for resumes is created
- [ ] RLS policies are configured
- [ ] You have your Supabase URL and Anon Key

### Google AI Setup
- [ ] Google AI API key is generated
- [ ] API key has proper permissions
- [ ] You've tested the API key locally

## 🚀 Deployment Steps

### 1. Connect to Vercel
- [ ] Sign up/login at [vercel.com](https://vercel.com)
- [ ] Click "Add New Project"
- [ ] Import your Git repository
- [ ] Select the repository containing your project

### 2. Configure Project
- [ ] Framework preset: Next.js (auto-detected)
- [ ] Root directory: `./` (default)
- [ ] Build command: `npm run build` (auto-filled)
- [ ] Output directory: `.next` (auto-filled)

### 3. Add Environment Variables
Add these in Vercel project settings:

- [ ] `NEXT_PUBLIC_SUPABASE_URL` = `your_supabase_url`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `your_supabase_anon_key`
- [ ] `GEMINI_API_KEY` = `your_gemini_api_key`

**Important:** Add to all environments (Production, Preview, Development)

### 4. Deploy
- [ ] Click "Deploy"
- [ ] Wait for build to complete (2-5 minutes)
- [ ] Check deployment logs for errors

## 🔧 Post-Deployment Configuration

### Update Supabase
- [ ] Go to Supabase Dashboard → Authentication → URL Configuration
- [ ] Add Site URL: `https://your-project.vercel.app`
- [ ] Add Redirect URLs:
  - [ ] `https://your-project.vercel.app/auth/callback`
  - [ ] `https://your-project.vercel.app/**`

### Test Deployment
- [ ] Visit your deployed URL
- [ ] Test signup/login functionality
- [ ] Test resume upload
- [ ] Test AI analysis
- [ ] Test download report feature
- [ ] Check mobile responsiveness

## 🐛 Troubleshooting

### If Build Fails
- [ ] Check build logs in Vercel dashboard
- [ ] Ensure all dependencies are in `package.json`
- [ ] Try building locally: `npm run build`
- [ ] Check for syntax errors

### If Environment Variables Don't Work
- [ ] Verify variable names are exact (case-sensitive)
- [ ] Ensure variables are added to Production environment
- [ ] Redeploy after adding variables
- [ ] Check for typos in variable values

### If Authentication Fails
- [ ] Verify Supabase redirect URLs include Vercel domain
- [ ] Check `NEXT_PUBLIC_SUPABASE_URL` is correct
- [ ] Check `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
- [ ] Clear browser cache and try again

### If AI Analysis Fails
- [ ] Check `GEMINI_API_KEY` is set correctly
- [ ] Verify API key is active in Google AI Studio
- [ ] Check function logs in Vercel dashboard
- [ ] Ensure API has not hit rate limits

## 📝 Optional Enhancements

### Custom Domain
- [ ] Go to Project Settings → Domains
- [ ] Add your custom domain
- [ ] Configure DNS settings
- [ ] Update Supabase redirect URLs with new domain

### Performance Monitoring
- [ ] Enable Vercel Analytics
- [ ] Set up error tracking
- [ ] Monitor function execution times

### Continuous Deployment
- [ ] Automatic deployments on push to main branch (enabled by default)
- [ ] Preview deployments for pull requests (enabled by default)

## 🎉 You're Done!

Your AI Resume Analyzer is now live on Vercel!

**Next Steps:**
- Share your deployment URL
- Monitor usage and performance
- Gather user feedback
- Plan future improvements

---

**Need Help?**
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
