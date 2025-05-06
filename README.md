# 💼 iJob 

Welcome to **iJob**, a full-stack job posting platform built with the **MERN stack**, styled using **Tailwind CSS** and **shadcn/ui**, with support for image uploads via **Cloudinary**, and admin tools to manage job posts and view applicants.

## 📋 Prerequisites

Make sure you have the following installed:
- ✅ Node.js (Recommended: v18+)
- ✅ MongoDB (MongoDB Atlas or local)
- ✅ npm or yarn
- ✅ Cloudinary account

## 🔧 Environment Setup

Create a `.env` file at the root of your **server** folder and include the following:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
SECRET_KEY=your_jwt_secret_key
CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

> 🔐 **Important:** Never expose your .env file or secrets in public repositories

## 📦 Installing Dependencies

Install all dependencies for both backend and frontend:

```bash
# Backend
cd server
npm install

# Frontend
cd client
npm install
```

If you run into peer dependency issues, use:

```bash
npm install --legacy-peer-deps
```

## 🧪 Running in Development Mode

Start the backend and frontend development servers:

```bash
# Backend
cd server
npm run dev

# Frontend
cd client
npm run dev
```

Access the app at: [http://localhost:3000](http://localhost:3000)

## 🏗️ Production Build

To build the frontend for production:

```bash
cd client
npm run build
```

## ❤️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite |
| Styling | Tailwind CSS + shadcn/ui |
| Backend | Node.js + Express |
| Database | MongoDB Atlas |
| ORM | Mongoose |
| Media Upload | Cloudinary |
| Auth | JWT (via SECRET_KEY) |

## 🌐 Live Site

Visit the live demo: [https://ijob-hlip.onrender.com](https://ijob-hlip.onrender.com)

