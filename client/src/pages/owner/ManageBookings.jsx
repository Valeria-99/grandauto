import React, { useEffect, useState } from 'react';
import Title from '../../components/owner/Title';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ManageBookings = () => {
  const { currency, axios } = useAppContext();
  const [bookings, setBookings] = useState([]);

  const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';

  const fetchOwnerBookings = async () => {
    try {
      const { data } = await axios.get('/api/bookings/owner');
      data.success ? setBookings(data.bookings) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeBookingsStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.post('/api/bookings/change-status', { bookingId, status });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerBookings();
      } else {
        toast.error(data.message || 'Failed to update status');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOwnerBookings();
  }, []);

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title
        title="Manage Bookings"
        subTitle="View and manage bookings for your listed cars."
      />

      <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6">
        <table className="w-full border-collapse text-left text-sm text-gray-600">
          <thead className="text-gray-500">
            <tr>
              <th className="p-3 font-medium">Car</th>
              <th className="p-3 font-medium max-md:hidden">Date Range</th>
              <th className="p-3 font-medium">Total</th>
              <th className="p-3 font-medium max-md:hidden">Payment</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No bookings found
                </td>
              </tr>
            ) : (
              bookings.map((booking) => {
                const car = booking?.car || {};
                const imageSrc = car.image
                  ? car.image.startsWith('/uploads') || car.image.startsWith('uploads')
                    ? `${BASE_URL}${car.image}`
                    : car.image
                  : '';

                const pickup = booking?.pickupDate ? booking.pickupDate.split('T')[0] : '-';
                const ret = booking?.returnDate ? booking.returnDate.split('T')[0] : '-';

                return (
                  <tr key={booking._id || booking.id} className="border-t border-borderColor text-gray-500">
                    <td className="p-3 flex items-center gap-3">
                      <img
                        src={imageSrc || '/placeholder-car.png'}
                        alt={`${car.brand || ''} ${car.model || ''}`}
                        className="h-12 w-12 aspect-square rounded-md object-cover"
                      />
                      <p className="font-medium max-md:hidden">
                        {car.brand ? `${car.brand} ${car.model || ''}` : 'Unknown car'}
                      </p>
                    </td>

                    <td className="p-3 max-md:hidden">
                      {pickup} to {ret}
                    </td>

                    <td className="p-3">
                      {currency}{booking?.price ?? '-'}
                    </td>

                    <td className="p-3 max-md:hidden">
                      <span className="bg-grey-100 px-3 py-1 rounded-full text-xs">offline</span>
                    </td>

                    <td className="p-3">
                      {booking?.status === 'pending' ? (
                        <select
                          onChange={(e) => changeBookingsStatus(booking._id, e.target.value)}
                          value={booking.status}
                          className="px-2 py-1.5 mt-1 text-gray-500 border border-borderColor rounded-md outline-none"
                        >
                          <option value="pending">Pending</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="confirmed">Confirmed</option>
                        </select>
                      ) : (
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            booking.status === 'confirmed'
                              ? 'bg-green-100 text-green-500'
                              : 'bg-red-100 text-red-500'
                          }`}
                        >
                          {booking.status}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;