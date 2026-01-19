import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Users, 
  Stethoscope, 
  LogOut,
  ChevronRight,
  FileText,
  X // Added Close icon
} from 'lucide-react';

// Now accepts props for mobile state management
const AdminSidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin/dashboard' },
    { name: 'Appuntamenti', icon: <CalendarCheck size={20} />, path: '/admin/appointments' },
    { name: 'Pazienti', icon: <Users size={20} />, path: '/admin/patients' },
    { name: 'Prestazioni', icon: <Stethoscope size={20} />, path: '/admin/services' },
    { name: 'Blog & News', icon: <FileText size={20} />, path: '/admin/blogs' },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-[#1A1A1A] text-white shadow-2xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between p-8 border-b border-white/5">
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-[0.2em] text-[#5EAEB4]">
              GERI
            </span>
            <span className="text-xs font-light text-gray-400 uppercase tracking-widest">
              Dental Admin
            </span>
          </div>
          {/* Mobile Close Button */}
          <button 
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={onClose} // Close sidebar on mobile when link is clicked
              className={({ isActive }) => `
                flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group
                ${isActive 
                  ? 'bg-[#5EAEB4] text-white shadow-lg shadow-[#5EAEB4]/20' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'}
              `}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="text-sm font-medium">{item.name}</span>
              </div>
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </NavLink>
          ))}
        </nav>

        {/* Bottom Profile / Logout Section */}
        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all duration-300"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Esci</span>
          </button>
        </div>

        {/* Subtle branding accent */}
        <div className="h-1 bg-gradient-to-r from-[#5EAEB4] to-[#BDE4DE]"></div>
      </aside>
    </>
  );
};

export default AdminSidebar;