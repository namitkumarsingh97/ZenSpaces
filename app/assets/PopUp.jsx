import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  IconButton,
  Input,
} from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { BASE_URL } from '@/utils/apiClient';

export function PopUp({ courseId }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    courseName: 'Lal Kitab Course',
    courseAmount: '39500',
    registrationAmount: '9999',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleEnrollClick = async () => {
    const token = localStorage.getItem('enrollmentToken');

    if (token) {
      // User is logged in, pass courseId as a query parameter
      // router.push(`/courseenroll?courseId=${courseId}`);
      router.push('/registerenroll3');
    } else {
      // User is not logged in, redirect to the login page
      // setErrorMessage('You need to be logged in to enroll.');
      router.push('/registerenroll3');
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEnrollment = async () => {
    const token = localStorage.getItem('enrollmentToken');

    if (!token) {
      setErrorMessage('You need to be logged in to enroll.');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/enroll`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.message) {
        injectRazorpayButton();
      } else {
        setErrorMessage('Enrollment failed. Please try again.');
      }
    } catch (error) {
      console.error(
        'Error during enrollment:',
        error.response?.data || error.message,
      );
      setErrorMessage(
        error.response?.data.message || 'Enrollment failed. Please try again.',
      );
    }
  };

  const injectRazorpayButton = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
    script.setAttribute('data-payment_button_id', 'pl_PBgpPPZ27b6dA4');
    script.async = true;

    const paymentButtonForm = document.getElementById('razorpay-payment-form');
    if (paymentButtonForm) {
      paymentButtonForm.innerHTML = '';
      paymentButtonForm.appendChild(script);
    }
  };

  return (
    <>
      <Button
        onClick={handleEnrollClick} // Checks login status before navigation
        className="font-mulish rounded-sm border-dotted border border-white hover:scale-110 transform transition duration-500 bg-[#AF8C3E] capitalize font-medium text-base w-full"
      >
        Enroll Now
      </Button>
      <Dialog
        size="lg"
        open={open}
        handler={() => setOpen(false)}
        className="p-4 overflow-auto max-h-[90vh] sm:max-h-[80vh] w-full sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] mx-auto"
      >
        <DialogHeader className="relative m-0 block">
          <Typography
            className="font-manrope text-3xl md:text-4xl"
            color="blue-gray"
          >
            Limited Seats Available
          </Typography>
          <Typography className="mt-1 font-mulish font-normal text-gray-600">
            Unlock the secrets of Lal Kitab.
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={() => setOpen(false)}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>
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
            <div className="flex justify-between">
              <Typography>Course Name: {formData.courseName}</Typography>
              <Typography>Course Amount: ₹{formData.courseAmount}</Typography>
            </div>
            <Button onClick={handleEnrollment} className="bg-[#AF8C3E]">
              Enroll & Pay
            </Button>
          </div>

          <div className="flex justify-center mt-4">
            <form id="razorpay-payment-form"></form>
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
