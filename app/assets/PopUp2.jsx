import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
  IconButton,
} from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export function PopUp2() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [transactionId, setTransactionId] = useState('');

  const router = useRouter();

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    if (open) {
      // Create script element for Razorpay
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
      script.setAttribute('data-payment_button_id', 'pl_PC0AAlKdQbfWr9'); // Replace with your Razorpay payment button ID
      script.async = true;

      // Append script to the form
      const paymentButtonForm = document.getElementById(
        'razorpay-payment-form',
      );
      if (paymentButtonForm) {
        paymentButtonForm.innerHTML = ''; // Clear previous content
        paymentButtonForm.appendChild(script);
      }

      // Cleanup: remove script when modal is closed
      return () => {
        if (paymentButtonForm) {
          paymentButtonForm.innerHTML = ''; // Clear the form on cleanup
        }
      };
    }
  }, [open]);

  // const sendMail = async () => {

  //   if (!name || !email || !phone ||  !transactionId) {
  //     alert('Please fill all the fields');
  //     return;
  //   }

  //   const [firstname, lastname] = name.split(' ');
  //   const payload = {
  //     to: email,
  //     subject: "Vedic Numerology Report",
  //     text: `Hello ${firstname}  ${lastname}, has filled a query for Vedic Numerology Report.`,
  //     phone: phone,
  //     firstname: firstname || 'No first name provided',
  //     lastname: lastname || 'No last name provided',
  //     transactionId: transactionId,
  //   };

  //   try {
  //     const response = await fetch('/api/sendMail', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     const result = await response.json();
  //     if (response.ok) {
  //       router.push("/thankyou");
  //     } else {
  //       alert('An error occured: ' + result.message + 'Please try again');
  //     }
  //   } catch (error) {
  //     console.error('Error sending email:', error);
  //     alert('An error occured. Please try again');
  //   }
  // };

  return (
    <>
      <Image
        src="/1.png"
        onClick={handleOpen}
        className="cursor-pointer animate-pulse w-full h-auto max-w-[450px] xl:max-w-[350px] 2xl:max-w-[450px]"
        alt="vedic"
        width={450}
        height={450}
      />
      <Dialog
        size="lg"
        open={open}
        handler={handleOpen}
        className="p-4 overflow-auto max-h-[90vh] sm:max-h-[80vh] w-full sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] mx-auto"
      >
        <DialogHeader className="relative m-0 block">
          <Typography
            className="font-manrope text-3xl md:text-4xl lg:text-5xl"
            color="blue-gray"
          >
            Get Your Personalised
            <br /> Vedic Numerology Report
          </Typography>
          <Typography className="mt-1 font-mulish font-normal text-gray-600 text-sm md:text-base lg:text-lg">
            Unlock key insights into your personality, relationships, and future
            with a personalized Vedic Numerology report. Discover your unique
            path and gain tailored guidance to navigate life&apos;s journey with
            clarity.
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleOpen}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>
        </DialogHeader>

        <DialogBody className="space-y-4 pb-6">
          <div className="flex justify-center mt-4">
            <form id="razorpay-payment-form">
              {/* Razorpay Payment Button will be injected here */}
            </form>
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
