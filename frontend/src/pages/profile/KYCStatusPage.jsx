import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { setKYCStatus } from '../../store/slices/userSlice';
import { theme } from '../../theme/theme.constants';
import toastUtils from '../../config/toast';

/**
 * KYCStatusPage Component
 * KYC verification page with DigiLocker integration
 * Based on document.txt - Aadhaar, PAN, Driving License via DigiLocker
 */
const KYCStatusPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { kycStatus } = useAppSelector((state) => state.user);

  // Local state for form data
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [drivingLicenseNumber, setDrivingLicenseNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Document verification status
  const documents = [
    {
      id: 'aadhaar',
      name: 'Aadhaar Card',
      description: 'Verify your Aadhaar card via DigiLocker',
      verified: kycStatus.aadhaar,
      number: aadhaarNumber,
      setNumber: setAadhaarNumber,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
        </svg>
      ),
    },
    {
      id: 'pan',
      name: 'PAN Card',
      description: 'Verify your PAN card via DigiLocker',
      verified: kycStatus.pan,
      number: panNumber,
      setNumber: setPanNumber,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      id: 'drivingLicense',
      name: 'Driving License',
      description: 'Verify your Driving License via DigiLocker',
      verified: kycStatus.drivingLicense,
      number: drivingLicenseNumber,
      setNumber: setDrivingLicenseNumber,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ];

  // Handle DigiLocker verification
  const handleDigiLockerVerify = async (documentId) => {
    setIsSubmitting(true);
    
    // Simulate DigiLocker OAuth2 redirect
    // In production, this would redirect to DigiLocker OAuth2 endpoint
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Mock verification success
      const updatedStatus = {
        [documentId]: true,
      };
      
      dispatch(setKYCStatus(updatedStatus));
      toastUtils.success(`${documents.find(doc => doc.id === documentId)?.name} verified successfully!`);
    }, 1500);
  };

  // Calculate overall KYC completion percentage
  const completedDocuments = documents.filter(doc => doc.verified).length;
  const completionPercentage = Math.round((completedDocuments / documents.length) * 100);

  return (
    <div className="min-h-screen pb-24 bg-white">
      {/* Header */}
      <header className="text-white relative overflow-hidden" style={{ backgroundColor: theme.colors.primary }}>
        <div className="relative px-4 pt-3 pb-2">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => navigate(-1)}
              className="p-1.5 -ml-1 touch-target"
              aria-label="Go back"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-lg font-bold text-white">KYC Verification</h1>
            <div className="w-8"></div>
          </div>
        </div>
      </header>

      {/* KYC Status Summary */}
      <div className="px-4 pt-4 pb-2">
        <div className="bg-white rounded-lg p-4 shadow-sm border" style={{ borderColor: theme.colors.borderLight }}>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-semibold" style={{ color: theme.colors.textPrimary }}>
              KYC Status
            </h2>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${
              kycStatus.verified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
            }`}>
              {kycStatus.verified ? 'Verified' : `${completionPercentage}% Complete`}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                kycStatus.verified ? 'bg-green-500' : 'bg-yellow-400'
              }`}
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          
          <p className="text-xs" style={{ color: theme.colors.textSecondary }}>
            {completedDocuments} of {documents.length} documents verified
          </p>
        </div>
      </div>

      {/* Documents List */}
      <div className="px-4 py-4 space-y-3">
        <h3 className="text-sm font-semibold mb-2" style={{ color: theme.colors.primary }}>
          Required Documents
        </h3>
        
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-lg p-4 shadow-sm border"
            style={{ borderColor: doc.verified ? theme.colors.success : theme.colors.borderLight }}
          >
            {/* Document Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3 flex-1">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    doc.verified ? 'bg-green-100' : 'bg-purple-50'
                  }`}
                  style={!doc.verified ? { backgroundColor: `${theme.colors.primary}15` } : {}}
                >
                  <div style={{ color: doc.verified ? theme.colors.success : theme.colors.primary }}>
                    {doc.icon}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold" style={{ color: theme.colors.textPrimary }}>
                    {doc.name}
                  </h4>
                  <p className="text-xs mt-0.5" style={{ color: theme.colors.textSecondary }}>
                    {doc.description}
                  </p>
                </div>
              </div>
              
              {/* Verification Badge */}
              {doc.verified && (
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>

            {/* Document Number Input (if not verified) */}
            {!doc.verified && (
              <div className="space-y-2">
                <div>
                  <label className="text-xs font-medium block mb-1" style={{ color: theme.colors.textSecondary }}>
                    {doc.id === 'aadhaar' ? 'Aadhaar Number' : doc.id === 'pan' ? 'PAN Number' : 'Driving License Number'}
                  </label>
                  <input
                    type="text"
                    value={doc.number}
                    onChange={(e) => doc.setNumber(e.target.value)}
                    placeholder={doc.id === 'aadhaar' ? 'Enter 12-digit Aadhaar' : doc.id === 'pan' ? 'Enter PAN (e.g., ABCDE1234F)' : 'Enter DL Number'}
                    className="w-full px-3 py-2.5 rounded-lg bg-white border text-sm focus:outline-none transition-colors"
                    style={{
                      borderColor: theme.colors.borderDefault,
                      color: theme.colors.textPrimary,
                    }}
                    onFocus={(e) => e.target.style.borderColor = theme.colors.primary}
                    onBlur={(e) => e.target.style.borderColor = theme.colors.borderDefault}
                    maxLength={doc.id === 'aadhaar' ? 12 : doc.id === 'pan' ? 10 : 20}
                  />
                </div>
                
                {/* DigiLocker Verify Button */}
                <button
                  onClick={() => handleDigiLockerVerify(doc.id)}
                  disabled={isSubmitting}
                  className="w-full py-2.5 rounded-lg font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: theme.colors.primary,
                    color: theme.colors.white,
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span>Verify via DigiLocker</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Verified Status */}
            {doc.verified && (
              <div className="flex items-center gap-2 p-2 rounded-lg bg-green-50">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-xs font-medium text-green-700">
                  Verified via DigiLocker
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Info Card */}
      <div className="px-4 pb-4">
        <div className="bg-purple-50 rounded-lg p-3 border" style={{ borderColor: `${theme.colors.primary}30` }}>
          <div className="flex items-start gap-2">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: theme.colors.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="text-xs font-semibold mb-1" style={{ color: theme.colors.primary }}>
                About DigiLocker Verification
              </h4>
              <p className="text-xs leading-relaxed" style={{ color: theme.colors.textSecondary }}>
                DigiLocker is a secure platform by the Government of India. Your documents are verified directly from government databases, ensuring authenticity and security. No physical documents are required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYCStatusPage;
