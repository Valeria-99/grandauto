import React from 'react'
import Title from './Title';
import { assets } from '../assets/assets';

const Testimonial = () => {

    // Масив відгуків користувачів
     const testimonials = [
        { name: "Illya Lysenko", 
          location: "Dnipro, Ukraine", 
          image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200", 
          testimonial: "I've rented cars from various companies, but the experience with GrandAuto was exceptional."
        },
        { name: "Andrew Boyko", 
          location: "Kyiv, Ukraine", 
          image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200", 
          testimonial: "GrandAuto made my trip so much easier. Thecar was delivered right to my door, and the customer service wasc fantastic!"
        },
        { name: "Eva Gorbenko", 
          location: "Kharkiv, Ukraine", 
          image: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=200", 
          testimonial: "I highly recommend GrandAuto! Their fleet is amazing, and I always feel like I'm getting the best deal with excelent service."
        }
    ];

  return ( 

        //Основний контейнер секції
        <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44">

            <Title title="What Our Customes Say" subTitle="Discover why discerning 
            travelers choose StayVenture for their luxury accommodations around the world."/>

        {/* Відображення кожного відгуку користувача */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8
            mt-18">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:translate-y-1 
                    transition-all duration-500">
                        <div className="flex items-center gap-3">
                            <img className="w-12 h-12 rounded-full" 
                            src={testimonial.image} alt={testimonial.name} />
                            <div>
                                <p className="text-xl">{testimonial.name}</p>
                                <p className="text-gray-500">{testimonial.location}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4">
                            {Array(5).fill(0).map((_, index) => (
                                <img src={assets.star_icon} 
                                alt="star-icon" />
                            ))}
                        </div>
                        <p className="text-gray-500 max-w-90 mt-4 font-light">"{testimonial.testimonial}"</p>
                    </div>
                ))}
            </div>
        </div>
  )
};

export default Testimonial;