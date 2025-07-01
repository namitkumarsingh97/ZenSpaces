"use client";

import { Card, Typography, Rating, Button } from "@material-tailwind/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function CardDefault({
  courseTitle,
  instructor,
  description,
  duration,
  batch,
  price,
  originalPrice,
  students,
  imageSrc,
  index,
  registrationAmount,
  balanceDueDate,
  paymentOptions,
  schedule,
  introVideoLink,
  overview,
  syllabus,
  courseId,
  courseType,
}) {
  const router = useRouter();

  const handleExploreMore = () => {
    const courseData = {
      courseTitle,
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
    };

   localStorage.setItem("courseData", JSON.stringify(courseData));
    const query = new URLSearchParams({ courseTitle }).toString();

    router.push(`/course?${query}`);
  };

  const isComingSoon = index !== 0;

  return (
    <Card className="text-black">
      <div className="flex flex-col xl:flex-row items-center lg:gap-6">
        <div className="w-full xl:w-1/2 p-2">
          <Image
            src={imageSrc}
            className="rounded-3xl w-full h-auto object-cover"
            alt={courseTitle}
            width={1000}
            height={1000}
            priority
          />
        </div>
        <div className="flex flex-col w-full xl:w-1/2 p-5">
          <Typography className="text-3xl m-0 lg:text-4xl font-ibarra">
            {courseTitle}
          </Typography>
          <Typography className="text-lg mt-0 lg:text-2xl italic font-ibarra">
            By Astrologer {instructor}
          </Typography>
          <Typography className="text-sm mt-0 lg:text-base w-full font-normal font-jost">
            {description}
          </Typography>
          <div className="flex gap-1">
            <Rating unratedColor="black" className="mb-0" value={4} readonly />
          </div>
          <div className="flex flex-col">
            <Typography className="text-lg font-jost mb-0">
              {duration}
            </Typography>
            <Typography className="text-lg font-jost mb-0">
              {batch
                ? (() => {
                    const days = JSON.parse(batch);
                    return days.length === 2
                      ? days.join(' and ')
                      : days.slice(0, -1).join(', ') +
                          (days.length > 1 ? ' and ' : '') +
                          days.slice(-1);
                  })()
                : 'N/A'}
            </Typography>
            <Typography className="text-lg font-jost mb-0">
              <Typography className="font-jost m-0 text-lg font-medium">
                {schedule}
              </Typography>
            </Typography>
          </div>
          <div className="flex items-end gap-3">
            <Typography className="text-xl lg:text-2xl mb-0 font-jost">
              {price}
            </Typography>
            <Typography className="text-base lg:text-lg mb-0 line-through text-gray-800 font-jost">
              {originalPrice}
            </Typography>
          </div>
          {courseType !== 'video' && (
            <Typography className="font-jost italic mb-0">
              or 5 easy Installments{' '}
            </Typography>
          )}
          <p className="mt-2">
            Registration amount: <strong>{registrationAmount}</strong>
            {' /-'}
            <br />
            Balance to be paid 1 week before the course starting date:{' '}
            <strong>{balanceDueDate}</strong>
            {courseType !== 'video' && (
              <p>
                Registration amount will be adjusted in the last installment for
                monthly payment plans.
              </p>
            )}
            <Typography className="font-jost italic mb-0">
              {paymentOptions}
            </Typography>
          </p>
          <Button
            className="font-jost rounded-sm border-dotted border border-white hover:scale-110 transform transition duration-500 bg-[#AF8C3E] capitalize font-medium text-base w-full"
            onClick={!isComingSoon ? handleExploreMore : undefined}
          >
            {!isComingSoon ? 'Enroll Now' : 'Coming Soon'}
          </Button>
          <p style={{ textAlign: "center" }}>
            For help: <a href="tel:+919810800988"><strong>+91 9810800988</strong></a>
          </p>
        </div>
      </div>
    </Card>
  );
}
