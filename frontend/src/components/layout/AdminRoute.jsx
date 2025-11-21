import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { theme } from '../../theme/theme.constants';

/**
 * AdminRoute Component
 * Guards routes that require admin role
 * Redirects to home if user is not admin
 * Uses React Hooks only - No Redux, No localStorage
 */
const AdminRoute = () => {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check admin status (in real app, this would come from context/API)
    // For now, using a simple check - can be replaced with context later
    const checkAdminStatus = async () => {
      setIsLoading(true);
      // TODO: Replace with actual admin check from context/API
      // Mock: Check if user has admin role
      // This should come from a context provider or API call
      const mockIsAdmin = true; // Replace with actual check
      setIsAdmin(mockIsAdmin);
      setIsLoading(false);
    };

    checkAdminStatus();
  }, []);

  if (isLoading) {
    // Show loading spinner while checking admin status
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 mx-auto mb-4"
            style={{ borderColor: theme.colors.primary }}
          ></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    // Redirect to home if not admin
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;

