import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { logout } from '../../store/slices/authSlice';
import { clearUser } from '../../store/slices/userSlice';
import { theme } from '../../theme/theme.constants';
import toastUtils from '../../config/toast';

/**
 * SettingsPage Component
 * Settings page with account, profile, notifications, and app settings
 * Based on document.txt - Profile fields, notification preferences
 */
const SettingsPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  // Settings state
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [locationTracking, setLocationTracking] = useState(true);
  const [language, setLanguage] = useState('en');
  const [isSaving, setIsSaving] = useState(false);

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearUser());
    toastUtils.success('Logged out successfully');
    navigate('/');
  };

  // Handle save settings
  const handleSaveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toastUtils.success('Settings saved successfully!');
    }, 1000);
  };

  // Settings sections
  const settingsSections = [
    {
      id: 'account',
      title: 'Account Settings',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      items: [
        {
          id: 'edit-profile',
          label: 'Edit Profile',
          description: 'Update your personal information',
          action: () => navigate('/profile/complete'),
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          ),
        },
        {
          id: 'change-password',
          label: 'Change Password',
          description: 'Update your account password',
          action: () => toastUtils.info('Password change feature coming soon'),
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          ),
        },
      ],
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
      items: [
        {
          id: 'push-notifications',
          label: 'Push Notifications',
          description: 'Receive push notifications on your device',
          toggle: pushNotifications,
          onToggle: setPushNotifications,
        },
        {
          id: 'email-notifications',
          label: 'Email Notifications',
          description: 'Receive updates via email',
          toggle: emailNotifications,
          onToggle: setEmailNotifications,
        },
        {
          id: 'sms-notifications',
          label: 'SMS Notifications',
          description: 'Receive updates via SMS',
          toggle: smsNotifications,
          onToggle: setSmsNotifications,
        },
      ],
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      items: [
        {
          id: 'location-tracking',
          label: 'Location Tracking',
          description: 'Allow location tracking during trips',
          toggle: locationTracking,
          onToggle: setLocationTracking,
        },
        {
          id: 'privacy-policy',
          label: 'Privacy Policy',
          description: 'View our privacy policy',
          action: () => toastUtils.info('Privacy policy page coming soon'),
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          ),
        },
        {
          id: 'terms',
          label: 'Terms & Conditions',
          description: 'View terms and conditions',
          action: () => toastUtils.info('Terms & conditions page coming soon'),
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),
        },
      ],
    },
    {
      id: 'app',
      title: 'App Settings',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      items: [
        {
          id: 'language',
          label: 'Language',
          description: 'Select app language',
          value: language === 'en' ? 'English' : 'Hindi',
          action: () => {
            setLanguage(language === 'en' ? 'hi' : 'en');
            toastUtils.success(`Language changed to ${language === 'en' ? 'Hindi' : 'English'}`);
          },
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
          ),
        },
        {
          id: 'about',
          label: 'About',
          description: 'App version and information',
          value: 'Version 1.0.0',
          action: () => toastUtils.info('DriveOn Car Rental App v1.0.0'),
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen pb-24 bg-gray-50">
      {/* Header */}
      <header className="text-white relative overflow-hidden shadow-md" style={{ backgroundColor: theme.colors.primary }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12"></div>
        </div>
        <div className="relative px-4 pt-3 pb-3">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => navigate(-1)}
              className="p-1.5 -ml-1 touch-target hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Go back"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-lg font-bold text-white">Settings</h1>
            <div className="w-8"></div>
          </div>
        </div>
      </header>

      {/* Settings Sections */}
      <div className="px-4 py-4 space-y-5">
        {settingsSections.map((section) => (
          <div key={section.id} className="bg-white rounded-xl shadow-lg border-2 overflow-hidden" style={{ borderColor: theme.colors.borderLight }}>
            {/* Section Header */}
            <div className="px-4 pt-4 pb-3 border-b-2 bg-gradient-to-r to-white" style={{ borderColor: `${theme.colors.primary}20`, background: `linear-gradient(to right, ${theme.colors.primary}08, white)` }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm" style={{ backgroundColor: `${theme.colors.primary}20` }}>
                  <div style={{ color: theme.colors.primary }}>
                    {section.icon}
                  </div>
                </div>
                <h2 className="text-base font-bold" style={{ color: theme.colors.textPrimary }}>
                  {section.title}
                </h2>
              </div>
            </div>

            {/* Section Items */}
            <div className="divide-y" style={{ borderColor: `${theme.colors.borderLight}80` }}>
              {section.items.map((item, index) => (
                <div
                  key={item.id}
                  className={`px-4 transition-colors hover:bg-gray-50 ${index === 0 ? 'pt-4' : ''} ${index === section.items.length - 1 ? 'pb-4' : 'py-4'}`}
                >
                  {item.toggle !== undefined ? (
                    // Toggle Item
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        {item.icon && (
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${theme.colors.primary}10` }}>
                            <div style={{ color: theme.colors.primary }}>
                              {item.icon}
                            </div>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold mb-1" style={{ color: theme.colors.textPrimary }}>
                            {item.label}
                          </p>
                          <p className="text-xs leading-relaxed" style={{ color: theme.colors.textSecondary }}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={item.toggle}
                          onChange={(e) => item.onToggle(e.target.checked)}
                          className="sr-only peer"
                          style={{
                            '--tw-ring-color': `${theme.colors.primary}50`,
                          }}
                          onFocus={(e) => {
                            e.target.parentElement.querySelector('div').style.outline = `2px solid ${theme.colors.primary}50`;
                            e.target.parentElement.querySelector('div').style.outlineOffset = '2px';
                          }}
                          onBlur={(e) => {
                            e.target.parentElement.querySelector('div').style.outline = 'none';
                            e.target.parentElement.querySelector('div').style.outlineOffset = '0';
                          }}
                        />
                        <div 
                          className="w-12 h-6 rounded-full transition-all duration-300 shadow-inner"
                          style={{
                            backgroundColor: item.toggle ? theme.colors.primary : '#d1d5db',
                            boxShadow: item.toggle ? `inset 0 2px 4px ${theme.colors.primary}40` : 'inset 0 2px 4px rgba(0,0,0,0.1)',
                          }}
                        >
                          <div 
                            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                              item.toggle ? 'translate-x-6' : 'translate-x-0'
                            }`}
                          ></div>
                        </div>
                      </label>
                    </div>
                  ) : (
                    // Action Item
                    <button
                      onClick={item.action}
                      className="w-full flex items-center justify-between group active:scale-[0.98] transition-transform"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0 text-left">
                        {item.icon && (
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors group-hover:scale-110" style={{ backgroundColor: `${theme.colors.primary}10`, color: theme.colors.primary }}>
                            {item.icon}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p 
                              className="text-sm font-bold transition-colors" 
                              style={{ 
                                color: theme.colors.textPrimary,
                              }}
                              onMouseEnter={(e) => e.target.style.color = theme.colors.primary}
                              onMouseLeave={(e) => e.target.style.color = theme.colors.textPrimary}
                            >
                              {item.label}
                            </p>
                          </div>
                          <p className="text-xs leading-relaxed mb-0.5" style={{ color: theme.colors.textSecondary }}>
                            {item.description}
                          </p>
                          {item.value && (
                            <p className="text-xs font-semibold mt-1 inline-block px-2 py-0.5 rounded-md" style={{ backgroundColor: `${theme.colors.primary}15`, color: theme.colors.primary }}>
                              {item.value}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-2">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                          style={{ backgroundColor: 'transparent' }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = `${theme.colors.primary}15`}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                          <svg 
                            className="w-5 h-5 transition-colors" 
                            style={{ color: '#9ca3af' }}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            onMouseEnter={(e) => e.target.style.color = theme.colors.primary}
                            onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Save Button */}
        <button
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="w-full py-4 rounded-xl font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2"
          style={{
            background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryLight} 100%)`,
            color: theme.colors.white,
          }}
        >
          {isSaving ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span>Save Settings</span>
            </>
          )}
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full py-4 rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2 border-2"
          style={{
            backgroundColor: theme.colors.white,
            color: theme.colors.error,
            borderColor: theme.colors.error,
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
