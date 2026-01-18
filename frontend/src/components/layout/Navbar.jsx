import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, X, Calendar, Phone, Mail, MapPin, 
  Facebook, Instagram, Clock 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Increased threshold slightly to prevent jitter at very top
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleBookingClick = () => {
    setIsOpen(false);
    navigate('/prenota');
  };

  return (
    // Changed 'sticky' to 'fixed' to prevent layout shift of content below it
    // Added 'h-auto' to let it sit on top of content
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300">
      
      {/* --- 1. Top Bar (Desktop Only) --- */}
      {/* We hide this on scroll to save space, OR keep it. 
          If you want it to disappear on scroll, we need AnimatePresence. 
          For stability, let's keep it but ensure the main nav has a background. */}
      <div 
        className={`bg-[#0F172A] text-white overflow-hidden transition-all duration-300 ease-in-out ${
          scrolled ? 'h-0 py-0 opacity-0' : 'h-10 py-2.5 opacity-100'
        } hidden md:block border-b border-white/10`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center text-[11px] font-medium tracking-widest uppercase">
          {/* Left: Contact Info */}
          <div className="flex items-center gap-8">
            <a href="tel:+39050123456" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone size={14} className="text-primary" />
              <span>+39 050 123456</span>
            </a>
            <a href="mailto:info@studiogeri.it" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail size={14} className="text-primary" />
              <span>info@studiogeri.it</span>
            </a>
            <div className="flex items-center gap-2 text-gray-400">
              <Clock size={14} />
              <span>Lun - Ven: 09:00 - 19:00</span>
            </div>
          </div>

          {/* Right: Social & Map */}
          <div className="flex items-center gap-6">
            <a 
              href="https://maps.app.goo.gl/zbHjLv8bqdSBEBR29" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 hover:text-primary transition-colors group"
            >
              <MapPin size={14} className="text-primary group-hover:animate-bounce" />
              <span>Pisa, Lungarno Pacinotti 26</span>
            </a>
            <div className="h-3 w-px bg-white/20"></div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-primary transition-colors"><Facebook size={16} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Instagram size={16} /></a>
            </div>
          </div>
        </div>
      </div>

      {/* --- 2. Main Navigation Bar --- */}
      <div 
        className={`bg-white/95 backdrop-blur-md transition-all duration-300 border-b border-secondary/10 ${
          scrolled ? 'py-2 shadow-md' : 'py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:gap-4">
            
            {/* Upper Row: Logo & Mobile Toggle */}
            <div className="flex justify-between items-center relative">
              <a href="tel:+39050123456" className="md:hidden p-2 text-primary">
                <Phone size={24} />
              </a>

              <Link to="/" className="flex flex-col items-center group mx-auto md:mx-0 md:w-full md:items-center">
                 <img 
                    src="/logo.png" 
                    alt="Studio Geri" 
                    // Fixed height logic to prevent layout thrashing
                    className={`transition-all duration-300 w-auto ${scrolled ? 'h-10' : 'h-12 md:h-16'}`}
                 />
              </Link>

              <button 
                className="md:hidden p-2 text-dark" 
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>

            {/* Lower Row: Desktop Links */}
            <div className={`hidden md:flex justify-center items-center space-x-12 uppercase text-[12px] font-bold tracking-[0.15em] overflow-hidden transition-all duration-300 ${scrolled ? 'pt-1' : 'pt-2'}`}>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/servizi">Prestazioni</NavLink>
              <NavLink to="/studio">Lo Studio</NavLink>
              <NavLink to="/login" className="italic text-gray-400">Area Staff</NavLink>
              
              <button 
                onClick={handleBookingClick}
                className="ml-4 flex items-center gap-2 bg-primary hover:bg-dark text-white px-6 py-2.5 rounded-full transition-all shadow-lg shadow-primary/20 hover:shadow-xl active:scale-95"
              >
                <Calendar size={16} />
                <span>Prenota Ora</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* --- 3. Mobile Menu Dropdown --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden shadow-xl"
          >
            <div className="px-6 py-8 flex flex-col items-center space-y-6 text-center">
              <MobileNavLink to="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
              <MobileNavLink to="/servizi" onClick={() => setIsOpen(false)}>Prestazioni</MobileNavLink>
              <MobileNavLink to="/studio" onClick={() => setIsOpen(false)}>Lo Studio</MobileNavLink>
              <MobileNavLink to="/login" onClick={() => setIsOpen(false)}>Area Staff</MobileNavLink>
              
              <hr className="w-full border-gray-100" />
              
              <div className="flex flex-col gap-4 w-full">
                <div className="flex justify-center gap-6 text-primary">
                  <a href="#" className="p-2 bg-primary/5 rounded-full"><Facebook size={20} /></a>
                  <a href="#" className="p-2 bg-primary/5 rounded-full"><Instagram size={20} /></a>
                  <a href="https://goo.gl/maps/placeholder" className="p-2 bg-primary/5 rounded-full"><MapPin size={20} /></a>
                </div>
                
                <button 
                  onClick={handleBookingClick}
                  className="w-full bg-dark text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 uppercase tracking-widest text-sm"
                >
                  <Calendar size={18} /> Prenota Visita
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const NavLink = ({ to, children, className = "" }) => (
  <Link 
    to={to} 
    className={`relative group text-gray-500 hover:text-dark transition-colors py-2 ${className}`}
  >
    {children}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
  </Link>
);

const MobileNavLink = ({ to, onClick, children }) => (
  <Link 
    to={to} 
    onClick={onClick} 
    className="text-xl font-bold text-dark hover:text-primary transition-colors"
  >
    {children}
  </Link>
);

export default Navbar;