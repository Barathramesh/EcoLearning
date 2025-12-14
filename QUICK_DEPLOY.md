# 🚀 Quick Start - Vercel Deployment

## Step 1: Prepare Your Code

```bash
# Make sure you're in the project root
cd EcoLearning

# Commit all changes
git add .
git commit -m "Add Vercel deployment configuration"
git push origin main
```

## Step 2: Deploy Backend First

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository
4. **Important Settings:**
   - Root Directory: **`server`**
   - Framework Preset: **Other**
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
   - Install Command: `npm install`

5. **Add Environment Variables** (click "Environment Variables"):
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   GEMINI_API_KEY=your_key
   FAL_KEY=your_key
   REPLICATE_API_TOKEN=your_token
   ```

6. Click **Deploy** and wait

7. **Copy your backend URL**: `https://your-backend-xxxxx.vercel.app`

## Step 3: Deploy Frontend

1. In Vercel Dashboard, click **"Add New"** → **"Project"**
2. Import the **same** GitHub repository
3. **Important Settings:**
   - Root Directory: **`client`**
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Add Environment Variable**:
   ```
   VITE_API_URL=https://your-backend-xxxxx.vercel.app/api
   ```
   (Use the backend URL from Step 2)

5. Click **Deploy** and wait

6. **Your app is live!** 🎉

## Step 4: Test Your Deployment

1. Visit your frontend URL: `https://your-frontend-xxxxx.vercel.app`
2. Try logging in/registering
3. Test API functionality
4. Check browser console for any errors

## 🔧 If Something Goes Wrong

### Backend Issues:
- Check Function Logs in Vercel Dashboard
- Verify all environment variables are set
- Test API directly: `https://your-backend.vercel.app/api/health`

### Frontend Issues:
- Verify `VITE_API_URL` is correct
- Check browser console for errors
- Ensure backend is deployed first

### Database Issues:
- Make sure MongoDB Atlas is accessible
- Whitelist IP `0.0.0.0/0` in Network Access
- Test connection string locally first

## 📱 Alternative: Deploy via CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy backend
cd server
vercel login
vercel --prod

# Deploy frontend
cd ../client
vercel --prod
```

## 🎯 What's Next?

- Set up custom domain (optional)
- Configure automatic deployments from GitHub
- Monitor your app in Vercel Dashboard
- Check analytics and logs

---

**Need more details?** See `VERCEL_DEPLOYMENT_GUIDE.md` for comprehensive instructions.
