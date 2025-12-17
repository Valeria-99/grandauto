import React from 'react'

// Компонент Newsteller — секція підписки на новини та акції
const Newsteller = () => {
  return (

    // Основний контейнер секції з вертикальним розташуванням елементів
        <div className="flex flex-col items-center justify-center text-center space-y-2
        max-md:px-4 my-10 mb-40">
            <h1 className="md:text-4xl text-2xl font-semibold">Never Miss a Deal!</h1>

            {/* Підзаголовок з описом переваг підписки */}
            <p className="md:text-lg text-gray-500/70 pb-8">
                Subscribe to get the latest offers, new arrivals, and exclusive discounts
            </p>

             {/* Форма підписки */}
            <form className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12">

                {/* Поле для введення email */}
                <input
                    className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
                    type="text"
                    placeholder="Enter your email adress"
                    required
                />

                {/* Кнопка підписки */}
                <button type="submit" className="md:px-12 px-8 h-full text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer rounded-md rounded-l-none">
                    Subscribe
                </button>
            </form>
        </div>
  )
};

export default Newsteller;