'use client';
import {
  ShoppingBagIcon,
  UserCircleIcon,
  PowerIcon,
} from '@heroicons/react/24/solid';
import { notify } from '../app/assets/Toastify';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaFileInvoiceDollar } from 'react-icons/fa6';
import React from 'react';
import {
  List,
  Card,
  ListItemPrefix,
  ListItem,
  Typography,
  Button,
  Select,
  Option,
} from '@material-tailwind/react';
import MyProfile from './MyProfile';
import MyCourses from './MyCourses';
import PaymentDetails from './PaymentDetails';
import { Dropdown } from '@/app/assets/Dropdown';
import Image from 'next/image';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { BASE_URL } from '@/utils/apiClient';

const MyAccount = ({ courseId }) => {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem('activeTab') || 'myprofile',
  );
  const [enrollments, setEnrollments] = useState([]);
  const router = useRouter();
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const [zoomMeetings, setZoomMeetings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userstate, setuserstate] = useState();
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [courseVideoUrl, setCourseVideoUrl] = useState('');
  const [zoomCourse, setZoomCourse] = useState([]);
  // const [selectedCourseName, setSelectedCourseName] = useState('');
  const [selectCourseId, setSelectCourseId] = useState();
  const [paymentModalData, setPaymentModalData] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  // const [videoUrls, setVideoUrls] = useState([]);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          console.error('User ID not found in session storage');
          return;
        }

        const response = await axios.get(`${BASE_URL}/api/enrollmentbyuserid`, {
          params: { userId },
        });

        const updatedEnrollments = response.data.map((enrollment) => {
          const course = enrollment.courseId || {};
          const timeSlot = course.timeSlot || {};
          const parsedDays = course.days ? JSON.parse(course.days) : [];

          return {
            ...enrollment,
            courseId: {
              ...course,
              days: parsedDays,
              timeSlot: {
                ...timeSlot,
                startTime: timeSlot.startTime || 'Not Available',
                endTime: timeSlot.endTime || 'Not Available',
              },
            },
          };
        });
        setEnrollments(updatedEnrollments);
        setuserstate(userId);
      } catch (error) {
        console.error('Error fetching enrollments', error);
      }
    };
    fetchEnrollments();
  }, []);

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);
  const [selectedCourseName, setSelectedCourseName] = useState(() => {
    return localStorage.getItem('selectedCourseName') || '';
  });

  const [courseZoomMeeting, setCourseZoomMeeting] = useState(() => {
    return JSON.parse(localStorage.getItem('courseZoomMeeting')) || null;
  });

  const [videoUrls, setVideoUrls] = useState(() => {
    return JSON.parse(localStorage.getItem('videoUrls')) || [];
  });

  useEffect(() => {
    if (selectedCourseName) {
      localStorage.setItem('selectedCourseName', selectedCourseName);
    }
    if (courseZoomMeeting) {
      localStorage.setItem(
        'courseZoomMeeting',
        JSON.stringify(courseZoomMeeting),
      );
    }
    if (videoUrls.length > 0) {
      localStorage.setItem('videoUrls', JSON.stringify(videoUrls));
    }
  }, [selectedCourseName, courseZoomMeeting, videoUrls]);

  useEffect(() => {
    if (activeTab !== 'viewcoursedetails') {
      localStorage.removeItem('selectedCourseName');
      localStorage.removeItem('courseZoomMeeting');
      localStorage.removeItem('videoUrls');
    }
  }, [activeTab]);

  useEffect(() => {
    if (paymentSuccess) {
      localStorage.setItem('activeTab', 'mycourses');
      window.location.reload();
    }
  }, [paymentSuccess]);

  useEffect(() => {
    const storedTab = localStorage.getItem('activeTab');
    if (storedTab) {
      setActiveTab(storedTab);
    }
  }, []);

  useEffect(() => {
    loadRazorpayScript()
      .then(() => {
        setIsRazorpayLoaded(true);
      })
      .catch((error) => {
        console.error('Failed to load Razorpay script:', error);
      });
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

  const handlePayNowClick = (enrollmentId) => {
    const token = localStorage.getItem('enrollmentToken');
    if (!token) {
      setErrorMessage('You need to be logged in to initiate payment.');
      return;
    }

    if (!isRazorpayLoaded) {
      notify(
        'Razorpay script is not loaded yet. Please try again later.',
        'info',
      );
      return;
    }

    const enrollment = enrollments.find((enr) => enr._id === enrollmentId);
    if (!enrollment) {
      notify('Enrollment not found!', 'info');
      return;
    }
    const userName = enrollment.name || 'User';
    const userEmail = enrollment.email || 'user@example.com';
    const userContact = '1234567890';

    const remainingAmount =
      enrollment.discountCost - enrollment.registrationAmount;

    if (remainingAmount <= 0) {
      notify('No remaining amount to pay!', 'info');
      return;
    }

    const emiAmount = Math.ceil(remainingAmount / enrollment.duration);
    const requiredEmiCount = Math.ceil(remainingAmount / emiAmount);
    const emiDetails = Array.from({ length: requiredEmiCount }, (_, index) => {
      return {
        emiNumber: index + 1,
        amount:
          index === requiredEmiCount - 1
            ? remainingAmount - emiAmount * (requiredEmiCount - 1)
            : emiAmount,
        dueDate: new Date(new Date().setMonth(new Date().getMonth() + index)),
        status: index === 0 ? 'Paid' : 'Pending',
      };
    });

    setPaymentModalData({
      enrollmentId,
      remainingAmount,
      duration: enrollment.duration,
      durationType: enrollment.courseId.durationType,
      emiDetails,
    });
    setShowPaymentModal(true);
  };
  const handlePaymentOption = async (option) => {
    const { enrollmentId, remainingAmount, emiDetails } = paymentModalData;

    if (option === 'full') {
      processPayment(enrollmentId, remainingAmount);
    } else if (option === 'emi') {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/create-enrollment-emis`,
          { enrollmentId, emiDetails },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                'enrollmentToken',
              )}`,
            },
          },
        );

        if (response.data.success) {
          notify('EMI schedule created!', 'success');

          processPayment(enrollmentId, emiDetails[0].amount, true);
        } else {
          notify('Failed to create EMI schedule', 'error');
        }
      } catch (error) {
        console.error('Error creating EMI schedule:', error);
        notify('Failed to create EMI schedule', 'error');
      }
    }

    setShowPaymentModal(false);
  };

  const processPayment = async (enrollmentId, amount, isEmi = false) => {
    try {
      const enrollment = enrollments.find((enr) => enr._id === enrollmentId);
      if (!enrollment) {
        notify('Enrollment data not found!', 'error');
        return;
      }

      const userName = enrollment.name || 'User';
      const userEmail = enrollment.email || 'user@example.com';
      const userContact = '1234567890';

      const response = await axios.post(
        `${BASE_URL}/api/create-order`,
        { amount },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('enrollmentToken')}`,
          },
        },
      );

      const { orderId } = response.data;

      const options = {
        key: 'rzp_test_010KxbeBZHkNTK',
        amount: amount * 100,
        currency: 'INR',
        order_id: orderId,
        handler: async (response) => {
          try {
            const verifyResponse = await axios.post(
              `${BASE_URL}/api/verify-payment`,
              {
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                enrollmentId,
                isEmi,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    'enrollmentToken',
                  )}`,
                },
              },
            );

            if (verifyResponse.data.success) {
              notify('Payment successful!', 'success');
              setPaymentSuccess(true);
            } else {
              notify('Payment verification failed!', 'error');
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
            notify('Payment verification failed!', 'error');
          }
        },
        prefill: {
          name: userName,
          email: userEmail,
          contact: userContact,
        },
        theme: {
          color: '#AF8C3E',
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
    }
  };
  const handleEmiPayment = async (enrollmentId, emiNumber, emiAmount) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/create-order`,
        { amount: emiAmount },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('enrollmentToken')}`,
          },
        },
      );

      const { orderId } = response.data;

      const options = {
        key: 'rzp_test_010KxbeBZHkNTK',
        amount: emiAmount * 100,
        currency: 'INR',
        order_id: orderId,
        handler: async (response) => {
          try {
            const verifyResponse = await axios.post(
              `${BASE_URL}/api/verify-payment`,
              {
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                enrollmentId,
                emiNumber,
                isEmi: true,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    'enrollmentToken',
                  )}`,
                },
              },
            );

            if (verifyResponse.data.success) {
              notify('EMI payment successful!', 'success');

              await axios.post(
                `${BASE_URL}/api/updateEmiStatus`,
                {
                  enrollmentId,
                  emiNumber,
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                      'enrollmentToken',
                    )}`,
                  },
                },
              );
              setPaymentSuccess(true);
            } else {
              notify('Payment verification failed!', 'error');
            }
          } catch (error) {
            console.error('Error verifying EMI payment:', error);
            notify('Payment verification failed!', 'error');
          }
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error('Error processing EMI payment:', error);
      notify('Error processing EMI payment.', 'error');
    }
  };

  const renderEmiDetails = (enrollment) => {
    if (!enrollment.emiDetails?.length) {
      return null;
    }

    const paidEmis = enrollment.emiDetails.filter(
      (emi) => emi.status === 'Paid',
    );
    const nextEmi = enrollment.emiDetails.find(
      (emi) => emi.status === 'Pending',
    );

    return (
      <div className="mt-5">
        <h3 className="font-mulish text-lg font-medium">
          EMI Payment Details:
        </h3>
        <table className="table-auto w-full border mt-4">
          <thead>
            <tr>
              <th className="border px-4 py-2">S.NO</th>
              <th className="border px-4 py-2">EMI Date</th>
              <th className="border px-4 py-2">Payment Date</th>
              <th className="border px-4 py-2">Amount (INR)</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {paidEmis.map((emi) => (
              <tr key={emi.emiNumber} className="bg-green-200 align-middle">
                <td className="border px-4 py-2 text-center">
                  {emi.emiNumber}
                </td>
                <td className="border px-4 py-2 text-center">
                  {emi.dueDate
                    ? new Date(emi.dueDate).toLocaleDateString()
                    : 'N/A'}
                </td>
                <td className="border px-4 py-2 text-center">
                  {emi.status === 'Paid'
                    ? new Date().toLocaleDateString()
                    : 'N/A'}
                </td>
                <td className="border px-4 py-2 text-center">{emi.amount}</td>
                <td className="border px-4 py-2 text-center">{emi.status}</td>
                <td className="border px-4 py-2 text-center">✔️</td>
              </tr>
            ))}

            {nextEmi ? (
              <tr className="bg-yellow-100 align-middle">
                <td className="border px-4 py-2 text-center">
                  {nextEmi.emiNumber}
                </td>
                <td className="border px-4 py-2 text-center">
                  {nextEmi.dueDate
                    ? new Date(nextEmi.dueDate).toLocaleDateString()
                    : 'N/A'}
                </td>
                <td className="border px-4 py-2 text-center">{''}</td>
                <td className="border px-4 py-2 text-center">
                  {nextEmi.amount}
                </td>
                <td className="border px-4 py-2 text-center">
                  {nextEmi.status}
                </td>
                <td className="border px-4 py-2 text-right">
                  <button
                    className="bg-[rgb(175,140,62)] text-white px-4 py-2 rounded-lg"
                    onClick={() =>
                      handleEmiPayment(
                        enrollment._id,
                        nextEmi.emiNumber,
                        nextEmi.amount,
                      )
                    }
                  >
                    Pay Now
                  </button>
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  🎉 All EMIs are paid!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  const renderPaymentModal = () => {
    if (!showPaymentModal || !paymentModalData) return null;

    const { remainingAmount, duration, durationType } = paymentModalData;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
          <h2 className="text-lg font-medium">Choose Payment Option</h2>
          <p className="mt-2">Remaining Amount: INR {remainingAmount}</p>
          <p className="mt-2">
            EMI Duration: {duration ? duration - 1 : 0} {durationType}
          </p>

          <div className="flex justify-around mt-4">
            <button
              onClick={() => handlePaymentOption('full')}
              className="text-white px-4 py-2 rounded-lg"
              style={{ backgroundColor: '#472b02' }}
            >
              Full Payment
            </button>
            <button
              onClick={() => handlePaymentOption('emi')}
              className="text-white px-4 py-2 rounded-lg"
              style={{ backgroundColor: 'rgb(175, 140, 62)' }}
            >
              EMI Option
            </button>
          </div>

          <button
            onClick={() => setShowPaymentModal(false)}
            className="mt-4 text-red-500"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  const fetchCourseDetails = async (courseId) => {
    try {
      const courseResponse = await axios.get(
        `${BASE_URL}/api/courses/${courseId}`,
      );

      const course = courseResponse.data.course;
      setZoomCourse(JSON.parse(courseResponse.data.course.days));

      if (!course) {
        console.error('Course not found');
        notify('Course not found', 'error');
        return;
      }

      if (course.courseType === 'video') {
        setCourseVideoUrl(course.videoUrl);
        return;
      }

      if (course.courseType === 'live') {
        const zoomMeetingResponse = await axios.get(
          `${BASE_URL}/api/zoom/${courseId}`,
        );
        setCourseZoomMeeting(zoomMeetingResponse.data.meeting);
        return;
      }

      console.warn('Unknown course type:', course.courseType);
    } catch (error) {
      console.error(
        'Error fetching course details:',
        error.response?.data || error.message,
      );
      notify(
        error.response?.data?.error || 'Failed to fetch course details.',
        'error',
      );
    }
  };

  const fetchZoomMeetingDetails = async (courseId) => {
    try {
      const zoomMeetingResponse = await axios.get(
        `${BASE_URL}/api/zoom/${courseId}`,
      );
      setCourseZoomMeeting(zoomMeetingResponse.data.meeting);
    } catch (error) {
      console.error('Error fetching Zoom meeting details', error);
    }
  };

  const handleViewDetails = (courseId) => {
    setSelectedCourseId(courseId);
    fetchZoomMeetingDetails(courseId);
  };
  useEffect(() => {
    if (activeTab === 'viewcoursedetails') {
      setCourseVideoUrl('');
      setCourseZoomMeeting([]);
    }
  }, [activeTab]);
  const [classDates, setClassDates] = useState([]);
  const [selectedSessionIndex, setSelectedSessionIndex] = useState(null);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const fetchVideos = async (sessionIndex, selectCourseId, classDate) => {
    try {
      setLoadingVideos(true);
      setSelectedSessionIndex(sessionIndex);

      const response = await fetch(
        `${BASE_URL}/api/getVideos?courseId=${selectCourseId}&classDate=${classDate}`,
      );
      const data = await response.json();

      if (data.videos) {
        setVideoUrls((prev) => ({
          ...prev,
          [classDate]: data.videos,
        }));
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoadingVideos(false);
    }
  };

  useEffect(() => {
    console.log('Updated videoUrls state:');
  }, [videoUrls]);

  useEffect(() => {
    const generateClassDates = () => {
      const startDate = new Date(2025, 2, 10);
      const endDate = new Date(2025, 8, 10);
      let dates = [];

      while (startDate <= endDate) {
        const day = startDate.getDay();
        if (day === 6 || day === 0) {
          dates.push({
            date: new Date(startDate),
            dayName: startDate.toLocaleDateString('en-US', { weekday: 'long' }),
          });
        }
        startDate.setDate(startDate.getDate() + 1);
      }
      return dates;
    };

    setClassDates(generateClassDates());
  }, []);

  return (
    <div className="w-full">
      <div className='w-full bg-cover flex items-center justify-center mt-[-30%] 2xl:mt-[-8.7%] bg-no-repeat bg-[url("/productsbg2.jpg")]'>
        <div className="2xl:max-w-[80%] max-w-[90%] w-full pt-10 2xl:py-20 2xl:mt-[4%] mt-[20%] md:mt-[30%] mx-auto flex 2xl:flex-row flex-col 2xl:gap-20 gap-5">
          <div className="w-full">
            <div className="h-auto m-auto grid grid-cols-12 gap-5 mt-[2%] mb-[1.4%]">
              <div className="col-span-12 bg-white rounded-md lg:hidden">
                <Select label="Menu" color="black">
                  <Option onClick={() => setActiveTab('myprofile')}>
                    My Profile
                  </Option>
                  <Option onClick={() => setActiveTab('mycourses')}>
                    My Courses
                  </Option>
                  <Option onClick={() => setActiveTab('mypaymentdetails')}>
                    Payments
                  </Option>
                </Select>
              </div>
              <div className="col-span-3 hidden lg:flex">
                <Card className="bg-gray-50 border text-black flex overflow-hidden flex-col h-full w-full rounded-xl shadow-2xl p-1">
                  <List className="font-mulish text-gray-900 text-[16px]">
                    <ListItem onClick={() => setActiveTab('myprofile')}>
                      <ListItemPrefix>
                        <UserCircleIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      My Profile
                    </ListItem>
                    <ListItem onClick={() => setActiveTab('mycourses')}>
                      <ListItemPrefix>
                        <ShoppingBagIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      My Courses
                    </ListItem>
                    <ListItem onClick={() => setActiveTab('mypaymentdetails')}>
                      <ListItemPrefix>
                        <FaFileInvoiceDollar className="h-5 w-5" />
                      </ListItemPrefix>
                      Payment Details
                    </ListItem>
                  </List>
                </Card>
              </div>
              <div className="lg:col-span-9 col-span-12 mx-2 lg:mx-0">
                <div className="bg-gray-50 border text-black flex flex-col min-h-[90vh] max-h-[150vh] pb-20 w-full gap-2 rounded-xl shadow-2xl p-4">
                  {activeTab === 'myprofile' && <MyProfile />}
                  {activeTab === 'mycourses' && (
                    <div className="h-full overflow-y-auto">
                      <h2 className="md:text-xl text-lg font-mulish font-medium">
                        My Courses
                      </h2>
                      <hr className="my-5" />
                      {enrollments.length > 0 ? (
                        enrollments
                          .filter(
                            (enrollment) =>
                              enrollment.paymentStatus !== 'pending',
                          )
                          .map((enrollment) => {
                            const remainingAmount =
                              enrollment.paymentStatus === 'EMI'
                                ? enrollment.remainingAmount
                                : enrollment.discountCost -
                                  enrollment.registrationAmount;

                            const hasPaidEmi =
                              enrollment.emiDetails?.some(
                                (emi) => emi.status === 'Paid',
                              ) ?? false;

                            const hasOverdueEmi = enrollment.emiDetails?.some(
                              (emi, index) =>
                                (emi.status === 'Pending' &&
                                  new Date(emi.dueDate) < new Date()) ||
                                (index === 0 && emi.status === 'Pending'),
                            );

                            return (
                              <div
                                key={enrollment._id}
                                className="flex flex-col rounded-xl mt-5 w-full shadow-lg border-gray-300 border p-5"
                              >
                                <div className="flex flex-col xl:flex-row items-center justify-between">
                                  <Image
                                    src={enrollment.courseId.thumbnail}
                                    alt={`Thumbnail for ${enrollment.courseId.name}`}
                                    height={400}
                                    width={400}
                                    className="rounded-xl"
                                  />
                                  <div className="gap-2 p-5 flex flex-col">
                                    <Typography className="font-mulish mt-0 text-center font-semibold text-2xl">
                                      {enrollment.courseId.name}
                                    </Typography>
                                    <Typography className="font-mulish mt-0 text-center font-normal text-base">
                                      Start Date:{' '}
                                      {new Date(
                                        enrollment.courseStartDate,
                                      ).toLocaleDateString()}
                                    </Typography>
                                    <Typography className="font-mulish mt-0 text-center font-normal text-base">
                                      Time:{' '}
                                      {enrollment.courseId.timeSlot.startTime} -{' '}
                                      {enrollment.courseId.timeSlot.endTime}
                                    </Typography>
                                    <Typography className="font-mulish mt-0 text-center font-normal text-base">
                                      Duration: {enrollment.duration}{' '}
                                      {enrollment.courseId.durationType}
                                    </Typography>
                                    <Typography className="font-mulish mt-0 text-center font-normal text-base">
                                      Days:{' '}
                                      {enrollment.courseId.days.join(', ')}
                                    </Typography>
                                    <Typography className="font-mulish mt-0 text-center font-normal text-base">
                                      Platform:{' '}
                                      {enrollment.courseId.courseType === 'live'
                                        ? 'Google Meet'
                                        : 'Other'}
                                    </Typography>
                                    <Typography className="font-mulish mt-0 text-center font-normal text-base">
                                      Instructor:{' '}
                                      {enrollment.courseId.instructor}
                                    </Typography>
                                  </div>
                                  <div className="gap-2 px-5 xl:py-10 py-5 flex flex-col items-center">
                                    <Typography className="font-mulish text-center font-normal text-xl">
                                      Total Fees: INR {enrollment.discountCost}
                                    </Typography>
                                    {remainingAmount > 0 && (
                                      <Typography className="font-mulish mt-0 text-center font-normal text-xl">
                                        Remaining: INR {remainingAmount}
                                      </Typography>
                                    )}
                                    <div className="flex flex-col gap-2">
                                      {(enrollment.paymentStatus === 'Paid' ||
                                        hasPaidEmi) &&
                                      !hasOverdueEmi ? (
                                        <Button
                                          size="small"
                                          className="bg-[#AF8C3E] font-mulish"
                                          onClick={() => {
                                            setActiveTab('viewcoursedetails');
                                            setSelectedCourseName(
                                              enrollment.courseId.name,
                                            );
                                            fetchCourseDetails(
                                              enrollment.courseId._id,
                                            );
                                            setSelectCourseId(
                                              enrollment.courseId._id,
                                            );
                                          }}
                                        >
                                          View Details
                                        </Button>
                                      ) : hasOverdueEmi ? (
                                        <span className="text-gray-500">
                                          Access Restricted
                                        </span>
                                      ) : (
                                        <Button
                                          className="bg-[rgb(175,140,62)] text-white px-4 py-2 rounded-lg"
                                          onClick={() =>
                                            handlePayNowClick(enrollment._id)
                                          }
                                        >
                                          Pay Now
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                {enrollment.paymentStatus === 'Paid' && (
                                  <div className="bg-green-200 text-center py-4 mt-4 text-lg font-mulish">
                                    🎉 full amounts are paid!
                                  </div>
                                )}
                                {renderEmiDetails(enrollment)}
                                {renderPaymentModal()}
                              </div>
                            );
                          })
                      ) : (
                        <Typography className="font-mulish text-center text-lg">
                          No enrolled courses available.
                        </Typography>
                      )}
                    </div>
                  )}

                  {activeTab === 'viewcoursedetails' && (
                    <div>
                      <h2 className="md:text-xl text-lg font-mulish font-medium">
                        {selectedCourseName}
                      </h2>
                      <hr className="my-5" />
                      {isLoading ? (
                        <Typography>Loading Zoom meeting details...</Typography>
                      ) : (
                        <div className="w-full max-h-[500px] overflow-y-auto border border-gray-300">
                          <table className="table-auto text-center w-full text-base font-mulish border-collapse border border-gray-300">
                            <thead className="bg-[#AF8C3E] text-white">
                              <tr className="border-gray-200">
                                <th className="md:p-3 p-2 rounded-l-xl font-mulish font-medium">
                                  S.No
                                </th>
                                <th className="md:p-3 p-2 font-mulish font-medium">
                                  Day
                                </th>
                                <th className="md:p-3 p-2 font-mulish font-medium">
                                  Time
                                </th>
                                <th className="md:p-3 p-2 font-mulish font-medium">
                                  Link
                                </th>
                                <th className="p-2">Video</th>
                              </tr>
                            </thead>
                            <tbody>
                              {classDates.map((session, index) => {
                                return (
                                  <tr
                                    key={index}
                                    className="border-b border-gray-200"
                                  >
                                    <td className="p-2 md:p-3">{index + 1}</td>
                                    <td className="p-2 md:p-3">
                                      {session.date.toLocaleDateString(
                                        'en-US',
                                        {
                                          day: 'numeric',
                                          month: 'long',
                                          year: 'numeric',
                                        },
                                      )}{' '}
                                      ({session.dayName})
                                    </td>
                                    <td className="p-2 md:p-3">
                                      9:00 PM - 11:00 PM
                                    </td>
                                    <td className="p-2 text-blue-500 md:p-3">
                                      <a
                                        href={courseZoomMeeting?.joinUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        Zoom Link
                                      </a>
                                    </td>
                                    <td className="p-2 md:p-3">
                                      <td className="p-3">
                                        <Button
                                          size="small"
                                          className="bg-[#AF8C3E] font-mulish"
                                          onClick={() =>
                                            fetchVideos(
                                              index,
                                              selectCourseId,
                                              session.date.toLocaleDateString(
                                                'en-US',
                                              ),
                                            )
                                          }
                                        >
                                          View Video
                                        </Button>
                                      </td>

                                      {selectedSessionIndex === index &&
                                        videoUrls[
                                          session.date.toLocaleDateString(
                                            'en-US',
                                          )
                                        ] &&
                                        (() => {
                                          const videoUrl =
                                            videoUrls[
                                              session.date.toLocaleDateString(
                                                'en-US',
                                              )
                                            ][0];

                                          if (!videoUrl) {
                                            {
                                              notify(
                                                'No video available for this session.',
                                                'info',
                                              );
                                            }
                                            return null;
                                          }

                                          const newWindow = window.open(
                                            '',
                                            '_blank',
                                          );
                                          if (newWindow) {
                                            newWindow.document.write(`
                                          <html>
                                            <head>
                                              <title>Video Player</title>
                                              <style>
                                                body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background: black; }
                                                video { max-width: 100%; height: auto; }
                                              </style>
                                              <script>
                                                document.addEventListener("contextmenu", event => event.preventDefault());
                                              </script>
                                            </head>
                                            <body>
                                              <video controls autoplay controlsList="nodownload" disablePictureInPicture oncontextmenu="return false;">
                                                <source src="${videoUrl}" type="video/mp4">
                                                Your browser does not support the video tag.
                                              </video>
                                            </body>
                                          </html>
                                        `);
                                            newWindow.document.close();
                                          }

                                          return null;
                                        })()}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'mypaymentdetails' && (
                    <PaymentDetails
                      userId={userstate}
                      enrollmentProp={enrollments}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
