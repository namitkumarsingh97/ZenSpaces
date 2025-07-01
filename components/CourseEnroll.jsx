// 'use client';

// import { Breadcrumbs, Button, Typography } from '@material-tailwind/react';
// import React, { useState, useEffect, Suspense } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { notify } from '../app/assets/Toastify';
// import moment from 'moment';

// const CourseEnroll = () => {
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [courseData, setCourseData] = useState(null);
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const courseId = searchParams.get('courseId');

//   useEffect(() => {
//     const fetchCourseData = async () => {
//       if (!courseId) {
//         console.error('No courseId provided');
//         return;
//       }

//       try {
//         const response = await fetch(
//           `${BASE_URL}/api/courses`
//         );
//         const data = await response.json();

//         if (data.success) {
//           const course = data.courses.find((course) => course._id === courseId);

//           if (course) {
//             const parsedDays = Array.isArray(JSON.parse(course.days[0]))
//               ? JSON.parse(course.days[0]).join('-')
//               : '';

//             setCourseData({
//               ...course,
//               days: parsedDays,
//             });

//            localStorage.setItem("courseData", JSON.stringify(course));
//           } else {
//             console.error('Course not found');
//           }
//         } else {
//           console.error('Failed to fetch course data');
//         }
//       } catch (error) {
//         console.error('Error fetching course data:', error);
//       }
//     };

//     fetchCourseData();
//   }, [courseId]);

//   const handleSlotSelect = (slot) => {
//     setSelectedSlot(slot);
//   };

//   const handleProceedClick = async () => {
//     if (!selectedSlot) {
//       notify('Please select a slot before proceeding.', 'info');
//       return;
//     }

