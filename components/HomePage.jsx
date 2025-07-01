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
        <div className="relative mt-[30vh] md:mt-[30vh] lg:mt-[21vh] 2xl:mt-[20vh] flex flex-col 2xl:gap-6 lg:gap-3 justify-center items-center z-0 p-3 rounded-xl">
          <Image
            src={'/logo.png'}
            width={800}
            height={1000}
            className="w-full md:w-[80%] lg:w-[60%] 2xl:w-[60%]"
            alt="bannerImage"
          />
          <div className="flex flex-col gap-1 justify-center items-center">
            <h3 className="text-base md:text-lg lg:text-xl text-center font-mulish text-[#A8D5BA]">
              ZENSPACES
            </h3>
            <h3 className="text-xl md:text-2xl lg:text-3xl text-center text-[#A8D5BA] font-manrope">
              DECLUTTER YOUR DIGITAL LIFE
            </h3>
          </div>
        </div>
      </div>
      <ServiceSection />
      <ProductsSlider />
      <Testimonials />
      {/* <Blogs /> */}
      <ContactUs />
    </div>
  );
};

export default HomePage;
