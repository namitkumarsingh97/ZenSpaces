

import React, { useState,useEffect } from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Typography, Input, IconButton } from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export function PopUp3() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');      
  const [email, setEmail] = useState('');    
  const [phone, setPhone] = useState('');
  const [transactionId, setTransactionId] = useState('')   

  const router=useRouter();

  const handleOpen = () => setOpen(!open);

  
  useEffect(() => {
    if (open) {
      // Create script element for Razorpay
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
      script.setAttribute('data-payment_button_id', 'pl_PC0B7M92Unagv2'); // Replace with your Razorpay payment button ID
      script.async = true;

      // Append script to the form
      const paymentButtonForm = document.getElementById('razorpay-payment-form');
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
  
  //   if (!name || !email || !phone || !transactionId) {
  //     alert('Please fill all the fields');
  //     return;
  //   }

  //   // Prepare the payload
  //   const [firstname, lastname] = name.split(' ');
  //   const payload = {
  //     to: email,
  //     subject: "Kundli Report",
  //     text: `Hello ${firstname}  ${lastname}, has filled a query for 5 years Lal Kitab Astrology Report.`,
  //     phone: phone,
  //     firstname: firstname || 'No first name provided',
  //     lastname: lastname || 'No last name provided',
  //     email: email || 'No Email Provided',
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
      <Image src='/2.png' onClick={handleOpen} width={450} className='cursor-pointer animate-pulse xl:max-w-[350px] 2xl:max-w-[450px]' height={450} alt='lalkitab'/>
      <Dialog size="sm" open={open} handler={handleOpen}   className="p-4 overflow-auto max-h-[90vh] sm:max-h-[80vh] w-full sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] mx-auto">
        <DialogHeader className="relative m-0 block">
          <Typography className="font-ibarra text-4xl" color="blue-gray">
            Lal kitab Astrology Report<br/> For 5 Years
          </Typography>
          <Typography className="mt-1 font-jost font-normal text-gray-600">
          This detailed analysis reveals key insights into your personality, relationships, and future prospects, empowering you with guidance and remedies tailored to your unique path.
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
          {/* <div>
            <Typography
              color="blue-gray"
              className="mb-2 font-jost text-left font-medium"
            >
              Name
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="eg. John Doe"
              name="name"
              value={name} // Set the value of name state
              onChange={(e) => setName(e.target.value)} // Update name state on change
              className="placeholder:opacity-100 font-jost focus:!border-t-gray-900"
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <div>
            <Typography
              color="blue-gray"
              className="mb-2 font-jost text-left font-medium"
            >
              Email
            </Typography>
            <Input
              type="email"
              color="gray"
              size="lg"
              placeholder="eg. john@example.com"
              name="email"
              value={email} // Set the value of email state
              onChange={(e) => setEmail(e.target.value)} // Update email state on change
              className="placeholder:opacity-100 font-jost focus:!border-t-gray-900"
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <div>
            <Typography
              color="blue-gray"
              className="mb-2 font-jost text-left font-medium"
            >
              Phone Number
            </Typography>
            <Input
              type="number"
              color="gray"
              size="lg"
              placeholder="eg. +123456789"
              name="phone"
              value={phone} // Set the value of phone state
              onChange={(e) => setPhone(e.target.value)} // Update phone state on change
              className="placeholder:opacity-100 font-jost focus:!border-t-gray-900"
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <div className="flex justify-center">
            <div className="max-w-xs max-h-48 overflow-hidden flex justify-center items-center">
              <img 
                src="/raman.jpeg" 
                alt="QR Code" 
                className="w-full h-full object-contain" 
              />
            </div>
          </div>
          <div>
            <Typography color="blue-gray" className="mb-2 font-jost text-left font-medium">
              Transaction ID
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="Enter Transaction ID"
              name="transactionId"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="placeholder:opacity-100 font-jost focus:!border-t-gray-900"
              containerProps={{ className: "!min-w-full" }}
              labelProps={{ className: "hidden" }}
            />
          </div> */}
            <div className="flex justify-center mt-4">
            <form id="razorpay-payment-form">
              {/* Razorpay Payment Button will be injected here */}
            </form>
          </div>
        </DialogBody>
        <DialogFooter>
          {/* <Button 
            onClick={sendMail} 
            className="font-jost rounded-sm border-dotted border border-white hover:scale-110 transform transition duration-500 bg-[#AF8C3E] capitalize font-medium text-base w-full"
          >
            Submit
          </Button> */}
           <Typography className="font-jost text-center text-gray-600 text-sm md:text-base">
            *Secure payments powered by Razorpay
          </Typography>
        </DialogFooter>
      </Dialog>
    </>
  );
}
