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
    <div className="min-h-screen bg-gray-50 flex overflow-x-hidden max-w-full">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 min-w-0 overflow-x-hidden max-w-full">
        {/* Header */}
        <AdminHeader />

        {/* Page Content */}
        <main className="pt-16 min-h-screen overflow-x-hidden max-w-full">
          <div className="w-full max-w-full overflow-x-hidden">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