//     try {
//       const response = await fetch(
//         `${BASE_URL}/api/customer/book-course`,
//         {
//           method: 'POST',
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem(
//               "enrollmentToken"
//             )}`,
//           },
//           body: JSON.stringify({
//             courseId: courseData._id,
//             selectedSlot: {
//               startTime: selectedSlot.startTime,
//               endTime: selectedSlot.endTime,
//             },
//           }),
//         },
//       );

//       const result = await response.json();
//       if (result.success) {
//         notify('Your Slot has been selected!', 'success');
//         router.push('/courseenroll2');
//       } else {
//         notify(result.message || 'Failed to book the course', 'error');
//       }
//     } catch (error) {
//       console.error('Error booking course:', error);
//       notify('An error occurred while booking the course.', 'error');
//     }
//   };

//   if (!courseData) {
//     return <div>Loading course data...</div>;
//   }
//   const formatDate = (date) => {
//     return moment(date).format('DD/MM/YYYY');
//   };

//   return (
//     <div className='w-full bg-white bg-[url("/bgenroll.jpg")] bg-cover bg-center'>
//       <div className='w-full bg-cover  flex items-center justify-center mt-[-40%] md:mt-[-20%] lg:mt-[-15%] xl:mt-[-11%] h-[37vh] xl:h-[50vh] bg-no-repeat bg-[url("/aboutbg.webp")]'>
//         <Typography className="font-ibarra xl:text-6xl text-4xl md:text-5xl xl:mt-40 mt-20">
//           {courseData.name}
//         </Typography>
//       </div>

//       <div className="w-full min-h-[65vh] xl:max-w-[80%] text-black grid grid-cols-1 lg:grid-cols-2 max-w-[90%] xl:py-20 py-5 mx-auto">
//         {courseData.courseType === 'live' && (
//           <div className="flex flex-col gap-5 lg:gap-10 items-center justify-center">
//             <Typography className="font-ibarra text-3xl xl:text-4xl">
//               Available Slots
//             </Typography>
//             <div className="flex flex-row flex-wrap gap-5 justify-center items-center">
//               {courseData?.timeSlot ? (
//                 <Button
//                   key={courseData._id}
//                   variant="outlined"
//                   onClick={() => handleSlotSelect(courseData.timeSlot)}
//                   className={`aspect-square font-medium font-jost text-base bg-white border border-opacity-5 rounded-xl flex p-5 flex-col gap-10 items-center justify-center
//             ${
//               selectedSlot === courseData.timeSlot
//                 ? 'text-amber-500 border-amber-500 shadow-[0_4px_6px_rgba(255,215,0,0.3)]'
//                 : 'text-black border-black shadow-xl'
//             }`}
//                 >
//                   {courseData.timeSlot.startTime} -{' '}
//                   {courseData.timeSlot.endTime}
//                 </Button>
//               ) : (
//                 <Typography>No available slots</Typography>
//               )}
//             </div>
//           </div>
//         )}

//         <div className="flex flex-col gap-10 mt-10 lg:mt-0 justify-center items-center">
//           <Typography className="font-ibarra m-0 text-3xl xl:text-4xl">
//             Course Details
//           </Typography>
//           <div className="flex flex-col gap-5 justify-center">
//             <div className="grid grid-cols-2">
//               <Typography className="font-jost m-0 text-lg">
//                 Course Name :
//               </Typography>
//               <Typography className="font-jost m-0 text-lg font-medium">
//                 {courseData.name}
//               </Typography>
//             </div>
//             <div className="grid grid-cols-2">
//               <Typography className="font-jost m-0 text-lg">
//                 Platform :
//               </Typography>
//               <Typography className="font-jost m-0 text-lg font-medium">
//                 Zoom Meet
//               </Typography>
//             </div>
//             <div className="grid grid-cols-2">
//               <Typography className="font-jost m-0 text-lg">
//                 Instructor :
//               </Typography>
//               <Typography className="font-jost m-0 text-lg font-medium">
//                 {courseData.instructor}
//               </Typography>
//             </div>
//             <div className="grid grid-cols-2">
//               <Typography className="font-jost m-0 text-lg">
//                 Total Cost :
//               </Typography>
//               <Typography className="font-jost m-0 text-lg font-medium">
//                 {courseData.totalFee} INR
//               </Typography>
//             </div>
//             <div className="grid grid-cols-2">
//               <Typography className="font-jost m-0 text-lg">
//                 Discount Cost :
//               </Typography>
//               <Typography className="font-jost m-0 text-lg font-medium">
//                 {courseData.discountedFee} INR
//               </Typography>
//             </div>
//             <div className="grid grid-cols-2">
//               <Typography className="font-jost m-0 text-lg">
//                 Start Date :
//               </Typography>
//               <Typography className="font-jost m-0 text-lg font-medium">
//                 {' '}
//                 {formatDate(courseData.startDate)}
//               </Typography>
//             </div>
//             <div className="grid grid-cols-2">
//               <Typography className="font-jost m-0 text-lg">
//                 Registration Cost:
//               </Typography>
//               <Typography className="font-jost m-0 text-lg font-medium">
//                 {courseData.registrationAmount}
//                 {' /-'}
//               </Typography>
//             </div>
//             <div className="grid grid-cols-2">
//               <Typography className="font-jost m-0 text-lg">
//                 Duration
//               </Typography>
//               <Typography className="font-jost m-0 text-lg font-medium">
//                 {courseData.duration} - {courseData.durationType}
//               </Typography>
//             </div>
//             <div className="grid grid-cols-2">
//               <Typography className="font-jost m-0 text-lg">Batch</Typography>
//               <Typography className="font-jost m-0 text-lg font-medium">
//                 {courseData.days}
//               </Typography>
//             </div>
//           </div>
//           <Button
//             onClick={handleProceedClick}
//             className="font-jost md:w-[50%] m-0 lg:w-[30%] w-full rounded-lg border opacity-100 border-white transform transition duration-500 bg-[#AF8C3E] capitalize font-medium text-base"
//           >
//             Proceed
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default function Courseenroll() {
//   return (
//     <div>
//       {/* Your course layout structure */}
//       <Suspense fallback={<div>Loading...</div>}>
//         <CourseEnroll />
//       </Suspense>
//     </div>
//   );
// }
'use client';

import { Breadcrumbs, Button, Typography } from '@material-tailwind/react';
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { notify } from '../app/assets/Toastify';
import moment from 'moment';
import { BASE_URL } from '@/utils/apiClient';

const SuspenseFallback = () => <div>Loading...</div>;

const CourseEnroll = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [courseData, setCourseData] = useState(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!courseId) {
        console.error('No courseId provided');
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/api/courses`);
        const data = await response.json();

        if (data.success) {
          const course = data.courses.find((course) => course._id === courseId);

          if (course) {
            const parsedDays = Array.isArray(JSON.parse(course.days[0]))
              ? JSON.parse(course.days[0]).join('-')
              : '';

            setCourseData({
              ...course,
              days: parsedDays,
            });

            localStorage.setItem('courseData', JSON.stringify(course));
            const userId = localStorage.getItem('userId');
            if (userId) {
              router.push('/courseenroll2');
            } else {
              router.push('/login');
            }
            if (course.timeSlot) {
              setSelectedSlot(course.timeSlot);
              handleProceedClick();
            }
          } else {
            console.error('Course not found');
          }
        } else {
          console.error('Failed to fetch course data');
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchCourseData();
  }, [courseId, router]);

  const handleProceedClick = async () => {
    if (!selectedSlot) {
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/customer/book-course`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('enrollmentToken')}`,
        },
        body: JSON.stringify({
          courseId: courseData._id,
          selectedSlot: {
            startTime: selectedSlot.startTime,
            endTime: selectedSlot.endTime,
          },
        }),
      });

      const result = await response.json();
      if (result.success) {
        const userId = localStorage.getItem('userId');
        if (userId) {
          router.push('/courseenroll2');
        } else {
          router.push('/login');
        }
      } else {
        notify(result.message || 'Failed to book the course', 'error');
      }
    } catch (error) {
      console.error('Error booking course:', error);
      notify('An error occurred while booking the course.', 'error');
    }
  };
  if (!courseData) {
    return null;
  }

  return (
    // <Suspense fallback={<SuspenseFallback />}>
    <div></div>
    // </Suspense>
  );
};

export default function CourseEnrollPage() {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <CourseEnroll />
    </Suspense>
  );
}
