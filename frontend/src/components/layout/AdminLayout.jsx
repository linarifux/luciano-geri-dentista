import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../admin/AdminSidebar';
import AdminHeader from './AdminHeader'; // Import the new header

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
        
        {/* --- NEW: Global Admin Header --- */}
        {/* Handles Mobile Toggle (hamburger) and User Profile */}
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

        {/* Page Content */}
        {/* Added p-6 to p-10 here so individual pages don't need outer padding styling repeatedly */}
        <main className="flex-1 overflow-x-hidden p-4 md:p-8 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;