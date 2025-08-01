
# ✅ CampusConnect Backend

A backend for **CampusConnect** built with **Node.js**, **Express**, **Prisma**, **Supabase Authentication**, and **Razorpay**.

---

## ✅ Tech Stack
- **Node.js + Express** – API framework  
- **Prisma ORM** – PostgreSQL database  
- **Supabase** – Authentication  
- **Razorpay** – Payments  
- **JWT** – API authentication  
- **Multer** – File upload  
- **Joi** – Input validation  

---

## ✅ Features
✔ User signup/login with **Supabase (Email + Google)**  
✔ JWT-based API authentication  
✔ Profile management with image uploads  
✔ Create/View **Updates** and **Trends**  
✔ Razorpay payment integration (₹100 fixed)  

---

## ✅ Project Structure
```
backend/
│── config/        # Config files (DB, Supabase, Razorpay)
│── controllers/   # Business logic for routes
│── middlewares/   # JWT auth, file upload
│── prisma/        # Prisma schema & migrations
│── routes/        # Express routes
│── utils/         # Validation & file upload helpers
│── .env           # Environment variables
│── server.js      # App entry point
```

---

## ✅ ENV
```
DATABASE_URL=your_postgres_connection_url
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_service_key
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

---

## ✅ Installation
```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Start server
npm run start
```

---

## ✅ API Endpoints
### **Auth**
- POST `/auth/signup`
- POST `/auth/login`
- POST `/auth/google/sync`

### **Profile**
- POST `/profile`
- GET `/profile`
- GET `/profiles`

### **Updates**
- POST `/updates`
- GET `/updates`
- GET `/updates/my`
- DELETE `/updates/:id`

### **Trends**
- POST `/trends`
- GET `/trends`

### **Payments**
- POST `/payment/create-order`

---

## ✅ Scripts
```bash
npm run start       # Start the server
npm run dev         # Start in development mode (if nodemon added)
npx prisma studio   # Open Prisma UI
```

---

## ✅ License
MIT License
