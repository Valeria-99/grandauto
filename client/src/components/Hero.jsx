import React, { useState } from 'react'
import { assets, cityList } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const Hero = () => {

    // Стан для збереження вибраного місця отримання авто
    const [pickupLocation, setPickupLocation] = useState('');

    const {pickupDate, setPickupDate, returnDate, setReturnDate, navigate} = useAppContext();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate('/cars?pickupLocation=' + pickupLocation + '&pickupDate=' + pickupDate + 
            '&returnDate=' + returnDate);
    }


  return (

    // Основний контейнер секції Hero з повною висотою екрану, центруванням контенту та світлим фоном
    <div className='h-screen flex flex-col items-center justify-center gap-14
     bg-light text-center'>

    {/* Заголовок секції */}
    <h1 className='text-4xl md:text-5xl font-semibold'>Luxury cars on Rent</h1>
    
    {/* Форма пошуку авто */}
    <form onSubmit={handleSearch} className='flex flex-col md:flex-row items-start md:items-center 
    justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200 
    bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1]'>

        {/* Контейнер для полів форми */}
        <div className='flex flex-col md:flex-row items-center sm:items-center 
        gap-10 mi-md:ml-8'>

            {/* Вибір місця отримання авто */}
            <div className='flex flex-col items-start gap-2'>
                <select required value={pickupLocation} onChange={(e)=> 
                setPickupLocation(e.target.value)}>

                    {/* Динамічне заповнення списку міст */}
                    <option value="">Pickup Location</option>
                    {cityList.map((city)=> <option key={city} value={city}>{city}</option>)}
                </select>

                {/* Підказка під селектом */}
                <p className='px-1 text-sm text-gray-500'>{pickupLocation ? 
                pickupLocation : 'Please select location'}</p>
            </div>

            {/* Вибір дати отримання авто */}
            <div className='flex flex-col items-start gap-2'>
                <label htmlFor="pickup-date">Pick-up Date</label>
                <input value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} type="date" id='pickup-date' min={new Date().toISOString().split('T')[0]} 
                className='text-sm text-green-500' required />
            </div>

            {/* Вибір дати повернення авто */}
            <div className='flex flex-col items-start gap-2'>
                <label htmlFor="return-date">Return Date</label>
                <input value={returnDate} onChange={(e) => setReturnDate(e.target.value)} type="date" id='return-date' className='text-sm text-green-500' required />
            </div>

            {/* Кнопка пошуку */}
            <button className='flex items-center justify-center gap-1 px-9 py-3 
            max-sm:mt-4 bg-primary hover:bg-primary-dull text-white rounded-full
            cursor-pointer'>
                <img src={assets.search_icon} alt="search" 
                className='brightness-300'/>
                Search
            </button>
        </div>
    </form>
    
    {/* Зображення автомобіля */}
    <img src={assets.main_car} alt="car" className='max-h-74' />
    </div>

)
};

export default Hero;

