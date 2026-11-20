# PortfolioHub

A full-stack portfolio management system built with the MERN stack, configured for deployment on **Render**.

## Features

- User registration and login
- JWT authentication
- Project CRUD operations
- Public portfolio view
- Responsive UI built with React, Vite & Tailwind CSS
- Express REST API with MongoDB Atlas integration

## Local Development

### 1. Backend Setup
```bash
cd backend
npm install
npm run dev
```
Backend runs on `http://localhost:5000`.

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173` and proxies requests to `http://localhost:5000`.

---

## Production Deployment on Render

This repository includes a `render.yaml` file (Render Blueprint) to automatically deploy both the backend Web Service and the frontend Static Site.

### Method 1: Using Blueprint (`render.yaml`) - Recommended
1. Log in to [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** and select **Blueprint**.
3. Connect your GitHub repository: `shahzad11khan/portfolio`.
4. Render will detect `render.yaml` and configure both services:
   - **Backend Web Service**: `portfolio-management-system-backend`
   - **Frontend Static Site**: `portfolio-management-system-frontend`
5. Click **Apply** to deploy both services automatically.

### Method 2: Manual Setup on Render

#### 1. Backend Web Service
1. In Render, click **New +** > **Web Service**.
2. Connect your repo and configure:
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
3. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: your MongoDB Atlas connection string
   - `MONGO_URI`: your MongoDB Atlas connection string
   - `JWT_SECRET`: your secret key
   - `CLIENT_URL`: URL of your frontend static site on Render

#### 2. Frontend Static Site
1. In Render, click **New +** > **Static Site**.
2. Connect your repo and configure:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
3. Add Environment Variables:
   - `VITE_API_BASE_URL`: `https://<your-backend-service-name>.onrender.com/api`
   - `VITE_API_URL`: `https://<your-backend-service-name>.onrender.com/api`
4. Add Rewrite Rule:
   - **Source**: `/*`
   - **Destination**: `/index.html`
