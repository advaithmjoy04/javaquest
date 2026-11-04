# ☕ JavaQuest — Gamified Java Learning Platform

JavaQuest is an interactive, gamified learning single-page application built to master Java from the ground up, complete with progressive learning paths, live compiler, AI tutor, and cloud persistence.

---

## 🌟 Key Features

1. **🎯 3-Tier Official Roadmap & 24 Modules**:
   - **🌱 Beginner Track (Modules B1–B8)**: Setup, Variables, Operators, Loops, Methods, Arrays & Strings, Basic OOP, Exceptions & Collections.
     - 🌟 **Capstone 1**: Personal Expense Tracker (Console App)
   - **🔥 Intermediate Track (Modules I1–I8)**: Advanced OOP & Records, Collections & Generics, Files & I/O, Lambdas & Streams, DateTime & Regex, JUnit 5 Testing, JDBC & SQL, Concurrency & Maven.
     - 🌟 **Capstone 2**: Library / Inventory Management System
   - **⚡ Advanced Track (Modules A1–A8)**: JVM Internals & Memory, Advanced Concurrency & Virtual Threads, Advanced Generics & Annotations, Design Patterns, Security & Idempotency, Spring Boot & JPA, Observability & Profiling, Docker & CI/CD.
     - 🌟 **Capstone 3**: Task Management REST API (Spring Boot)
   - Switch anytime from the Learning Map banner or Settings.

2. **💻 Interactive Coding Challenges & Attempt-Based Scoring**:
   - Every module includes an interactive coding task with real-time test execution.
   - Dynamic attempt-based reward tier:
     - **1st Try**: 100 XP
     - **2nd Try**: 75 XP
     - **3rd Try**: 50 XP
     - **4+ Tries**: 25 XP (Fixed points)
   - Powered by real OpenJDK execution (Piston API) with resilient client-side fallback.

3. **🗄️ PostgreSQL Database (Supabase)**:
   - Full user authentication (Email & Password sign-up and sign-in).
   - Profiles, XP, levels, streaks, hearts, avatar configuration, completed lessons, and earned badges persist to cloud PostgreSQL.
   - **🎮 Guest Mode**: Instant play without signing in (stores in `localStorage` as offline fallback).

3. **🛡️ Security & Row-Level Security (RLS)**:
   - **Row Level Security (RLS)** enabled on all database tables: `profiles`, `progress`, `earned_badges`.
   - Security policies enforce `auth.uid() = user_id`, meaning users can **only read and modify their own data**.
   - Public anonymous key is used client-side; sensitive service keys are never exposed.
   - Strict **Content Security Policy (CSP)** applied in headers and HTML metadata.
   - Cross-Site Scripting (XSS) protection with rigorous HTML escaping.

4. **🚀 Ready for Deployment**:
   - Pre-configured for **Netlify** (`netlify.toml`, `_headers`, `_redirects`).
   - Pre-configured for **Vercel** (`vercel.json`).
   - Pure frontend SPA — zero backend server maintenance needed.

---

## 🚀 How to Deploy

### Option 1: Deploy with Netlify (Recommended)
1. Push this folder to a GitHub repository or drag-and-drop the project folder to [Netlify Drop](https://app.netlify.com/drop).
2. Netlify will automatically detect `netlify.toml` and `_headers` to apply the secure CSP headers and routing.

### Option 2: Deploy with Vercel
1. Import your GitHub repository in [Vercel](https://vercel.com/new).
2. Vercel will automatically read `vercel.json` and deploy.

---

## 💻 Local Development

The local dev server is currently running:
- **URL**: [http://localhost:3000](http://localhost:3000)
