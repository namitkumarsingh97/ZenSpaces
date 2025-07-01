'use client';

import { Breadcrumbs, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { CardDefault } from '../app/assets/Card';
import axios from 'axios';
import { BASE_URL } from '@/utils/apiClient';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/courses`);
        if (response.data.success && response.data.courses.length > 0) {
          const formattedCourses = response.data.courses.map((course) => ({
            courseTitle: course.name || 'No Title Provided',
            instructor: course.instructor || 'Instructor Info Not Available',
            description: course.description || 'No Description Available',
            duration: course.duration
              ? `${course.duration} ${course.durationType || 'Days'}`
              : 'Duration Not Specified',
            batch:
              course?.days && Array.isArray(course.days)
                ? course.days.join(', ') // If days is already an array
                : course?.days && typeof course.days[0] === 'string'
                ? course.days[0] // Use it as is
                : 'Not specified',
            price: course.discountedFee
              ? `₹${course.discountedFee}`
              : 'Price Not Available',
            originalPrice: course.totalFee
              ? `₹${course.totalFee}`
              : 'Original Price Not Available',
            registrationAmount: course.registrationAmount
              ? `₹${course.registrationAmount}`
              : 'Not Available',
            balanceDueDate: course.startDate
              ? new Date(course.startDate).toLocaleDateString()
              : 'Start Date Not Provided',
            paymentOptions: 'Pay via Razorpay or UPI',
            schedule: course.timeSlot
              ? `${course.timeSlot.startTime} - ${course.timeSlot.endTime}`
              : 'Schedule Not Provided',
            introVideoLink: course.introVideoLink || null,
            overview: course.overview || 'Overview Not Available',
            syllabus: course.syllabus || 'Syllabus Not Available',
            imageSrc: course.thumbnail || 'NA',
            courseId: course._id,
            courseType: course.courseType || 'NA',
          }));
          setCourses(formattedCourses);
        }
      } catch (error) {
        console.error('Error fetching courses from API:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="w-full">
      <div className='w-full bg-cover  flex items-center justify-center mt-[-40%] md:mt-[-20%] lg:mt-[-15%] xl:mt-[-11%] h-[37vh] xl:h-[50vh] bg-no-repeat bg-[url("/aboutbg.webp")]'>
        <Typography className="font-manrope xl:text-6xl text-4xl md:text-5xl xl:mt-40 mt-20">
          Courses
        </Typography>
      </div>

      <div className="w-full xl:max-w-[80%] max-w-[90%] py-5 mx-auto">
        <div className="grid xl:py-20 py-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-1 xl:gap-10 gap-5">
          {courses.map((course, index) => (
            <CardDefault
              key={course.courseId}
              courseTitle={course.courseTitle}
              instructor={course.instructor}
              description={course.description}
              duration={course.duration}
              batch={course.batch}
              price={course.price}
              originalPrice={course.originalPrice}
              registrationAmount={course.registrationAmount}
              balanceDueDate={course.balanceDueDate}
              paymentOptions={course.paymentOptions}
              schedule={course.schedule}
              introVideoLink={course.introVideoLink}
              overview={course.overview}
              syllabus={course.syllabus}
              imageSrc={course.imageSrc}
              courseId={course.courseId}
              index={index}
              courseType={course.courseType}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
