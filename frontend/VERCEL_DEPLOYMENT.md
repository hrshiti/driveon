# Vercel Deployment Guide for DriveOn Frontend

## Prerequisites
- Vercel account (sign up at https://vercel.com)
- GitHub/GitLab/Bitbucket repository with your code
- Backend API URL (for production)

## Quick Deployment Steps

### 1. Connect Repository to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your Git repository
4. Select the `frontend` folder as the root directory (if your repo has both frontend and backend)

### 2. Configure Project Settings
Vercel will auto-detect Vite, but verify these settings:

- **Framework Preset**: Vite
- **Root Directory**: `frontend` (if monorepo) or `.` (if frontend is root)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `dist` (default for Vite)
- **Install Command**: `npm install` (default)

### 3. Environment Variables
Add these environment variables in Vercel Dashboard:

1. Go to Project Settings → Environment Variables
2. Add the following:

```
VITE_API_BASE_URL=https://your-backend-api.com/api
```

**Important**: 
- Replace `https://your-backend-api.com/api` with your actual backend API URL
- For production, use your deployed backend URL
- For preview deployments, you can use different URLs

### 4. Deploy
1. Click "Deploy" button
2. Vercel will automatically:
   - Install dependencies
   - Run build command
   - Deploy to production

## Configuration Files

### `vercel.json`
This file is already configured with:
- ✅ SPA routing (all routes redirect to index.html)
- ✅ Static asset caching
- ✅ Build and output directory settings

### `.vercelignore`
Files/folders excluded from deployment:
- `node_modules`
- `.env` files
- Log files
- Build artifacts

## Post-Deployment

### 1. Verify Deployment
- Check if the site loads correctly
- Test all routes (especially client-side routes)
- Verify API calls are working

### 2. Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### 3. Environment Variables for Different Environments
You can set different environment variables for:
- **Production**: Main deployment
- **Preview**: Pull request previews
- **Development**: Local development

## Troubleshooting

### Issue: Routes not working (404 errors)
**Solution**: The `vercel.json` file already has rewrites configured. If still not working:
- Check if `vercel.json` is in the root of your frontend folder
- Verify the rewrite rule is correct

### Issue: API calls failing
**Solution**: 
- Check `VITE_API_BASE_URL` environment variable is set correctly
- Verify CORS is enabled on your backend
- Check browser console for errors

### Issue: Build fails
**Solution**:
- Check build logs in Vercel dashboard
- Verify all dependencies are in `package.json`
- Check for TypeScript/ESLint errors

### Issue: Assets not loading
**Solution**:
- Check if assets are in `public` folder
- Verify asset paths in code use relative paths
- Check browser console for 404 errors

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `https://api.driveon.com/api` |

**Note**: All Vite environment variables must start with `VITE_` to be accessible in the browser.

## Build Optimization

The current configuration includes:
- ✅ Code splitting (lazy loading)
- ✅ Asset optimization
- ✅ Static asset caching
- ✅ Production build optimizations

## Monitoring

After deployment, monitor:
- Build logs
- Function logs (if using serverless functions)
- Analytics (if enabled)
- Error tracking

## Support

For issues:
1. Check Vercel documentation: https://vercel.com/docs
2. Check build logs in Vercel dashboard
3. Verify environment variables are set correctly

