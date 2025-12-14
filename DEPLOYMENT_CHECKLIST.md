# ✅ Vercel Deployment Checklist

## 📋 Pre-Deployment

- [ ] All code committed and pushed to GitHub
- [ ] MongoDB Atlas account created
- [ ] MongoDB cluster created and accessible
- [ ] Database user created with password
- [ ] Network Access allows `0.0.0.0/0` (or Vercel IPs)
- [ ] Connection string copied from MongoDB Atlas
- [ ] All API keys available (Gemini, FAL, Replicate, etc.)
- [ ] Vercel account created at https://vercel.com

## 🔧 Configuration Files Created

- [x] `server/vercel.json` - Backend deployment config
- [x] `client/vercel.json` - Frontend deployment config
- [x] `server/.vercelignore` - Backend ignore rules
- [x] `client/.vercelignore` - Frontend ignore rules
- [x] `server/.env.example` - Backend env template
- [x] `client/.env.example` - Frontend env template
- [x] `client/.env.production` - Production frontend config

## 🚀 Backend Deployment Steps

1. **Import to Vercel**
   - [ ] Go to Vercel Dashboard → Add New → Project
   - [ ] Select GitHub repository
   - [ ] Set Root Directory: `server`
   - [ ] Framework: Other
   - [ ] Build Command: (empty)
   - [ ] Output Directory: (empty)
   - [ ] Install Command: `npm install`

2. **Environment Variables**
   Add these in Vercel Dashboard → Environment Variables:
   - [ ] `PORT` = `5000`
   - [ ] `NODE_ENV` = `production`
   - [ ] `MONGODB_URI` = your MongoDB connection string
   - [ ] `JWT_SECRET` = your JWT secret (32+ characters)
   - [ ] `GEMINI_API_KEY` = your key
   - [ ] `FAL_KEY` = your key
   - [ ] `REPLICATE_API_TOKEN` = your token
   - [ ] (Any other API keys from your .env file)

3. **Deploy**
   - [ ] Click Deploy
   - [ ] Wait for deployment to complete (2-5 minutes)
   - [ ] Check deployment logs for errors
   - [ ] Copy backend URL: `https://[your-backend].vercel.app`
   - [ ] Test API: Visit `https://[your-backend].vercel.app` in browser

## 🎨 Frontend Deployment Steps

1. **Update API URL**
   - [ ] Edit `client/.env.production`
   - [ ] Set `VITE_API_URL` to your backend URL + `/api`
   - [ ] Example: `https://your-backend.vercel.app/api`
   - [ ] Commit and push changes

2. **Import to Vercel**
   - [ ] Go to Vercel Dashboard → Add New → Project
   - [ ] Select SAME GitHub repository
   - [ ] Set Root Directory: `client`
   - [ ] Framework: Vite
   - [ ] Build Command: `npm run build`
   - [ ] Output Directory: `dist`
   - [ ] Install Command: `npm install`

3. **Environment Variables**
   - [ ] `VITE_API_URL` = `https://[your-backend].vercel.app/api`

4. **Deploy**
   - [ ] Click Deploy
   - [ ] Wait for deployment to complete (2-5 minutes)
   - [ ] Copy frontend URL: `https://[your-frontend].vercel.app`

## ✅ Post-Deployment Testing

### Backend Tests
- [ ] Visit backend URL in browser (should see "API is Working")
- [ ] Test health endpoint: `https://[backend].vercel.app/api/health` (if exists)
- [ ] Check Function Logs in Vercel Dashboard for errors

### Frontend Tests
- [ ] Visit frontend URL
- [ ] Check browser console (F12) for errors
- [ ] Test registration (create new account)
- [ ] Test login (use test account)
- [ ] Test API calls (create class, assignment, etc.)
- [ ] Test file uploads (if applicable)
- [ ] Test navigation between pages
- [ ] Test student and teacher dashboards

### Integration Tests
- [ ] API calls work from frontend
- [ ] No CORS errors in console
- [ ] Database operations work (CRUD)
- [ ] Authentication works correctly
- [ ] Sessions persist correctly

## 🐛 Troubleshooting

### If Backend Fails
- [ ] Check build logs in Vercel Dashboard
- [ ] Verify all environment variables are set
- [ ] Check MongoDB connection string format
- [ ] Verify MongoDB network access allows Vercel
- [ ] Check Function Logs for runtime errors

### If Frontend Fails
- [ ] Check build logs
- [ ] Verify `VITE_API_URL` is correct
- [ ] Test build locally: `npm run build`
- [ ] Check for missing dependencies in package.json

### If API Calls Fail
- [ ] Verify backend is deployed and running
- [ ] Check `VITE_API_URL` matches backend URL exactly
- [ ] Add `/api` at the end of backend URL
- [ ] Check browser console for CORS errors
- [ ] Verify network tab in DevTools

## 📝 URLs to Save

```
Backend URL: https://__________________________.vercel.app
Frontend URL: https://__________________________.vercel.app
MongoDB URI: mongodb+srv://________________________________

Git Repository: https://github.com/_________________________
```

## 🔄 Continuous Deployment

- [ ] Automatic deployments enabled (default for GitHub)
- [ ] Push to main branch auto-deploys
- [ ] Pull requests create preview deployments
- [ ] Deployment notifications configured (optional)

## 🌐 Optional: Custom Domain

- [ ] Purchase domain (if needed)
- [ ] Add domain in Vercel → Project → Settings → Domains
- [ ] Update DNS records as instructed
- [ ] Wait for SSL certificate (automatic)
- [ ] Update CORS if needed for custom domain

## 📊 Monitoring

- [ ] Check deployment status regularly
- [ ] Monitor Function Logs for errors
- [ ] Set up error tracking (optional - Sentry, etc.)
- [ ] Monitor MongoDB usage in Atlas
- [ ] Check Vercel Analytics (optional)

## 🎉 Final Steps

- [ ] Share URLs with team/users
- [ ] Update README.md with live URLs
- [ ] Document any API changes
- [ ] Create user guide (optional)
- [ ] Backup environment variables securely
- [ ] Celebrate! 🎊

---

## 📞 Support Resources

- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- MongoDB Atlas: https://docs.atlas.mongodb.com/
- Your deployment guide: `VERCEL_DEPLOYMENT_GUIDE.md`
- Quick start: `QUICK_DEPLOY.md`

---

**Deployment Date:** _______________
**Deployed By:** _______________
**Notes:** _______________________________________________
