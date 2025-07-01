'use client';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import React from 'react';

const Instructor = ({ instructor }) => {
  return (
    <div>
      <div className="grid 2xl:mt-10 text-black min-h-[80vh] grid-cols-12">
        <div className="2xl:col-span-5 col-span-12 2xl:mt-20 mt-10 2xl:p-5">
          <Image
            src={'/raman2.png'}
            height={1000}
            width={1000}
            className=""
            alt="Astrologer Raman Singh"
          />
        </div>
        <div className="2xl:col-span-7 mt-5 2xl:mt-0 col-span-12 2xl:p-5 flex flex-col gap-5">
          <div className="flex 2xl:items-end 2xl:flex-row flex-col gap-2">
            <Typography className="font-mulish font-medium text-2xl 2xl:text-3xl">
              Astrologer {instructor}
            </Typography>
            <Typography className="font-mulish text-base font-normal">
              (Lal Kitab Specialist)
            </Typography>
          </div>
          <Typography className="font-mulish 2xl:text-lg text-base 2xl:max-w-[70%] font-normal">
            After beginning his career with an MBA in Marketing in 2004 and
            working in brand communication within the corporate sector, his
            passion for astrology, which had been a lifelong interest,
            eventually led him down a different path. Having spent years
            studying astrology through books, he later pursued formal courses to
            deepen his understanding and expertise in the field.
          </Typography>
          <Typography className="font-mulish 2xl:text-lg text-base 2xl:max-w-[70%] font-normal">
            His core philosophy revolves around the belief that the Janam Kundli
            (birth chart) is a reflection of one&apos;s inherent talents, a
            divine blueprint of the life ahead. He sees the yearly chart (from
            one birthday to the next) as a map of destiny, outlining the
            challenges and opportunities each year holds. Through personalized
            yearly forecasts, remedies, and in-depth horoscope analysis, he has
            successfully guided clients to overcome obstacles and seize
            opportunities.
          </Typography>
          <Typography className="font-mulish 2xl:text-lg text-base 2xl:max-w-[70%] font-normal">
            He offers counseling on a wide range of life issues, including
            career challenges, relationships, love, business, financial matters,
            property ownership, and personal struggles. His recommendations,
            especially in choosing the right gemstones, have helped many clients
            achieve their goals and find success.
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Instructor;
