import React, { useState } from 'react';
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
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from './Toastify';

export function PopUp({ productName, productCategory, open, setOpen }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const router = useRouter();

  const sendMail = async () => {
    if (!name || !email || !phone) {
      notify('Please fill all the fields', 'error');
      return;
    }

    const [firstname, lastname] = name.split(' ');
    const payload = {
      to: email,
      subject: `${productCategory} Inquiry: ${productName}`, // Customize subject
      text: `Hello ${firstname} ${lastname}, has enrolled for the ${productName}.`,
      phone,
      firstname: firstname || 'No first name provided',
      lastname: lastname || 'No last name provided',
      transactionId,
    };

    try {
      const response = await fetch('/api/sendMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success(
          'Your inquiry has been submitted successfully! A callback will be arranged shortly.',
        );
        setOpen(false);
        router.push('/thankyou');
      } else {
        toast.error(
          'An error occurred: ' + result.message + ' Please try again',
        );
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('An error occurred. Please try again');
    }
  };

  return (
    <Dialog
      size="lg"
      open={open}
      handler={() => setOpen(!open)}
      className="p-4 overflow-auto max-h-[90vh] sm:max-h-[80vh] w-full sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] mx-auto"
    >
      <DialogHeader className="relative m-0 block">
        <Typography
          className="font-manrope text-3xl md:text-4xl"
          color="blue-gray"
        >
          {productName}
        </Typography>
        <Typography className="mt-1 font-mulish font-normal text-gray-600">
          Fill the form for query against {productName} .
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
        <div>
          <Typography
            color="blue-gray"
            className="mb-2 font-mulish text-left font-medium"
          >
            Name
          </Typography>
          <Input
            color="gray"
            size="lg"
            placeholder="eg. John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="placeholder:opacity-100 font-mulish focus:!border-t-gray-900"
            containerProps={{ className: '!min-w-full' }}
            labelProps={{ className: 'hidden' }}
          />
        </div>
        <div>
          <Typography
            color="blue-gray"
            className="mb-2 font-mulish text-left font-medium"
          >
            Email
          </Typography>
          <Input
            type="email"
            color="gray"
            size="lg"
            placeholder="eg. john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="placeholder:opacity-100 font-mulish focus:!border-t-gray-900"
            containerProps={{ className: '!min-w-full' }}
            labelProps={{ className: 'hidden' }}
          />
        </div>
        <div>
          <Typography
            color="blue-gray"
            className="mb-2 font-mulish text-left font-medium"
          >
            Phone Number
          </Typography>
          <Input
            type="number"
            color="gray"
            size="lg"
            placeholder="eg. +123456789"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="placeholder:opacity-100 font-mulish focus:!border-t-gray-900"
            containerProps={{ className: '!min-w-full' }}
            labelProps={{ className: 'hidden' }}
          />
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          onClick={sendMail}
          className="font-mulish rounded-sm border-dotted border border-white hover:scale-110 transform transition duration-500 bg-[#AF8C3E] capitalize font-medium text-base w-full"
        >
          Submit
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
