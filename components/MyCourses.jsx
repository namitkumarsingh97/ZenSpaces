import { Dropdown } from '@/app/assets/Dropdown';
import { Button, Select, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import React from 'react';
import { HiDocumentDownload } from 'react-icons/hi';

const MyCourses = () => {
  return (
    <div className="h-full overflow-y-auto">
      <h2 className="md:text-xl text-lg font-mulish font-medium">My Courses</h2>
      <hr className="my-5"></hr>
      <div className="flex w-full justify-end">
        <Dropdown />
      </div>
      <div className="flex rounded-xl mt-5 justify-between w-full shadow-lg border-gray-300 border p-5">
        <Image
          src="/year.jpg"
          height={400}
          width={400}
          className="rounded-xl"
          alt="courseImg"
        />
        <div className="gap-2 p-5 flex flex-col">
          <Typography className="font-mulish text-center font-semibold text-2xl">
            Lal Kitab Course
          </Typography>
          <Typography className="font-mulish text-center font-normal text-base">
            Start Date : 01/01/2025
          </Typography>
          <Typography className="font-mulish text-center font-normal text-base">
            Time : 06.00 To 07.00 P.M.
          </Typography>
          <Typography className="font-mulish text-center font-normal text-base">
            Duration : 4 Months
          </Typography>
          <Typography className="font-mulish text-center font-normal text-base">
            Days : Saturday & Sunday
          </Typography>
          <Typography className="font-mulish text-center font-normal text-base">
            Platform : Google Meet
          </Typography>
          <Typography className="font-mulish text-center font-normal text-base">
            Instructor : Kuldeep Meena
          </Typography>
        </div>
        <div className="gap-2 px-5 py-10 flex justify-between  flex-col">
          <Typography className="font-mulish text-center font-normal text-xl">
            Total Fees : INR 21000/-
          </Typography>
          <Typography className="font-mulish text-center font-normal text-xl">
            Registeration Paid : INR 2100/-
          </Typography>
          <Typography className="font-mulish text-center font-normal text-xl">
            Remaining : INR 18000/-
          </Typography>
          <div className="flex items-center flex-col gap-2">
            <Button className="font-mulish w-full rounded-lg border opacity-100 border-white transform transition duration-500 bg-[#AF8C3E] capitalize font-medium text-sm max-w-[170px]">
              Pay Now
            </Button>
          </div>
        </div>
      </div>
      <div className="flex rounded-xl mt-5 justify-between w-full shadow-lg border-gray-300 border p-5">
        <Image
          src="/year.jpg"
          height={400}
          width={400}
          className="rounded-xl"
          alt="courseImg"
        />
        <div className="gap-2 p-5 flex flex-col">
          <Typography className="font-mulish text-center font-semibold text-2xl">
            Lal Kitab Course
          </Typography>
          <Typography className="font-mulish text-center font-normal text-base">
            Start Date : 01/01/2025
          </Typography>
          <Typography className="font-mulish text-center font-normal text-base">
            Time : 06.00 To 07.00 P.M.
          </Typography>
          <Typography className="font-mulish text-center font-normal text-base">
            Duration : 4 Months
          </Typography>
          <Typography className="font-mulish text-center font-normal text-base">
            Days : Saturday & Sunday
          </Typography>
          <Typography className="font-mulish text-center font-normal text-base">
            Platform : Google Meet
          </Typography>
          <Typography className="font-mulish text-center font-normal text-base">
            Instructor : Kuldeep Meena
          </Typography>
        </div>
        <div className="gap-2 px-5 py-10 flex justify-between  flex-col">
          <Typography className="font-mulish text-center font-normal text-xl">
            Total Fees Paid : INR 21000/-
          </Typography>
          <div className="flex items-center flex-col gap-2">
            <Button className="font-mulish w-full rounded-lg border opacity-100 border-white transform transition duration-500 bg-[#AF8C3E] capitalize font-medium text-sm max-w-[170px]">
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
