# 🚀 Vercel Deployment Guide for EcoLearning

## Prerequisites
- Vercel account (sign up at https://vercel.com)
- Vercel CLI installed: `npm install -g vercel`
- MongoDB Atlas account (for database)

---

## 📦 Deployment Steps

### 1. Backend Deployment (Server)

#### Option A: Using Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Add Vercel configuration"
   git push origin main
   ```

2. **Import Project to Vercel**
   - Go to https://vercel.com/dashboard
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select the **server** folder as the root directory
   - Configure:
     - Framework Preset: **Other**
     - Root Directory: **server**
     - Build Command: (leave empty)
     - Output Directory: (leave empty)
     - Install Command: `npm install`

3. **Add Environment Variables**
   In Vercel Dashboard → Project Settings → Environment Variables, add:
   
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   
   # Add any other API keys from your .env file:
   GEMINI_API_KEY=your_gemini_key
   FAL_KEY=your_fal_key
   REPLICATE_API_TOKEN=your_replicate_token
   # ... etc
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Copy your backend URL (e.g., `https://your-backend.vercel.app`)

#### Option B: Using Vercel CLI

```bash
cd server
vercel login
vercel --prod

# Follow prompts and add environment variables when asked
```

---

### 2. Frontend Deployment (Client)

#### Option A: Using Vercel Dashboard (Recommended)

1. **Update API URL in Frontend**
   - Before deploying, update the API URL in your client code
   - Edit `client/.env.production` (create if doesn't exist):
   
   ```
   VITE_API_URL=https://your-backend.vercel.app/api
   ```

2. **Import Project to Vercel**
   - Go to https://vercel.com/dashboard
   - Click "Add New" → "Project"
   - Import the **same GitHub repository**
   - Select the **client** folder as the root directory
   - Configure:
     - Framework Preset: **Vite**
     - Root Directory: **client**
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`

3. **Add Environment Variables**
   In Vercel Dashboard → Project Settings → Environment Variables:
   
   ```
   VITE_API_URL=https://your-backend.vercel.app/api
   VITE_GEMINI_API_KEY=your_gemini_key (if needed in frontend)
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your frontend will be live at `https://your-project.vercel.app`

#### Option B: Using Vercel CLI

```bash
cd client
vercel login
vercel --prod

# Follow prompts
```

---

## 🔧 Configuration Files Created

### Backend (`server/vercel.json`)
- Configures Node.js runtime
- Sets up routing for API endpoints
- Handles static file serving

### Frontend (`client/vercel.json`)
- Configures Vite build
- Sets output directory
- Enables SPA routing

---

## ⚙️ Environment Variables Needed

### Backend Environment Variables:
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecolearning
JWT_SECRET=your-super-secret-jwt-key-min-32-chars

# API Keys (copy from your current .env)
GEMINI_API_KEY=
FAL_KEY=
REPLICATE_API_TOKEN=
```

### Frontend Environment Variables:
```env
VITE_API_URL=https://your-backend.vercel.app/api
```

---

## 🗄️ Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Create a free cluster

2. **Whitelist Vercel IPs**
   - In MongoDB Atlas → Network Access
   - Add IP: `0.0.0.0/0` (allow all - Vercel uses dynamic IPs)
   - Or use MongoDB Atlas's built-in Vercel integration

3. **Get Connection String**
   - Go to Clusters → Connect
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database password
   - Use this as `MONGODB_URI` in Vercel

---

## 🔗 Connecting Frontend to Backend

After both are deployed:

1. **Update Frontend Environment Variable**
   ```
   VITE_API_URL=https://your-backend-name.vercel.app/api
   ```

2. **Redeploy Frontend** (or it will auto-redeploy with new env vars)

3. **Test the Connection**
   - Visit your frontend URL
   - Try logging in or making API calls
   - Check browser console for errors

---

## 🚨 Common Issues & Solutions

### Issue 1: CORS Errors
**Solution:** Ensure backend CORS is configured for your frontend domain:

```javascript
// In server.js
app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

### Issue 2: 404 on Routes
**Solution:** Vercel.json is already configured for SPA routing

### Issue 3: Environment Variables Not Working
**Solution:** 
- Ensure variables are added in Vercel Dashboard
- Redeploy after adding variables
- Check variable names match exactly (case-sensitive)

### Issue 4: Build Fails
**Solution:**
- Check build logs in Vercel Dashboard
- Ensure all dependencies are in package.json
- Test build locally: `npm run build`

### Issue 5: API Calls Fail
**Solution:**
- Verify `VITE_API_URL` is correct
- Check backend is deployed and running
- Test backend endpoint directly in browser

### Issue 6: File Uploads Don't Work
**Solution:** Vercel serverless functions have limitations
- Consider using cloud storage (AWS S3, Cloudinary, etc.)
- Or use Vercel Blob Storage: https://vercel.com/docs/storage/vercel-blob

---

## 📝 Quick Deployment Checklist

### Before Deployment:
- [ ] All code committed to GitHub
- [ ] `.env` files not committed (in .gitignore)
- [ ] MongoDB Atlas cluster created
- [ ] All API keys ready

### Backend Deployment:
- [ ] Import to Vercel
- [ ] Set root directory to `server`
- [ ] Add all environment variables
- [ ] Deploy and test API endpoints
- [ ] Copy backend URL

### Frontend Deployment:
- [ ] Create `.env.production` with backend URL
- [ ] Import to Vercel
- [ ] Set root directory to `client`
- [ ] Add environment variables
- [ ] Deploy and test

### Post-Deployment:
- [ ] Test login/register
- [ ] Test API calls
- [ ] Check console for errors
- [ ] Test file uploads (if any)
- [ ] Update README with live URLs

---

## 🔄 Continuous Deployment

Both projects are now configured for **automatic deployment**:
- Push to `main` branch → Auto-deploys to production
- Push to other branches → Creates preview deployments
- Can configure custom domains in Vercel Dashboard

---

## 📊 Monitoring

- View logs in Vercel Dashboard → Deployments → Function Logs
- Monitor performance and errors
- Set up email notifications for deployment status

---

## 🌐 Custom Domain (Optional)

1. Go to Vercel Dashboard → Project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate to provision

---

## 💡 Tips

1. **Use Environment-Specific URLs**
   - Development: `http://localhost:5000`
   - Production: `https://your-backend.vercel.app`

2. **Test Locally Before Deploying**
   ```bash
   cd client
   npm run build
   npm run preview
   ```

3. **Check Build Logs**
   - Vercel provides detailed logs for debugging
   - Access via Dashboard → Deployments → [Specific Deployment]

4. **Use Vercel CLI for Quick Updates**
   ```bash
   vercel --prod
   ```

---

## 📞 Support

- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/

---

**Your EcoLearning platform is now production-ready! 🎉**

Live URLs:
- Frontend: `https://your-project.vercel.app`
- Backend: `https://your-backend.vercel.app`
