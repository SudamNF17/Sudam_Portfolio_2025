# Deployment Guide

This guide provides step-by-step instructions for deploying the portfolio website to production.

## Prerequisites

- GitHub account
- MongoDB Atlas account
- Vercel/Netlify account (for frontend)
- Render account (for backend)
- Gmail account (for email notifications)

## Step 1: MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or sign in
3. Create a new cluster (choose the free tier)
4. Create a database user:
   - Go to Database Access
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Save the username and password
5. Whitelist IP addresses:
   - Go to Network Access
   - Click "Add IP Address"
   - For development: Add your current IP
   - For production: Add `0.0.0.0/0` (allows all IPs)
6. Get your connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `portfolio` (or your preferred name)

## Step 2: Backend Deployment (Render)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Create a new Web Service on Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure the service**
   - **Name**: portfolio-backend (or your preferred name)
   - **Environment**: Node
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Root Directory**: Leave empty (or set to `server` if you want)

4. **Add Environment Variables**
   Click "Add Environment Variable" and add:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-gmail-app-password
   FRONTEND_URL=https://your-frontend-url.vercel.app
   NODE_ENV=production
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Copy your backend URL (e.g., `https://portfolio-backend.onrender.com`)

## Step 3: Gmail App Password Setup

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Enable 2-Step Verification (if not already enabled)
3. Go to "App Passwords"
4. Generate a new app password for "Mail"
5. Copy the 16-character password
6. Use this as your `EMAIL_PASS` in environment variables

## Step 4: Frontend Deployment (Vercel)

### Option A: Using Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   cd client
   vercel
   ```

3. **Follow the prompts**
   - Link to existing project or create new
   - Set root directory: `client`
   - Build command: `npm run build`
   - Output directory: `dist`

4. **Add Environment Variable**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-backend-url.onrender.com/api`

5. **Redeploy** to apply environment variables

### Option B: Using Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository
4. **Configure Project**:
   - Framework Preset: Vite
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. **Add Environment Variable**:
   - `VITE_API_URL` = `https://your-backend-url.onrender.com/api`
6. Click "Deploy"

## Step 5: Frontend Deployment (Netlify - Alternative)

1. **Build the project locally**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [Netlify](https://app.netlify.com)
   - Drag and drop the `client/dist` folder
   - Or connect your GitHub repository

3. **Configure Build Settings** (if using Git)
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `client/dist`

4. **Add Environment Variable**
   - Go to Site Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-backend-url.onrender.com/api`

5. **Redeploy** to apply changes

## Step 6: Seed the Database

1. **Option A: Using Render Shell**
   - Go to your Render service
   - Click "Shell"
   - Run: `cd server && npm run seed`

2. **Option B: Local seeding**
   - Update `.env` with production MongoDB URI
   - Run: `cd server && npm run seed`

## Step 7: Update CORS Settings

Make sure your backend `FRONTEND_URL` environment variable matches your deployed frontend URL:

```
FRONTEND_URL=https://your-portfolio.vercel.app
```

## Step 8: Test Your Deployment

1. Visit your frontend URL
2. Test the contact form
3. Verify projects are loading
4. Check skills and experience sections
5. Test all navigation links

## Troubleshooting

### Backend Issues

- **503 Service Unavailable**: Render free tier spins down after inactivity. First request may take 30-60 seconds.
- **MongoDB Connection Error**: Verify connection string and IP whitelist
- **CORS Errors**: Check `FRONTEND_URL` matches your frontend domain exactly

### Frontend Issues

- **API Not Working**: Verify `VITE_API_URL` is set correctly
- **Build Errors**: Check build logs in Vercel/Netlify dashboard
- **Environment Variables**: Make sure to redeploy after adding env vars

### Email Issues

- **Emails Not Sending**: Verify Gmail app password is correct
- **Check Render Logs**: View logs in Render dashboard for error messages

## Post-Deployment Checklist

- [ ] Backend is accessible and health check works
- [ ] Frontend loads correctly
- [ ] Projects are displayed
- [ ] Skills and experience sections work
- [ ] Contact form sends emails
- [ ] All links work correctly
- [ ] Mobile responsive design works
- [ ] Dark mode toggle works
- [ ] Social media links are updated

## Custom Domain (Optional)

### Vercel Custom Domain
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### Render Custom Domain
1. Go to your service → Settings → Custom Domains
2. Add your domain
3. Update DNS records as instructed

## Monitoring

- **Render**: Check logs in dashboard
- **Vercel**: View analytics and logs in dashboard
- **MongoDB Atlas**: Monitor database usage and performance

---

**Note**: Render's free tier may spin down after 15 minutes of inactivity. Consider upgrading for production use or use a service like Railway, Fly.io, or Heroku for better uptime.

