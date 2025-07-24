# 🎓 Campus Connect

**Campus Connect** is a full-stack web platform that streamlines communication and event management within a college campus. It allows students to stay informed about events, notices, and opportunities, while enabling administrators to manage updates effectively.

---

## 🚀 Project Status

🛠️ Campus Connect is currently under development. New features and enhancements are actively being added.

---

## ✨ Features

- 📅 View and register for upcoming college events
- 📢 Notice board for real-time announcements
- 👤 Student dashboard with personalized information
- 🔐 Secure login for both students 
- 📱 Fully responsive, modern UI with smooth transitions

---

## 🛠️ Tech Stack

### 🌐 Frontend
- React.js + Vite
- React Router DOM
- Tailwind CSS
- Lucide React Icons

### 🔙 Backend
- Node.js + Express.js
- Postgress + Prisma ORM
- Nodemailer for sending emails

### 🧪 Dev Tools
- Vercel (Frontend deployment)
- Supabase (Database)
- Postman (API Testing)
- GitHub (Version Control)

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Ritesh-Thorve/campus-connect.git
cd campus-connect
```

### 2. Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd ../frontend
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the `backend/` folder and add:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

### 4. Run the Application

#### Backend
```bash
cd backend
npm run dev
```

#### Frontend
```bash
cd frontend
npm run dev
```

---

## 🌍 Deployment

- **Frontend:** Deployed on [Vercel](https://vercel.com/)
- **Backend:** Use Render, Railway, or host MongoDB on Atlas

---

## 📬 Contact Form

- Students can send messages via a form
- Admins can **read**, **reply**, or **delete** messages from the dashboard
- Email responses are sent using Nodemailer

---

## 📸 Screenshots

> *(Add your app screenshots here)*

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 💡 Inspiration

Campus Connect is inspired by real-world communication issues faced by students on campus. It aims to digitize and simplify announcements, event participation, and student-admin interaction.

---
