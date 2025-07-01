'use client';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from '@material-tailwind/react';
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  IconButton,
} from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export function ReadingCard({
  img,
  name,
  price,
  description,
  razorpayButtonId,
}) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleOpen = async () => {
    const token = localStorage.getItem('enrollmentToken');

    if (token) {
      try {
        const response = await axios.get(
          'https://astroganesha.vercel.app/api/getUserDetails',
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        setFormData({
          name: response.data.fullName,
          email: response.data.email,
          phone: response.data.phone,
        });
        setOpen(true);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setErrorMessage('Failed to fetch user data. Please try again.');
      }
    } else {
      setErrorMessage('You need to be logged in to enroll.');
      router.push('/login');
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEnrollment = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('enrollmentToken');
    if (!token) {
      setErrorMessage('You need to be logged in to enroll.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'https://astroganesha.vercel.app/api/reportenroll',
        {
          ...formData,
          courseName: name,
          courseAmount: parseInt(price.replace(/[^\d]/g, ''), 10), // Convert price to integer
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.message) {
        injectRazorpayButton();
      } else {
        setErrorMessage('Enrollment failed. Please try again.');
      }
    } catch (error) {
      console.error('Enrollment error:', error);
      setErrorMessage('Enrollment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const injectRazorpayButton = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
    script.setAttribute('data-payment_button_id', razorpayButtonId);
    script.async = true;

    const paymentButtonForm = document.getElementById(
      `razorpay-payment-form-${name}`,
    );
    if (paymentButtonForm) {
      paymentButtonForm.innerHTML = '';
      paymentButtonForm.appendChild(script);
    }
  };

  return (
    <>
      <Card className="w-full hover:scale-105 transform translate my-5 duration-500 h-[600px]">
        <div className="flex items-center rounded-t-3xl justify-center 2xl:h-[35vh]">
          <img src={img} alt={name} className="w-full rounded-t-2xl" />
        </div>
        <CardBody className="px-6 pt-6">
          <Typography className="font-mulish text-2xl font-medium text-blue-gray-900 mb-2">
            {name}
          </Typography>
          <Typography className="font-mulish font-normal 2xl:text-lg text-gray-700">
            {description}
          </Typography>
        </CardBody>
        <CardFooter className="pb-4 w-full absolute bottom-0">
          <div className="flex  w-full justify-center">
            <Typography className="font-mulish font-medium w-full text-base md:text-lg italic text-blue-gray-900">
              {price}
            </Typography>
            <Button
              onClick={handleOpen}
              className="font-mulish rounded-sm border-dotted border border-white hover:scale-110 bg-opacity-100 transform transition duration-500 bg-[#AF8C3E] capitalize font-medium md:text-sm text-base hover:rounded-none lg:max-w-[30%] 2xl:max-w-[30%] w-[50%]"
            >
              Pay Now
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Payment Modal */}
      <Dialog
        size="lg"
        open={open}
        handler={handleOpen}
        className="p-4 overflow-auto max-h-[90vh] sm:max-h-[80vh] w-full sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] mx-auto"
      >
        <DialogHeader className="relative m-0 block">
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={() => setOpen(false)}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>
          <Typography
            className="font-manrope text-3xl md:text-4xl lg:text-5xl"
            color="blue-gray"
          >
            Pay for {name}
          </Typography>
          {/* <XMarkIcon className="h-4 w-4 stroke-2 absolute right-3.5 top-3.5 cursor-pointer" onClick={handleOpen} /> */}
        </DialogHeader>

        <DialogBody className="space-y-4 pb-6">
          {errorMessage && (
            <Typography color="red" className="text-center">
              {errorMessage}
            </Typography>
          )}
          <div className="space-y-4">
            <Input label="Name" name="name" value={formData.name} />
            <Input label="Email" name="email" value={formData.email} />
            <Input
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleFormChange}
            />
            <Button onClick={handleEnrollment} className="bg-[#AF8C3E]">
              Enroll & Pay
            </Button>
          </div>

          <div className="flex justify-center mt-4">
            <form id={`razorpay-payment-form-${name}`}></form>
          </div>
        </DialogBody>

        <DialogFooter>
          <Typography className="font-mulish text-center text-gray-600 text-sm md:text-base">
            *Secure payments powered by Razorpay
          </Typography>
        </DialogFooter>
      </Dialog>
    </>
  );
}
const CONTENTS = [
  {
    img: '/hello2.jpg',
    name: 'Get your Kundli Report Vedic + Numerology',
    price: '₹ 5,100',
    description:
      'Lal Kitab astrology report offers 5 years of insights into planetary impacts on your life, with remedies to enhance your well-being, relationships, and career.',
    razorpayButtonId: 'pl_PBzfPcM8oOSk71',
  },
  {
    img: '/hello1.jpg',
    name: 'Lal Kitab Astrology Report For 5 Years',
    price: '₹ 3,100',
    description:
      'A 5-year Kundli report with Vedic astrology and numerology insights, offering remedies and personalized guidance for your future path.',
    razorpayButtonId: 'pl_PBzgYdMJSIJJh5',
  },
  {
    img: '/hello1.jpg',
    name: 'Get Complete Vedic Report',
    price: '₹ 3,100',
    description:
      'A detailed Vedic report analyzing key aspects of your life, offering personalized remedies and guidance to help navigate challenges and seize opportunities.',
    razorpayButtonId: 'pl_PBzhpJapDBWCRq',
  },
];

const ReadingsPage = () => {
  return (
    <div className="w-full">
      <div className='w-full bg-cover  flex items-center justify-center mt-[-40%] md:mt-[-20%] lg:mt-[-15%] xl:mt-[-11%] h-[37vh] xl:h-[50vh] bg-no-repeat bg-[url("/aboutbg.webp")]'>
        <Typography className="font-manrope xl:text-6xl text-4xl md:text-5xl xl:mt-40 mt-20">
          Reports
        </Typography>
      </div>
      <div className="w-full lg:max-w-[80%] max-w-[90%] 2xl:py-20 py-5 mx-auto">
        {/* <div className='flex items-center gap-2 flex-col justify-center'>
          <Typography className='font-manrope font-medium text-2xl 2xl:text-6xl text-white'>For Reports Contact:</Typography>
          <Typography className='font-manrope font-medium text-4xl 2xl:text-6xl text-white'>+91 9810800988</Typography>
        </div> */}
        <div className="grid place-items-center md:grid-cols-2 py-5 2xl:grid-cols-3 gap-5">
          {CONTENTS.map(
            ({ img, name, price, description, razorpayButtonId }, index) => (
              <ReadingCard
                key={index}
                img={img}
                name={name}
                price={price}
                description={description}
                razorpayButtonId={razorpayButtonId} // Pass the Razorpay button ID
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadingsPage;
