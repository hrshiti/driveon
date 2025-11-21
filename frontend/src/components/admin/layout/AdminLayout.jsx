import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

/**
 * Admin Layout Component
 * Main layout wrapper for all admin pages
 * Includes Sidebar and Header
 * No localStorage - All state managed via React hooks
 */
const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <AdminHeader />

        {/* Page Content */}
        <main className="pt-16 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

