'use client';

import React, { useEffect, useState } from 'react';
import { Typography } from '@material-tailwind/react';
import { FaCamera, FaVideo } from 'react-icons/fa';
import { FaRegMessage } from 'react-icons/fa6';
import { SlEarphonesAlt } from 'react-icons/sl';

const Overview = ({ overview }) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <div className="flex flex-col min-h-[80vh] py-10 gap-10 text-black">
      {/* Section Title */}
      <div className="flex flex-col gap-5">
        {/* <Typography className="font-mulish text-2xl font-medium">Course Plan</Typography> */}

        {/* Render HTML as is from the database */}
        <div className="flex flex-col 2xl:max-w-[70%] lg:max-w-[80%] w-full gap-1">
          {hydrated && overview && (
            <div
              className="text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: overview }}
            />
          )}
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="grid 2xl:grid-cols-4 md:grid-cols-2 grid-cols-1 2xl:max-w-[80%] gap-5">
        {/* Live Sessions */}
        <div className="border border-black border-opacity-5 rounded-xl shadow-xl flex p-5 flex-col gap-10 items-center justify-center">
          <FaCamera className="m-2 text-[#AF8C3E]" size={50} />
          <div className="flex flex-col text-center gap-2">
            <Typography className="font-mulish text-2xl font-medium">
              Live Sessions
            </Typography>
            <Typography className="font-mulish text-lg font-normal">
              Join our live sessions for expert insights and interactive
              learning.
            </Typography>
          </div>
        </div>

        {/* Session Recordings */}
        <div className="border border-black border-opacity-5 rounded-xl shadow-xl flex p-5 flex-col gap-10 items-center justify-center">
          <FaVideo className="m-2 text-[#AF8C3E]" size={50} />
          <div className="flex flex-col text-center gap-2">
            <Typography className="font-mulish text-2xl font-medium">
              Session Recordings
            </Typography>
            <Typography className="font-mulish text-lg font-normal">
              Access our session recordings for expert insights and on-demand
              learning.
            </Typography>
          </div>
        </div>

        {/* Hinglish Language */}
        <div className="border border-black border-opacity-5 rounded-xl shadow-xl flex p-5 flex-col gap-10 items-center justify-center">
          <FaRegMessage className="m-2 text-[#AF8C3E]" size={50} />
          <div className="flex flex-col text-center gap-2">
            <Typography className="font-mulish text-2xl font-medium">
              Hinglish Language
            </Typography>
            <Typography className="font-mulish text-lg font-normal">
              Understand at the fullest, we use Hinglish Language.
            </Typography>
          </div>
        </div>

        {/* Personalized Assistance */}
        <div className="border border-black border-opacity-5 rounded-xl shadow-xl flex p-5 flex-col gap-10 items-center justify-center">
          <SlEarphonesAlt className="m-2 text-[#AF8C3E]" size={50} />
          <div className="flex flex-col text-center gap-2">
            <Typography className="font-mulish text-2xl font-medium">
              Personalized Assistance
            </Typography>
            <Typography className="font-mulish text-lg font-normal">
              Get personalized assistance tailored to your needs.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
