# URL Shortener – Technical Test

## Introduction

This project is a simple URL shortener built as part of a technical interview exercise.

It allows users to:

- Shorten a long URL
- Access a shortened link
- Be redirected to the original URL
- Track click count

The goal was to deliver a clean, working full-stack application with clear trade-offs rather than a fully production-ready system.

---

## Tech Stack

### Frontend

- React
- TypeScript
- TanStack Query
- Vite

### Backend

- Node.js
- Express.js
- PostgreSQL
- Drizzle ORM
- Vitest

---

## Getting Started

The project is split into two folders:

### Frontend

```bash
pnpm install
pnpm run dev
```

Runs on `http://localhost:5173`

### Backend

```bash
pnpm install
pnpm run dev
```

Runs on `http://localhost:3001`

### Database

PostgreSQL must be running locally.

It can be provided either by:
- a local PostgreSQL installation
- or a PostgreSQL instance running via Docker Desktop

You can access the PostgreSQL database using the following credentials:

```bash
  // back/src/db/index.ts
  database: "stoik_db"
  user: "postgres"
  password: "password"
  host: "localhost"
  port: 5432
```

Drizzle ORM is used for schema and migrations.

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

### Tests backend

```bash
pnpm test

```

## Main Technical Choices

TanStack Query for server state management on the frontend

Express + Drizzle ORM for a simple, type-safe backend

Minimal architecture to prioritize readability and clarity for the exercise

## Assumptions

Public-facing application (no authentication)

Anonymous users

Short URLs are public

Click count is a key metric

<img width="1194" height="958" alt="Capture d’écran 2026-01-14 à 04 04 15" src="https://github.com/user-attachments/assets/cc93e7f8-3dae-41fa-8da3-58af924bb1f0" />



