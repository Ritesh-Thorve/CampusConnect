# CampusConnect Backend

This is the backend for **CampusConnect**, built using **Node.js**, **Express**, **Prisma**, **Supabase Authentication**, and **Razorpay**.

---

## ✅ Tech Stack
- Node.js + Express
- Prisma ORM (PostgreSQL)
- Supabase (Auth)
- Razorpay (Payments)
- JWT (Custom Auth)
- Multer (File Upload)
- Joi (Validation)

---

## ✅ Features
- User signup/login with Supabase (Email + Google)
- JWT-based API authentication
- Profile management with image uploads
- Trends and Updates module
- Razorpay payment integration (₹100 fixed)
- PostgreSQL with Prisma ORM

---

## ✅ Project Structure
backend/
│── config/ # Config files (DB, Supabase, Razorpay)
│── controllers/ # Business logic for routes
│── middlewares/ # JWT auth, file upload middleware
│── prisma/ # Prisma schema and migrations
│── routes/ # Express routes
│── utils/ # Helper utilities (validation, upload)
│── .env # Environment variables
│── server.js # App entry point

---

## ✅ ENV
DATABASE_URL=your_postgres_connection_url
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_service_key
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

---

## ✅ Installation
```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Apply migrations
npx prisma migrate dev --name init

# Start the server
npm run start
