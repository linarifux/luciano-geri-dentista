*** Studio Geri - Dental Clinic Platform
A high-end, cinematic web application for a prestigious dental clinic. This project combines a stunning, animation-heavy public-facing website with a robust, secure internal dashboard for staff management.🌟 Key Features🏛️ Public Website (Frontend)Cinematic Experience: Full-screen video backgrounds, glassmorphism UI, and smooth scroll animations using Framer Motion.Responsive Design: Fully optimized for Mobile, Tablet, and Desktop.Interactive Services: "Bento Grid" style service menus with hover effects.Case Studies: Interactive "Before & After" slider to showcase clinical results.Smart Booking: Split-screen booking page with sticky context and immediate validation.Utility: Scroll-to-top functionality, custom 404 pages, and a robust footer.🔐 Admin Dashboard (Internal)Secure Authentication: JWT-based login system for administrators and staff.Dashboard Overview: Real-time statistics, "Next Patient" widget, and quick actions.Appointment Management: Filterable table (Today, Pending, All) with status indicators.Patient Data: Secure handling of patient requests and contact details.🛠️ Tech StackFrontendFramework: React (Vite)Styling: Tailwind CSSAnimations: Framer MotionState Management: Redux ToolkitRouting: React Router DOM v6Icons: Lucide ReactBackendRuntime: Node.jsFramework: Express.jsDatabase: MongoDB (via Mongoose)Authentication: JSON Web Tokens (JWT)Security: Bcrypt (Password Hashing), CORS🚀 Getting StartedFollow these steps to set up the project locally.PrerequisitesNode.js (v16 or higher)MongoDB (Local or Atlas URL)Git1. Clone the RepositoryBashgit clone https://github.com/your-username/studio-geri.git
cd studio-geri
2. Backend SetupNavigate to the backend folder and install dependencies.Bashcd backend
npm install
Create a .env file in the backend root:Code snippetNODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
Start the server:Bashnpm run dev
# Server should run on http://localhost:5000
3. Frontend SetupOpen a new terminal, navigate to the frontend folder, and install dependencies.Bashcd frontend
npm install
Create a .env file in the frontend root:Code snippetVITE_API_URL=http://localhost:5000
Start the React application:Bashnpm run dev
# App should run on http://localhost:5173
📂 Project StructurePlaintextstudio-geri/
├── backend/                # Express API
│   ├── config/             # DB Connection
│   ├── controllers/        # Route Logic (Auth, Appointments)
│   ├── middleware/         # Auth & Error Middleware
│   ├── models/             # Mongoose Models
│   ├── routes/             # API Routes
│   └── server.js           # Entry Point
│
└── frontend/               # React Client
    ├── public/             # Static Assets (Video, Logo)
    └── src/
        ├── components/     # Reusable UI Components
        │   ├── admin/      # Dashboard specific components
        │   ├── home/       # Landing page components
        │   └── layout/     # Navbar, Footer, ScrollToTop
        ├── pages/          # Full Page Views (Home, Booking, Login)
        ├── services/       # Axios/API configuration
        └── store/          # Redux Slices (Auth, Appointments)
🔑 Admin AccessTo access the /dashboard, you need an admin account.Since there is no public registration page (for security), you must create the first user manually via Postman or MongoDB Compass, or use a temporary seeder script.User Schema:
```
{
  "name": "Dr. Geri",
  "email": "admin@studiogeri.it",
  "password": "password123",  // Will be hashed by bcrypt
  "role": "admin"
}
```
Once created, go to /login to access the dashboard.📸 ScreenshotsHome PageBooking Page(Place screenshot here)(Place screenshot here)Admin LoginDashboard(Place screenshot here)(Place screenshot here)🎨 Design SystemPrimary Color: Teal (#2DD4BF / Tailwind teal-400)Secondary Color: Slate Navy (#0F172A / Tailwind slate-900)Typography: Sans-serif (Inter/Roboto recommended) with heavy usage of font-black and wide tracking.Aesthetic: Glassmorphism, blurred orbs, high-contrast typography.📝 LicenseThis project is licensed under the MIT License - see the LICENSE.md file for details.Developed by [Naimul Islam]