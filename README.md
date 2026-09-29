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
- ✅ One shared **Zod** schema validates the signup form in the browser (inline field errors) and again on the server
- ✅ Node.js + Express API with Prisma ORM
- ✅ PostgreSQL via Docker Compose
- ✅ Spam protection: per-IP rate limiting and a honeypot field
- ✅ Privacy note and required consent before signing up
- ✅ Matching preferences by gender (women / men / non-binary people / anyone)
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

### 2️⃣ Install (from the repo root)

This is an npm workspaces monorepo (`shared`, `backend`, `frontend`). One install at the root covers everything, builds `shared/` and generates the Prisma client.

```bash
npm install
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

### 3️⃣ Database

```bash
npm run db:up -w backend           # starts Postgres on localhost:5433
npm run prisma:deploy -w backend   # applies migrations
```

### 4️⃣ Run

```bash
npm run dev:backend    # terminal 1: API on http://localhost:5174
npm run dev:frontend   # terminal 2: http://localhost:5173
```

Now open http://localhost:5173 🎉

If you edit `shared/submission.ts`, also run `npm run dev:shared` so it rebuilds on save.

### Root scripts

| Script | What it does |
| --- | --- |
| `npm run build` | Builds shared, backend and frontend |
| `npm run typecheck` | Builds shared, then typechecks backend and frontend |
| `npm run lint` | Lints the frontend |
| `npm run dev:backend` / `dev:frontend` / `dev:shared` | Dev servers / watch mode |

## 🌿 Environment Variables

| File | Variable | Example | Description |
| --- | --- | --- | --- |
| `backend/.env` | `DATABASE_URL` | `postgresql://dws:dws@localhost:5433/dws?schema=public` | Postgres connection string |
| `backend/.env` | `PORT` | `5174` | API port |
| `backend/.env` | `CORS_ORIGIN` | `http://localhost:5173` | Allowed frontend origin(s), comma-separated |
| `backend/.env` | `TRUST_PROXY` | `0` | Number of reverse proxies in front of the API (`1` on Render/Fly/Railway) so rate limiting sees real client IPs |
| `backend/.env` | `SUBMIT_RATE_LIMIT` | `20` | Max signup requests per IP per 15 minutes |
| `frontend/.env` | `VITE_API_BASE_URL` | `http://localhost:5174` | Backend base URL |

`.env` files are git-ignored. Only the `.env.example` templates are committed.

## 🧩 API

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Health check |
| `POST` | `/api/submit` | Create a signup. `201` on success, `400` on invalid input or missing consent, `409` if the email already signed up, `429` if rate limited |

Campus Wi-Fi often puts many students behind one public IP, so raise `SUBMIT_RATE_LIMIT` if you expect a sign-up rush at an event.

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

  gender          String   // "Woman" | "Man" | "Non-binary" | "Prefer not to say"
  matchPreference String[] // genders they want to be matched with, e.g. ["Woman", "Non-binary"], or ["Anyone"]
  groupSize       Int      // 2 or 4

  bioEmbedding Float[] // reserved for future vector search
}
```

To browse the data locally:

```bash
cd backend && npm run prisma:studio
```

## 🔒 Privacy

The signup form shows a short "How we use your info" note and requires a consent checkbox (also enforced by the API). The note promises that:

- answers are only used for matching and only organizers can see them
- matched people receive each other's name and email to coordinate
- gender is only used to respect matching preferences
- data is never sold or shared with anyone else

Keep these promises true as features are added (e.g. the intro email and the matching algorithm).

## 🚀 Deployment

Both apps depend on the `shared` workspace, so install and build from the **repo root**, not from inside `backend/` or `frontend/`.

**Frontend:** deploy on Vercel, Netlify, or Render with build command `npm ci && npm run build -w shared && npm run build -w frontend` and output directory `frontend/dist`. Set `VITE_API_BASE_URL` to your backend URL.

**Backend:** host on Render, Fly.io, or Railway with a managed PostgreSQL instance.

- Build: `npm ci && npm run build -w shared && npm run build -w backend && npm run prisma:deploy -w backend`
- Start: `npm start -w backend`

Environment:

```bash
DATABASE_URL="postgresql://user:password@host:5432/dws?schema=public"
PORT=8080
CORS_ORIGIN=https://your-frontend-url.com
TRUST_PROXY=1
```

## 🧭 Folder Structure

```
dinner-with-a-stranger/
├── shared/
│   └── submission.ts               # Zod schema, options and limits used by both apps
│
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── routes/submissions.ts   # POST /api/submit
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
│   │   │   └── ui/                 # Field, FieldError, Modal, ToggleChip
│   │   ├── lib/api.ts              # API client
│   │   ├── constants.ts            # display-only data (genres, labels)
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env.example
│   └── vite.config.ts
│
├── docs/screenshots/
├── package.json                    # npm workspaces root
├── package-lock.json
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
