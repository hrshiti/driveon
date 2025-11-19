import { Outlet, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import Header from './Header';
import Footer from './Footer';
import BottomNavbar from './BottomNavbar';

/**
 * PageLayout Component
 * Main layout wrapper for all pages
 * Includes Header, Footer, BottomNavbar (mobile), and loading states
 */
const PageLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  // Routes where header and bottom navbar should be hidden
  const hideNavigationRoutes = ['/login', '/register', '/verify-otp'];
  const shouldHideNavigation = hideNavigationRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-background-primary flex flex-col">
      {/* Header - Mobile and Desktop (hidden on homepage and auth pages) */}
      {!isHomePage && !shouldHideNavigation && <Header />}

      {/* Main Content */}
      <main className={`flex-1 ${shouldHideNavigation ? '' : isHomePage ? '' : 'pb-16 md:pb-0'}`}>
        {/* Loading fallback for lazy-loaded routes */}
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-text-secondary">Loading...</p>
              </div>
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>

      {/* Footer - Desktop Only (hidden on auth pages) */}
      {!isHomePage && !shouldHideNavigation && <Footer />}

      {/* Bottom Navbar - Mobile Only (hidden on auth pages) */}
      {!shouldHideNavigation && <BottomNavbar />}
    </div>
  );
};

export default PageLayout;

