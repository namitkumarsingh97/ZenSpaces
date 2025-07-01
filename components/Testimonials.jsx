'use client';
import React from 'react';
import { ImUser } from 'react-icons/im';
import {
  Carousel,
  IconButton,
  Rating,
  Typography,
} from '@material-tailwind/react';

const Testimonials = () => {
  return (
    <div className="w-full 2xl:py-20 py-10 bg-center bg-cover bg-[url('/testbg.jpg')] bg-white">
      <div className="w-full 2xl:max-w-[60%] mx-auto ">
        <Typography className="font-manrope text-center capitalize italic text-base md:text-xl lg:text-2xl ">
          The heartfelt feedbacks from our community
        </Typography>
        <Typography className="font-manrope mt-4 text-center text-4xl md:text-5xl lg:text-6xl">
          Testimonials
        </Typography>
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12">
            <Carousel
              loop={true}
              prevArrow={({ handlePrev }) => (
                <IconButton
                  variant="text"
                  color="black"
                  size="lg"
                  onClick={handlePrev}
                  className="!absolute top-1/4 sm:top-2/4 left-4 -translate-y-2/4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="white"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                </IconButton>
              )}
              nextArrow={({ handleNext }) => (
                <IconButton
                  variant="text"
                  color="black"
                  size="lg"
                  onClick={handleNext}
                  className="!absolute top-1/4 sm:top-2/4 !right-4 -translate-y-2/4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="white"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </IconButton>
              )}
              autoplay={true}
              autoplayDelay={4000}
            >
              <div className="flex p-10 flex-col items-center justify-center gap-6">
                <ImUser className="text-white bg-[#AF8C3E] rounded-full h-14 w-14 p-2 " />
                <div className="flex flex-col items-center">
                  <span className="text-lg md:text-xl lg:text-2xl font-bold font-mulish ">
                    GOKART Amit
                  </span>
                  <Rating unratedColor="white" value={4} readonly />
                </div>
                <span className="font-mulish w-[80%] text-center">
                  I recently had the pleasure of consulting with Raman Sir, an
                  extremely knowledgeable and insightful astrologer. He took the
                  time to carefully analyze my child&apos;s kundali and provided
                  me with valuable insights and guidance. Raman Sir&apos;s
                  ability to interpret the planetary positions and their
                  influence on my child&apos;s life was truly remarkable. His
                  predictions were not only accurate but also provided me with
                  valuable information that helped me understand my child&apos;s
                  personality traits and potential challenges. I was impressed
                  by Raman Sir&apos;s professionalism, expertise, and genuine
                  care for his clients. He patiently listened to my concerns and
                  answered all of my questions in a clear and concise
                  manner.Raman Sir&apos;s expertise and accuracy in astrology
                  are truly unmatched.
                </span>
              </div>
              <div className="flex p-10 flex-col items-center font-xl justify-center gap-6">
                <ImUser className="text-white bg-[#AF8C3E] rounded-full h-14 w-14 p-2 " />
                <div className="flex flex-col items-center">
                  <span className="text-lg md:text-xl lg:text-2xl font-bold font-mulish ">
                    Pramod Behera
                  </span>
                  <Rating unratedColor="white" value={5} readonly />
                </div>
                <span className="font-mulish w-[80%] text-center">
                  “I got in touch with Astro Raman Ji thru one of my family
                  friends who have been taking his advices since last few years
                  and he was so satisfied and impressed with his advices. Since
                  I was going thru some tough time, he asked me to contact him
                  for the solution. And truly speaking………It was really a
                  blessing to get in touch with Astro Raman ji. Cant write each
                  and everything here, but I got the solution with his valuable
                  advices. He has always been precise with his predictions and
                  talks straight to the point without any deviation. He makes
                  you feel comfortable like you are talking to your friend. His
                  suggestions always give you positive vibes and keeps you
                  motivated. He is master of Vedic Astrology, Lal Kitab and
                  Vastu as well.
                </span>
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
