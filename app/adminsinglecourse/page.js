'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { PopUp } from '@/app/assets/PopUp';
import { Button, Rating, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { FaCheckCircle } from 'react-icons/fa';
import { CourseTab } from '@/app/assets/CourseTab';
import React, { useState, useEffect, Suspense } from 'react';
import { BASE_URL } from '@/utils/apiClient';

function AdminsingleCourse() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const courseId = searchParams.get('courseId');
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/api/view-course/${courseId}`);
        if (!response.ok) {
          throw new Error('Course not found');
        }
        const data = await response.json();
        setCourse(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching course:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  if (isLoading) {
    return <div>Loading course details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!course) {
    return <div>No course data available</div>;
  }

  return (
    <div className="w-full pb-20 bg-white">
      <div className='w-full bg-cover flex items-center justify-center mt-[-30%] 2xl:mt-[-8.7%] bg-no-repeat bg-[url("/productsbg2.jpg")]'>
        <div className="2xl:max-w-[80%] max-w-[90%] py-10 2xl:py-20 2xl:mt-[8%] mt-[20%] md:mt-[30%] mx-auto flex 2xl:flex-row flex-col 2xl:gap-20 gap-5">
          <iframe
            className="w-full 2xl:w-[1100px] 2xl:h-[450px] h-[250px] md:h-[400px]"
            width="1100"
            height="450"
            src={course.introVideoLink || ''}
            title={'Course Intro Video'}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>

          <div className="flex flex-col gap-5 justify-center">
            <div className="flex flex-col gap-2">
              <Typography className="2xl:text-6xl md:test-5xl text-4xl font-ibarra">
                {course.name || 'Course Title'}
              </Typography>
              <Typography className="lg:text-3xl italic text-xl font-ibarra">
                By {course.instructor || 'Instructor Name'}
              </Typography>
              <Typography className="md:text-base text-sm 2xl:max-w-[70%] w-full font-normal font-jost">
                {course.description || 'Course description goes here.'}
              </Typography>
              <div className="flex gap-1">
                <Rating unratedColor="white" value={4} readonly />
                <Typography className="text-base font-jost">
                  (5k+ Students)
                </Typography>
              </div>
              <div className="flex flex-col">
                <Typography className="text-xl font-jost">
                  {course.duration || 'Duration'} - {course.durationType}
                </Typography>
                <Typography className="text-lg font-jost">
                  {course.days && course.days.length > 0
                    ? JSON.parse(course.days).join(', ')
                    : 'Batch Schedule'}
                </Typography>
              </div>
              <div className="flex items-end gap-3">
                <Typography className="md:text-3xl text-2xl font-jost">
                  ₹{course.discountedFee || 'Price'}
                </Typography>

                <Typography className="md:text-lg line-through text-gray-400 font-jost">
                  {' '}
                  {course.totalFee || 'Original Price'}
                </Typography>
              </div>
              <Typography className="font-jost italic ">
                {' '}
                {'*Monthly payment options also available*'}
              </Typography>
              <p style={{ marginTop: '10px', color: 'white' }}>
                Registration amount:{' '}
                <strong>
                  {course.registrationAmount || 'registration amount'}
                </strong>
                {'/- '}
                Balance to be paid 1 week before the course starting date.{' '}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full relative overflow-hidden  bg-white">
        <div className="w-full 2xl:pt-20 pt-10 min-h-[60vh] 2xl:max-w-[80%] max-w-[90%] mx-auto">
          <CourseTab
            overview={course.overview}
            syllabus={course.syllabus}
            instructor={course.instructor}
          />
          <Image
            src={'/chakra.png'}
            height={800}
            width={800}
            className="absolute hidden lg:block top-28 animate-spin-slower right-[-410px]"
            alt="chakra image"
          />
        </div>
      </div>
      <div className="items-center bg-amber-100 bg-opacity-50 justify-center w-full min-h-[50vh]">
        <div className="max-w-[90%] 2xl:max-w-[80%] w-full mx-auto 2xl:py-20 py-10 flex 2xl:flex-row flex-col 2xl:gap-10 gap-5">
          <div className="flex flex-col gap-10">
            <Typography className="font-ibarra 2xl:w-[60%] text-3xl text-black md:text-4xl 2xl:text-5xl">
              Recieve A Certificate Upon Completion
            </Typography>
            <div className="flex 2xl:items-center gap-5">
              <FaCheckCircle size={40} className="text-black" />
              <div className="flex flex-col gap-1">
                <Typography className="font-jost text-black 2xl:text-2xl text-xl font-medium">
                  Official & Verified
                </Typography>
                <Typography className="font-jost text-black 2xl:text-lg text-base font-normal">
                  Receive an instructor signed certificate with institution’s
                  logo to verify your achievements.
                </Typography>
              </div>
            </div>
            <div className="flex 2xl:items-center gap-5">
              <FaCheckCircle size={40} className="text-black" />
              <div className="flex flex-col gap-1">
                <Typography className="font-jost text-black 2xl:text-2xl text-xl font-medium">
                  Easily Shareable
                </Typography>
                <Typography className="font-jost text-black 2xl:text-lg text-base 2xl:max-w-[80%] font-normal">
                  Add the certificate to your CV or your Resume or post it
                  directly on LinkedIn. You can even post it on instagram and
                  twitter.
                </Typography>
              </div>
            </div>
            <div className="flex 2xl:items-center gap-5">
              <FaCheckCircle size={40} className="text-black" />
              <div className="flex flex-col gap-1">
                <Typography className="font-jost text-black 2xl:text-2xl text-xl font-medium">
                  Enhances Credibility
                </Typography>
                <Typography className="font-jost text-black 2xl:text-lg text-base font-normal">
                  Use your certificate to enhance your professional credibility
                  and stand out among your peers!
                </Typography>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center flex-col gap-10">
            <Image
              src={'/trophy.png'}
              width={350}
              height={350}
              className="w-[50%] 2xl:w-full"
              alt="Trophy"
            />
            <div className="flex flex-col text-center gap-1">
              <Typography className="font-jost text-black text-3xl 2xl:text-4xl font-normal">
                After Completion,
              </Typography>
              <Typography className="font-jost text-black text-4xl 2xl:text-5xl font-medium">
                Get A Certificate
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full 2xl:max-w-[80%] max-w-[90%] 2xl:mt-20 mt-10 mx-auto 2xl:gap-5 gap-2 flex flex-col items-center py-10 border border-black border-opacity-5 shadow-2xl rounded-xl justify-center 2xl:py-20">
        <Typography className="2xl:text-5xl md:text-4xl text-3xl text-center md:px-10 lg:px-0 2xl:text-start text-black font-medium font-ibarra">
          {' '}
          {course.name || 'coursetitle'}
        </Typography>
        <div className="flex flex-col">
          <Typography className="2xl:text-xl text-base text-center 2xl:text-start text-black font-normal font-jost">
            {' '}
            {course.duration || 'duration'},{' '}
            {course.days && course.days.length > 0
              ? JSON.parse(course.days).join(', ')
              : 'batch'}
          </Typography>
          <Typography className="2xl:text-xl text-base text-center 2xl:text-start text-black font-normal font-jost">
            {' '}
            {course.timeSlot
              ? `${course.timeSlot.startTime} - ${course.timeSlot.endTime}`
              : 'batch schedule'}
          </Typography>
        </div>
        <div className="flex items-end gap-3">
          <Typography className="2xl:text-3xl text-2xl text-black font-normal font-jost">
            {' '}
            {course.discountedFee || 'price'}
          </Typography>
          <Typography className="2xl:text-lg line-through text-gray-500 font-normal font-jost">
            {' '}
            {course.totalFee || 'originalPrice'}
          </Typography>
        </div>
        <div className="2xl:w-[15vw]">{/* <PopUp/> */}</div>
      </div>
    </div>
  );
}
export default function Course() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <AdminsingleCourse />
      </Suspense>
    </div>
  );
}
