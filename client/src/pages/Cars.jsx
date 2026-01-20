import React, { useEffect, useState } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CarCard from '../components/CarCard';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Cars = () => {
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get('pickupLocation');
  const pickupDate = searchParams.get('pickupDate');
  const returnDate = searchParams.get('returnDate');

  const { cars = [], axios } = useAppContext();

  const [input, setInput] = useState('');
  const [availableCars, setAvailableCars] = useState([]);

  const isSearchData = pickupLocation && pickupDate && returnDate;

  const searchCarAvailability = async () => {
    try {
      const { data } = await axios.post('/api/bookings/check-availability', {
        location: pickupLocation,
        pickupDate,
        returnDate,
      });

      const carsFromApi = Array.isArray(data?.availableCars)
        ? data.availableCars
        : Array.isArray(data?.cars)
        ? data.cars
        : [];

      if (data?.success) {
        setAvailableCars(carsFromApi);
        if (carsFromApi.length === 0) {
          toast.error('No cars available');
        }
      } else {
        setAvailableCars([]);
        toast.error(data?.message || 'No cars found');
      }
    } catch (error) {
      setAvailableCars([]);
      const msg = error?.response?.data?.message || error.message || 'Error checking availability';
      toast.error(msg);
      console.error(error);
    }
  };

  useEffect(() => {
    if (isSearchData) {
      searchCarAvailability();
    } else {
      setAvailableCars(Array.isArray(cars) ? cars : []);
    }
  }, [isSearchData, cars, pickupLocation, pickupDate, returnDate]);

  // Фільтрування машин за введеним текстом
  const displayCars = (Array.isArray(availableCars) ? availableCars : []).filter((car) => {
    const searchTerm = input.trim().toLowerCase();
    if (!searchTerm) return true;

    const brand = (car.brand || car.make || '').toString().toLowerCase();
    const model = (car.model || '').toString().toLowerCase();
    const features = Array.isArray(car.features)
      ? car.features.map((f) => f.toString().toLowerCase())
      : [];

    return (
      brand.includes(searchTerm) ||
      model.includes(searchTerm) ||
      features.some((feature) => feature.includes(searchTerm))
    );
  });

  return (
    <div>
      <div className="flex flex-col items-center py-20 bg-light max-md:px-4">
        <Title
          title="Available Cars"
          subTitle="Browse our selection of premium vehicles available for your next adventure"
        />

        <div className="flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow">
          <img src={assets.search_icon} alt="search_icon" className="w-4.5 h-4.5 mr-2" />

          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Search by make, model, or features"
            className="w-full h-full outline-none text-gray-500"
          />

          <img src={assets.filter_icon} alt="filter_icon" className="w-4.5 h-4.5 ml-2" />
        </div>
      </div>

      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
        <p className="text-gray-500 xl:px-20 max-w-7xl mx-auto">
          Showing {displayCars.length} Cars
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
          {displayCars.length > 0 ? (
            displayCars.map((car) => (
              <div key={car._id || car.id}>
                <CarCard car={car} />
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No cars found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cars;
