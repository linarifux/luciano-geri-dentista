import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../admin/AdminSidebar';
import { Menu } from 'lucide-react';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50/50 flex">
      {/* Sidebar (Responsive) */}
      <AdminSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-64 transition-all duration-300">
        
        {/* Mobile Header Trigger */}
        <div className="lg:hidden bg-white px-6 py-4 shadow-sm border-b border-gray-100 flex items-center justify-between sticky top-0 z-30">
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-[0.2em] text-[#5EAEB4]">GERI</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-widest">Admin Panel</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 -mr-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;