"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  IconButton,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BASE_URL } from '@/utils/apiClient';

export function ReadingCard({
  img,
  name,
  price,
  description,
  razorpayButtonId,
}) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleOpen = async () => {
    const token =localStorage.getItem("enrollmentToken");

    if (token) {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/getUserDetails`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setFormData({
          name: response.data.fullName,
          email: response.data.email,
          phone: response.data.phone,
        });
        setOpen(true);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setErrorMessage("Failed to fetch user data. Please try again.");
      }
    } else {
      setErrorMessage("You need to be logged in to enroll");
      router.push("/login");
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEnrollment = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token =localStorage.getItem("enrollmentToken");
    if (!token) {
      setErrorMessage("You need to be logged in to enroll.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/readingenroll`,
        {
          ...formData,
          courseName: name,
          courseAmount: parseInt(price.replace(/[^\d]/g, ""), 10), // Convert price to integer
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message) {
        injectRazorpayButton();
      } else {
        setErrorMessage("Enrollment failed. Please try again.");
      }
    } catch (error) {
      console.error("Enrollment error:", error);
      setErrorMessage("Enrollment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const injectRazorpayButton = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/payment-button.js";
    script.setAttribute("data-payment_button_id", razorpayButtonId);
    script.async = true;

    const paymentButtonForm = document.getElementById(
      `razorpay-payment-form-${name}`
    );
    if (paymentButtonForm) {
      paymentButtonForm.innerHTML = ""; // Clear previous content
      paymentButtonForm.appendChild(script); // Inject the Razorpay script
    }
  };

  return (
    <>
      <Card className="w-full hover:scale-105 transform translate my-5 duration-500 h-[500px] lg:h-[600px]">
        <div className="flex items-center rounded-t-3xl justify-center 2xl:h-[35vh]">
          <img src={img} alt={name} className="w-full rounded-t-2xl" />
        </div>
        <CardBody className="px-6 pt-6">
          <Typography className="font-jost text-2xl font-medium text-blue-gray-900 mb-2">
            {name}
          </Typography>
          <Typography className="font-jost font-normal 2xl:text-lg text-gray-700">
            {description}
          </Typography>
        </CardBody>
        <CardFooter className="pb-4 w-full absolute bottom-0">
          <div className="flex  w-full justify-center">
            <Typography className="font-jost font-medium w-full text-base md:text-lg italic text-blue-gray-900">
              {price}
            </Typography>
            <Button
              onClick={handleOpen}
              className="font-jost rounded-sm border-dotted border border-white hover:scale-110 bg-opacity-100 transform transition duration-500 bg-[#AF8C3E] capitalize font-medium md:text-sm text-base hover:rounded-none lg:max-w-[30%] 2xl:max-w-[30%] w-[50%]"
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
        handler={() => setOpen(false)}
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
            className="font-ibarra text-3xl md:text-4xl lg:text-5xl"
            color="blue-gray"
          >
            Pay for {name}
          </Typography>
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
          <Typography className="font-jost text-center text-gray-600 text-sm md:text-base">
            *Secure payments powered by Razorpay
          </Typography>
        </DialogFooter>
      </Dialog>
    </>
  );
}

const CONTENTS = [
  {
    img: "/birthchart.jpg",
    name: "Birth Chart Analysis",
    price: "₹ 3,100 For 30 Minutes",
    description:
      "Uncover the secrets of your cosmic blueprint with our in-depth Birth Chart Analysis...",
    razorpayButtonId: "pl_PBzWwLVgR8LjUi", // Replace with actual button IDs
  },
  {
    img: "/relationship.jpg",
    name: "Relationship Compatibility Reading",
    price: "₹ 2,100 For 30 Minutes",
    description:
      "Discover the dynamics of your relationships with our Relationship Compatibility Reading...",
    razorpayButtonId: "pl_PBzZAFoVKbDPKe", // Replace with actual button IDs
  },
  {
    img: "/year.jpg",
    name: "Yearly Astrological Forecast",
    price: "₹ 2,100 For 30 Minutes",
    description:
      "Embrace the cosmic energies that await you in the upcoming year with our Yearly Astrological Forecast...",
    razorpayButtonId: "pl_PBzamUYOPEvfsn", // Replace with actual button IDs
  },
  {
    img: "/hello2.jpg",
    name: "Career and Education Guidance",
    price: "₹ 1,100",
    description:
      "Acharya Raman Singh offers personalized astrology insights for career and education...",
    razorpayButtonId: "pl_PBzbuvDTonQW4Z", // Replace with actual button IDs
  },
  {
    img: "/hello1.jpg",
    name: "Business Consultation",
    price: "₹ 1,100",
    description:
      "Unlock your business potential with expert astrological analysis...",
    razorpayButtonId: "pl_PBzd1dmiobAEDM", // Replace with actual button IDs
  },
];

const ReadingsPage = () => {
  return (
    <div className="w-full">
      <div className='w-full bg-cover  flex items-center justify-center mt-[-40%] md:mt-[-20%] lg:mt-[-15%] xl:mt-[-11%] h-[37vh] xl:h-[50vh] bg-no-repeat bg-[url("/aboutbg.webp")]'>
        <Typography className="font-ibarra xl:text-6xl text-4xl md:text-5xl xl:mt-40 mt-20">
          Readings
        </Typography>
      </div>
      <div className="w-full lg:max-w-[80%] max-w-[90%] 2xl:py-20 py-5 mx-auto">
        {/* <div className='flex items-center gap-2 flex-col justify-center'>
          <Typography className='font-ibarra font-medium text-2xl 2xl:text-6xl text-white'>For Readings Contact:</Typography>
          <Typography className='font-ibarra font-medium text-4xl 2xl:text-6xl text-white'>+91 9810800988</Typography>
        </div> */}
        <div className="grid place-items-center md:grid-cols-2 2xl:grid-cols-3 gap-5">
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
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadingsPage;
