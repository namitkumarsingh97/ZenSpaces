import Image from 'next/image';
import React from 'react';

const Blogs = () => {
  return (
    <div className="w-full bg-cover flex justify-center ">
      <div className="flex justify-center w-full 2xl:max-w-[80%] blur-sm relative max-w-[90%] mx-auto 2xl:py-20 py-10 items-center">
        <div>
          <div
            role="main"
            className="flex flex-col 2xl:gap-10 gap-5 items-center justify-center"
          >
            <p className="2xl:text-2xl text-lg font-manrope text-[#AF8C3E] italic mt-4">
              Latest Insights
            </p>
            <h1 className="2xl:text-6xl text-4xl font-manrope text-white">
              This Week Blogs
            </h1>
          </div>
          <div className="lg:flex items-stretch md:mt-12 mt-8">
            <div className="lg:w-1/2">
              <div className="sm:flex items-center justify-between xl:gap-x-8 gap-x-6">
                <div className="sm:w-1/2 rounded-2xl hover:scale-110 cursor-pointer border hover:border-none border-gray-700 hover:shadow-white hover:shadow-2xl transition duration-300 relative">
                  <div>
                    <p className="p-6 text-xs font-medium leading-3 text-jost text-white z-20 absolute top-0 right-0">
                      12 April 2021
                    </p>
                    <div className="absolute z-20 bottom-0 left-0 p-6">
                      <h2 className="text-xl font-semibold font-mulish text-white">
                        The Decorated Ways
                      </h2>
                      <p className="font-mulish  text-white mt-2">
                        Dive into minimalism, main hun gatochkach, main duniya
                        mein sabse nirala
                      </p>
                    </div>
                  </div>
                  <div>
                    <img
                      src="https://i.ibb.co/DYxtCJq/img-1.png"
                      className="w-full rounded-2xl"
                      alt="chair"
                    />
                    <div className="bg-black absolute rounded-2xl top-0 bg-opacity-30 z-10 w-full h-full "></div>
                  </div>
                </div>
                <div className="sm:w-1/2 cursor-pointer hover:scale-110 rounded-2xl border hover:border-none border-gray-700 hover:shadow-white hover:shadow-2xl transition duration-300 sm:mt-0 mt-4 relative">
                  <div>
                    <p className="p-6 text-xs font-medium font-mulish z-20 leading-3 text-white absolute top-0 right-0">
                      12 April 2021
                    </p>
                    <div className="absolute z-20 bottom-0 left-0 p-6">
                      <h2 className="text-xl font-semibold font-mulish text-white">
                        The Decorated Ways
                      </h2>
                      <p className="font-mulish  text-white mt-2">
                        Dive into minimalism
                      </p>
                    </div>
                  </div>
                  <div>
                    <img
                      src="https://i.ibb.co/3C5HvxC/img-2.png"
                      className="rounded-2xl w-full"
                      alt="wall design"
                    />
                    <div className="bg-black absolute rounded-2xl top-0 bg-opacity-30 z-10 w-full h-full "></div>
                  </div>
                </div>
              </div>
              <div className="relative cursor-pointer hover:scale-105 rounded-2xl border hover:border-none border-gray-700 mt-8 md:mt-6 hover:shadow-white hover:shadow-2xl transition duration-300">
                <div>
                  <p className="md:p-10 z-20 p-6 text-xs font-medium leading-3 text-white absolute top-0 right-0">
                    12 April 2021
                  </p>
                  <div className="absolute z-20 bottom-0 left-0 md:p-10 p-6">
                    <h2 className="text-xl font-mulish font-semibold 5 text-white">
                      The Decorated Ways
                    </h2>
                    <p className="text-base font-mulish text-white mt-2">
                      Dive into minimalism
                    </p>
                  </div>
                </div>
                <div>
                  <img
                    src="https://i.ibb.co/Ms4qyXp/img-3.png"
                    alt="sitting place"
                    className="w-full rounded-2xl hidden sm:block"
                  />
                  <img
                    className="w-full mt-4 rounded-2xl sm:hidden"
                    src="https://i.ibb.co/6XYbN7f/Rectangle-29.png"
                    alt="sitting place"
                  />
                  <div className="bg-black absolute rounded-2xl top-0 bg-opacity-30 z-10 w-full h-full "></div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 xl:ml-8 lg:ml-4 lg:mt-0 md:mt-6 mt-4 lg:flex flex-col justify-between">
              <div className="relative cursor-pointer hover:scale-105 rounded-2xl border hover:border-none border-gray-700 hover:shadow-white hover:shadow-2xl transition duration-300">
                <div>
                  <p className="md:p-10 z-20 p-6 text-xs font-medium leading-3 text-white absolute top-0 right-0">
                    12 April 2021
                  </p>
                  <div className="absolute z-20 bottom-0 left-0 md:p-10 p-6">
                    <h2 className="text-xl font-mulish font-semibold 5 text-white">
                      The Decorated Ways
                    </h2>
                    <p className="text-base font-mulish text-white mt-2">
                      Dive into minimalism
                    </p>
                  </div>
                </div>
                <div>
                  <img
                    src="https://i.ibb.co/Ms4qyXp/img-3.png"
                    alt="sitting place"
                    className="w-full rounded-2xl mt-8 md:mt-0 hidden sm:block"
                  />
                  <img
                    className="w-full mt-4 rounded-2xl sm:hidden"
                    src="https://i.ibb.co/6XYbN7f/Rectangle-29.png"
                    alt="sitting place"
                  />
                  <div className="bg-black absolute rounded-2xl top-0 bg-opacity-30 z-10 w-full h-full "></div>
                </div>
              </div>
              <div className="sm:flex items-center justify-between xl:gap-x-8 gap-x-6">
                <div className="sm:w-1/2 rounded-2xl hover:scale-110 cursor-pointer border hover:border-none border-gray-700 hover:shadow-white hover:shadow-2xl transition duration-300 relative">
                  <div>
                    <p className="p-6 text-xs font-medium leading-3 text-jost text-white z-20 absolute top-0 right-0">
                      12 April 2021
                    </p>
                    <div className="absolute z-20 bottom-0 left-0 p-6">
                      <h2 className="text-xl font-semibold font-mulish text-white">
                        The Decorated Ways
                      </h2>
                      <p className="font-mulish  text-white mt-2">
                        Dive into minimalism, main hun gatochkach, main duniya
                        mein sabse nirala
                      </p>
                    </div>
                  </div>
                  <div>
                    <img
                      src="https://i.ibb.co/DYxtCJq/img-1.png"
                      className="w-full rounded-2xl"
                      alt="chair"
                    />
                    <div className="bg-black absolute rounded-2xl top-0 bg-opacity-30 z-10 w-full h-full "></div>
                  </div>
                </div>
                <div className="sm:w-1/2 cursor-pointer hover:scale-110 rounded-2xl hover:shadow-white border hover:border-none border-gray-700 hover:shadow-2xl transition duration-300 sm:mt-0 mt-4 relative">
                  <div>
                    <p className="p-6 text-xs font-medium font-mulish z-20 leading-3 text-white absolute top-0 right-0">
                      12 April 2021
                    </p>
                    <div className="absolute z-20 bottom-0 left-0 p-6">
                      <h2 className="text-xl font-semibold font-mulish text-white">
                        The Decorated Ways
                      </h2>
                      <p className="font-mulish  text-white mt-2">
                        Dive into minimalism
                      </p>
                    </div>
                  </div>
                  <div>
                    <img
                      src="https://i.ibb.co/3C5HvxC/img-2.png"
                      className="rounded-2xl w-full"
                      alt="wall design"
                    />
                    <div className="bg-black absolute rounded-2xl top-0 bg-opacity-30 z-10 w-full h-full "></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Image
          src={'/coming.png'}
          height={800}
          width={800}
          className="absolute top-0"
        />
      </div>
    </div>
  );
};

export default Blogs;
