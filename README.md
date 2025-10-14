# 🥂 Dinner With a Stranger

A web app that helps students meet someone new over dinner!  
Built with **React + TypeScript + TailwindCSS + Node.js + Express + Prisma + PostgreSQL**.

---

## 🌟 Overview

**Dinner With a Stranger** connects students by pairing them up for dinner based on shared interests, music tastes, and preferences.  
The app features a modern, animated frontend and a clean backend API using Prisma ORM with PostgreSQL.  
Perfect for bringing students together — one dinner at a time 🍽️

---

## 🧠 Features

✅ Beautiful React + TailwindCSS frontend  
✅ Animated UI with **Framer Motion**  
✅ Validated signup form (Zod + TypeScript)  
✅ Node.js + Express backend API  
✅ PostgreSQL database (via Docker)  
✅ Prisma ORM with auto migrations  
✅ CORS-enabled communication between frontend and backend  
✅ Fully typed, modular, and easy to deploy  

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite + TypeScript)
- TailwindCSS
- Framer Motion

**Backend**
- Node.js + Express
- Prisma ORM
- PostgreSQL (Docker)

**Development Tools**
- Docker Compose
- VS Code
- GitHub (for version control)

---

## 🖼️ Screenshots

<h3>🏠 Landing Page</h3>
<p align="center">
  <img src="./screenshots/landing.png" width="800">
</p>

<h3>📝 Signup Form</h3>
<p align="center">
  <img src="./screenshots/form.png" width="800">
</p>

<h3>🎉 Thank You Screen</h3>
<p align="center">
  <img src="./screenshots/thankyou.png" width="800">
</p>



---

## ⚙️ Local Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/dinner-with-a-stranger.git
cd dinner-with-a-stranger
```


### 2️⃣ Backend setup
```bash
cd backend
npm install
docker-compose up -d
npx prisma migrate dev --name init
npm run dev
```

###  3️⃣ Frontend setup
```bash
cd ../frontend
npm install
npm run dev
```
---

Now open http://localhost:5173
 🎉

---

🌿 Environment Variables

Create a .env file inside the backend folder with:

```bash
DATABASE_URL="postgresql://dws:dws@localhost:5433/dws?schema=public"
PORT=5174
CORS_ORIGIN=http://localhost:5173
```

Make sure not to commit .env to GitHub — add it to .gitignore.

---

## 🧩 API Routes
Method	Endpoint	Description
GET	/api/health	Health check endpoint
POST	/api/submit	Handles form submissions

## 📚 Database Schema (Prisma)
```prisma
model Submission {
  id              Int      @id @default(autoincrement())
  email           String   @unique
  name            String
  program         String?
  gradYear        Int?
  interests       String[]
  diet            String?
  bio             String?
  musicGenres     String[]
  gender          String
  matchPreference String[]
  groupSize       Int
  createdAt       DateTime @default(now())
}
```

---

---
## 🧪 Testing

To manually view or edit database entries:
```bash

npx prisma studio
```

This opens a browser-based UI to inspect your data.

---

## 🚀 Deployment
---

Frontend

Deploy easily on Vercel, Netlify, or Render.

Set VITE_API_BASE_URL to your backend’s URL in a .env file.

---

Backend

Host on Render, Fly.io, or Railway.

Use a managed PostgreSQL instance or connect your existing one.

Set your production .env like:

```

DATABASE_URL="postgresql://user:password@host:5432/dws?schema=public"
PORT=8080
CORS_ORIGIN=https://your-frontend-url.com
```
---

## 🧭 Folder Structure
```
dinner-with-a-stranger/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   └── index.ts
│   ├── docker-compose.yml
│   └── .env
│
├── frontend/
│   ├── src/
│   │   └── App.tsx
│   ├── public/
│   └── vite.config.ts
│
├── screenshots/
│   ├── landing.png
│   ├── form.png
│   └── thankyou.png
│
└── README.md
```

## 🌱 Future Roadmap

🤝 Smart pairing algorithm for dinner matches

📧 Email notifications when matched

🧑‍💻 Admin dashboard for managing signups

🌍 Cloud deployment (Render + Vercel)

🪩 Improved matching preferences and filters

## 🧑‍🍳 Author

Built by [Jalil G.]
Connecting students through good food and great conversation 🍝

“Good food tastes better with great company.”

## 🛡️ License

MIT License © 2025 — Jalil G.
Feel free to fork and remix responsibly 💡
