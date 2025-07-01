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
  const [enrollmentStatus, setEnrollmentStatus] = useState(null);
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
          key: 'rzp_test_010KxbeBZHkNTK',
          amount: amountInPaise,
          currency: currency,
          name: 'ZenSpaces',
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
                  startDate: moment(courseData.startDate).format('YYYY-MM-DD'),
                  slot: `${courseData.startTime} to ${courseData.endTime}`,
                  totalFee: courseData.totalFee,
                  discountedFee: courseData.discountedFee,
                  registrationAmount: courseData.registrationAmount,
                  remainingFee:
                    courseData.discountedFee - courseData.registrationAmount,
                  razorpayPaymentId: response.razorpay_payment_id,
                };

                const queryParams = new URLSearchParams(
                  courseDetails,
                ).toString();

                router.push(`/thankyou?${queryParams}`);
              } else {
                setErrorMessage(
                  'Payment verification failed. Please try again.',
                );
              }
            } catch (error) {
              setErrorMessage('Error verifying payment. Please try again.');
            }
          },
          modal: {
            ondismiss: function () {
              setErrorMessage('Payment not completed. Enrollment is pending.');
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
        setEnrollmentStatus(enrollment.paymentStatus);
        if (enrollment.paymentStatus === 'Paid') {
          setSuccessMessage('You are already fully enrolled in this course.');
        } else if (enrollment.paymentStatus === 'registrationAmountPaid') {
          setSuccessMessage(
            'You have already paid the registration amount. Please complete the remaining payment.',
          );
          initiatePayment(enrollment.registrationAmount, enrollment._id);
        } else if (enrollment.paymentStatus === 'pending') {
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
