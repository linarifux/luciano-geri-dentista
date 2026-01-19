# Studio Geri - Dental Clinic Platform

A high-end, cinematic web application for a prestigious dental clinic. This project combines a stunning, animation-heavy public-facing website with a robust, secure internal dashboard for staff management.

**[🌐 Live Demo](https://luciano-geri-dentista.netlify.app/)** | **[💻 GitHub Repository](https://github.com/linarifux/luciano-geri-dentista)**

---

## 🌟 Key Features

### 🏛️ Public Website (Frontend)
* **Cinematic Experience:** Full-screen video backgrounds, glassmorphism UI, and smooth scroll animations using Framer Motion.
* **Responsive Design:** Fully optimized for Mobile, Tablet, and Desktop.
* **Interactive Services:** "Bento Grid" style service menus with hover effects.
* **Blog & News System:** A dedicated blog section for patient education and clinic updates.
* **Team & About Page:** Professional team showcase with animations and individual bios.
* **FAQ & Instagram Feed:** Interactive accordion for common questions and a stylish Instagram mockup feed.
* **Case Studies:** Interactive "Before & After" slider to showcase clinical results.
* **Smart Booking:** Split-screen booking page with sticky context, **real-time slot availability**, and immediate validation.

### 🔐 Admin Dashboard (Internal)
* **Secure Authentication:** JWT-based login system for administrators and staff.
* **Dashboard Overview:** Real-time statistics, "Next Patient" widget, and quick actions.
* **Appointment Management:** * Filterable table (Today, Pending, All).
    * **Edit & Reschedule:** Modal to update patient details or change appointment slots.
    * **Delete & Cancel:** Full control over the appointment lifecycle.
* **Blog Management (CMS):** * **Rich Text Editor:** Built with **TipTap** for bold, italic, lists, and links.
    * **Image Uploads:** Integrated with **Cloudinary** for secure and fast image hosting.
    * **Create/Delete Posts:** Full content management capabilities.
* **Patient Data:** Secure handling of patient requests and contact details.

---

## 🛠️ Tech Stack

### Frontend
* **Framework:** React (Vite)
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion
* **State Management:** Redux Toolkit
* **Routing:** React Router DOM v6
* **Rich Text Editor:** TipTap (Headless, Tailwind-friendly)
* **Icons:** Lucide React

### Backend
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (via Mongoose)
* **Authentication:** JSON Web Tokens (JWT)
* **File Storage:** Cloudinary + Multer
* **Security:** Bcrypt (Password Hashing), CORS

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
* Node.js (v16 or higher)
* MongoDB (Local or Atlas URL)
* Cloudinary Account (Free tier is sufficient)
* Git

### 1. Clone the Repository

```
git clone [https://github.com/linarifux/luciano-geri-dentista.git](https://github.com/linarifux/luciano-geri-dentista.git)
cd luciano-geri-dentista
```

### 2. Backend Setup
Navigate to the backend folder and install dependencies.

```
cd backend
npm install
```

### Create a ```.env``` file in the backend root:

```
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key

# Cloudinary Config
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
### Start the server:

```
npm run dev
# Server should run on http://localhost:5000
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend folder, and install dependencies.

```
cd frontend
npm install
```

### Create a ```.env``` file in the frontend root:

```
VITE_API_URL=http://localhost:5000
```

### Start the React application:
```
npm run dev
# App should run on http://localhost:5173
```

### 📂 Project Structure

```
studio-geri/
├── backend/                # Express API
│   ├── config/             # DB & Cloudinary Config
│   ├── controllers/        # Route Logic (Auth, Appointments, Blog)
│   ├── middleware/         # Auth & Error Middleware
│   ├── models/             # Mongoose Models (User, Appointment, Blog)
│   ├── routes/             # API Routes
│   └── server.js           # Entry Point
│
└── frontend/               # React Client
    ├── public/             # Static Assets (Video, Logo)
    └── src/
        ├── components/     # Reusable UI Components
        │   ├── admin/      # Dashboard specific components (Editors, Tables)
        │   ├── home/       # Landing page components (Hero, FAQ, Form)
        │   └── layout/     # Navbar, Footer, ScrollToTop
        ├── pages/          # Full Page Views (Home, Booking, Blog, Admin)
        ├── services/       # Axios/API configuration
        └── store/          # Redux Slices (Auth, Appointments, Blogs)
```

### 🔑 Admin Access
To access the ```/dashboard```, you need an admin account. Since there is no public registration page (for security), you must create the first user manually via Postman or MongoDB Compass.

User Schema:

```
{
  "name": "Dr. Geri",
  "email": "admin@studiogeri.it",
  "password": "password123",  // Will be hashed by bcrypt
  "role": "admin"
}
```
### Once created, go to ```/login``` to access the dashboard.

### 🎨 Design System
* Primary Color: Teal (#2DD4BF / Tailwind teal-400)

* Secondary Color: Slate Navy (#0F172A / Tailwind slate-900)

* Typography: Sans-serif (Inter/Roboto recommended) with heavy usage of font-black and wide tracking.

* Aesthetic: Glassmorphism, blurred orbs, high-contrast typography.

### 📝 License
This project is licensed under the MIT License - see the LICENSE.md file for details.

Developed by ```Naimul Islam```
