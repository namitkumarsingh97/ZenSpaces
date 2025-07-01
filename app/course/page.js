'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { PopUp } from '@/app/assets/PopUp';
import { Button, Rating, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { FaCheckCircle } from 'react-icons/fa';
import { CourseTab } from '@/app/assets/CourseTab';
import axios from 'axios';
import { BASE_URL } from '@/utils/apiClient';

function CourseDetails() {
  const [courseData, setCourseData] = useState(null);
  const searchParams = useSearchParams();
  const courseTitle = searchParams.get('courseTitle');

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const sessionData = localStorage.getItem('courseData');
        if (sessionData) {
          const parsedData = JSON.parse(sessionData);
          if (parsedData.courseTitle === courseTitle) {
            setCourseData(parsedData);
            return;
          }
        }
        const response = await axios.get(
          `${BASE_URL}/api/course?courseTitle=${encodeURIComponent(
            courseTitle,
          )}`,
        );

        if (response.data.success) {
          const course = response.data.course;
          let batch = [];

          if (Array.isArray(course.days) && course.days.length > 0) {
            try {
              batch = JSON.parse(course.days[0]);
            } catch (error) {
              console.error('Error parsing days:', error);
              batch = Array.isArray(course.days)
                ? course.days.join(', ')
                : 'Not specified';
            }
          }

          const updatedCourseData = {
            ...course,
            price: course.discountedFee,
            originalPrice: course.totalFee,
            batch:
              course?.days && Array.isArray(course.days)
                ? course.days.join(', ')
                : course?.days && typeof course.days[0] === 'string'
                ? course.days[0]
                : 'Not specified',
            duration: `${course.duration} ${course.durationType}`,
            courseId: course._id,
          };
          setCourseData(updatedCourseData);
          localStorage.setItem('courseData', JSON.stringify(updatedCourseData));
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchCourseData();
  }, [courseTitle]);

  if (!courseData) {
    return <div>Loading...</div>; // Show loading state until course data is available
  }
  const {
    instructor,
    description,
    duration,
    batch,
    price,
    originalPrice,
    students,
    registrationAmount,
    balanceDueDate,
    paymentOptions,
    schedule,
    introVideoLink,
    overview,
    syllabus,
    courseId,
    courseType,
  } = courseData;

  return (
    <div className="w-full pb-20 bg-white">
      <div className='w-full bg-cover flex items-center justify-center mt-[-30%] 2xl:mt-[-8.7%] bg-no-repeat bg-[url("/productsbg2.jpg")]'>
        <div className="2xl:max-w-[80%] max-w-[90%] py-10 2xl:py-20 2xl:mt-[8%] mt-[20%] md:mt-[30%] mx-auto flex 2xl:flex-row flex-col 2xl:gap-20 gap-5">
          <iframe
            className="w-full 2xl:w-[1100px] 2xl:h-[450px] h-[250px] md:h-[400px]"
            width="1100"
            height="450"
            src={introVideoLink || ''}
            title={courseTitle || 'Course Intro Video'}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>

          <div className="flex flex-col gap-5 justify-center">
            <div className="flex flex-col gap-2">
              <Typography className="2xl:text-6xl md:test-5xl m-0 text-4xl font-ibarra">
                {courseTitle || 'Course Title'}
              </Typography>
              <Typography className="lg:text-3xl italic text-xl m-0 font-ibarra">
                By {instructor || 'Instructor Name'}
              </Typography>
              <Typography className="md:text-base text-sm 2xl:max-w-[70%] m-0 w-full font-normal font-jost">
                {description || 'Course description goes here.'}
              </Typography>
              <div className="flex gap-1">
                <Rating unratedColor="white" value={4} readonly />
                <Typography className="text-base m-0 font-jost">
                  (5k+ Students)
                </Typography>
              </div>
              <div className="flex flex-col">
                <Typography className="text-xl m-0 font-jost">
                  {duration || 'Duration'}
                </Typography>
                <Typography className="text-lg m-0 font-jost">
                  {Array.isArray(batch) && batch.length > 0
                    ? batch.length === 2
                      ? batch.join(' and ')
                      : batch.slice(0, -1).join(', ') +
                        (batch.length > 1 ? ' and ' : '') +
                        batch.slice(-1)
                    : 'Saturday and Sunday'}
                </Typography>
                <Typography className="2xl:text-xl m-0 text-base text-left 2xl:text-start text-white font-normal font-jost">
                  {schedule}
                </Typography>
              </div>
              <div className="flex items-end gap-3">
                <Typography className="md:text-3xl m-0 text-2xl font-jost">
                  {price || 'Price'}
                </Typography>
                <Typography className="md:text-lg m-0 line-through text-gray-400 font-jost">
                  {originalPrice || 'Original Price'}
                </Typography>
              </div>
              {courseType !== 'video' && (
                <Typography className="font-jost italic mb-0">
                  or 5 easy Installments
                </Typography>
              )}
              <p style={{ marginTop: '10px', color: 'white' }} className="m-0">
                Registration amount: <strong>{registrationAmount}</strong>
                {'/- '}
                <br />
                Balance to be paid 1 week before the course starting date:{' '}
                <strong>{balanceDueDate}</strong>
                {courseType !== 'video' && (
                  <p style={{ color: '#fff' }}>
                    Registration amount will be adjusted in the last installment
                    for monthly payment plans.
                  </p>
                )}
              </p>
              <Typography className="font-jost italic m-0">
                {paymentOptions || '*Monthly payment options also available*'}
              </Typography>
            </div>
            <PopUp courseId={courseId} />
            <p style={{ textAlign: 'center', color: '#fff' }}>
              For help:{' '}
              <a href="tel:+919810800988">
                <strong>+91 9810800988</strong>
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="w-full relative overflow-hidden bg-white">
        <div className="w-full 2xl:pt-20 pt-10 min-h-[60vh] 2xl:max-w-[80%] max-w-[90%] mx-auto">
          <CourseTab
            overview={overview}
            syllabus={syllabus}
            instructor={instructor}
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
            <Typography className="font-ibarra m-0 2xl:w-[60%] text-3xl text-black md:text-4xl 2xl:text-5xl">
              Receive A Certificate Upon Completion
            </Typography>
            <div className="flex 2xl:items-center gap-5">
              <FaCheckCircle size={40} className="text-black" />
              <div className="flex flex-col gap-1">
                <Typography className="font-jost m-0 text-black 2xl:text-2xl text-xl font-medium">
                  Official & Verified
                </Typography>
                <Typography className="font-jost m-0 text-black 2xl:text-lg text-base font-normal">
                  Receive an instructor signed certificate with institution’s
                  logo to verify your achievements.
                </Typography>
              </div>
            </div>
            <div className="flex 2xl:items-center gap-5">
              <FaCheckCircle size={40} className="text-black" />
              <div className="flex flex-col gap-1">
                <Typography className="font-jost m-0 text-black 2xl:text-2xl text-xl font-medium">
                  Easily Shareable
                </Typography>
                <Typography className="font-jost v text-black 2xl:text-lg text-base 2xl:max-w-[80%] font-normal">
                  Add the certificate to your CV or your Resume or post it
                  directly on LinkedIn. You can even post it on instagram and
                  twitter.
                </Typography>
              </div>
            </div>
            <div className="flex 2xl:items-center gap-5">
              <FaCheckCircle size={40} className="text-black" />
              <div className="flex flex-col gap-1">
                <Typography className="font-jost m-0 text-black 2xl:text-2xl text-xl font-medium">
                  Enhances Credibility
                </Typography>
                <Typography className="font-jost m-0 text-black 2xl:text-lg text-base font-normal">
                  Use your certificate to enhance your professional credibility
                  and stand out among your peers!
                </Typography>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center flex-col gap-10">
            <Image
              src="/trophy.png"
              width={350}
              height={350}
              className="w-[50%] 2xl:w-full"
              alt="Trophy"
            />
            <div className="flex flex-col text-center gap-1">
              <Typography className="font-jost m-0 text-black text-3xl 2xl:text-4xl font-normal">
                After Completion,
              </Typography>
              <Typography className="font-jost m-0 text-black text-4xl 2xl:text-5xl font-medium">
                Get A Certificate
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full 2xl:max-w-[80%] max-w-[90%] 2xl:mt-20 mt-10 mx-auto 2xl:gap-5 gap-2 flex flex-col items-center py-10 border border-black border-opacity-5 shadow-2xl rounded-xl justify-center 2xl:py-20">
        <Typography className="2xl:text-5xl m-0 md:text-4xl text-3xl text-center md:px-10 lg:px-0 2xl:text-start text-black font-medium font-ibarra">
          {' '}
          {courseTitle} By Astrologer {instructor || 'Instructor Name'}
        </Typography>
        <div className="flex flex-col">
          <Typography className="2xl:text-xl m-0 text-base text-center 2xl:text-start text-black font-normal font-jost">
            {' '}
            {`${duration}, Saturday and Sunday`}
          </Typography>
          <Typography className="2xl:text-xl m-0 text-base text-center 2xl:text-start text-black font-normal font-jost">
            {' '}
            {schedule}
          </Typography>
        </div>
        <div className="flex items-end gap-3">
          <Typography className="2xl:text-3xl m-0 text-2xl text-black font-normal font-jost">
            {' '}
            {price}
          </Typography>
          <Typography className="2xl:text-lg m-0 line-through text-gray-500 font-normal font-jost">
            {' '}
            {originalPrice}
          </Typography>
        </div>
        <Typography className="font-jost m-0 italic text-black ">
          {' '}
          {paymentOptions}
        </Typography>
        <div className="2xl:w-[15vw] m-0">
          <PopUp courseId={courseId} />
        </div>
      </div>
    </div>
  );
}

export default function Course() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <CourseDetails />
      </Suspense>
    </div>
  );
}
