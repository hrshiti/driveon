import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { theme } from '../../../theme/theme.constants';
import Card from '../../../components/common/Card';

/**
 * Admin Settings Page
 * Admin can manage system settings, features, notifications, and security
 * No localStorage or Redux - All state managed via React hooks
 */
const AdminSettingsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get initial tab from URL
  const getInitialTab = () => {
    if (location.pathname.includes('/notifications')) return 'notifications';
    if (location.pathname.includes('/security')) return 'security';
    if (location.pathname.includes('/features')) return 'features';
    return 'general';
  };

  // State management
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(getInitialTab());
  const [saved, setSaved] = useState(false);
  
  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    appName: 'DriveOn',
    appLogo: '',
    contactEmail: 'support@driveon.com',
    contactPhone: '+91 98765 43210',
    supportEmail: 'support@driveon.com',
    supportPhone: '+91 98765 43210',
    address: '123 Main Street, Mumbai, Maharashtra 400001',
  });

  // Feature Toggles
  const [featureToggles, setFeatureToggles] = useState({
    maintenanceMode: false,
    enableKYC: true,
    enableGuarantor: true,
    enableReferrals: true,
    enableDynamicPricing: true,
    enableSurgePricing: true,
    enableCoupons: true,
    enableTracking: true,
    enableNotifications: true,
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    bookingConfirmationEmail: true,
    bookingReminderEmail: true,
    paymentConfirmationEmail: true,
    kycApprovalEmail: true,
    kycRejectionEmail: true,
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    passwordMinLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    sessionTimeout: 30, // minutes
    enableIPWhitelist: false,
    ipWhitelist: [],
  });

  // Mock data loading
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  const handleSaveGeneral = () => {
    // In real app, this would save to API
    console.log('Saving general settings:', generalSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleSaveFeatures = () => {
    // In real app, this would save to API
    console.log('Saving feature toggles:', featureToggles);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleSaveNotifications = () => {
    // In real app, this would save to API
    console.log('Saving notification settings:', notificationSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleSaveSecurity = () => {
    // In real app, this would save to API
    console.log('Saving security settings:', securitySettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAddIP = () => {
    const ip = prompt('Enter IP address:');
    if (ip) {
      setSecuritySettings((prev) => ({
        ...prev,
        ipWhitelist: [...prev.ipWhitelist, ip],
      }));
    }
  };

  const handleRemoveIP = (ip) => {
    setSecuritySettings((prev) => ({
      ...prev,
      ipWhitelist: prev.ipWhitelist.filter((i) => i !== ip),
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 mx-auto mb-4"
            style={{ borderColor: theme.colors.primary }}
          ></div>
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 pt-20 md:pt-6 pb-6 md:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2" style={{ color: theme.colors.primary }}>
            System Settings
          </h1>
          <p className="text-sm md:text-base text-gray-600">Manage system configuration and preferences</p>
        </div>

        {/* Success Message */}
        {saved && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-green-800">Settings saved successfully!</span>
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 border-b border-gray-200">
            {[
              { id: 'general', label: 'General' },
              { id: 'features', label: 'Features' },
              { id: 'notifications', label: 'Notifications' },
              { id: 'security', label: 'Security' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
                style={activeTab === tab.id ? { borderBottomColor: theme.colors.primary } : {}}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* General Settings Tab */}
        {activeTab === 'general' && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">General Settings</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">App Name</label>
                <input
                  type="text"
                  value={generalSettings.appName}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, appName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">App Logo</label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                    {generalSettings.appLogo ? (
                      <img src={generalSettings.appLogo} alt="Logo" className="w-full h-full object-contain rounded-lg" />
                    ) : (
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                    Upload Logo
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                  <input
                    type="email"
                    value={generalSettings.contactEmail}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, contactEmail: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                  <input
                    type="tel"
                    value={generalSettings.contactPhone}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, contactPhone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
                  <input
                    type="email"
                    value={generalSettings.supportEmail}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, supportEmail: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Support Phone</label>
                  <input
                    type="tel"
                    value={generalSettings.supportPhone}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, supportPhone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  value={generalSettings.address}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows="3"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveGeneral}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </Card>
        )}

        {/* Features Tab */}
        {activeTab === 'features' && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Feature Toggles</h2>
            <div className="space-y-4">
              {Object.entries(featureToggles).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <label className="text-sm font-medium text-gray-900 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      {key === 'maintenanceMode' && 'Enable maintenance mode to restrict access'}
                      {key === 'enableKYC' && 'Allow users to complete KYC verification'}
                      {key === 'enableGuarantor' && 'Enable guarantor feature for bookings'}
                      {key === 'enableReferrals' && 'Enable referral program and points'}
                      {key === 'enableDynamicPricing' && 'Enable dynamic pricing rules'}
                      {key === 'enableSurgePricing' && 'Enable surge pricing based on demand'}
                      {key === 'enableCoupons' && 'Enable coupon and discount codes'}
                      {key === 'enableTracking' && 'Enable real-time vehicle tracking'}
                      {key === 'enableNotifications' && 'Enable push notifications'}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) =>
                        setFeatureToggles({ ...featureToggles, [key]: e.target.checked })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              ))}
              <div className="flex justify-end pt-4">
                <button
                  onClick={handleSaveFeatures}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </Card>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Settings</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Channels</h3>
                <div className="space-y-4">
                  {[
                    { key: 'emailNotifications', label: 'Email Notifications' },
                    { key: 'smsNotifications', label: 'SMS Notifications' },
                    { key: 'pushNotifications', label: 'Push Notifications' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-900">{item.label}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings[item.key]}
                          onChange={(e) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              [item.key]: e.target.checked,
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Email Templates</h3>
                <div className="space-y-4">
                  {[
                    { key: 'bookingConfirmationEmail', label: 'Booking Confirmation' },
                    { key: 'bookingReminderEmail', label: 'Booking Reminder' },
                    { key: 'paymentConfirmationEmail', label: 'Payment Confirmation' },
                    { key: 'kycApprovalEmail', label: 'KYC Approval' },
                    { key: 'kycRejectionEmail', label: 'KYC Rejection' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-900">{item.label}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings[item.key]}
                          onChange={(e) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              [item.key]: e.target.checked,
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={handleSaveNotifications}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </Card>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Password Policy</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Password Length</label>
                    <input
                      type="number"
                      value={securitySettings.passwordMinLength}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          passwordMinLength: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      min="6"
                      max="20"
                    />
                  </div>
                  <div className="space-y-3">
                    {[
                      { key: 'requireUppercase', label: 'Require Uppercase Letters' },
                      { key: 'requireLowercase', label: 'Require Lowercase Letters' },
                      { key: 'requireNumbers', label: 'Require Numbers' },
                      { key: 'requireSpecialChars', label: 'Require Special Characters' },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-900">{item.label}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={securitySettings[item.key]}
                            onChange={(e) =>
                              setSecuritySettings({
                                ...securitySettings,
                                [item.key]: e.target.checked,
                              })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Session Management</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                  <input
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) =>
                      setSecuritySettings({
                        ...securitySettings,
                        sessionTimeout: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    min="5"
                    max="120"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">IP Whitelisting</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-900">Enable IP Whitelist</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={securitySettings.enableIPWhitelist}
                        onChange={(e) =>
                          setSecuritySettings({
                            ...securitySettings,
                            enableIPWhitelist: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>

                  {securitySettings.enableIPWhitelist && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <button
                          onClick={handleAddIP}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                        >
                          Add IP Address
                        </button>
                      </div>
                      <div className="space-y-2">
                        {securitySettings.ipWhitelist.map((ip, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <span className="text-sm font-mono text-gray-900">{ip}</span>
                            <button
                              onClick={() => handleRemoveIP(ip)}
                              className="text-red-600 hover:text-red-700 text-sm font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        {securitySettings.ipWhitelist.length === 0 && (
                          <p className="text-sm text-gray-500">No IP addresses whitelisted</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={handleSaveSecurity}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminSettingsPage;

