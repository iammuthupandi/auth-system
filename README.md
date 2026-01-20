# 🔐 Full Stack Authentication System  
React + Node.js + Express + PostgreSQL

This project is a full-stack authentication system with **role-based access (Admin/User)**, **JWT authentication**, **refresh tokens**, and a **React frontend**.  
The repository contains **both frontend and backend in a single repository**.

---

## 📁 Project Structure
.
├── backend/
├── frontend/
└── README.md

---

## ⚙️ Setup Instructions

### Prerequisites

Ensure the following are installed on your system:

- Node.js (v18 or above)
- npm
- PostgreSQL (running locally)
- Git

---

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend

npm install
psql -U postgres
CREATE DATABASE authdb;
\q
cp .env.example .env


PORT=5000
DATABASE_URL=postgres://<username>:<password>@localhost:5432/authdb
JWT_ACCESS_SECRET=access_secret_key
JWT_REFRESH_SECRET=refresh_secret_key
 ```


### Frontend Setup
```bash
cd frontend
npm install
```

### Terminal 1 – Backend
cd backend
npm run dev
http://localhost:5000


### Terminal 2 – Frontend
cd frontend
npm run dev
http://localhost:5173



📡 API Documentation

Authentication APIs
| Method | Endpoint           | Description                |
| ------ | ------------------ | -------------------------- |
| POST   | /api/auth/register | Register a new user        |
| POST   | /api/auth/login    | Login user                 |
| POST   | /api/auth/refresh  | Refresh access token       |
| POST   | /api/auth/logout   | Logout user                |
| GET    | /api/auth/me       | Get current logged-in user |

Admin APIs
| Method | Endpoint   | Description                |
| ------ | ---------- | -------------------------- |
| GET    | /api/users | Get all users (Admin only) |



🔑 Test Credentials

👑 Admin Account
Email: admin@example.com
Password: Admin@123

👤 Regular User Account
Email: user@example.com
Password: User@123

