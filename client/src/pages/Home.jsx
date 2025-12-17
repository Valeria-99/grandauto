import React from 'react'
import Hero from '../components/Hero';
import FeauturedSection from '../components/FeauturedSection';
import Banner from '../components/Banner';
import Testimonial from '../components/Testimonial';
import Newsteller from '../components/Newsteller';


const Home = () => {
  return (
    <>
      <Hero />
      <FeauturedSection />
      <Banner />
      <Testimonial />
      <Newsteller />
    </>
  )
}

export default Home;