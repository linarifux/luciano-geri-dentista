import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import HomePage from './pages/HomePage';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import PatientCRM from './pages/admin/PatientCRM';
import ServiceManagement from './pages/admin/ServiceManagement';
import Appointments from './pages/admin/Appointments';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminLayout from './components/layout/AdminLayout';
import NotFound from './pages/NotFound';
import BookingPage from './pages/BookingPage';
import ServicesPage from './pages/ServicesPage';
import StudioPage from './pages/StudioPage';

// Utility to reset scroll position on route change
const ScrollToTopOnNavigate = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
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
      
      <ScrollToTopOnNavigate />
      <ScrollToTop />

      <div className="flex flex-col min-h-screen">
        {/* Navbar Logic: Visible on Public & 404 pages, hidden on Admin Layout */}
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/login" element={<Navbar />} />
          <Route path="/admin/*" element={null} /> {/* Explicitly hide navbar on admin paths */}
          <Route path="*" element={<Navbar />} /> 
        </Routes>

        <main className="grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/prenota" element={<BookingPage />} />
            <Route path="/servizi" element={<ServicesPage />} />
            <Route path="/studio" element={<StudioPage />} />
            
            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/appointments" element={<Appointments />} />
                <Route path="/admin/patients" element={<PatientCRM />} />
                <Route path="/admin/services" element={<ServiceManagement />} />
              </Route>
            </Route>

            {/* Catch-all 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Footer Logic: Consistent with Navbar visibility */}
        <Routes>
          <Route path="/" element={<Footer />} />
          <Route path="/login" element={<Footer />} />
          <Route path="/admin/*" element={null} />
          <Route path="*" element={<Footer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;