'use client';
import React from 'react';
import { Button, Typography } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';

const ServicesSection = () => {
  const router = useRouter();
  return (
    <div
      id="about"
      className='w-full min-h-[100vh] flex flex-col gap-10 bg-cover bg-center 2xl:py-20 py-10 bg-[url("/bgggg.jpg")]'
    >
      <div className="2xl:p-2 w-full 2xl:max-w-[80vw] max-w-[90vw] 2xl:h-[75vh] min-h-[75vh] mx-auto flex gap-10 flex-col lg:flex-row 2xl:gap-10">
        <div className='2xl:w-[40%] w-full bg-cover bg-top rounded-tl-[50%] min-h-[50vh] hover:shadow-2xl hover:shadow-white rounded-br-[50%] hover:rounded-t-[0%] hover:rounded-b-[0%] transform duration-500 hover:scale-105 bg-[url("/serviceimg7.jpg")] '></div>
        <div className="2xl:w-[60%] w-full lg:mt-10 justify-center items-center 2xl:items-start flex flex-col">
          <Typography
            className="font-manrope 2xl:text-xl text-base italic md:text-lg"
            variant="h1"
          >
            Unlock The Secrets Of Your Future
          </Typography>
          <Typography
            className="font-manrope md:text-5xl text-4xl mt-0"
            variant="h1"
          >
            Astrology Courses
          </Typography>
          <div className="lg:w-[70%] text-center 2xl:text-start w-full">
            <Typography className="font-mulish font-normal 2xl:text-lg">
              Unlock your potential with our expert astrology courses! Learn to
              read your birth chart, understand planetary influences, and use
              astrology to guide your life. Whether you`&apos;`re a beginner or
              advanced, our courses help you gain insights into your
              relationships, career, and growth. Start your astrological journey
              today
            </Typography>
          </div>
          <Button
            className="font-mulish rounded-sm bg-opacity-60 border-dotted border border-white hover:scale-110 hover:bg-opacity-100 transform transition duration-500 bg-[#AF8C3E] capitalize font-medium text-sm  hover:rounded-none lg:max-w-[50%] 2xl:max-w-[30%] w-[80%]"
            onClick={() => {
              router.push('/courses');
            }}
          >
            Read Into The Stars
          </Button>
        </div>
      </div>
      <div className="2xl:p-2 w-full  md:mt-[0%]  2xl:max-w-[80vw] max-w-[90vw] 2xl:h-[75vh] min-h-[75vh] gap-10 mx-auto flex flex-col-reverse lg:flex-row 2xl:gap-10">
        <div className="2xl:w-[60%] w-full mt-0 lg:mt-10 flex items-center 2xl:items-end justify-center flex-col gap-2">
          <Typography
            className="font-manrope 2xl:text-xl text-base italic md:text-lg"
            variant="h1"
          >
            Explore From The Wide Range Of Our
          </Typography>
          <Typography
            className="font-manrope md:text-5xl text-4xl text-center 2xl:text-start mt-0"
            variant="h1"
          >
            Astrology Products
          </Typography>
          <div className="lg:w-[70%] w-full">
            <Typography className="font-mulish font-normal 2xl:text-lg text-center text-base 2xl:text-end">
              Explore our astrology products to enhance your spiritual journey.
              From birth charts to crystal sets and zodiac jewelry, we have
              everything to align with cosmic energies. Perfect for your
              practice or as a thoughtful gift. Shop now and connect with the
              stars!
            </Typography>
          </div>
          <Button
            className="font-mulish rounded-sm lg:max-w-[50%] bg-opacity-60 border-dotted border border-white hover:scale-110 hover:bg-opacity-100 transform transition duration-500 bg-[#AF8C3E] capitalize font-medium text-sm 2xl:max-w-[30%] w-[80%]"
            onClick={() => {
              router.push('/products');
            }}
          >
            Explore Our Products
          </Button>
        </div>
        <div className='2xl:w-[40%] w-full hover:rounded-t-[0%] 2xl:min-h-[75vh] min-h-[50vh] hover:shadow-2xl hover:shadow-white hover:rounded-b-[0%] transform duration-500 hover:scale-105 rounded-tr-[50%] rounded-bl-[50%] bg-cover bg-right-top bg-[url("/serviceimg5.jpg")] '></div>
      </div>
      <div className="2xl:p-2 w-full 2xl:max-w-[80vw] max-w-[90vw] 2xl:h-[75vh] min-h-[75vh] mx-auto flex gap-10 lg:flex-row flex-col 2xl:gap-10">
        <div className='2xl:w-[40%] w-[100%] 2xl:min-h-[75vh] min-h-[50vh] hover:rounded-t-[0%] bg-cover hover:shadow-2xl hover:shadow-white hover:rounded-b-[0%] transform duration-500 hover:scale-105 rounded-tl-[50%] rounded-br-[50%] bg-right-bottom bg-[url("/serviceimg3.jpg")] '></div>
        <div className="2xl:w-[60%] w-full lg:mt-10 flex mb-10 justify-center 2xl:items-start items-center flex-col gap-2">
          <Typography
            className="font-manrope text-center 2xl:text-start 2xl:text-xl text-base md:text-lg italic"
            variant="h1"
          >
            Get To Know About What Future Beholds Through
          </Typography>
          <Typography
            className="font-manrope text-center 2xl:text-start text-4xl md:text-5xl mt-0"
            variant="h1"
          >
            Kundli Readings
          </Typography>
          <div className="lg:w-[70%] w-full">
            <Typography className="font-mulish font-normal text-center 2xl:text-start text-base 2xl:text-lg">
              Discover your future with personalized Kundli readings and
              reports. Our expert astrologers offer deep insights into your
              life`&apos;`s challenges, opportunities, and relationships. Get
              accurate, comprehensive reports and uncover the cosmic influences
              shaping your path. Start your journey today.
            </Typography>
          </div>
          <Button
            className="font-mulish rounded-sm lg:max-w-[50%] bg-opacity-60 border-dotted border border-white hover:scale-110 hover:bg-opacity-100 transform transition duration-500 bg-[#AF8C3E] capitalize font-medium text-sm 2xl:max-w-[30%] w-[80%]"
            onClick={() => {
              router.push('/readings');
            }}
          >
            Unlock Your Future
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
