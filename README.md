# 🥂 Dinner With a Stranger

A web app that helps students meet someone new over dinner!
Built with **React + TypeScript + Tailwind CSS + Node.js + Express + Prisma + PostgreSQL**.

---

## 🌟 Overview

**Dinner With a Stranger** connects students by pairing them up for dinner based on shared interests, music tastes, and preferences.
The app has an animated React frontend and a small Express API that stores signups in PostgreSQL via Prisma.
Perfect for bringing students together — one dinner at a time 🍽️

## 🧠 Features

- ✅ React + Tailwind CSS frontend with **Framer Motion** animations
- ✅ Signup form validated on the server with **Zod** (enums, length limits, normalization)
- ✅ Node.js + Express API with Prisma ORM
- ✅ PostgreSQL via Docker Compose
- ✅ CORS restricted to configured frontend origins
- ✅ Fully typed end to end

## 🖼️ Screenshots

<h3>🏠 Landing Page</h3>
<p align="center"><img src="./docs/screenshots/landing.png" width="800"></p>

<h3>📝 Signup Form</h3>
<p align="center"><img src="./docs/screenshots/form.png" width="800"></p>

<h3>🎉 Thank You Screen</h3>
<p align="center"><img src="./docs/screenshots/thankyou.png" width="800"></p>

---

## ⚙️ Local Setup

**Requirements:** Node.js 20+, Docker

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Jalil-g/dinner-with-a-stranger.git
cd dinner-with-a-stranger
```

### 2️⃣ Backend

```bash
cd backend
cp .env.example .env
npm install
npm run db:up            # starts Postgres on localhost:5433
npm run prisma:deploy    # applies migrations
npm run dev              # API on http://localhost:5174
```

### 3️⃣ Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev              # http://localhost:5173
```

Now open http://localhost:5173 🎉

## 🌿 Environment Variables

| File | Variable | Example | Description |
| --- | --- | --- | --- |
| `backend/.env` | `DATABASE_URL` | `postgresql://dws:dws@localhost:5433/dws?schema=public` | Postgres connection string |
| `backend/.env` | `PORT` | `5174` | API port |
| `backend/.env` | `CORS_ORIGIN` | `http://localhost:5173` | Allowed frontend origin(s), comma-separated |
| `frontend/.env` | `VITE_API_BASE_URL` | `http://localhost:5174` | Backend base URL |

`.env` files are git-ignored. Only the `.env.example` templates are committed.

## 🧩 API

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Health check |
| `POST` | `/api/submit` | Create a signup. `201` on success, `400` on invalid input, `409` if the email already signed up |

## 📚 Database Schema (Prisma)

```prisma
model Submission {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())

  email       String   @unique
  name        String
  program     String?
  gradYear    Int?
  interests   String[]
  diet        String?
  bio         String?
  musicGenres String[]

  gender          String
  matchPreference String[] // ["Same sex"], ["Opposite sex"], ["Anyone"], etc.
  groupSize       Int      // 2 or 4

  bioEmbedding Float[] // reserved for future vector search
}
```

To browse the data locally:

```bash
cd backend && npm run prisma:studio
```

## 🚀 Deployment

**Frontend:** deploy on Vercel, Netlify, or Render. Set `VITE_API_BASE_URL` to your backend URL.

**Backend:** host on Render, Fly.io, or Railway with a managed PostgreSQL instance. Run `npm run build && npm run prisma:deploy && npm start` with:

```bash
DATABASE_URL="postgresql://user:password@host:5432/dws?schema=public"
PORT=8080
CORS_ORIGIN=https://your-frontend-url.com
```

## 🧭 Folder Structure

```
dinner-with-a-stranger/
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── routes/submissions.ts   # POST /api/submit
│   │   ├── schemas/submission.ts   # Zod validation
│   │   ├── app.ts                  # Express app setup
│   │   ├── config.ts               # env config
│   │   ├── db.ts                   # Prisma client
│   │   └── index.ts                # server entry point
│   ├── docker-compose.yml
│   └── .env.example
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/             # Hero, SignupModal, ThankYouModal, ...
│   │   │   └── ui/                 # Field, Modal, ToggleChip
│   │   ├── lib/api.ts              # API client
│   │   ├── constants.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env.example
│   └── vite.config.ts
│
├── docs/screenshots/
├── LICENSE
└── README.md
```

## 🌱 Future Roadmap

- 🤝 Smart pairing algorithm for dinner matches
- 📧 Email notifications when matched
- 🧑‍💻 Admin dashboard for managing signups
- 🌍 Cloud deployment (Render + Vercel)
- 🪩 Improved matching preferences and filters

## 🧑‍🍳 Author

Built by Jalil G. — connecting students through good food and great conversation 🍝

> “Good food tastes better with great company.”

## 🛡️ License

[MIT](./LICENSE) © 2025 Jalil G.
