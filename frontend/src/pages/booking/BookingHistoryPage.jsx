import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { BOOKING_STATUS } from '../../constants';

// Import car images from assets
import carImg1 from '../../assets/car_img1-removebg-preview.png';
import carImg2 from '../../assets/car_img2-removebg-preview.png';
import carImg3 from '../../assets/car_img3-removebg-preview.png';
import carImg4 from '../../assets/car_img4-removebg-preview.png';
import carImg5 from '../../assets/car_img5-removebg-preview.png';
import carImg6 from '../../assets/car_img6-removebg-preview.png';
import carImg7 from '../../assets/car_img7-removebg-preview.png';

// Array of car images for easy access
const carImages = [carImg1, carImg2, carImg3, carImg4, carImg5, carImg6, carImg7];

/**
 * BookingHistoryPage Component
 * Shows user's booking history with tabs: Active, Completed, Cancelled
 * Mobile-first design matching the provided UI structure
 */
const BookingHistoryPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('completed'); // 'active', 'completed', 'cancelled'

  // Get car image from assets based on car ID or index
  const getCarImage = (carId) => {
    // Use car ID to get a consistent image (modulo to cycle through available images)
    const index = parseInt(carId.replace(/\D/g, '')) || 0;
    return carImages[index % carImages.length];
  };

  // Mock booking data - Replace with actual API call later
  const mockBookings = {
    active: [
      {
        id: '1',
        car: {
          id: 'car1',
          brand: 'Toyota',
          model: 'Camry',
          image: getCarImage('car1'),
          rating: 4.7,
        },
        pickupDate: '2024-01-15',
        dropDate: '2024-01-17',
        duration: '2 days',
        pickupLocation: '8502 Preston Rd. Inglewood, CA 90301',
        totalPrice: 4500,
        status: BOOKING_STATUS.ACTIVE,
      },
    ],
    completed: [
      {
        id: '2',
        car: {
          id: 'car2',
          brand: 'Honda',
          model: 'City',
          image: getCarImage('car2'),
          rating: 4.8,
        },
        pickupDate: '2024-01-10',
        dropDate: '2024-01-12',
        duration: '2 days',
        pickupLocation: '8502 Preston Rd. Inglewood, CA 90301',
        totalPrice: 4200,
        status: BOOKING_STATUS.COMPLETED,
        completedDate: '2024-01-12',
      },
      {
        id: '3',
        car: {
          id: 'car3',
          brand: 'Maruti',
          model: 'Swift',
          image: getCarImage('car3'),
          rating: 4.4,
        },
        pickupDate: '2024-01-05',
        dropDate: '2024-01-06',
        duration: '1 day',
        pickupLocation: '6391 Elgin St. Celina, DE 19999',
        totalPrice: 1800,
        status: BOOKING_STATUS.COMPLETED,
        completedDate: '2024-01-06',
      },
      {
        id: '4',
        car: {
          id: 'car4',
          brand: 'Hyundai',
          model: 'i20',
          image: getCarImage('car4'),
          rating: 4.3,
        },
        pickupDate: '2024-01-01',
        dropDate: '2024-01-03',
        duration: '2 days',
        pickupLocation: '3891 Ranchview Dr. Richardson, CA 62639',
        totalPrice: 3800,
        status: BOOKING_STATUS.COMPLETED,
        completedDate: '2024-01-03',
      },
      {
        id: '5',
        car: {
          id: 'car5',
          brand: 'Tata',
          model: 'Nexon',
          image: getCarImage('car5'),
          rating: 4.9,
        },
        pickupDate: '2023-12-25',
        dropDate: '2023-12-27',
        duration: '2 days',
        pickupLocation: '1901 Thornridge Cir. Shiloh, HI 81063',
        totalPrice: 5200,
        status: BOOKING_STATUS.COMPLETED,
        completedDate: '2023-12-27',
      },
    ],
    cancelled: [
      {
        id: '6',
        car: {
          id: 'car6',
          brand: 'Mahindra',
          model: 'XUV700',
          image: getCarImage('car6'),
          rating: 4.6,
        },
        pickupDate: '2024-01-20',
        dropDate: '2024-01-22',
        duration: '2 days',
        pickupLocation: '4517 Washington Ave. Manchester, KY 39495',
        totalPrice: 5500,
        status: BOOKING_STATUS.CANCELLED,
        cancelledDate: '2024-01-18',
      },
    ],
  };

  const currentBookings = mockBookings[activeTab] || [];

  const handleReBook = (carId) => {
    navigate(`/booking/${carId}/date-time`);
  };

  const handleWriteReview = (bookingId) => {
    // Navigate to review page or open review modal
    navigate(`/booking/${bookingId}/review`);
  };

  const handleViewDetails = (bookingId) => {
    if (activeTab === 'active') {
      navigate(`/booking/${bookingId}/active`);
    } else {
      navigate(`/booking/${bookingId}`);
    }
  };

  const getActionButtons = (booking) => {
    if (activeTab === 'active') {
      return (
        <div className="flex gap-1.5 mt-2">
          <button
            onClick={() => handleViewDetails(booking.id)}
            className="flex-1 px-3 py-1.5 bg-white border-2 border-[#3d096d] text-[#3d096d] rounded-lg font-medium text-xs hover:bg-[#3d096d]/10 transition-colors"
          >
            View Details
          </button>
          <button
            onClick={() => navigate(`/booking/${booking.id}/active`)}
            className="flex-1 px-3 py-1.5 bg-[#3d096d] text-white rounded-lg font-medium text-xs hover:bg-[#3d096d]/90 transition-colors"
          >
            Track Trip
          </button>
        </div>
      );
    } else if (activeTab === 'completed') {
      return (
        <div className="flex gap-1.5 mt-2">
          <button
            onClick={() => handleReBook(booking.car.id)}
            className="flex-1 px-3 py-1.5 bg-white border-2 border-[#3d096d] text-[#3d096d] rounded-lg font-medium text-xs hover:bg-[#3d096d]/10 transition-colors"
          >
            Re-Book
          </button>
          <button
            onClick={() => handleWriteReview(booking.id)}
            className="flex-1 px-3 py-1.5 bg-[#3d096d] text-white rounded-lg font-medium text-xs hover:bg-[#3d096d]/90 transition-colors"
          >
            Write Review
          </button>
        </div>
      );
    } else if (activeTab === 'cancelled') {
      return (
        <div className="flex gap-1.5 mt-2">
          <button
            onClick={() => handleReBook(booking.car.id)}
            className="flex-1 px-3 py-1.5 bg-white border-2 border-[#3d096d] text-[#3d096d] rounded-lg font-medium text-xs hover:bg-[#3d096d]/10 transition-colors"
          >
            Book Again
          </button>
          <button
            onClick={() => handleViewDetails(booking.id)}
            className="flex-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg font-medium text-xs hover:bg-gray-200 transition-colors"
          >
            View Details
          </button>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header Section - Purple Background */}
      <header className="bg-[#3d096d] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12"></div>
        </div>

        <div className="relative px-4 py-3">
          {/* Back Button and Title in same row */}
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="p-1.5 -ml-1 touch-target"
              aria-label="Go back"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h1 className="text-lg font-bold text-white">My Bookings</h1>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 border-b border-white/20">
            {[
              { key: 'active', label: 'Active' },
              { key: 'completed', label: 'Completed' },
              { key: 'cancelled', label: 'Cancelled' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-2 px-1 text-sm font-medium transition-colors relative ${
                  activeTab === tab.key
                    ? 'text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-4">
        {currentBookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-center">
              No {activeTab} bookings found
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {currentBookings.map((booking, index) => (
              <div
                key={booking.id}
                className={`bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm relative ${index === 0 ? 'mt-2' : ''}`}
              >
                {/* Rating - Top Right */}
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-1.5 py-0.5 shadow-sm z-10">
                  <svg
                    className="w-3.5 h-3.5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <span className="text-xs font-medium text-gray-900">
                    {booking.car.rating}
                  </span>
                </div>

                <div className="flex gap-2.5 p-2.5">
                  {/* Car Image and Price - Direct image, no container */}
                  <div className="flex-shrink-0 flex flex-col">
                    {booking.car.image ? (
                      <img
                        src={booking.car.image}
                        alt={`${booking.car.brand} ${booking.car.model}`}
                        className="w-16 h-16 object-cover rounded-lg mb-1.5"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-1.5">
                        <svg
                          className="w-10 h-10 text-gray-400"
                          viewBox="0 0 100 60"
                          fill="currentColor"
                        >
                          <rect x="15" y="25" width="70" height="20" rx="2" />
                          <rect x="20" y="15" width="25" height="15" rx="2" />
                          <rect x="55" y="15" width="25" height="15" rx="2" />
                          <circle cx="30" cy="45" r="5" />
                          <circle cx="70" cy="45" r="5" />
                        </svg>
                      </div>
                    )}
                    {/* Price below image */}
                    <div className="text-center">
                      <span className="text-sm font-semibold text-gray-900">
                        ₹{booking.totalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Booking Details - Compact */}
                  <div className="flex-1 min-w-0 flex flex-col">
                    {/* Car Name */}
                    <h3 className="text-sm font-semibold text-gray-900 mb-0.5 line-clamp-1 pr-12">
                      {booking.car.brand} {booking.car.model}
                    </h3>

                    {/* Duration and Date - Compact */}
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="flex items-center gap-1">
                        <svg
                          className="w-3.5 h-3.5 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-xs text-gray-600">{booking.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg
                          className="w-3.5 h-3.5 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-xs text-gray-600">
                          {new Date(booking.pickupDate).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Location - Compact */}
                    <div className="flex items-start gap-1 mb-1.5 flex-1">
                      <svg
                        className="w-3.5 h-3.5 text-gray-500 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <p className="text-xs text-gray-600 line-clamp-1 flex-1">
                        {booking.pickupLocation}
                      </p>
                    </div>

                    {/* Action Buttons - Moved to where price was */}
                    <div className="mt-auto">
                      {getActionButtons(booking)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default BookingHistoryPage;
