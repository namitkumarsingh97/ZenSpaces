// "use client";
// import {
//   Breadcrumbs,
//   Button,
//   Input,
//   Typography,
// } from "@material-tailwind/react";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import moment from "moment";

// const CourseEnroll2 = () => {
//   const [courseData, setCourseData] = useState(null);
//   const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const router = useRouter();
//   const startTime = router.query?.startTime || "Not selected";
//   const endTime = router.query?.endTime || "Not selected";

//   useEffect(() => {
//     const storedCourseData =localStorage.getItem("courseData");
//     if (storedCourseData) setCourseData(JSON.parse(storedCourseData));

//     const fetchUserData = async () => {
//       const token =localStorage.getItem("enrollmentToken");
//       if (token) {
//         try {
//           const response = await axios.get(
//             "https://astroastro-indol.vercel.app/api/getUserDetails",
//             {
//               headers: { Authorization: `Bearer ${token}` },
//             }
//           );
//           setFormData({
//             name: response.data.fullName,
//             email: response.data.email,
//             phone: response.data.phone,
//           });
//         } catch (error) {
//           setErrorMessage("Failed to fetch user data. Please try again.");
//         }
//       } else {
//         setErrorMessage("You need to be logged in to enroll.");
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleFormChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleEnrollment = async () => {
//     const token =localStorage.getItem("enrollmentToken");

//     if (!token) {
//       setErrorMessage("You need to be logged in to enroll.");
//       return;
//     }

//     if (!courseData) {
//       setErrorMessage("Course data not found.");
//       return;
//     }

//     const enrollmentData = {
//       name: formData.name,
//       email: formData.email,
//       phone: formData.phone,
//       courseId: courseData._id,
//     };

//     try {
//       const response = await axios.post(
//         "https://astroastro-indol.vercel.app/api/enroll",
//         enrollmentData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         const enrollment = response.data.enrollment;

//         if (enrollment.paymentStatus === "Paid") {
//           setSuccessMessage("You are already fully enrolled in this course.");
//         } else if (enrollment.paymentStatus === "registrationAmountPaid") {
//           setSuccessMessage(
//             "You have already paid the registration amount. Please complete the remaining payment."
//           );
//           initiatePayment(enrollment.registrationAmount, enrollment._id);
//         } else if (enrollment.paymentStatus === "pending") {
//           setSuccessMessage("Please complete the payment.");
//           initiatePayment(enrollment.registrationAmount, enrollment._id);
//         } else {
//           setErrorMessage(
//             "Unexpected enrollment status. Please contact support."
//           );
//         }
//       } else {
//         setErrorMessage("Enrollment failed. Please try again.");
//       }
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         setErrorMessage(error.response.data.message);
//       } else {
//         setErrorMessage("Enrollment failed. Please try again.");
//       }
//     }
//   };

//   const loadRazorpayScript = () => {
//     return new Promise((resolve, reject) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = (error) => reject(error);
//       document.body.appendChild(script);
//     });
//   };

//   const initiatePayment = async (registrationAmount, enrollmentId) => {
//     try {
//       const token =localStorage.getItem("enrollmentToken");
//       if (!token) {
//         setErrorMessage("You need to be logged in to initiate payment.");
//         return;
//       }

//       await loadRazorpayScript();
//       const amountInPaise = registrationAmount * 100;

//       const response = await axios.post(
//         "https://astroastro-indol.vercel.app/api/payment/create-order",
//         { amount: amountInPaise },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data && response.data.orderId) {
//         const { orderId, currency } = response.data;

//         const options = {
//           key: "rzp_live_kmq2QvpNnJUCR6",
//           // key:"rzp_test_010KxbeBZHkNTK",
//           amount: amountInPaise,
//           currency: currency,
//           name: "Astropathways",
//           description: "Course Enrollment Payment",
//           order_id: orderId,
//           handler: async function (response) {
//             const paymentData = {
//               razorpayPaymentId: response.razorpay_payment_id,
//               razorpayOrderId: response.razorpay_order_id,
//               razorpaySignature: response.razorpay_signature,
//               enrollmentId: enrollmentId,
//             };

//             try {
//               const verifyResponse = await axios.post(
//                 "https://astroastro-indol.vercel.app/api/payment/verify-payment",
//                 paymentData,
//                 {
//                   headers: {
//                     Authorization: `Bearer ${token}`,
//                   },
//                 }
//               );

//               if (verifyResponse.data.success) {
//                 const updateStatusResponse = await axios.post(
//                   "https://astroastro-indol.vercel.app/api/updateEnrollmentStatus",
//                   {
//                     enrollmentId,
//                     paymentStatus: "registrationAmountPaid",
//                   },
//                   {
//                     headers: { Authorization: `Bearer ${token}` },
//                   }
//                 );

//                 if (updateStatusResponse.status === 200) {
//                   setSuccessMessage(
//                     "Payment successful! Registration amount paid."
//                   );
//                   const courseDetails = {
//                     userName: formData.name,
//                     courseName: courseData.name,
//                     duration: `${courseData.duration} ${courseData.durationType}`,
//                     batch: courseData.days
//                       ? JSON.parse(courseData.days)?.join(", ")
//                       : "N/A",
//                     startDate: courseData.startDate,
//                     slot: `${courseData.startTime} to ${courseData.endTime}`,
//                     totalFee: courseData.totalFee,
//                     discountedFee: courseData.discountedFee,
//                     registrationAmount: courseData.registrationAmount,
//                     remainingFee:
//                       courseData.discountedFee - courseData.registrationAmount,
//                     razorpayPaymentId: response.razorpay_payment_id,
//                   };

//                   const queryParams = new URLSearchParams(
//                     courseDetails
//                   ).toString();
//                   router.push(`/thankyou?${queryParams}`);
//                 } else {
//                   setErrorMessage("Error updating enrollment status.");
//                 }
//               } else {
//                 console.error("Payment verification failed:", verifyResponse);
//                 setErrorMessage(
//                   "Payment verification failed. Please try again."
//                 );

//                 const failedTransactionId =
//                   response.razorpay_payment_id ||
//                   `FAILED-${new Date().getTime()}`;
//                localStorage.setItem(
//                   "razorpayPaymentIdfinal",
//                   failedTransactionId
//                 );
//               }
//             } catch (error) {
//               console.error("Error verifying payment:", error);
//               setErrorMessage("Error verifying payment. Please try again.");

//               const errorTransactionId = `ERROR-${new Date().getTime()}`;
//              localStorage.setItem(
//                 "razorpayPaymentIderrortransactionId",
//                 errorTransactionId
//               );
//             }
//           },
//           modal: {
//             ondismiss: async function () {
//               setErrorMessage("Payment not completed. Enrollment is pending.");
//               const canceledTransactionId = `CANCELLED-${new Date().getTime()}`;
//                localStorage.setItem(
//                   "razorpayPaymentIdcanceltransactionid",
//                   canceledTransactionId
//                 );
//               },
//             },
//           prefill: {
//             name: formData.name,
//             email: formData.email,
//             contact: formData.phone,
//           },
//           notes: {
//             address: "Your address",
//           },
//         };

//         const razorpayInstance = new window.Razorpay(options);
//         razorpayInstance.open();
//       } else {
//         setErrorMessage("Error creating Razorpay order.");
//       }
//     } catch (error) {
//       console.error("Failed to initiate payment:", error);
//       setErrorMessage("Failed to initiate payment. Please try again.");
//     }
//   };

//   if (!courseData) return <div>Loading course details...</div>;
//   const formatDate = (date) => {
//     return moment(date).format("DD/MM/YYYY");
//   };

//   return (
//     <div className='w-full bg-white bg-[url("/bgenroll.jpg")] bg-cover bg-center'>
//       <div className='w-full bg-cover  flex items-center justify-center mt-[-40%] md:mt-[-20%] lg:mt-[-15%] xl:mt-[-11%] h-[37vh] xl:h-[50vh] bg-no-repeat bg-[url("/aboutbg.webp")]'>
//         <Typography className="font-ibarra xl:text-6xl text-4xl md:text-5xl xl:mt-40 mt-20">
//           {courseData.name}
//         </Typography>
//       </div>

//       <div className="w-full min-h-[65vh] xl:max-w-[80%] text-black grid grid-cols-1 lg:grid-cols-3 max-w-[90%] xl:py-20 py-5 mx-auto">
//         <div className="flex flex-col justify-center gap-5 col-span-2 lg:gap-10">
//           <Typography className="font-ibarra text-3xl xl:text-4xl text-center md:text-start">
//             Enrollment Details
//           </Typography>
//           <div className="grid grid-cols-12 gap-5">
//             <div className="col-span-12 lg:col-span-6 flex flex-col gap-1">
//               <Typography className="font-jost m-0 font-medium text-lg">
//                 Name
//               </Typography>
//               <Input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 readOnly
//                 onChange={handleFormChange}
//                 color="black"
//                 label="Please Enter Your Name"
//                 className="font-jost m-0"
//               />
//             </div>
//             <div className="col-span-12 lg:col-span-6 flex flex-col gap-1">
//               <Typography className="font-jost m-0 font-medium text-lg">
//                 Email
//               </Typography>
//               <Input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 readOnly
//                 onChange={handleFormChange}
//                 color="black"
//                 label="Please Enter Your Email"
//                 className="font-jost m-0"
//               />
//             </div>
//             <div className="col-span-12 lg:col-span-12 flex flex-col gap-1">
//               <Typography className="font-jost m-0 font-medium text-lg">
//                 Phone
//               </Typography>
//               <Input
//                 type="text"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleFormChange}
//                 color="black"
//                 label="Please Enter Your Phone Number"
//                 className="font-jost"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col gap-10 mt-10 lg:mt-0 items-center justify-center">
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
//                 Google Meet
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
//                 Registration Amount :
//               </Typography>
//               <Typography className="font-jost m-0 text-lg font-medium">
//                 {courseData.registrationAmount} INR
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
//                 Discount cost:
//               </Typography>
//               <Typography className="font-jost m-0 text-lg font-medium">
//                 {courseData.discountedFee} INR
//               </Typography>
//             </div>
//             <div className="grid grid-cols-2">
//               <Typography className="font-jost m-0 text-lg">
//                 Duration
//               </Typography>
//               <Typography className="font-jost m-0 text-lg font-medium">
//                 {courseData.duration}-{courseData.durationType}
//               </Typography>
//             </div>
//             <div className="grid grid-cols-2">
//               <Typography className="font-jost m-0 text-lg">Batch</Typography>
//               <Typography className="font-jost m-0 text-lg font-medium">
//                 {courseData.days
//                   ? JSON.parse(courseData.days)?.join("-")
//                   : "N/A"}
//               </Typography>
//             </div>

//             <div className="grid grid-cols-2">
//               <Typography className="font-jost m-0 text-lg">
//                 Course start date
//               </Typography>
//               <Typography className="font-jost m-0 text-lg font-medium">
//                 {formatDate(courseData.startDate)}
//               </Typography>
//             </div>
//           </div>

//           {errorMessage && (
//             <div className="bg-red-500 text-white p-2 rounded">
//               <Typography>{errorMessage}</Typography>
//             </div>
//           )}

//           {successMessage && (
//             <div className="bg-green-500 text-white p-2 rounded">
//               <Typography>{successMessage}</Typography>
//             </div>
//           )}

//           <Button
//             onClick={handleEnrollment}
//             color="amber"
//             className="w-full font-jost"
//           >
//             Enroll Now
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseEnroll2;
'use client';
import React, { useEffect, useState, Suspense } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import { Button } from '@material-tailwind/react';
import { BASE_URL } from '@/utils/apiClient';

const SuspenseFallback = () => <div>Loading...</div>;

const CourseEnroll2 = () => {
  const [courseData, setCourseData] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [enrollmentStatus, setEnrollmentStatus] = useState(null); // Track enrollment status
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('reloaded')) {
      localStorage.setItem('reloaded', 'true');
      // window.location.reload();
    }
  }, []);

  useEffect(() => {
  return () => {
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
  };
}, []);

  useEffect(() => {
    const storedCourseData = localStorage.getItem('courseData');
    if (storedCourseData) setCourseData(JSON.parse(storedCourseData));

    const fetchUserData = async () => {
      const token = localStorage.getItem('enrollmentToken');
      if (token) {
        try {
          const response = await axios.get(`${BASE_URL}/api/getUserDetails`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setFormData({
            name: response.data.fullName || 'User',
            email: response.data.email,
            phone: response.data.phone || '',
          });
        } catch (error) {
          setErrorMessage('Failed to fetch user data. Please try again.');
        }
      } else {
        setErrorMessage('You need to be logged in to enroll.');
      }
    };

    fetchUserData();
  }, []);

  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = (error) => reject(error);
      document.body.appendChild(script);
    });
  };

  const initiatePayment = async (registrationAmount, enrollmentId) => {
    try {
      const token = localStorage.getItem('enrollmentToken');
      if (!token) {
        setErrorMessage('You need to be logged in to initiate payment.');
        return;
      }

      await loadRazorpayScript();
      const amountInPaise = registrationAmount * 100;

      const response = await axios.post(
        `${BASE_URL}/api/payment/create-order`,
        { amount: amountInPaise },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.data && response.data.orderId) {
        const { orderId, currency } = response.data;

        const options = {
            key: 'rzp_live_kmq2QvpNnJUCR6',
            // key:"rzp_test_010KxbeBZHkNTK",
          amount: amountInPaise,
          currency: currency,
          name: 'Astropathways',
          description: 'Course Enrollment Payment',
          order_id: orderId,
          handler: async function (response) {
            const paymentData = {
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              enrollmentId,
            };

            try {
              const verifyResponse = await axios.post(
                `${BASE_URL}/api/payment/verify-payment`,
                paymentData,
                {
                  headers: { Authorization: `Bearer ${token}` },
                },
              );

              if (verifyResponse.data.success) {
                setSuccessMessage(
                  'Payment successful! Registration amount paid.',
                );

                const courseDetails = {
                  userName: formData.name,
                  courseName: courseData.name,
                  duration: `${courseData.duration} ${courseData.durationType}`,
                  batch: courseData.days
                    ? JSON.parse(courseData.days)?.join(', ')
                    : 'N/A',
                  startDate: moment(courseData.startDate).format('YYYY-MM-DD'), // Ensure proper date format
                  slot: `${courseData.startTime} to ${courseData.endTime}`,
                  totalFee: courseData.totalFee,
                  discountedFee: courseData.discountedFee,
                  registrationAmount: courseData.registrationAmount,
                  remainingFee:
                    courseData.discountedFee - courseData.registrationAmount,
                  razorpayPaymentId: response.razorpay_payment_id,
                };

                // Flatten the object to ensure it works as query params
                const queryParams = new URLSearchParams(
                  courseDetails,
                ).toString();

                // Redirect to Thank You page with the query params
                router.push(`/thankyou?${queryParams}`);
              } else {
                setErrorMessage(
                  'Payment verification failed. Please try again.',
                );
                // window.location.reload();
              }
            } catch (error) {
              setErrorMessage('Error verifying payment. Please try again.');
              // window.location.reload();
            }
          },
          modal: {
            ondismiss: function () {
              setErrorMessage('Payment not completed. Enrollment is pending.');
              // window.location.reload();
            },
          },
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone,
          },
          notes: {
            address: 'Your address',
          },
        };

        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.open();
      } else {
        setErrorMessage('Error creating Razorpay order.');
      }
    } catch (error) {
      setErrorMessage('Failed to initiate payment. Please try again.');
    }
  };

  const handleEnrollment = async () => {
    const token = localStorage.getItem('enrollmentToken');

    if (!token) {
      setErrorMessage('You need to be logged in to enroll.');
      return;
    }

    if (!courseData) {
      setErrorMessage('Course data not found.');
      return;
    }

    const enrollmentData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      // courseId: courseData._id,
      courseId: courseData.courseId,
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/api/enroll`,
        enrollmentData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.status === 200) {
        const enrollment = response.data.enrollment;
        setEnrollmentStatus(enrollment.paymentStatus); // Store payment status
        if (enrollment.paymentStatus === 'Paid') {
          setSuccessMessage('You are already fully enrolled in this course.');
        } else if (enrollment.paymentStatus === 'registrationAmountPaid') {
          setSuccessMessage(
            'You have already paid the registration amount. Please complete the remaining payment.',
          );
          initiatePayment(enrollment.registrationAmount, enrollment._id);
        } else if (enrollment.paymentStatus === 'pending') {
          // setSuccessMessage("Please complete the payment.");
          initiatePayment(enrollment.registrationAmount, enrollment._id);
        } else {
          setErrorMessage(
            'Unexpected enrollment status. Please contact support.',
          );
        }
      } else {
        setErrorMessage('already enrolled go to my profile.');
      }
    } catch (error) {
      setErrorMessage('already enrolled go to my profile.');
    }
  };

  useEffect(() => {
    if (
      courseData &&
      // formData.name &&
      formData.email &&
      enrollmentStatus !== 'Paid' &&
      enrollmentStatus !== 'registrationAmountPaid'
    ) {
      handleEnrollment();
    }
  }, [courseData, formData, enrollmentStatus]);

  if (!courseData) return <div>Loading course details...</div>;

  return (
    <div className="w-full bg-white bg-[url('/bgenroll.jpg')] bg-cover bg-center">
      <div className="w-full min-h-[65vh] xl:max-w-[80%] text-black grid grid-cols-1 lg:grid-cols-3 max-w-[90%] xl:py-20 py-5 mx-auto">
        <div className="flex flex-col gap-10 mt-10 lg:mt-0 items-center justify-center">
          {successMessage && <p className="text-green-600">{successMessage}</p>}
          {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default function CourseEnroll2Page() {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <CourseEnroll2 />
    </Suspense>
  );
}
