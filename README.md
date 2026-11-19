# PortfolioHub

A full-stack portfolio management system built with the MERN stack, fully configured for seamless deployment on **Vercel**.

## Features

- User registration and login
- JWT authentication
- Project CRUD operations
- Public portfolio view
- Responsive UI built with React, Vite & Tailwind CSS
- Express API configured for Vercel Serverless Functions

## Local Development

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas or local MongoDB instance

### 1. Backend Setup
```bash
cd backend
npm install
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and proxies `/api` calls to the backend on `http://localhost:5000`.

---

## Deployment on Vercel

This repository is configured to deploy both frontend and backend seamlessly on **Vercel** out-of-the-box.

### Option 1: Full-Stack Deployment (Recommended)
1. Import the repository into your [Vercel Dashboard](https://vercel.com/new).
2. Leave the **Root Directory** as `./` (default).
3. Under **Environment Variables**, add:
   - `MONGODB_URI`: your MongoDB Atlas connection string
   - `MONGO_URI`: your MongoDB Atlas connection string
   - `JWT_SECRET`: a secure random secret key
   - `NODE_ENV`: `production`
4. Click **Deploy**. Vercel will build the frontend and serve API routes via `/api/index.js`.

### Option 2: Deploy Frontend Only
1. Import repository on Vercel and set **Root Directory** to `frontend`.
2. Add environment variable:
   - `VITE_API_BASE_URL`: URL to your external backend (if hosted separately)
3. Deploy!

---

## Environment Variables Reference

| Variable | Description |
| :--- | :--- |
| `MONGODB_URI` / `MONGO_URI` | MongoDB Atlas connection string |
| `PORT` | Local backend port (default: 5000) |
| `JWT_SECRET` | Secret key for signing JWT tokens |
| `JWT_EXPIRE` | JWT expiration duration (e.g., `7d`) |
| `CLIENT_URL` | Allowed frontend URL for CORS |
| `VITE_API_BASE_URL` | Frontend API base URL (default: `/api`) |
