# Quick Start Guide

Get your portfolio up and running in 5 minutes!

## Prerequisites

- Node.js installed (v16+)
- MongoDB Atlas account (free tier works)

## Step 1: Clone & Install

```bash
# Navigate to project directory
cd portfolio

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

## Step 2: Configure Backend

1. Create `server/.env` file:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
FRONTEND_URL=http://localhost:5173
```

2. Get MongoDB connection string:
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Get connection string from "Connect" → "Connect your application"

3. Get Gmail App Password (for contact form):
   - Google Account → Security → 2-Step Verification → App Passwords
   - Generate password for "Mail"

## Step 3: Seed Database

```bash
cd server
npm run seed
```

This populates your database with sample projects, skills, and experience.

## Step 4: Start Development Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
Backend runs on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
Frontend runs on `http://localhost:5173`

## Step 5: Open Browser

Visit `http://localhost:5173` to see your portfolio!

## Customization

### Update Personal Info

1. **Name & Title**: Edit `client/src/components/Hero.jsx`
2. **About Section**: Edit `client/src/components/About.jsx`
3. **Email**: Update in `client/src/components/Contact.jsx` and `client/src/components/Footer.jsx`
4. **Social Links**: Update in `client/src/components/Hero.jsx` and `client/src/components/Footer.jsx`

### Update Content

- **Projects**: Edit `server/seed.js` or use API endpoints
- **Skills**: Edit `server/seed.js`
- **Experience**: Edit `server/seed.js`

### Change Colors

Edit `client/tailwind.config.js` to customize the color scheme.

## Next Steps

- Read the full [README.md](./README.md) for detailed documentation
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment
- Customize the design to match your style
- Add your real projects and experience

## Troubleshooting

**Backend won't start?**
- Check MongoDB connection string in `.env`
- Make sure port 5000 is available

**Frontend won't connect to API?**
- Verify backend is running on port 5000
- Check browser console for errors

**Database connection error?**
- Verify MongoDB Atlas IP whitelist includes your IP
- Check connection string has correct password

---

Happy coding! 🚀

