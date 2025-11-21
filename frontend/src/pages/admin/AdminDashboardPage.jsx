import { theme } from '../../theme/theme.constants';
import Card from '../../components/common/Card';

/**
 * Admin Dashboard Page
 * Basic admin dashboard - No localStorage or Redux dependencies
 */
const AdminDashboardPage = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '1,248',
      icon: '👥',
      color: theme.colors.primary,
    },
    {
      title: 'Total Cars',
      value: '342',
      icon: '🚗',
      color: theme.colors.info,
    },
    {
      title: 'Total Bookings',
      value: '1,856',
      icon: '📅',
      color: theme.colors.success,
    },
    {
      title: 'Total Revenue',
      value: '₹24.5L',
      icon: '💰',
      color: theme.colors.warning,
    },
  ];

  const quickActions = [
    {
      title: 'Manage Users',
      description: 'View and manage all users',
      icon: '👥',
      onClick: () => alert('User management - Coming soon'),
    },
    {
      title: 'Manage Cars',
      description: 'Approve and manage car listings',
      icon: '🚗',
      onClick: () => alert('Car management - Coming soon'),
    },
    {
      title: 'Manage Bookings',
      description: 'View and manage all bookings',
      icon: '📅',
      onClick: () => alert('Booking management - Coming soon'),
    },
    {
      title: 'View Reports',
      description: 'View platform analytics and reports',
      icon: '📊',
      onClick: () => alert('Reports - Coming soon'),
    },
  ];

  return (
    <div className="min-h-screen bg-background-primary">
      <div className="container-mobile py-6 md:py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2" style={{ color: theme.colors.primary }}>
            Admin Dashboard
          </h1>
          <p className="text-text-secondary">Welcome back, Admin!</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} variant="clickable" className="text-center">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold mb-1" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-xs font-medium text-text-primary">{stat.title}</div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                variant="clickable"
                onClick={action.onClick}
                className="flex items-start gap-4"
              >
                <div className="text-4xl">{action.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-text-primary mb-1">
                    {action.title}
                  </h3>
                  <p className="text-sm text-text-secondary">{action.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Recent Activity</h2>
          <Card>
            <div className="space-y-4">
              {[
                { type: 'booking', message: 'New booking #1234 created', time: '2 mins ago' },
                { type: 'user', message: 'New user registered: John Doe', time: '15 mins ago' },
                { type: 'car', message: 'New car listing added: Toyota Camry', time: '1 hour ago' },
                { type: 'payment', message: 'Payment received: ₹5,000', time: '2 hours ago' },
                { type: 'user', message: 'User profile updated', time: '3 hours ago' },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between pb-4 border-b border-border-light last:border-0 last:pb-0"
                >
                  <div className="flex-1">
                    <p className="text-sm text-text-primary">{activity.message}</p>
                    <p className="text-xs text-text-secondary mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

