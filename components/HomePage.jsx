'use client';

import Image from 'next/image';
import React from 'react';
import ServiceSection from './ServicesSection';
import ProductsSlider from './ProductsSection';
import Testimonials from './Testimonials';
import Blogs from './BlogsHomePage';
import ContactUs from './ContactUs';
import { PopUp, PopUp2 } from '@/app/assets/PopUp2';
import { PopUp3 } from '@/app/assets/PopUp3';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  return (
    <div>
      <div className="relative mt-[-20vh] md:mt-[-25vh] lg:mt-[-26vh] 2xl:mt-[-20vh] flex items-center flex-col h-screen overflow-hidden">
        <div className="relative mt-[30vh] md:mt-[30vh] lg:mt-[21vh] 2xl:mt-[20vh] flex flex-col 2xl:gap-6 lg:gap-3 justify-center items-center z-0 p-3 bg-opacity-50 rounded-xl">
          <Image
            src={'/astro.webp'}
            width={800}
            height={1000}
            className="w-full md:w-[90%] lg:w-[70%] 2xl:w-[70%]"
            alt="bannerImage"
          />
          <div className="flex flex-col gap-5 justify-center items-center">
            <h3 className="text-base md:text-lg lg:text-xl text-center font-jost text-white">
              ASTROLOGY COURSES || ASTROLOGY PRODUCTS || KUNDLI READINGS
            </h3>
            <h3 className="text-xl md:text-2xl lg:text-3xl text-center text-white font-ibarra italic">
              Discover Your Path With Astrology.
            </h3>
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:gap-0 lg:flex-row max-w-[80%] mt-5 lg:mt-15 2xl:mt-20 w-full justify-between items-center">
          <PopUp2 />
          <PopUp3 />
        </div>

        <video
          src={'/bgvideo3.mp4'}
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          className="absolute z-[-1] w-auto opacity-80 min-w-full min-h-full max-w-none object-cover"
        />
      </div>
      <ServiceSection />
      <ProductsSlider />
      <Testimonials />
      <Blogs />
      <ContactUs />
    </div>
  );
};

export default HomePage;
