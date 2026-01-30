import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

// Layouts & Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminLayout from "./components/layout/AdminLayout";

// Public Pages
import HomePage from "./pages/HomePage";
import AdminLogin from "./pages/admin/AdminLogin";
import BookingPage from "./pages/BookingPage";
import ServicesPage from "./pages/ServicesPage";
import StudioPage from "./pages/StudioPage";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Blog from "./pages/Blog";
import SingleBlog from "./pages/SingleBlog";
import PricingPage from "./pages/PricingPage";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import PatientCRM from "./pages/admin/PatientCRM";
import ServiceManagement from "./pages/admin/ServiceManagement";
import Appointments from "./pages/admin/Appointments";
import AdminBlogs from "./pages/admin/AdminBlogs";
import PatientClinicalRecord from "./pages/admin/PatientClinicalRecord";
import StaffManagement from "./pages/admin/StaffManagement";
import InvoiceGenerator from "./pages/admin/InvoiceGenerator";
import PostOpGenerator from "./pages/admin/PostOpGenerator";
import SmileGallery from "./pages/SmileGallery";

// --- Utility: Reset Scroll on Route Change ---
const ScrollToTopOnNavigate = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- Public Layout Component ---
const PublicLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={`grow ${isHome ? "lg:pt-48" : "pt-24 lg:pt-32"}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1A1A1A",
            color: "#fff",
            borderRadius: "12px",
          },
          success: {
            iconTheme: { primary: "#5EAEB4", secondary: "#fff" },
          },
        }}
      />

      <ScrollToTopOnNavigate />
      <ScrollToTop />

      <Routes>
        {/* --- 1. Public Routes --- */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/prenota" element={<BookingPage />} />
          <Route path="/servizi" element={<ServicesPage />} />
          <Route path="/studio" element={<StudioPage />} />
          <Route path="/chi-siamo" element={<About />} />
          <Route path="/prezzi" element={<PricingPage />} />
          <Route path="/sorrisi" element={<SmileGallery />} />
          
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<SingleBlog />} />

          <Route path="*" element={<NotFound />} />
        </Route>

        {/* --- 2. Admin Routes --- */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/appointments" element={<Appointments />} />
            
            {/* Patient Management Routes */}
            <Route path="/admin/patients" element={<PatientCRM />} />
            {/* Use the same component for creating new or viewing existing */}
            <Route path="/admin/clinical-record" element={<PatientClinicalRecord />} /> 
            <Route path="/admin/patients/:id" element={<PatientClinicalRecord />} />
            <Route path="/admin/invoices" element={<InvoiceGenerator />} />
            <Route path="/admin/post-op" element={<PostOpGenerator />} />

            <Route path="/admin/services" element={<ServiceManagement />} />
            <Route path="/admin/blogs" element={<AdminBlogs />} />
            <Route path="/admin/staff" element={<StaffManagement />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;