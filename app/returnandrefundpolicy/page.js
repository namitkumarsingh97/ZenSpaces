'use client';

import { Typography } from '@material-tailwind/react';
import React from 'react';

const ReturnAndRefundPolicy = () => {
  return (
    <div className="w-full">
      <div className='w-full bg-cover  flex items-center justify-center mt-[-40%] md:mt-[-20%] lg:mt-[-15%] xl:mt-[-11%] h-[37vh] xl:h-[50vh] bg-no-repeat bg-[url("/aboutbg.webp")]'>
        <Typography className="font-manrope xl:text-6xl text-4xl md:text-5xl xl:mt-40 mt-20">
          Return & Refund Policy
        </Typography>
      </div>
      <div className="w-full flex flex-col gap-10 xl:max-w-[80%] max-w-[90%] xl:py-20 py-5 mx-auto">
        <div className="flex flex-col gap-5">
          <Typography className="xl:text-3xl text-lg font-normal font-mulish">
            Return & Refund Policy
          </Typography>
          <Typography className="xl:text-lg text-base font-normal font-mulish">
            Thank you for buying a course/session/product with us . We want to
            make sure that our customers have an exceptional learning
            experience. As with any online purchase experience, the below are
            the terms and conditions that govern the Return & Refund Policy.
          </Typography>
          <Typography className="xl:text-lg text-base font-normal font-mulish">
            When you buy a course on the https://www.ZenSpaces.com/ you agree to
            our Privacy Policy, Terms of Use and the conditions covered below.
          </Typography>
        </div>

        <Typography className="xl:text-lg text-base font-normal font-mulish">
          Cancellation & Refunds: Training We understand that you can change
          your mind. We know that some of our courses might not be 100% relevant
          to you in your current need. That is why we give you the freedom to
          ask for a complete refund of your course fee by last date of
          registration. If the cancellation is done by the customer within by
          last date of registration, 100% of course fee paid will be refunded
          after deducting the Taxes Paid by the company for the transaction. If
          the cancellation is done by the customer after last date of
          registration no refund will be made.
        </Typography>

        <Typography className="xl:text-lg text-base font-normal font-mulish">
          Advance / Registration Payments: Advance payment or registration fee
          made for courses will not be refunded but can be adjusted in any other
          course or services that are availed by the student through ZenSpaces.
        </Typography>

        <Typography className="xl:text-lg text-base font-normal font-mulish">
          Duplicate Payment Refunds: Duplicate payment made by the customer will
          be processed within 30 days after intimation by the customer and
          confirmation.
        </Typography>

        <Typography className="xl:text-lg text-base font-normal font-mulish">
          Note: All refunds will be processed within 30 days of receipt of the
          refund request.
        </Typography>
      </div>
    </div>
  );
};

export default ReturnAndRefundPolicy;
