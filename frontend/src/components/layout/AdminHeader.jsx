import { useSelector, useDispatch } from 'react-redux';
import { Menu, Bell, Search, LogOut, User as UserIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';
import { motion, AnimatePresence } from 'framer-motion';

const AdminHeader = ({ onMenuClick }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-gray-100 px-6 py-4 flex items-center justify-between transition-all">
      
      {/* Left: Mobile Menu & Breadcrumb/Title Placeholder */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <Menu size={24} />
        </button>

        {/* Optional: You could put a global search or breadcrumbs here */}
        <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
          <span className="font-medium text-gray-300">Admin</span>
          <span>/</span>
          <span className="font-bold text-primary">Panel</span>
        </div>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-4">
        
        {/* Global Search (Visual Only for now) */}
        <div className="hidden md:flex relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
            <input 
                type="text" 
                placeholder="Ricerca globale..." 
                className="pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:bg-white outline-none transition-all w-64"
            />
        </div>

        {/* Notifications */}
        <button className="relative p-2.5 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 bg-white hover:bg-gray-50 border border-gray-100 p-1.5 pr-4 rounded-full transition-all shadow-sm"
          >
            <div className="w-9 h-9 rounded-full bg-dark text-white flex items-center justify-center font-bold text-sm shadow-md">
              {userInfo?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="hidden md:flex flex-col items-start">
                <span className="text-xs font-bold text-dark leading-tight">{userInfo?.name}</span>
                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{userInfo?.role}</span>
            </div>
          </button>

          <AnimatePresence>
            {showDropdown && (
                <>
                    {/* Backdrop to close */}
                    <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)}></div>
                    
                    {/* Dropdown Menu */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-20"
                    >
                        <div className="p-2 space-y-1">
                            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                                <UserIcon size={16} /> Profilo
                            </button>
                            <button 
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors font-medium"
                            >
                                <LogOut size={16} /> Logout
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
          </AnimatePresence>
        </div>

      </div>
    </header>
  );
};

export default AdminHeader;