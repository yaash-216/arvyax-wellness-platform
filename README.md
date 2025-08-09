# **Arvyax Wellness Session Platform** 

A secure full-stack platform for creating, managing, and publishing wellness sessions.
Users can register, log in, save drafts, auto-save after inactivity, and publish sessions.

---

## **📌 Features**

### **Authentication**

* **JWT-based** login and registration
* Password hashing with **bcrypt**
* Protected backend routes
* Token storage in frontend (LocalStorage)

### **Session Management**

* View public wellness sessions
* Create and manage drafts
* Publish sessions
* Auto-save drafts after **5s of inactivity** (debounced)

### **Frontend**

* Built with **React + TypeScript**
* **Tailwind CSS + DaisyUI** for responsive UI
* **Axios** for API calls
* Protected routes using **React Router**

### **Backend**

* **Node.js + Express** server
* **MongoDB** database (Mongoose ORM)
* REST API endpoints for authentication and session management

---

## **🛠 Tech Stack**

* **Frontend:** React (TypeScript), Tailwind CSS, DaisyUI, Axios, React Router
* **Backend:** Node.js, Express.js, MongoDB, Mongoose
* **Auth:** JWT + bcrypt

---

## **📂 Project Structure**

```
project-root/
│
├── backend/
│   ├── src/
│   │   ├── config/        # DB config
│   │   ├── middleware/    # Auth middleware
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   ├── controllers/   # Route logic
│   │   └── server.js      # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── api/           # Axios API calls
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # Auth context
│   │   ├── hooks/         # Custom hooks (auto-save)
│   │   ├── pages/         # App pages
│   │   └── App.tsx        # Main app
│
└── README.md
```

---

## **⚡ Getting Started**

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yaash-216/arvyax-wellness-platform.git
cd arvyax-wellness-platform
```

---

### 2️⃣ Backend Setup

```bash
cd backend
pnpm install
```

Create **.env** in `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Run backend:

```bash
pnpm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd ../frontend
pnpm install
```

Create **.env** in `frontend/`:

```env
VITE_API_URL=http://localhost:5000/api
```

Run frontend:

```bash
pnpm run dev
```

---

## **📡 API Endpoints**

### **Auth**

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| POST   | `/auth/register` | Register a new user |
| POST   | `/auth/login`    | Login and get JWT   |

### **Sessions**

| Method | Endpoint                  | Description                        |
| ------ | ------------------------- | ---------------------------------- |
| GET    | `/sessions`               | Public sessions                    |
| GET    | `/my-sessions`            | User's drafts & published sessions |
| GET    | `/my-sessions/:id`        | Get single session                 |
| POST   | `/my-sessions/save-draft` | Save/update draft                  |
| POST   | `/my-sessions/publish`    | Publish a session                  |

---

## **🎯 Bonus Features**

* Auto-save drafts with debounce
* Logout functionality
* Toast feedback for save/publish
* Responsive design

---

## **📜 License**

This project is developed as part of the **Arvyax Full Stack Internship Assignment** and is free to use for learning purposes.

