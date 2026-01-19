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
  FileText // Added icon for Blog
} from 'lucide-react';

const AdminSidebar = () => {
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
    { name: 'Blog & News', icon: <FileText size={20} />, path: '/admin/blogs' }, // NEW LINK
  ];

  return (
    <aside className="w-64 bg-[#1A1A1A] h-screen fixed left-0 top-0 flex flex-col text-white shadow-2xl z-50">
      {/* Brand Header */}
      <div className="p-8 border-b border-white/5">
        <div className="flex flex-col">
          <span className="text-sm font-bold tracking-[0.2em] text-[#5EAEB4]">
            GERI
          </span>
          <span className="text-xs font-light text-gray-400 uppercase tracking-widest">
            Dental Admin
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-8 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
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
  );
};

export default AdminSidebar;