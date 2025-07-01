'use client';
import { Typography } from '@material-tailwind/react';
import React from 'react';

// const Content = () => {
//   return (
//     <div className='text-black min-h-[80vh] mt-10'>
//       <div className='flex flex-col gap-5'>
//         <Typography className='font-mulish font-medium text-2xl 2xl:text-3xl'>What will you learn from your course?</Typography>
//         <div className='flex lg:flex-row flex-col 2xl:max-w-[80%] justify-between'>
//             <div className='flex flex-col gap-5'>
//             <div className='flex flex-col gap-2'>
//             <Typography className='2xl:text-xl text-lg font-mulish font-medium'>1.) Introduction to Lal Kitab</Typography>
//             <ul className='2xl:ml-10 ml-5 list-disc'>
//                 <li>
//                     <Typography className='font-mulish font-normal  text-base 2xl:text-lg'>History and origins</Typography>
//                 </li>
//                 <li>
//                     <Typography className='font-mulish font-normal text-base 2xl:text-lg'>Differences from traditional astrology</Typography>
//                 </li>
//                 <li>
//                      <Typography className='font-mulish font-normal text-base 2xl:text-lg'>Key principles and concepts</Typography>
//                 </li>
//             </ul>
//         </div>
//         <div className='flex flex-col gap-2'>
//             <Typography className='2xl:text-xl text-lg font-mulish font-medium'>2.) Functioning of Lal Kitab</Typography>
//             <ul className='2xl:ml-10 ml-5 list-disc'>
//                 <li>
//                     <Typography className='font-mulish font-normal  text-base 2xl:text-lg'>Unique features of Lal Kitab</Typography>
//                 </li>
//                 <li>
//                     <Typography className='font-mulish font-normal text-base 2xl:text-lg'>How Lal Kitab remedies work</Typography>
//                 </li>
//                 <li>
//                      <Typography className='font-mulish font-normal text-base 2xl:text-lg'>Understanding the importance of karmic connections</Typography>
//                 </li>
//             </ul>
//         </div>
//         <div className='flex flex-col gap-2'>
//             <Typography className='2xl:text-xl text-lg font-mulish font-medium'>3.) Planetary Significance and House Analysis</Typography>
//             <ul className='2xl:ml-10 ml-5 list-disc'>
//                 <li>
//                     <Typography className='font-mulish font-normal  text-base 2xl:text-lg'>Detailed study of each planet in Lal Kitab</Typography>
//                 </li>
//                 <li>
//                     <Typography className='font-mulish font-normal text-base 2xl:text-lg'>Significance of each house (1 to 12)</Typography>
//                 </li>
//                 <li>
//                      <Typography className='font-mulish font-normal text-base 2xl:text-lg'>Role of planets in various houses</Typography>
//                 </li>
//             </ul>
//         </div>
//         <div className='flex flex-col gap-2'>
//             <Typography className='2xl:text-xl text-lg font-mulish font-medium'>4.) Effects of Two-Planet Combinations</Typography>
//             <ul className='2xl:ml-10 ml-5 list-disc'>
//                 <li>
//                     <Typography className='font-mulish font-normal  text-base 2xl:text-lg'>Analyzing the impact of planetary pairs</Typography>
//                 </li>
//                 <li>
//                     <Typography className='font-mulish font-normal text-base 2xl:text-lg'>How combinations influence an individual&apos;s life</Typography>
//                 </li>
//                 <li>
//                      <Typography className='font-mulish font-normal text-base 2xl:text-lg'>Remedies for unfavorable combinations</Typography>
//                 </li>
//             </ul>
//         </div>
//             </div>
//             <div className='flex flex-col mt-5 2xl:mt-0 gap-5'>
//         <div className='flex flex-col gap-2'>
//             <Typography className='2xl:text-xl text-lg font-mulish font-medium'>5.) Complex Planetary Combinations</Typography>
//             <ul className='2xl:ml-10 ml-5 list-disc'>
//                 <li>
//                     <Typography className='font-mulish font-normal  text-base 2xl:text-lg'>Understanding the dynamics of three and four-planet combinations</Typography>
//                 </li>
//                 <li>
//                     <Typography className='font-mulish font-normal text-base 2xl:text-lg'>Predictive techniques and interpretations</Typography>
//                 </li>
//                 <li>
//                      <Typography className='font-mulish font-normal text-base 2xl:text-lg'>Advanced remedial measures</Typography>
//                 </li>
//             </ul>
//         </div>
//         <div className='flex flex-col gap-2'>
//             <Typography className='2xl:text-xl text-lg font-mulish font-medium'>6.) Analyzing Varshfal</Typography>
//             <ul className='2xl:ml-10 ml-5 list-disc'>
//                 <li>
//                     <Typography className='font-mulish font-normal  text-base 2xl:text-lg'>Introduction to annual charts in Lal Kitab</Typography>
//                 </li>
//                 <li>
//                     <Typography className='font-mulish font-normal text-base 2xl:text-lg'>Techniques for predicting yearly trends</Typography>
//                 </li>
//                 <li>
//                      <Typography className='font-mulish font-normal text-base 2xl:text-lg'>Practical exercises in constructing and interpreting Varshfal</Typography>
//                 </li>
//             </ul>
//         </div>
//         <div className='flex flex-col gap-2'>
//             <Typography className='2xl:text-xl text-lg font-mulish font-medium'>7.) Vastu Principles in Lal Kitab</Typography>
//             <ul className='2xl:ml-10 ml-5 list-disc'>
//                 <li>
//                     <Typography className='font-mulish font-normal  text-lg'>Understanding the relationship between Vastu and planets</Typography>
//                 </li>
//                 <li>
//                     <Typography className='font-mulish font-normal text-lg'>Identification of planetary influences in house structures</Typography>
//                 </li>
//                 <li>
//                      <Typography className='font-mulish font-normal text-lg'>Remedies and adjustments for harmonious living</Typography>
//                 </li>
//             </ul>
//         </div>
//         <div className='flex flex-col gap-2'>
//             <Typography className='2xl:text-xl text-lg font-mulish font-medium'>8.) Practical Sessions and Case Studies</Typography>
//             <ul className='2xl:ml-10 ml-5 list-disc'>
//                 <li>
//                     <Typography className='font-mulish font-normal  text-base 2xl:text-lg'>Interactive sessions for real-life application</Typography>
//                 </li>
//                 <li>
//                     <Typography className='font-mulish font-normal text-base 2xl:text-lg'>Detailed case studies analysis</Typography>
//                 </li>
//                 <li>
//                      <Typography className='font-mulish font-normal text-base 2xl:text-lg'>Discussion on modern relevance and adaptations</Typography>
//                 </li>
//             </ul>
//         </div>
//             </div>
//         </div>
//       </div>
//     </div>
//   )
// }
const Content = ({ syllabus }) => {
  return (
    <div className="flex text-black flex-col min-h-[80vh] py-10 gap-10">
      <div className="flex flex-col gap-5">
        <Typography className="font-mulish font-medium text-2xl 2xl:text-3xl">
          Course Syllabus
        </Typography>
        <div className="flex flex-col gap-1">
          {syllabus && (
            <div
              className="syllabus-text columns-2"
              dangerouslySetInnerHTML={{ __html: syllabus }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Content;
