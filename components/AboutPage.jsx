'use client';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import React from 'react';
import { GiCrystalBall } from 'react-icons/gi';
import { GiRelationshipBounds } from 'react-icons/gi';
import { GiBleedingEye } from 'react-icons/gi';
import { GiStarSattelites } from 'react-icons/gi';
import { Accordion1 } from '../app/assets/Accordion';

const AboutPage = () => {
  return (
    <div className="w-full">
      <div className='w-full bg-cover  flex items-center justify-center mt-[-40%] md:mt-[-20%] lg:mt-[-15%] xl:mt-[-11%] h-[37vh] xl:h-[50vh] bg-no-repeat bg-[url("/aboutbg.webp")]'>
        <Typography className="font-manrope xl:text-6xl text-4xl md:text-5xl xl:mt-40 mt-20">
          About Us
        </Typography>
      </div>
      <div className="w-full grid lg:grid-cols-12 grid-cols-1 gap-5 xl:gap-10 lg:gap-5 mx-auto xl:max-w-[80%] max-w-[90%]">
        <div className=" lg:col-span-6 mx-auto pt-12 pb-10 lg:pt-24 lg:pb-20">
          <div className="border border-white border-opacity-50 shadow-xl shadow-white h-[300px] w-[300px] xl:h-[450px] xl:w-[450px] bg-white bg-opacity-50">
            <Image
              src={'/aboutt.jpg'}
              height={600}
              className="xl:mt-[-30px] ml-[15px] mt-[-15px] xl:ml-[30px]"
              width={600}
              alt="About Image"
            />
          </div>
        </div>
        <div className="lg:col-span-6 flex lg:pt-24 lg:pb-20 gap-5 justify-center flex-col">
          <Typography className="md:text-xl text-lg italic text-[#AF8C3E] font-manrope">
            --About Us
          </Typography>
          <Typography className="md:text-5xl text-4xl  font-manrope">
            Unlocking The Secrets Of Kundli
          </Typography>
          <Typography className="xl:text-lg text-base font-normal font-mulish">
            ZenSpaces is a dedicated platform that aims to provide authentic and
            insightful Kundali readings, high-quality astrology products, and
            transformative astrology courses guided by Astrologer Raman Singh
            who holds expertise in Lal Kitab, Vastu, Astrovastu, prashari
            Jyotish .
          </Typography>
          <Typography className="xl:text-lg text-base font-normal font-mulish">
            Our mission is to guide individuals on their cosmic journey and help
            them uncover the profound wisdom of astrology and align his Karma
            through remedial measures.
          </Typography>
          <Image
            src={'/moon.png'}
            height={350}
            width={350}
            className="absolute xl:right-[100px] lg:top-[250px] lg:right-[70px] right-[-200px] hidden lg:block z-[-1] animate-spin-slow  cursor-pointer top-[55vh] xl:top-[400px]"
            alt="Moon Png"
          />
        </div>
      </div>
      {/* Profile Section */}
      <div className="w-full bg-cover">
        <div className="xl:max-w-[80%] max-w-[90%] mx-auto flex flex-col gap-5 xl:gap-10 xl:pb-20 py-5">
          <Typography className="font-manrope md:text-xl text-lg text-[#AF8C3E] italic">
            --Our Astrologer
          </Typography>
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            {/* Profile Image */}
            <Image
              src={'/raman2.png'}
              height={500}
              width={500}
              className="rounded-lg shadow-lg"
              alt="Acharya Raman Singh"
            />
            {/* Profile Details */}
            <div className="flex flex-col gap-5">
              <Typography className="font-manrope mb-0 text-4xl md:text-5xl xl:text-6xl">
                Acharya Raman Singh
              </Typography>
              <Typography className="font-manrope mt-0 text-xl md:text-2xl italic text-[#AF8C3E]">
                (Lal Kitab & Vastu Expert)
              </Typography>
              <Typography className="font-mulish m-0 xl:text-lg text-base font-normal">
                Astrologer with 14 Years of Expertise in Vedic and KP Astrology,
                Vastu, and Numerology.
              </Typography>
              <Typography className="font-mulish m-0 xl:text-lg text-base font-normal">
                After beginning his career with an MBA in Marketing in 2004 and
                working in brand communication within the corporate sector, his
                passion for astrology, which had been a lifelong interest,
                eventually led him down a different path. Having spent years
                studying astrology through books, he later pursued formal
                courses to deepen his understanding and expertise in the field.
              </Typography>
              <Typography className="font-mulish m-0 xl:text-lg text-base font-normal">
                His core philosophy revolves around the belief that the Janam
                Kundli (birth chart) is a reflection of one&apos;s inherent
                talents, a divine blueprint of the life ahead. He offers
                personalized yearly forecasts, remedies, and in-depth horoscope
                analysis to help clients overcome obstacles and seize
                opportunities in life.
              </Typography>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-cover">
        <div className=" xl:max-w-[80%] max-w-[90%] mx-auto flex flex-col gap-5 xl:gap-10 xl:pb-20 py-5">
          <Typography className="font-manrope md:text-xl text-lg text-[#AF8C3E] italic">
            --Our Benefits
          </Typography>
          <Typography className="font-manrope text-4xl md:text-5xl xl:text-6xl">
            Embodying The Wisdom Of Astrology
          </Typography>
          <div className="grid-cols-1 md:grid-cols-2 xl:grid-cols-4 w-full grid xl:gap-8 lg:p-10 xl:p-0  gap-5">
            <div className="bg-black bg-[url('/cardbg2.jpg')] bg-contain transition hover:border border-opacity-0 hover:border-opacity-50 border hover:shadow-none hover:scale-110 duration-500 shadow-md border-[white] rounded-md shadow-[white]  flex flex-col gap-1 md:gap-2 lg:gap-3 aspect-square">
              <div className="flex p-5 flex-col xl:gap-20 gap-10">
                <div>
                  <GiCrystalBall
                    className="mt-5 ml-5 text-[#AF8C3E]"
                    size={60}
                  />
                </div>
                <div className="flex flex-col gap-5">
                  <Typography className="font-manrope text-3xl xl:text-4xl">
                    Spiritual Growth & Development
                  </Typography>
                  <Typography className="font-mulish font-normal text-base xl:text-lg">
                    Nurture your spirit through practices that foster growth and
                    understanding.
                  </Typography>
                </div>
              </div>
            </div>
            <div className="bg-black group hover:bg-[url('/cardbg5.jpg')] hover:border transition hover:scale-110 hover:shadow-none duration-500 bg-contain border-opacity-0 hover:border-opacity-50 border shadow-md border-[white] rounded-md shadow-[white]  flex flex-col gap-1 md:gap-2 lg:gap-3 aspect-square">
              <div className="flex p-5 flex-col gap-20">
                <div>
                  <GiBleedingEye
                    className="mt-5 ml-5 group-hover:text-[#AF8C3E]"
                    size={60}
                  />
                </div>
                <div className="flex flex-col gap-5">
                  <Typography className="font-manrope text-3xl xl:text-4xl">
                    Insight Into Personal Characterstics
                  </Typography>
                  <Typography className="font-mulish font-normal text-base xl:text-lg">
                    Uncover your unique traits for deeper self-awareness and
                    growth.
                  </Typography>
                </div>
              </div>
            </div>
            <div className="bg-black hover:bg-[url('/cardbg3.jpg')] group  transition hover:scale-110 hover:shadow-none duration-500 bg-contain border-opacity-0 hover:border-opacity-50 border shadow-md border-[white] rounded-md shadow-[white]  flex flex-col gap-1 md:gap-2 lg:gap-3 aspect-square">
              <div className="flex p-5 flex-col gap-20">
                <div>
                  <GiStarSattelites
                    className="mt-5 ml-5 group-hover:text-[#AF8C3E]"
                    size={60}
                  />
                </div>
                <div className="flex flex-col gap-5">
                  <Typography className="font-manrope text-3xl xl:text-4xl">
                    Guidance Of Decision Making
                  </Typography>
                  <Typography className="font-mulish font-normal text-base xl:text-lg">
                    Make informed choices with personalized insights and
                    astrological guidance.
                  </Typography>
                </div>
              </div>
            </div>
            <div className="bg-black hover:bg-[url('/cardbg6.jpg')] group hover:bg-opacity-100 transition hover:scale-110 hover:shadow-none duration-500 bg-contain border-opacity-0 hover:border-opacity-50 border shadow-md border-[white] rounded-md shadow-[white]  flex flex-col gap-1 md:gap-2 lg:gap-3 aspect-square">
              <div className="flex p-5 flex-col gap-20">
                <div>
                  <GiRelationshipBounds
                    className="mt-5 ml-5 group-hover:text-[#AF8C3E]"
                    size={60}
                  />
                </div>
                <div className="flex flex-col gap-5">
                  <Typography className="font-manrope text-3xl xl:text-4xl">
                    Understanding Your Relationships
                  </Typography>
                  <Typography className="font-mulish font-normal text-base xl:text-lg">
                    Explore dynamics and deepen connections through relationship
                    insights
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-cover">
        <div className=" xl:max-w-[80%] max-w-[90%] mx-auto flex flex-col gap-5 xl:gap-10 xl:pb-20 py-5 xl:items-center">
          <Typography className="font-manrope md:text-xl text-lg text-[#AF8C3E] italic">
            --Frequently Asked Questions
          </Typography>
          <Typography className="font-manrope text-4xl md:text-5xl xl:text-6xl">
            What Clients Usually Ask About
          </Typography>
          <Accordion1 />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
