import { Outlet } from 'react-router-dom';
import AdminSidebar from '../admin/AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50/50">
      {/* Sidebar - Fixed width */}
      <AdminSidebar />

      {/* Main Content - Takes remaining space */}
      <div className="flex-1 ml-64 min-h-screen">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;