import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

/**
 * BottomNavbar Component
 * Mobile-only bottom navigation bar
 * Matches the design: Home, Chat, Add (center button), Explore, Profile
 */
const BottomNavbar = () => {
  const location = useLocation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const navItems = [
    {
      path: '/',
      label: 'Home',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      ),
    },
    {
      path: '/chat',
      label: 'Chat',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      ),
      requiresAuth: true,
    },
    {
      type: 'add',
      label: 'Add',
      onClick: () => {
        // Handle add action - could navigate to add car or booking
        if (isAuthenticated) {
          // Navigate to appropriate add page
        }
      },
    },
    {
      path: '/explore',
      label: 'Explore',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
    },
    {
      path: '/profile',
      label: 'Profile',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      ),
      requiresAuth: true,
    },
  ];

  const isActive = (path) => {
    if (!path) return false;
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleClick = (item, e) => {
    if (item.requiresAuth && !isAuthenticated) {
      e.preventDefault();
      window.location.href = '/login';
    }
    if (item.onClick) {
      e.preventDefault();
      item.onClick();
    }
  };

  return (
    <nav 
      className="md:hidden fixed bottom-0 left-0 right-0 w-full bg-white border-t border-gray-200 z-50 shadow-lg"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%'
      }}
    >
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item, index) => {
          // Special handling for Add button (center button)
          if (item.type === 'add') {
            return (
              <button
                key="add"
                onClick={handleClick.bind(null, item)}
                className="flex flex-col items-center justify-center -mt-6 touch-target"
                aria-label={item.label}
              >
                <div className="w-14 h-14 bg-[#3d096d] rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
              </button>
            );
          }

          const active = isActive(item.path);
          const disabled = item.requiresAuth && !isAuthenticated;

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={(e) => handleClick(item, e)}
              className={`
                flex flex-col items-center justify-center gap-1 px-2 py-1 rounded-lg transition-colors touch-target
                ${active ? 'text-[#3d096d]' : 'text-gray-500'}
                ${disabled ? 'opacity-50' : ''}
                ${active ? 'bg-[#3d096d]/10' : ''}
              `}
              aria-label={item.label}
            >
              <svg
                className={`w-6 h-6 ${active ? 'text-[#3d096d]' : 'text-gray-500'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {item.icon}
              </svg>
              <span className={`text-xs font-medium ${active ? 'text-[#3d096d]' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavbar;

