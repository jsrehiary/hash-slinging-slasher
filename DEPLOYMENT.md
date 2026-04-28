# Vercel Deployment Guide

## Prerequisites
- Vercel CLI: `npm install -g vercel`
- GitHub account (for easy deployment)

## Option 1: Deploy via Git (Recommended)

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Ready for Vercel deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/cek_peminjaman.git
git push -u origin main
```

2. Go to [https://vercel.com](https://vercel.com) and:
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect the Node.js setup
   - Click "Deploy"

## Option 2: Deploy via CLI

1. Login to Vercel:
```bash
vercel login
```

2. Deploy:
```bash
vercel
```

## Environment Variables

If you need environment variables in production, add them in Vercel dashboard:
- Project Settings → Environment Variables
- Add `PORT`, `NODE_ENV`, etc. as needed

## Testing Deployment

After deployment, your app will be available at:
- `https://your-project-name.vercel.app`

The frontend will automatically use the correct API endpoint.

## Local Development

- `npm run dev` - Runs both backend (port 3000) and frontend (port 5500)
- `npm run dev:backend` - Backend only
- `npm run dev:frontend` - Frontend only

## Important Notes

- The `vercel.json` configures routing and build settings
- Frontend is served statically from the Express backend
- CORS is configured for both localhost and production URLs
- API endpoints are automatically adjusted based on environment
