import React from 'react';
import Title from './Title';
import { assets, dummyCarData } from '../assets/assets';
import CarCard from './CarCard';
import { useNavigate } from 'react-router-dom';

const FeauturedSection = () => {

    // Хук для програмної навігації між сторінками
    const navigate = useNavigate();

  return (
    // Основний контейнер секції з адаптивними відступами
    <div className='flex flex-col items-center py-24 px-6 md:px-16 
    lg:px-24 xl:px-32'>FeauturedSection
    
        {/* Текстовий заголовок секції */}
        <div>
            <Title title='Beatured Vehicles' subTitle='Explore our 
            selection of premium vehicles available for your next 
            adventure.'/>
        </div> 

        {/* Сітка з карточками машин */}
        <div className='grid drid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'>
        {
            dummyCarData.slice(0,6).map((car)=> (
                <div key={car._id}>
                    <CarCard car={car}/>
                </div>
            ))
        }
        </div>

        {/* Кнопка для переходу на сторінку зі всіма машинами */}
        <button onClick={()=> {
            navigate('/cars'); scrollTo(0,0)
        }}
        className='flex items-center justify-center qap-2 px-6 py-2 border 
        border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer'>
            Explore all cars <img src={assets.arrow_icon} alt="arrow" />
        </button>

    </div>

  )
};

export default FeauturedSection;