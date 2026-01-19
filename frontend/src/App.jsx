import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

// Layouts & Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminLayout from './components/layout/AdminLayout';

// Public Pages
import HomePage from './pages/HomePage';
import AdminLogin from './pages/admin/AdminLogin';
import BookingPage from './pages/BookingPage';
import ServicesPage from './pages/ServicesPage';
import StudioPage from './pages/StudioPage';
import NotFound from './pages/NotFound';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import PatientCRM from './pages/admin/PatientCRM';
import ServiceManagement from './pages/admin/ServiceManagement';
import Appointments from './pages/admin/Appointments';

// --- Utility: Reset Scroll on Route Change ---
const ScrollToTopOnNavigate = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- NEW: Public Layout Component ---
// This wraps all public pages. It handles the Navbar, Footer, 
// and the necessary padding for non-home pages automatically.
const PublicLayout = () => {
  const location = useLocation();
  
  // The Home page has a Hero video that sits BEHIND the navbar (transparent).
  // All other pages need padding so content isn't hidden behind the fixed navbar.
  const isHome = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* CONDITIONAL PADDING:
          - If Home: No padding (content sits behind transparent navbar)
          - If Other: Add pt-24 (approx 96px) to push content down below fixed navbar
      */}
      <main className={`grow ${isHome ? 'lg:pt-48' : 'pt-24 lg:pt-58'}`}>
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      {/* Configuration for Toast notifications */}
      <Toaster 
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1A1A1A',
            color: '#fff',
            borderRadius: '12px',
          },
          success: {
            iconTheme: { primary: '#5EAEB4', secondary: '#fff' },
          },
        }}
      />
      
      {/* Scroll handling */}
      <ScrollToTopOnNavigate />
      <ScrollToTop />

      <Routes>
        {/* --- 1. Public Routes (Wrapped in PublicLayout) --- */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/prenota" element={<BookingPage />} />
          <Route path="/servizi" element={<ServicesPage />} />
          <Route path="/studio" element={<StudioPage />} />
          
          {/* Catch-all 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* --- 2. Admin Routes (Protected & Admin Layout) --- */}
        {/* AdminLayout handles its own sidebar structure, so no Navbar/Footer here */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/appointments" element={<Appointments />} />
            <Route path="/admin/patients" element={<PatientCRM />} />
            <Route path="/admin/services" element={<ServiceManagement />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;