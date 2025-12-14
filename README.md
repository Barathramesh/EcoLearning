# 🌱 EcoLearning - Environmental Education Platform

An interactive learning platform focused on environmental education with gamified lessons, real-world assignments, AI-powered grading, and student progress tracking.

## 🌐 Live Deployment

- **Frontend:** [Coming Soon - Deploy to Vercel]
- **Backend API:** [Coming Soon - Deploy to Vercel]

See [QUICK_DEPLOY.md](QUICK_DEPLOY.md) for deployment instructions.

## 📁 Project Structure

```
EcoLearning/
├── client/               # React + Vite frontend
│   ├── src/
│   │   ├── pages/       # Page components
│   │   ├── components/  # Reusable components
│   │   ├── data/        # Predefined assignment templates
│   │   ├── services/    # API services
│   │   └── ...
│   ├── vercel.json      # Vercel frontend config
│   └── package.json
│
├── server/              # Node.js + Express API
│   ├── controllers/     # Request handlers
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── server.js        # Entry point
│   ├── vercel.json      # Vercel backend config
## 🚀 Quick Start

### Local Development

#### Backend Setup

```bash
cd server
npm install

# Copy environment template and fill in your values
cp .env.example .env

# Start development server
npm run dev
```

The backend will run on `http://localhost:5000`

#### Frontend Setup

```bash
cd client
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Start development server
npm run dev
```

The frontend will run on `http://localhost:3000`

### 🌐 Vercel Deployment

Deploy both frontend and backend to Vercel in minutes:

```bash
# See detailed instructions
cat QUICK_DEPLOY.md

# Or follow the comprehensive guide
cat VERCEL_DEPLOYMENT_GUIDE.md
```

**Quick Deploy Steps:**
1. Push code to GitHub
2. Deploy backend to Vercel (root: `server`)
3. Deploy frontend to Vercel (root: `client`)
4. Configure environment variables
5. Done! 🎉

See [QUICK_DEPLOY.md](QUICK_DEPLOY.md) for step-by-step instructions.

```bash
cd Backend
npm install
npm run dev
```

The backend will run on `http://localhost:5000`