import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { theme } from '../../../theme/theme.constants';
import Card from '../../../components/common/Card';

/**
 * Reports & Analytics Page
 * Admin can view analytics, generate reports, and export data
 * No localStorage or Redux - All state managed via React hooks
 */
const ReportsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get initial view from URL
  const getInitialView = () => {
    if (location.pathname.includes('/users')) return 'users';
    if (location.pathname.includes('/bookings')) return 'bookings';
    if (location.pathname.includes('/revenue')) return 'revenue';
    if (location.pathname.includes('/custom')) return 'custom';
    return 'dashboard';
  };

  // State management
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState(getInitialView()); // dashboard, users, bookings, revenue, custom
  const [dateRange, setDateRange] = useState('month'); // today, week, month, year, custom
  const [reportData, setReportData] = useState({});

  // Mock report data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockData = {
        dashboard: {
          totalUsers: 1248,
          activeBookings: 45,
          revenue: { daily: 125000, weekly: 875000, monthly: 3750000 },
          pendingKYC: 23,
          activeTrips: 12,
          userGrowth: [
            { month: 'Jan', users: 800 },
            { month: 'Feb', users: 950 },
            { month: 'Mar', users: 1248 },
          ],
          revenueTrend: [
            { month: 'Jan', revenue: 2500000 },
            { month: 'Feb', revenue: 3200000 },
            { month: 'Mar', revenue: 3750000 },
          ],
        },
        users: {
          totalUsers: 1248,
          newUsers: 298,
          activeUsers: 856,
          inactiveUsers: 94,
          userGrowth: [
            { date: '2024-03-01', count: 1000 },
            { date: '2024-03-08', count: 1100 },
            { date: '2024-03-15', count: 1200 },
            { date: '2024-03-22', count: 1248 },
          ],
          topLocations: [
            { location: 'Mumbai', users: 450 },
            { location: 'Delhi', users: 320 },
            { location: 'Bangalore', users: 280 },
            { location: 'Pune', users: 198 },
          ],
        },
        bookings: {
          totalBookings: 342,
          confirmed: 280,
          completed: 245,
          cancelled: 17,
          bookingTrends: [
            { date: '2024-03-01', bookings: 12 },
            { date: '2024-03-08', bookings: 15 },
            { date: '2024-03-15', bookings: 18 },
            { date: '2024-03-22', bookings: 20 },
          ],
          popularCars: [
            { car: 'Toyota Camry', bookings: 45 },
            { car: 'Honda City', bookings: 38 },
            { car: 'BMW 7 Series', bookings: 32 },
            { car: 'Maruti Swift', bookings: 28 },
          ],
        },
        revenue: {
          totalRevenue: 3750000,
          dailyRevenue: 125000,
          weeklyRevenue: 875000,
          monthlyRevenue: 3750000,
          revenueBySource: [
            { source: 'Bookings', amount: 3500000 },
            { source: 'Security Deposits', amount: 150000 },
            { source: 'Penalties', amount: 100000 },
          ],
          revenueTrend: [
            { month: 'Jan', revenue: 2500000 },
            { month: 'Feb', revenue: 3200000 },
            { month: 'Mar', revenue: 3750000 },
          ],
        },
      };
      setReportData(mockData);
      setLoading(false);
    }, 500);
  }, []);

  const handleExport = (type) => {
    // In real app, this would generate and download PDF/Excel
    console.log(`Exporting ${type} report...`);
    alert(`${type} report export would be generated here`);
  };

  const handleGenerateCustomReport = () => {
    // In real app, this would open a custom report generator
    alert('Custom report generator would open here');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 mx-auto mb-4"
            style={{ borderColor: theme.colors.primary }}
          ></div>
          <p className="text-gray-600">Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2" style={{ color: theme.colors.primary }}>
                Reports & Analytics
              </h1>
              <p className="text-sm md:text-base text-gray-600">View analytics and generate reports</p>
            </div>
            <div className="flex gap-2">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
              <button
                onClick={handleGenerateCustomReport}
                className="px-4 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-all"
                style={{ backgroundColor: theme.colors.primary }}
              >
                Generate Custom Report
              </button>
            </div>
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 border-b border-gray-200">
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'users', label: 'Users' },
              { id: 'bookings', label: 'Bookings' },
              { id: 'revenue', label: 'Revenue' },
              { id: 'custom', label: 'Custom' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setViewMode(tab.id)}
                className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
                  viewMode === tab.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
                style={viewMode === tab.id ? { borderBottomColor: theme.colors.primary } : {}}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard View */}
        {viewMode === 'dashboard' && reportData.dashboard && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Card className="p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold mb-1" style={{ color: theme.colors.primary }}>
                  {reportData.dashboard.totalUsers}
                </div>
                <div className="text-xs md:text-sm text-gray-600">Total Users</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold mb-1 text-green-600">
                  {reportData.dashboard.activeBookings}
                </div>
                <div className="text-xs md:text-sm text-gray-600">Active Bookings</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-xl md:text-2xl font-bold mb-1" style={{ color: theme.colors.primary }}>
                  ₹{(reportData.dashboard.revenue.monthly / 100000).toFixed(1)}L
                </div>
                <div className="text-xs md:text-sm text-gray-600">Monthly Revenue</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold mb-1 text-yellow-600">
                  {reportData.dashboard.pendingKYC}
                </div>
                <div className="text-xs md:text-sm text-gray-600">Pending KYC</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold mb-1 text-blue-600">
                  {reportData.dashboard.activeTrips}
                </div>
                <div className="text-xs md:text-sm text-gray-600">Active Trips</div>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">User Growth</h3>
                  <button
                    onClick={() => handleExport('user-growth')}
                    className="text-sm text-purple-600 hover:underline"
                  >
                    Export
                  </button>
                </div>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Chart: User Growth Trend</p>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
                  <button
                    onClick={() => handleExport('revenue-trend')}
                    className="text-sm text-purple-600 hover:underline"
                  >
                    Export
                  </button>
                </div>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Chart: Revenue Trend</p>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Users Report View */}
        {viewMode === 'users' && reportData.users && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">User Reports</h2>
              <button
                onClick={() => handleExport('users')}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Export Report
              </button>
            </div>

            {/* User Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold mb-1" style={{ color: theme.colors.primary }}>
                  {reportData.users.totalUsers}
                </div>
                <div className="text-xs text-gray-600">Total Users</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold mb-1 text-green-600">{reportData.users.newUsers}</div>
                <div className="text-xs text-gray-600">New Users</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold mb-1 text-blue-600">{reportData.users.activeUsers}</div>
                <div className="text-xs text-gray-600">Active Users</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold mb-1 text-gray-600">{reportData.users.inactiveUsers}</div>
                <div className="text-xs text-gray-600">Inactive Users</div>
              </Card>
            </div>

            {/* User Growth Chart */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth Trend</h3>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Chart: User Growth Over Time</p>
              </div>
            </Card>

            {/* Top Locations */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Users by Location</h3>
              <div className="space-y-3">
                {reportData.users.topLocations.map((location, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                      </span>
                      <span className="font-medium text-gray-900">{location.location}</span>
                    </div>
                    <span className="font-semibold text-gray-900">{location.users} users</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Bookings Report View */}
        {viewMode === 'bookings' && reportData.bookings && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Booking Reports</h2>
              <button
                onClick={() => handleExport('bookings')}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Export Report
              </button>
            </div>

            {/* Booking Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold mb-1" style={{ color: theme.colors.primary }}>
                  {reportData.bookings.totalBookings}
                </div>
                <div className="text-xs text-gray-600">Total Bookings</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold mb-1 text-blue-600">{reportData.bookings.confirmed}</div>
                <div className="text-xs text-gray-600">Confirmed</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold mb-1 text-green-600">{reportData.bookings.completed}</div>
                <div className="text-xs text-gray-600">Completed</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold mb-1 text-red-600">{reportData.bookings.cancelled}</div>
                <div className="text-xs text-gray-600">Cancelled</div>
              </Card>
            </div>

            {/* Booking Trends Chart */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Trends</h3>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Chart: Booking Trends Over Time</p>
              </div>
            </Card>

            {/* Popular Cars */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Popular Cars</h3>
              <div className="space-y-3">
                {reportData.bookings.popularCars.map((car, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                      </span>
                      <span className="font-medium text-gray-900">{car.car}</span>
                    </div>
                    <span className="font-semibold text-gray-900">{car.bookings} bookings</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Revenue Report View */}
        {viewMode === 'revenue' && reportData.revenue && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Revenue Reports</h2>
              <button
                onClick={() => handleExport('revenue')}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Export Report
              </button>
            </div>

            {/* Revenue Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4 text-center">
                <div className="text-xl font-bold mb-1" style={{ color: theme.colors.primary }}>
                  ₹{(reportData.revenue.totalRevenue / 100000).toFixed(1)}L
                </div>
                <div className="text-xs text-gray-600">Total Revenue</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-xl font-bold mb-1" style={{ color: theme.colors.primary }}>
                  ₹{(reportData.revenue.dailyRevenue / 1000).toFixed(0)}K
                </div>
                <div className="text-xs text-gray-600">Daily Revenue</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-xl font-bold mb-1" style={{ color: theme.colors.primary }}>
                  ₹{(reportData.revenue.weeklyRevenue / 100000).toFixed(1)}L
                </div>
                <div className="text-xs text-gray-600">Weekly Revenue</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-xl font-bold mb-1" style={{ color: theme.colors.primary }}>
                  ₹{(reportData.revenue.monthlyRevenue / 100000).toFixed(1)}L
                </div>
                <div className="text-xs text-gray-600">Monthly Revenue</div>
              </Card>
            </div>

            {/* Revenue Trend Chart */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Chart: Revenue Trend Over Time</p>
              </div>
            </Card>

            {/* Revenue by Source */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Source</h3>
              <div className="space-y-3">
                {reportData.revenue.revenueBySource.map((source, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">{source.source}</span>
                      <span className="font-semibold text-gray-900">₹{source.amount.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{
                          width: `${(source.amount / reportData.revenue.totalRevenue) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Custom Report View */}
        {viewMode === 'custom' && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Custom Report Generator</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>Select Report Type</option>
                  <option>User Activity Report</option>
                  <option>Car Utilization Report</option>
                  <option>Payment Summary Report</option>
                  <option>KYC Status Report</option>
                  <option>Referral Activity Report</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="format" value="pdf" className="w-4 h-4" />
                    <span className="text-sm text-gray-700">PDF</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="format" value="excel" className="w-4 h-4" defaultChecked />
                    <span className="text-sm text-gray-700">Excel</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="format" value="csv" className="w-4 h-4" />
                    <span className="text-sm text-gray-700">CSV</span>
                  </label>
                </div>
              </div>

              <button
                onClick={handleGenerateCustomReport}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                Generate Report
              </button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;

