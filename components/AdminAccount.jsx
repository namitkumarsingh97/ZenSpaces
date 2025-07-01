'use client';
import {
  ShoppingBagIcon,
  UserCircleIcon,
  InboxIcon,
  PowerIcon,
} from '@heroicons/react/24/solid';
import { notify } from '../app/assets/Toastify';
import {
  FaFilePdf,
  FaImage,
  FaMoneyBillWave,
  FaPen,
  FaPhabricator,
  FaUpload,
  FaVideo,
} from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { RiRefund2Fill } from 'react-icons/ri';
import { FaDownload, FaEye, FaFileInvoiceDollar } from 'react-icons/fa6';
import { GiArchiveRegister } from 'react-icons/gi';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import {
  List,
  Card,
  ListItemPrefix,
  ListItem,
  Typography,
  Button,
  Input,
  Checkbox,
  Select,
  Option,
} from '@material-tailwind/react';
import MyProfile from './MyProfile';
import PaymentDetails from './PaymentDetails';
import {
  Dropdown,
  // Dropdown1,
  Dropdown3,
  Dropdown4,
  Dropdown5,
} from '@/app/assets/Dropdown';
import Image from 'next/image';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { HiDocumentDownload, HiDocumentReport } from 'react-icons/hi';
import SalesChart from '@/app/assets/SalesChart';
import { GiTeacher } from 'react-icons/gi';
import { DeletePopUp1 } from '@/app/assets/DeletePopUp';
import { RadioReport } from '@/app/assets/Radio';
import ReportsChart from '@/app/assets/ReportsChart';
import TextEditor from '@/app/assets/TextEditor';
import TextsEditor from '@/app/assets/TextsEditor';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { PiStudentFill } from 'react-icons/pi';
import Overview from '@/app/assets/Overview';
import { BASE_URL } from '@/utils/apiClient';
import CircularWithValueLabel from '@/app/assets/ProgressBar';

const AdminAccount = () => {
  const [selectedRadio, setSelectedRadio] = useState('This Month');
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCourse, setActiveCourse] = useState(null);
  const [videoUrls, setVideoUrls] = useState([]);
  const [selectedSessionIndex, setSelectedSessionIndex] = useState(null);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [classDates, setClassDates] = useState([]);
  const [uploadedVideos, setUploadedVideos] = useState({}); // Store upload status for each course

  const [activeTab, setActiveTab] = React.useState('dashboard');
  const dashboardValue = true;
  const [courseId, setCourseId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filteredEnrollData, setFilteredEnrolData] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [enrollId, setEnrollId] = useState(null);
  const [courseEnrollName, setCourseEnrollName] = useState('');
  const [enrolledAt, setEnrolledAt] = useState();

  const [customerId, setCustomerId] = useState('');
  const [customerName2, setCustomerName2] = useState('');
  const [data, setData] = useState(null);
  const [selectedEnrollmentId, setSelectedEnrollmentId] = useState(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [videosFile, setVideosFile] = useState(null);
  const [filterCustomerName, setFilterCustomerName] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [meetingDetails, setMeetingDetails] = useState(null);
  const [zoomCourse, setZoomCourse] = useState([]);
  const [errors, setErrors] = useState({});
  const transactionId = localStorage.getItem('transactionID');
  const finaltransactionid = localStorage.getItem('razorpayPaymentIdfinal');
  const canceltransactionid = localStorage.getItem(
    'razorpayPaymentIdcanceltransactionid',
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingStates, setLoadingStates] = useState({});
  const [uploadProgress, setUploadProgress] = useState({});

  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    instructor: '',
    duration: '',
    durationType: '',
    totalFee: '',
    discountedFee: '',
    registrationAmount: '',
    startDate: '',
    description: '',
    introVideoLink: '',
    days: [],
    timeSlot: {
      startTime: '',
      endTime: '',
    },
    courseType: '',
    thumbnail: null,
    overview: '',
    syllabus: '',
    _id: '',
  });
  // const [uploadProgress, setUploadProgress] = useState(0);

  // const fetchPaymentDetails = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(`${BASE_URL}/api/payment-details`);
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch payment details");
  //     }
  //     const data = await response.json();
  //     setPaymentData(data.data || []);
  //   } catch (error) {
  //     console.error("Error fetching payment details:", error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  useEffect(() => {
    let isMounted = true;

    const fetchPaymentData = async () => {
      if (activeTab === 'payments') {
        setLoading(true);
        try {
          const response = await fetch(`${BASE_URL}/api/payment-details`);
          if (!response.ok) {
            throw new Error('Failed to fetch payment details');
          }
          const data = await response.json();
          if (isMounted) {
            setPaymentData(data.data || []);
          }
        } catch (error) {
          console.error('Error fetching payment details:', error.message);
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      }
    };

    fetchPaymentData();

    return () => {
      isMounted = false;
    };
  }, [activeTab]);
  useEffect(() => {
    const generateClassDates = () => {
      const startDate = new Date(2025, 2, 10); // March 10, 2025
      const endDate = new Date(startDate);
      endDate.setMonth(startDate.getMonth() + 6); // 6 months later

      let dates = [];
      while (startDate <= endDate) {
        const day = startDate.getDay(); // 6 = Saturday, 0 = Sunday
        if (day === 6 || day === 0) {
          dates.push({
            date: new Date(startDate).toLocaleDateString('en-US'),
            dayName: startDate.toLocaleDateString('en-US', { weekday: 'long' }),
          });
        }
        startDate.setDate(startDate.getDate() + 1);
      }
      return dates;
    };

    setClassDates(generateClassDates());
  }, []);
  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${BASE_URL}/api/view-courses`
  //       );
  //       setCourses(response.data);
  //       setFilteredData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching courses:", error);
  //     }
  //   };
  //   fetchCourses();
  // }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/view-courses`);
        setCourses(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, [courseId]);
  const removeCourseFromList = (courseId) => {
    setFilteredData((prevData) =>
      prevData.filter((course) => course._id !== courseId),
    );
  };
  const handlePrefetchCourse = async (courseId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/view-course/${courseId}`);
      if (!response.ok) throw new Error('Course not found');
      const courseData = await response.json();

      const formattedStartDate = new Date(courseData.startDate)
        .toISOString()
        .split('T')[0];

      setFormData({
        name: courseData.name,
        instructor: courseData.instructor,
        duration: courseData.duration,
        durationType: courseData.durationType,
        totalFee: courseData.totalFee,
        discountedFee: courseData.discountedFee,
        registrationAmount: courseData.registrationAmount,
        startDate: formattedStartDate,
        description: courseData.description,
        introVideoLink: courseData.introVideoLink,
        days: courseData.days,
        timeSlot: {
          startTime: courseData.timeSlot?.startTime || '',
          endTime: courseData.timeSlot?.endTime || '',
        },
        courseType: courseData.courseType,
        thumbnail: courseData.thumbnail || null,
        overview: courseData.overview,
        syllabus: courseData.syllabus,
        _id: courseData._id,
      });
    } catch (err) {
      console.error('Error fetching course:', err);
    }
  };
  useEffect(() => {
    let filtered = courses;

    if (courseName.trim()) {
      filtered = filtered.filter((course) =>
        course.name?.toLowerCase().includes(courseName.toLowerCase()),
      );
    }

    if (priceMin.trim() && !isNaN(priceMin)) {
      filtered = filtered.filter(
        (course) => course.discountedFee >= parseFloat(priceMin),
      );
    }

    if (priceMax.trim() && !isNaN(priceMax)) {
      filtered = filtered.filter(
        (course) => course.discountedFee <= parseFloat(priceMax),
      );
    }

    if (courseId && courseId.trim()) {
      filtered = filtered.filter((course) =>
        course._id.toLowerCase().includes(courseId.trim().toLowerCase()),
      );
    }
    if (statusFilter) {
      filtered = filtered.filter((course) => {
        const startDate = new Date(course.startDate);
        const durationInMs = (() => {
          if (course.durationType === 'Month')
            return course.duration * 30 * 24 * 60 * 60 * 1000;
          if (course.durationType === 'Week')
            return course.duration * 7 * 24 * 60 * 60 * 1000;
          if (course.durationType === 'Day')
            return course.duration * 24 * 60 * 60 * 1000;
          return 0;
        })();
        const endDate = new Date(startDate.getTime() + durationInMs);
        const now = new Date();

        if (statusFilter === 'upcoming') {
          return startDate > now;
        }
        if (statusFilter === 'ongoing') {
          return startDate <= now && endDate >= now;
        }
        if (statusFilter === 'past') {
          return endDate < now;
        }
        return true;
      });
    }
    setFilteredData(filtered);
  }, [courseName, priceMin, priceMax, courses, courseId, statusFilter]);

  const handleCustomerNameChange = (e) => setCourseName(e.target.value);
  const handlePriceMinChange = (e) => setPriceMin(e.target.value);
  const handlePriceMaxChange = (e) => setPriceMax(e.target.value);
  const handleCourseIdChange = (e) => {
    setCourseId(e.target.value);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // const handleFileChange = (e) => {
  //   setFormData((prevData) => ({ ...prevData, thumbnail: e.target.files[0] }));
  // };

  const handleCheckboxChange = (day) => {
    setFormData((prevData) => ({
      ...prevData,
      days: prevData.days.includes(day)
        ? prevData.days.filter((d) => d !== day)
        : [...prevData.days, day],
    }));
  };

  const convertTo12HourFormat = (time) => {
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);

    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${minutes} ${period}`;
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;

    const formattedTime = convertTo12HourFormat(value);

    setFormData((prevData) => ({
      ...prevData,
      timeSlot: { ...prevData.timeSlot, [name]: formattedTime },
    }));
  };
  const handleInstructorChange = (value) => {
    setFormData((prev) => ({ ...prev, instructor: value }));
  };

  const handleDurationChange = (value) => {
    setFormData((prev) => ({ ...prev, durationType: value }));
  };
  const handleCourseTypeChange = (e) => {
    setFormData({
      ...formData,
      courseType: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const apiURL = `${BASE_URL}/api/add-course/step1`;
    const submissionData = new FormData();

    submissionData.append('name', formData.name);
    submissionData.append('instructor', formData.instructor);
    submissionData.append('duration', formData.duration);
    submissionData.append('durationType', formData.durationType);
    submissionData.append('totalFee', formData.totalFee);
    submissionData.append('discountedFee', formData.discountedFee);
    submissionData.append('registrationAmount', formData.registrationAmount);
    submissionData.append('startDate', formData.startDate);
    submissionData.append('description', formData.description);
    submissionData.append('introVideoLink', formData.introVideoLink);
    submissionData.append('days', JSON.stringify(formData.days));
    submissionData.append('timeSlot', JSON.stringify(formData.timeSlot));
    submissionData.append('courseType', formData.courseType);
    // Append thumbnail if available
    if (formData.thumbnail) {
      submissionData.append('thumbnail', formData.thumbnail); // Assuming `formData.thumbnail` is a File object
    }

    try {
      const response = await axios.post(apiURL, submissionData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        setCourseId(response.data.courseId);

        setActiveTab('addcourse1');
      }
    } catch (error) {
      console.error(
        'Failed to save course data:',
        error.response?.data || error,
      );
    }
  };

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/enrollments`);
        setEnrollments(response.data);
        setFilteredEnrolData(response.data);
      } catch (error) {
        console.error('Error fetching enrollments:', error);
      }
    };

    fetchEnrollments();
  }, []);

  useEffect(() => {
    let filtered = enrollments;

    if (courseEnrollName.trim()) {
      filtered = filtered.filter((enrollment) =>
        enrollment.courseId.name
          ?.toLowerCase()
          .includes(courseEnrollName.toLowerCase()),
      );
    }
    if (customerName.trim()) {
      filtered = filtered.filter((enrollment) =>
        enrollment.name?.toLowerCase().includes(customerName.toLowerCase()),
      );
    }

    if (enrollId && enrollId.trim()) {
      filtered = filtered.filter((enrollment) =>
        enrollment._id.toLowerCase().includes(enrollId.trim().toLowerCase()),
      );
    }

    if (enrolledAt && enrolledAt.trim()) {
      filtered = filtered.filter((enrollment) => {
        const enrollmentDate = new Date(
          enrollment.enrolledAt,
        ).toLocaleDateString('en-US');
        return enrollmentDate === enrolledAt;
      });
    }
    if (statusFilter) {
      filtered = filtered.filter((course) => {
        const startDate = new Date(course.enrolledAt);
        const durationInMs = (() => {
          if (course.courseId.durationType === 'Month')
            return course.duration * 30 * 24 * 60 * 60 * 1000;
          if (course.courseId.durationType === 'Week')
            return course.duration * 7 * 24 * 60 * 60 * 1000;
          if (course.courseId.durationType === 'Day')
            return course.duration * 24 * 60 * 60 * 1000;
          return 0;
        })();
        const endDate = new Date(startDate.getTime() + durationInMs);
        const now = new Date();

        if (statusFilter === 'upcoming') {
          return startDate > now;
        }
        if (statusFilter === 'ongoing') {
          return startDate <= now && endDate >= now;
        }
        if (statusFilter === 'past') {
          return endDate < now;
        }
        return true;
      });
    }
    setFilteredEnrolData(filtered);
  }, [courseEnrollName, customerName, enrollId, statusFilter, enrolledAt]);

  const handleEnrolNameChange = (e) => setCustomerName(e.target.value);
  const handleCourseEnroll = (e) => setCourseEnrollName(e.target.value);
  const handleDateChange = (e) =>
    setEnrolledAt(new Date(e.target.value).toLocaleDateString('en-US'));

  const handleEnrollIdChange = (e) => {
    setEnrollId(e.target.value);
  };

  const [enrolledCustomer, setEnrolledCustomer] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/getcustomer`);
        setCustomers(response.data);
        setEnrolledCustomer(response.data);
      } catch (error) {
        console.error('Error fetching enrollments:', error);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    let filtered = customers;

    if (customerName2.trim()) {
      filtered = filtered.filter((course) =>
        course.name?.toLowerCase().includes(customerName2.toLowerCase()),
      );
    }

    if (customerId && customerId.trim()) {
      filtered = filtered.filter((course) =>
        course._id.toLowerCase().includes(customerId.trim().toLowerCase()),
      );
    }

    setEnrolledCustomer(filtered);
  }, [customerName2, customerId]);

  const handleCustNameChange = (e) => setCustomerName2(e.target.value);
  const handleCustIdChange = (e) => setCustomerId(e.target.value);

  const viewCourse = async (courseId) => {
    window.open(`/adminsinglecourse?courseId=${courseId}`, '_blank');
  };

  const editCourse = async (courseId) => {
    await handlePrefetchCourse(courseId);
    setActiveTab('editcourse');
  };

  const [selectedDays, setSelectedDays] = useState([]);

  useEffect(() => {
    if (formData.days) {
      let days = formData.days;

      // Parse nested stringified array
      if (
        Array.isArray(days) &&
        days.length === 1 &&
        typeof days[0] === 'string'
      ) {
        try {
          days = JSON.parse(days[0]);
        } catch (error) {
          console.error('Error parsing nested days:', error);
          days = [];
        }
      }

      // Set parsed days if valid
      if (Array.isArray(days)) {
        setSelectedDays(days);
      } else {
        console.warn('Invalid days format:', formData.days);
        setSelectedDays([]);
      }
    }
  }, [formData.days]);

  // const handleDayChange = (day) => {
  //   setSelectedDays((prev) =>
  //     prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
  //   );
  // };

  // const allDays = [
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  //   "Sunday",
  // ];

  const [thumbnail, setThumbnail] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (formData.thumbnail) {
      setPreviewUrl(`${BASE_URL}/${formData.thumbnail}`);
    }
  }, [formData.thumbnail]);

  const handleInstCheckChange = (selectedValue) => {
    setFormData((prevData) => ({
      ...prevData,
      instructor: selectedValue,
      durationType: selectedValue,
    }));
  };

  useEffect(() => {
    if (formData.thumbnail) {
      setPreviewUrl(formData.thumbnail);
    }
  }, [formData.thumbnail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDayChange = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const allDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const handleThumbnailFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!thumbnail) {
      notify('Please choose a file first!', 'info');
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append('thumbnail', thumbnail);

    try {
      const response = await fetch(`${BASE_URL}/api/upload-thumbnail`, {
        method: 'POST',
        body: formDataObj,
      });
      const data = await response.json();
      if (data.success) {
        notify('Thumbnail uploaded successfully!', 'success');
        onThumbnailChange(data.thumbnailPath);
      } else {
        notify('Failed to upload thumbnail!', 'error');
      }
    } catch (error) {
      console.error('Error uploading thumbnail:', error);
    }
  };

  const updateCourse = async (courseId, dataToUpdate) => {
    try {
      const response = await fetch(`${BASE_URL}/api/edit/step1/${courseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToUpdate),
      });

      if (!response.ok) throw new Error('Failed to update course');

      const result = await response.json();
      notify('Course updated successfully!', 'success');
      setActiveTab('dashboard');
    } catch (err) {
      console.error('Error updating course:', err);
    }
  };

  const handleeditSubmit = async (courseId) => {
    const dataToUpdate = {
      ...formData,
      timeSlot: JSON.stringify(formData.timeSlot), // Ensure timeSlot is a string
    };
    await updateCourse(courseId, dataToUpdate);
  };
  const fetchEnrollmentDetails = async (enrollmentId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/course-details/${enrollmentId}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching enrollment details:', error);
      return null;
    }
  };

  const fetchDetails = async (enrollmentId) => {
    const details = await fetchEnrollmentDetails(enrollmentId);
    if (details) {
      setData(details);
    }
  };

  useEffect(() => {
    if (selectedEnrollmentId) {
      fetchDetails(selectedEnrollmentId);
    }
  }, [selectedEnrollmentId]);

  const [customerAction, setCustomerAction] = useState([]);

  const handleCustomersAction = async (getCustomerId) => {
    const response = await axios.get(
      `${BASE_URL}/api/customers/${getCustomerId}`,
    );
    setCustomerAction(response.data);
  };
  // const [activeTab, setActiveTab] = useState("reports");
  const [selectedCourse, setSelectedCourse] = useState('');
  const [courseData, setCourseData] = useState({
    totalSales: 0,
    totalBookings: 0,
    registeredCustomers: 0,
    onboardedCustomers: 0,
    totalRefunds: 0,
  });

  // Function to handle course selection
  const handleCourseChange = async (courseName) => {
    setSelectedCourse(courseName);

    const response = await fetch(`${BASE_URL}/api/mybookings/${courseName}`);
    const data = await response.json();

    if (response.ok) {
      setCourseData({
        totalSales: data.totalSales,
        totalBookings: data.totalBookings,
        registeredCustomers: data.registeredCustomers,
        onboardedCustomers: data.onboardedCustomers,
        totalRefunds: data.totalRefunds,
      });
    } else {
      console.error('Error fetching course data:', data.message);
    }
  };

  // ADMIN - CUSTOMER DATA EXPORT FUNCTIONALITY
  const exportToCSV = () => {
    const headers = [
      'Id',
      "Customer's Name",
      'Email',
      'Registration Date',
      'No. Of Courses Enrolled',
    ];

    const csvRows = [
      headers.join(','),
      ...enrolledCustomer.map((cs, index) => {
        const registrationDate =
          cs.enrolledCourses.length > 0
            ? new Date(cs.enrolledCourses[0].enrolledAt).toLocaleDateString(
                'en-GB',
              )
            : '';
        return [
          `C${index + 1}`,
          cs.name,
          cs.email,
          registrationDate,
          cs.enrolledCoursesCount,
        ].join(',');
      }),
    ];

    const csvContent = csvRows.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customers_data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // ADMIN - ENROLLMENTS DATA EXPORT FUNCTIONALITY
  const exportToCSV2 = (data, filename) => {
    if (!data || data.length === 0) {
      notify('No data available for export.', 'info');
      return;
    }

    const csvRows = [];
    csvRows.push(
      [
        'Enrollment ID',
        "Course's Name",
        "Course's Type",
        'Customer Name',
        'Slot',
        'Enrollment Date',
        'Amount Paid',
        'Status',
      ].join(','),
    );

    data.forEach((row, index) => {
      csvRows.push(
        [
          `E${index + 1}`,
          row.courseId?.name || '',
          row.courseId?.courseType || '',
          row.name || '',
          `${row.courseId?.timeSlot?.startTime || ''} - ${
            row.courseId?.timeSlot?.endTime || ''
          }`,
          new Date(row.enrolledAt).toLocaleDateString('en-GB'),
          `${row.courseId?.discountedFee || ''}`,
          row.paymentStatus || '',
        ].join(','),
      );
    });

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // CLEAR FUNCTIONALITY
  function handleClearFilters() {
    setEnrollId('');
    setEnrolledAt('');
    setCourseEnrollName('');
    setCustomerName('');
    setStatusFilter('');
    setCustomerName2('');
    setCustomerId('');
    setCourseId('');
    setCourseName('');
    setPriceMin('');
    setPriceMax('');

    setSelectedCourse('');
    setSelectedRadio('This Month');
    setFromDate('');
    setToDate('');

    setCourseData({
      totalSales: 0,
      totalBookings: 0,
      registeredCustomers: 0,
      onboardedCustomers: 0,
      totalRefunds: 0,
    });

    setFilterCustomerName('');
    setFilterDate('');
  }

  const [dashboardStats, setDashboardStats] = useState({
    totalCourses: 0,
    totalCustomers: 0,
    totalCourseBookings: 0,
    totalSales: 0,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (activeTab === 'dashboard') {
      setLoading(true);
      fetch(`${BASE_URL}/api/dashboard-stats`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch dashboard stats');
          }
          return response.json();
        })
        .then((data) => {
          setDashboardStats(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching dashboard stats:', err);
          setError('Failed to load dashboard stats.');
          setLoading(false);
        });
    }
  }, [activeTab]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // const [successMessage, setSuccessMessage] = useState("");
  // ✅ Fix for handling video selection
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setVideoFile(file); // Ensure the state updates before proceeding
  };

  // const handlevideoUpload = async (courseId, classDate, index) => {
  //   console.log('getting course id inside video upload: ', courseId);
  //   console.log('loading', loading);

  //   if (!videoFile) {
  //     setError("Please select a video to upload.");
  //     return;
  //   }

  //   if (!courseId) {
  //     setError("No course selected for uploading the video.");
  //     return;
  //   }

  //   setLoading(true);
  //   setError("");
  //   setSuccessMessage("");

  //   console.log('loading', loading);

  //   try {
  //     console.log("📤 Requesting pre-signed URL...");
  //     const { data } = await axios.post(`${BASE_URL}/api/uploadVideo`, {
  //       fileType: videoFile.type,
  //       courseId,
  //       classDate
  //     });

  //     if (!data || !data.uploadUrl) {
  //       throw new Error("Failed to get a pre-signed URL from the server.");
  //     }

  //     console.log("✅ Pre-signed URL received:", data.uploadUrl);
  //     let uploadSuccess = false;
  //     for (let attempt = 1; attempt <= 3; attempt++) {
  //       try {
  //         console.log(`📡 Attempt ${attempt}: Uploading to S3...`);

  //         const uploadResponse = await fetch(data.uploadUrl, {
  //           method: "PUT",
  //           headers: {
  //             "Content-Type": videoFile.type,
  //           },
  //           body: videoFile,
  //         });

  //         if (!uploadResponse.ok) {
  //           throw new Error(`S3 Upload Error (Attempt ${attempt}): ${await uploadResponse.text()}`);
  //         }

  //         console.log("🎉 Video uploaded successfully on attempt:", attempt);
  //         setUploadedVideos((prev) => ({ ...prev, [index]: true }));

  //         setSuccessMessage("Video uploaded successfully!");

  //         setVideoUrls((prev) => ({
  //           ...prev,
  //           [classDate]: [data.videoUrl], // Replace old URL with the new one
  //         }));

  //         setUploadedVideos((prev) => ({ ...prev, [index]: true }));

  //         uploadSuccess = true;
  //         break;
  //       } catch (err) {
  //         console.error("Upload failed:", err.message);
  //         if (attempt === 3) throw err;
  //       }
  //     }

  //     if (!uploadSuccess) {
  //       throw new Error("Video upload failed after multiple attempts.");
  //     }

  //     setSuccessMessage("Video uploaded successfully!");
  //   } catch (err) {
  //     console.error("Error uploading video:", err.message);
  //     setError(err.message || "Failed to upload video. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handlevideoUpload = async (courseId, classDate, index) => {
    if (!videoFile) {
      setError('Please select a video to upload.');
      return;
    }

    if (!courseId) {
      setError('No course selected for uploading the video.');
      return;
    }

    setLoadingStates((prev) => ({ ...prev, [classDate]: true }));
    setUploadProgress((prev) => ({ ...prev, [classDate]: 0 }));

    try {
      const { data } = await axios.post(`${BASE_URL}/api/uploadVideo`, {
        fileType: videoFile.type,
        courseId,
        classDate,
      });

      if (!data || !data.uploadUrl) {
        throw new Error('Failed to get a pre-signed URL from the server.');
      }

      await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', data.uploadUrl, true);
        xhr.setRequestHeader('Content-Type', videoFile.type);

        // Track upload progress
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentComplete = Math.round(
              (event.loaded / event.total) * 100,
            );
            setUploadProgress((prev) => ({
              ...prev,
              [classDate]: percentComplete,
            }));
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200) {
            setUploadedVideos((prev) => ({ ...prev, [classDate]: true }));
            setVideoUrls((prev) => ({ ...prev, [classDate]: [data.videoUrl] }));
            setSuccessMessage('Video uploaded successfully!');
            resolve();
          } else {
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        };

        xhr.onerror = () =>
          reject(new Error('Upload failed due to a network error.'));
        xhr.send(videoFile);
      });
    } catch (err) {
      console.error('Error uploading video:', err.message);
      setError(err.message || 'Failed to upload video. Please try again.');
    } finally {
      setLoadingStates((prev) => ({ ...prev, [classDate]: false }));
    }
  };

  const handleUploadIconClick = (course) => {
    if (!course) {
      setError('No course selected for uploading.');
      return;
    }

    setActiveTab('uploadvideos');
    setActiveCourse(course);
  };
  const exportToCSV3 = (data) => {
    if (!data || data.length === 0) {
      notify('No data available for export.', 'info');
      return;
    }

    const csvRows = [];
    csvRows.push(
      [
        'S.No',
        'Transaction Id',
        'Course Name',
        'Customer Name',
        'Date',
        'Time',
        'Status',
      ].join(','),
    );

    paymentData.forEach((payment, index) => {
      csvRows.push(
        [
          index + 1,
          payment.transactionId || 'N/A',
          payment.courseName || 'N/A',
          payment.customerName || 'N/A',
          payment.date || 'N/A',
          payment.time || 'N/A',
          payment.status || 'N/A',
        ].join(','),
      );
    });

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `Payments.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredPaymentData = paymentData.filter((payment) => {
    const matchesCustomer =
      !filterCustomerName ||
      payment.customerName
        .toLowerCase()
        .includes(filterCustomerName.toLowerCase());

    const matchesDate =
      !filterDate ||
      new Date(payment.date).toLocaleDateString('en-GB') ===
        new Date(filterDate).toLocaleDateString('en-GB');

    return matchesCustomer && matchesDate;
  });

  const handlePaymentCustomerFilter = (e) => {
    setFilterCustomerName(e.target.value);
  };

  const handlePaymentDateFilter = (e) => {
    setFilterDate(e.target.value);
  };

  // ADMIN - REPORT DATA EXPORT FUNCTIONALITY
  const exportReportToCSV = () => {
    const data = [
      ['S.No', 'Metric', 'Value'],
      [1, 'Course Selected', selectedCourse || 'N/A'],
      [2, 'Sales In The Defined Period', '₹' + courseData.totalSales],
      [3, 'Total Course Bookings', courseData.totalBookings],
      [4, 'Registered Customers', courseData.registeredCustomers],
      [5, 'Onboarded Customers', courseData.onboardedCustomers],
    ];

    const csvContent = data.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, 'report.csv');
    } else {
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = 'report.csv';
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  // ADMIN - COURSE MANAGEMENT - EDIT COURSE - TIME EDIT FUNCTIONALITY

  const convertTo24HourFormat = (time) => {
    const [timePart, modifier] = time.split(' ');
    let [hours, minutes] = timePart.split(':');

    if (modifier === 'PM' && hours !== '12') {
      hours = String(parseInt(hours, 10) + 12);
    } else if (modifier === 'AM' && hours === '12') {
      hours = '00';
    }

    return `${hours.padStart(2, '0')}:${minutes}`;
  };

  const handleEditedTimeChange = (e, timeSlot) => {
    const { value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      timeSlot: {
        ...prevData.timeSlot,
        [timeSlot]: value,
      },
    }));
  };

  const handleZoomMeeting = async (courseId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}/api/zoom/${courseId}`);
      const courseResponse = await axios.get(
        `${BASE_URL}/api/view-course/${courseId}`,
      );

      setMeetingDetails(response.data);
      setZoomCourse(courseResponse.data);

      setActiveTab('zoomvideotab');
    } catch (err) {
      setError('Failed to fetch meeting details.');
    } finally {
      setLoading(false);
    }
  };

  // INVOICE DOWNLOAD FUNCTIONALITY
  const downloadInvoice = (payment) => {
    const { customerName, courseName, date } = payment;

    const course = courses.find((c) => c.name === payment.courseName);
    const course_amount = course ? course.discountedFee : 0.0;

    const transactionId = `INV-${new Date().getTime()}`;
    const doc = new jsPDF();

    const logoURL = 'logo.webp';
    doc.addImage(logoURL, 'WEBP', 14, 10, 15, 15);

    doc.setFont('helvetica', 'bold', '#AF8C3E');
    doc.setFontSize(20);
    const pageWidth = doc.internal.pageSize.getWidth();
    const textX = pageWidth / 2;
    const textY = 20;
    doc.text('ZenSpaces', pageWidth / 2, 15, { align: 'center' });

    const invoiceY = textY + 5;
    doc.setFontSize(15);
    doc.text('INVOICE', textX, invoiceY, { align: 'center' });

    const invoiceWidth = doc.getTextWidth('INVOICE');
    const invoiceLineXStart = textX - invoiceWidth / 2;
    const invoiceLineXEnd = textX + invoiceWidth / 2;
    const invoiceLineY = invoiceY + 2;
    doc.line(invoiceLineXStart, invoiceLineY, invoiceLineXEnd, invoiceLineY);

    doc.setFontSize(10);
    doc.text(
      'Flat No. C-108, Panchvati Co-operating Group Housing Society,  ',
      14,
      35,
    );
    doc.text('F Block, Vikaspuri', 14, 40);
    doc.text('Delhi, 110018', 14, 45);
    doc.text('GSTIN: 07AYBPS4080R1ZQ', 14, 50);

    doc.text(`Invoice#: ${transactionId}`, 150, 40);

    doc.text('Bill To:', 14, 60);
    doc.text(customerName || 'N/A', 14, 65);

    const headers = [['#', 'Item & Description', 'Qty', 'Amount']];
    const data = [[1, courseName || 'N/A', '1.00', `₹${course_amount}`]];

    doc.autoTable({
      head: headers,
      body: data,
      startY: 80,
      styles: { font: 'helvetica', fontSize: 10 },
      theme: 'grid',
      headStyles: {
        fillColor: [175, 140, 62],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
    });

    const finalY = doc.lastAutoTable.finalY || 80;
    doc.text(`Total: ₹${course_amount || '0.00'}`, 150, finalY + 10);

    doc.setFontSize(10);
    doc.text('Terms & Conditions:', 14, finalY + 35);
    doc.text(
      'Full payment is due upon receipt of this invoice.',
      14,
      finalY + 40,
    );
    doc.text(
      'Late payments may incur additional charges or interest as per applicable laws.',
      14,
      finalY + 45,
    );

    doc.setFontSize(8);
    doc.text(
      'This is a Computer Generated Invoice.',
      pageWidth / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' },
    );

    doc.save(`${customerName}-invoice-${transactionId}.pdf`);
  };

  // INVOICE REGISTRATION DOWNLOAD FUNCTIONALITY
  const downloadRegistrationInvoice = async (course) => {
    const { courseName, enrolledAt } = course;

    const courseStartDate = '08/02/2025';
    const registrationAmount = `6000.00`;
    const customerName = course.customerName;

    const transactionId = `INV-${new Date().getTime()}`;
    const doc = new jsPDF();

    const dateObj = new Date(enrolledAt);
    const date = `${String(dateObj.getDate()).padStart(2, '0')}-${String(
      dateObj.getMonth() + 1,
    ).padStart(2, '0')}-${dateObj.getFullYear()}`;

    const logoURL = 'logo.webp';
    doc.addImage(logoURL, 'WEBP', 14, 10, 15, 15);

    doc.setFont('helvetica', 'bold', '#AF8C3E');
    doc.setFontSize(20);
    const pageWidth = doc.internal.pageSize.getWidth();
    const textX = pageWidth / 2;
    const textY = 20;
    doc.text('ZenSpaces', pageWidth / 2, 15, { align: 'center' });

    const invoiceY = textY + 5;
    doc.setFontSize(15);
    doc.text('INVOICE', textX, invoiceY, { align: 'center' });

    const invoiceWidth = doc.getTextWidth('INVOICE');
    const invoiceLineXStart = textX - invoiceWidth / 2;
    const invoiceLineXEnd = textX + invoiceWidth / 2;
    const invoiceLineY = invoiceY + 2;
    doc.line(invoiceLineXStart, invoiceLineY, invoiceLineXEnd, invoiceLineY);

    const contentStartY = invoiceLineY + 10;

    doc.setFontSize(10);
    doc.text(
      'Flat No. C-108, Panchvati Co-operating Group Housing Society,  ',
      14,
      contentStartY + 0,
    );
    doc.text('F Block, Vikaspuri', 14, contentStartY + 5);
    doc.text('Delhi, 110018', 14, contentStartY + 10);
    doc.text('GSTIN: 07AYBPS4080R1ZQ', 14, contentStartY + 15);

    doc.text(`Invoice#: ${transactionId}`, 150, contentStartY + 5);

    doc.text('Bill To:', 14, contentStartY + 20);
    doc.text(customerName || 'N/A', 14, contentStartY + 25);

    const headers = [
      [
        '#',
        'Item & Description',
        'Qty',
        'Course Start Date',
        'Registration Amount',
        'Payment Status',
      ],
    ];
    const data = [
      [
        1,
        courseName || 'N/A',
        '1.00',
        `${courseStartDate}`,
        `Rs. ${registrationAmount || '0.00'}`,
        `Registration Amount Paid`,
      ],
    ];

    doc.autoTable({
      head: headers,
      body: data,
      startY: contentStartY + 40,
      styles: { font: 'helvetica', fontSize: 10 },
      theme: 'grid',
      headStyles: {
        fillColor: [175, 140, 62],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
    });

    const finalY = doc.lastAutoTable.finalY || contentStartY + 40;
    doc.text(`Total: Rs. ${registrationAmount || '0.00'}`, 150, finalY + 10);

    doc.setFontSize(10);
    doc.text('Thanks for enrolling.', 14, finalY + 30);
    doc.text('Terms & Conditions:', 14, finalY + 35);
    doc.text(
      'Full payment is due upon receipt of this invoice.',
      14,
      finalY + 40,
    );
    doc.text(
      'Late payments may incur additional charges or interest as per applicable laws.',
      14,
      finalY + 45,
    );

    doc.setFontSize(8);
    doc.text(
      'This is a Computer Generated Invoice.',
      pageWidth / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' },
    );

    doc.save(`registration_amount_invoice-${transactionId}.pdf`);
  };

  const filteredCustomers = enrolledCustomer.filter(
    (customer) => customer.enrolledCourses.length > 1,
  );
  const filteredCustomersCount = enrolledCustomer.filter(
    (customer) => customer.enrolledCourses.length > 1,
  ).length;

  // FETCHING VIDEO COURSES
  const videoCourseCollection = Array.isArray(activeCourse?.videoUrl)
    ? activeCourse.videoUrl
    : [];

  const fetchVideos = async (courseId, classDate) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/getVideos?courseId=${courseId}&classDate=${classDate}`,
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
    }
  };

  return (
    <div>
      <div className="w-full">
        <div className='w-full bg-cover flex items-center justify-center mt-[-30%] 2xl:mt-[-8.7%] bg-no-repeat bg-[url("/productsbg2.jpg")]'>
          <div className="2xl:max-w-[80%] max-w-[90%] w-full pt-10 2xl:py-20 2xl:mt-[4%] mt-[20%] md:mt-[30%] mx-auto flex 2xl:flex-row flex-col 2xl:gap-20 gap-5">
            <div className="w-full">
              <div className="h-auto m-auto grid grid-cols-12 gap-5 mt-[2%] mb-[1.4%]">
                <div className="col-span-12 bg-white rounded-md lg:hidden">
                  <Select label="Menu" color="black">
                    <Option onClick={() => setActiveTab('dashboard')}>
                      Dashboard
                    </Option>
                    <Option onClick={() => setActiveTab('coursemanagement')}>
                      Course Management
                    </Option>
                    <Option onClick={() => setActiveTab('enrollments')}>
                      Enrollments
                    </Option>
                    <Option onClick={() => setActiveTab('customers')}>
                      Customers
                    </Option>
                    <Option onClick={() => setActiveTab('payments')}>
                      Payments
                    </Option>
                    <Option onClick={() => setActiveTab('enrollments')}>
                      Enrollments
                    </Option>
                    <Option onClick={() => setActiveTab('reports')}>
                      Reports
                    </Option>
                  </Select>
                </div>
                <div className="col-span-3 hidden lg:flex">
                  <Card className="bg-gray-50 border text-black flex flex-col h-full w-full overflow-hidden rounded-xl shadow-2xl p-1">
                    <List className="font-mulish text-gray-900 text-[16px]">
                      <ListItem onClick={() => setActiveTab('dashboard')}>
                        <ListItemPrefix>
                          <UserCircleIcon className="h-5 w-5 text-[#AF8C3E]" />
                        </ListItemPrefix>
                        Dashboard
                      </ListItem>
                      <ListItem
                        onClick={() => setActiveTab('coursemanagement')}
                      >
                        <ListItemPrefix>
                          <FaChalkboardTeacher className="h-5 w-5 text-[#AF8C3E]" />
                        </ListItemPrefix>
                        Course Management
                      </ListItem>
                      <ListItem onClick={() => setActiveTab('enrollments')}>
                        <ListItemPrefix>
                          <PiStudentFill className="h-5 w-5 text-[#AF8C3E]" />
                        </ListItemPrefix>
                        Enrollments
                      </ListItem>
                      <ListItem onClick={() => setActiveTab('customers')}>
                        <ListItemPrefix>
                          <FaUser className="h-5 w-5 text-[#AF8C3E]" />
                        </ListItemPrefix>
                        Customers
                      </ListItem>
                      <ListItem onClick={() => setActiveTab('payments')}>
                        <ListItemPrefix>
                          <FaFileInvoiceDollar className="h-5 w-5 text-[#AF8C3E]" />
                        </ListItemPrefix>
                        Payments
                      </ListItem>
                      <ListItem onClick={() => setActiveTab('reports')}>
                        <ListItemPrefix>
                          <HiDocumentReport className="h-5 w-5 text-[#AF8C3E]" />
                        </ListItemPrefix>
                        Reports
                      </ListItem>
                      <ListItem
                        onClick={() => {
                          localStorage.removeItem('enrollmentToken');
                          localStorage.removeItem('courseData');
                          router.push('/adminlogin');
                          setIsLoggedIn(false);
                          router.refresh();
                        }}
                      >
                        <ListItemPrefix>
                          <HiDocumentReport className="h-5 w-5 text-[#AF8C3E]" />
                        </ListItemPrefix>
                        Sign Out
                      </ListItem>
                      {/* <ListItem
                        onClick={() => {
                         localStorage.removeItem("enrollmentToken");

                          window.location.reload();
                          router.push("https://ZenSpaces.com/");
                        }}
                      >
                        <ListItemPrefix>
                          <PowerIcon className="h-5 w-5 text-[#AF8C3E]" />
                        </ListItemPrefix>
                        Logout
                      </ListItem> */}
                    </List>
                  </Card>
                </div>
                <div className="lg:col-span-9 col-span-12 mx-2 lg:mx-0">
                  <div className="bg-gray-50 border text-black flex flex-col min-h-[90vh] h-full pb-20 w-full gap-2 rounded-xl shadow-2xl p-4">
                    {activeTab === 'myprofile' && <MyProfile />}
                    {activeTab === 'mycourses' && (
                      <div className="h-full overflow-y-auto">
                        <h2 className="md:text-xl text-lg font-mulish font-medium">
                          My Courses
                        </h2>
                        <hr className="my-5"></hr>
                        <div className="flex w-full justify-end">
                          <Dropdown />
                        </div>
                        <div className="flex rounded-xl mt-5 justify-between w-full shadow-lg border-gray-300 border p-5">
                          <Image
                            src="/year.jpg"
                            height={400}
                            width={400}
                            className="rounded-xl"
                            alt="courseImg"
                          />
                          <div className="gap-2 p-5 flex flex-col">
                            <Typography className="font-mulish text-center font-semibold text-2xl">
                              Lal Kitab Course
                            </Typography>
                            <Typography className="font-mulish text-center font-normal text-base">
                              Start Date : 01/01/2025
                            </Typography>
                            <Typography className="font-mulish text-center font-normal text-base">
                              Time : 06.00 To 07.00 P.M.
                            </Typography>
                            <Typography className="font-mulish text-center font-normal text-base">
                              Duration : 4 Months
                            </Typography>
                            <Typography className="font-mulish text-center font-normal text-base">
                              Days : Saturday & Sunday
                            </Typography>
                            <Typography className="font-mulish text-center font-normal text-base">
                              Platform : Google Meet
                            </Typography>
                            <Typography className="font-mulish text-center font-normal text-base">
                              Instructor : Kuldeep Meena
                            </Typography>
                          </div>
                          <div className="gap-2 px-5 py-10 flex justify-between  flex-col">
                            <Typography className="font-mulish text-center font-normal text-xl">
                              Total Fees : INR 21000/-
                            </Typography>
                            <Typography className="font-mulish text-center font-normal text-xl">
                              Registeration Paid : INR 2100/-
                            </Typography>
                            <Typography className="font-mulish text-center font-normal text-xl">
                              Remaining : INR 18000/-
                            </Typography>
                            <div className="flex items-center flex-col gap-2">
                              <Button className="font-mulish w-full rounded-lg border opacity-100 border-white transform transition duration-500 bg-[#AF8C3E] capitalize font-medium text-sm max-w-[170px]">
                                Pay Now
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="flex rounded-xl mt-5 justify-between w-full shadow-lg border-gray-300 border p-5">
                          <Image
                            src="/year.jpg"
                            height={400}
                            width={400}
                            className="rounded-xl"
                            alt="courseImg"
                          />
                          <div className="gap-2 p-5 flex flex-col">
                            <Typography className="font-mulish text-center font-semibold text-2xl">
                              Lal Kitab Course
                            </Typography>
                            <Typography className="font-mulish text-center font-normal text-base">
                              Start Date : 01/01/2025
                            </Typography>
                            <Typography className="font-mulish text-center font-normal text-base">
                              Time : 06.00 To 07.00 P.M.
                            </Typography>
                            <Typography className="font-mulish text-center font-normal text-base">
                              Duration : 4 Months
                            </Typography>
                            <Typography className="font-mulish text-center font-normal text-base">
                              Days : Saturday & Sunday
                            </Typography>
                            <Typography className="font-mulish text-center font-normal text-base">
                              Platform : Google Meet
                            </Typography>
                            <Typography className="font-mulish text-center font-normal text-base">
                              Instructor : Kuldeep Meena
                            </Typography>
                          </div>
                          <div className="gap-2 px-5 py-10 flex justify-between  flex-col">
                            <Typography className="font-mulish text-center font-normal text-xl">
                              Total Fees Paid : INR 21000/-
                            </Typography>
                            <div className="flex items-center flex-col gap-2">
                              <Button
                                className="font-mulish w-full rounded-lg border opacity-100 border-white transform transition duration-500 bg-[#AF8C3E] capitalize font-medium text-sm max-w-[170px]"
                                onClick={() => {
                                  setActiveTab('viewcoursedetails');
                                }}
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeTab === 'viewcoursedetails' && (
                      <div>
                        <h2 className="md:text-xl text-lg font-mulish font-medium">
                          Course Details
                        </h2>
                        <hr className="my-5"></hr>
                        <table class="table-auto text-center w-full text-base font-mulish">
                          <thead className=" text-white">
                            <tr className=" border-gray-200">
                              <th className="md:p-3 p-2 rounded-l-xl bg-[#AF8C3E] font-mulish font-medium">
                                S.No
                              </th>
                              <th className="md:p-3 p-2  bg-[#AF8C3E] font-mulish font-medium">
                                Date
                              </th>
                              <th className="md:p-3 p-2  bg-[#AF8C3E] font-mulish font-medium">
                                Time
                              </th>
                              <th className="md:p-3 p-2  bg-[#AF8C3E] font-mulish font-medium">
                                Link
                              </th>
                              <th className="md:p-3 p-2 rounded-r-xl bg-[#AF8C3E] font-mulish font-medium">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-gray-200">
                              <td className=" p-2 md:p-3">1</td>
                              <td className=" p-2 md:p-3">11 March 2025</td>
                              <td className="p-2 md:p-3">
                                06.00 To 07.00 P.M{' '}
                              </td>
                              <td className="p-2 text-blue-500 md:p-3">
                                www.meet.com
                              </td>
                              <td className="p-2 md:p-3">
                                <Button
                                  size="small"
                                  className="bg-[#AF8C3E] font-mulish"
                                >
                                  Join
                                </Button>
                              </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className=" p-2 md:p-3">2</td>
                              <td className=" p-2 md:p-3">12 March 2025</td>
                              <td className="p-2 md:p-3">
                                06.00 To 07.00 P.M{' '}
                              </td>
                              <td className="p-2 text-blue-500 md:p-3">
                                www.meet.com
                              </td>
                              <td className="p-2 md:p-3">
                                <Button
                                  size="small"
                                  className="bg-[#AF8C3E] font-mulish"
                                >
                                  View
                                </Button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                    {activeTab === 'mypaymentdetails' && <PaymentDetails />}

                    {activeTab === 'dashboard' && [
                      dashboardValue === true ? (
                        <div>
                          <h2 className="text-xl font-mulish font-medium">
                            Dashboard
                          </h2>
                          <hr className="my-5"></hr>
                          <div className="grid grid-cols-12 gap-2">
                            <div className="bg-[#AF8C3E] shadow-xl rounded-md p-5 col-span-12 md:col-span-6 xl:col-span-6">
                              <div className="flex justify-between items-center">
                                <div>
                                  <Typography className="font-mulish text-white font-medium">
                                    Total Courses
                                  </Typography>
                                  <Typography className="font-mulish text-white text-2xl">
                                    {dashboardStats.totalCourses}
                                  </Typography>
                                </div>
                                <div>
                                  <GiTeacher className="h-10 text-white w-10" />
                                </div>
                              </div>
                            </div>
                            <div className="bg-[#AF8C3E] shadow-xl rounded-md p-5 col-span-12 md:col-span-6 xl:col-span-6">
                              <div className="flex justify-between items-center">
                                <div>
                                  <Typography className="font-mulish text-white font-medium">
                                    Total Customers
                                  </Typography>
                                  <Typography className="font-mulish text-white text-2xl">
                                    {dashboardStats.totalCustomers}
                                  </Typography>
                                </div>
                                <div>
                                  <FaUserCircle className="h-10 text-white w-10" />
                                </div>
                              </div>
                            </div>
                            <div className="bg-[#AF8C3E] shadow-xl rounded-md p-5 col-span-12 md:col-span-6 xl:col-span-6">
                              <div className="flex justify-between items-center">
                                <div>
                                  <Typography className="font-mulish text-white font-medium">
                                    Total Course Bookings
                                  </Typography>
                                  <Typography className="font-mulish text-white text-2xl">
                                    {dashboardStats.totalCourseBookings}
                                  </Typography>
                                </div>
                                <div>
                                  <GiArchiveRegister className="h-10 text-white w-10" />
                                </div>
                              </div>
                            </div>
                            <div className="bg-[#AF8C3E] shadow-xl rounded-md p-5 col-span-12 md:col-span-6 xl:col-span-6">
                              <div className="flex justify-between items-center">
                                <div>
                                  <Typography className="font-mulish text-white font-medium">
                                    Total Sales
                                  </Typography>
                                  <Typography className="font-mulish text-white text-2xl">
                                    {dashboardStats.totalSales.toLocaleString(
                                      'en-IN',
                                    )}
                                  </Typography>
                                </div>
                                <div>
                                  <FaMoneyBillWave className="h-10 text-white w-10" />
                                </div>
                              </div>
                            </div>
                            <div className="col-span-12 mt-5">
                              <SalesChart />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <h2 className="text-xl font-mulish font-medium">
                            Dashboard
                          </h2>
                          <hr className="my-5"></hr>
                          <div className="flex items-center flex-col justify-center w-full h-full">
                            <Image
                              src={'/NoSites.gif'}
                              height={200}
                              width={200}
                              alt="NoSitesImage"
                            />
                            <Typography className="text-2xl font-mulish">
                              There is nothing to show in the Dashboard
                            </Typography>
                          </div>
                        </div>
                      ),
                    ]}
                    {activeTab === 'coursemanagement' && (
                      <div>
                        <div className="flex items-center justify-between">
                          <h2 className="text-xl font-mulish font-medium">
                            Courses
                          </h2>

                          <div className="flex gap-2">
                            <Button
                              className="font-mulish bg-[#AF8C3E]"
                              onClick={() => {
                                setActiveTab('addcourse');
                              }}
                            >
                              Add Course
                            </Button>
                          </div>
                        </div>
                        <hr className="my-5" />
                        <div className="flex flex-col md:flex-row gap-2 md:items-center justify-between">
                          <div className="flex flex-col">
                            <div className="flex flex-col sm:flex-row gap-1">
                              <div className="flex flex-col xl:flex-row gap-1">
                                <div>
                                  <Input
                                    label="Course ID"
                                    value={courseId}
                                    onChange={handleCourseIdChange}
                                  />
                                </div>
                                <div>
                                  <Input
                                    value={courseName}
                                    onChange={handleCustomerNameChange}
                                    label="Course Name"
                                  />
                                </div>
                              </div>
                              <div className="flex flex-col xl:flex-row gap-1">
                                <div className="flex justify-center items-center">
                                  <Input
                                    value={priceMin}
                                    onChange={handlePriceMinChange}
                                    label="Price Min"
                                  />
                                </div>
                                <div className="flex justify-center items-center">
                                  <Input
                                    value={priceMax}
                                    onChange={handlePriceMaxChange}
                                    label="Price Max"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="mt-2">
                              <Dropdown
                                onStatusChange={(value) =>
                                  setStatusFilter(value)
                                }
                              />
                            </div>
                            <div className="flex gap-2 mt-3">
                              <Button
                                onClick={handleClearFilters}
                                className="capitalize font-mulish font-normal shadow-xl rounded bg-[#AF8C3E]"
                              >
                                Clear
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="overflow-x-auto mt-5">
                          <table className="table-auto text-center md:text-sm w-full text-xs font-mulish">
                            <thead className="text-white">
                              <tr className="border-gray-200">
                                <th className="p-3 rounded-l-xl bg-[#AF8C3E] font-mulish font-medium">
                                  S.No.
                                </th>
                                {/* <th className="px-4 py-2 border">S.No</th> */}
                                <th className="p-3 bg-[#AF8C3E] font-mulish font-medium">
                                  Course Name
                                </th>
                                <th className="p-3 bg-[#AF8C3E] font-mulish font-medium">
                                  Course Type
                                </th>
                                <th className="p-3 bg-[#AF8C3E] font-mulish font-medium">
                                  Start Date
                                </th>
                                <th className="p-3 bg-[#AF8C3E] font-mulish font-medium">
                                  Course Day
                                </th>
                                <th className="p-3 bg-[#AF8C3E] font-mulish font-medium">
                                  Duration
                                </th>
                                <th className="p-3 bg-[#AF8C3E] font-mulish font-medium">
                                  Timings
                                </th>
                                <th className="p-3 rounded-r-xl bg-[#AF8C3E] font-mulish font-medium">
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredData.map((course, index) => (
                                <tr
                                  key={course._id}
                                  className="border-b border-gray-200"
                                >
                                  <td className="p-3">{`${index + 1}`}</td>
                                  <td className="p-3">{course.name}</td>
                                  <td className="p-3">{course.courseType}</td>
                                  <td className="p-3">
                                    {new Date(
                                      course.startDate,
                                    ).toLocaleDateString()}
                                  </td>
                                  <td className="p-3">
                                    {(() => {
                                      try {
                                        const days = JSON.parse(course.days);
                                        return Array.isArray(days)
                                          ? days.join(', ')
                                          : course.days;
                                      } catch (error) {
                                        return course.days;
                                      }
                                    })()}
                                  </td>
                                  <td className="p-3">
                                    {course.duration} {course.durationType}
                                  </td>
                                  <td className="p-3">
                                    {course.timeSlot &&
                                    course.timeSlot.startTime &&
                                    course.timeSlot.endTime ? (
                                      <div>
                                        {course.timeSlot.startTime} -{' '}
                                        {course.timeSlot.endTime}
                                      </div>
                                    ) : (
                                      <span>No Time Slot</span>
                                    )}
                                  </td>
                                  <td className="p-3">
                                    <div className="flex justify-start gap-4">
                                      <FaEye
                                        className="cursor-pointer"
                                        size="20px"
                                        onClick={() => viewCourse(course._id)}
                                      />
                                      <FaPen
                                        size="20px"
                                        className="cursor-pointer"
                                        onClick={() => editCourse(course._id)}
                                      />
                                      <DeletePopUp1
                                        courseId={course._id}
                                        onDeleteSuccess={removeCourseFromList}
                                      />
                                      {course.courseType === 'live' && (
                                        <>
                                          <FaVideo
                                            className="cursor-pointer"
                                            size="20px"
                                            onClick={() =>
                                              handleZoomMeeting(course._id)
                                            }
                                          />
                                          {/* <FaUpload
                                            className="cursor-pointer"
                                            size="20px"
                                            onClick={() => {
                                              setActiveTab('uploadvideos');
                                              handleUploadIconClick(course);
                                            }}
                                          /> */}
                                        </>
                                      )}
                                      {course.courseType === 'video' && (
                                        <FaUpload
                                          className="cursor-pointer"
                                          size="20px"
                                          onClick={() => {
                                            setActiveTab('uploadvideos');
                                            handleUploadIconClick(course);
                                          }}
                                        />
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                    {activeTab === 'enrollments' && (
                      <div>
                        <div className="flex items-center justify-between">
                          <h2 className="text-xl font-mulish font-medium">
                            Enrollments
                          </h2>
                          <div className="flex gap-2">
                            <Button
                              className="font-mulish bg-[#AF8C3E]"
                              onClick={() => {
                                setActiveTab('addCustomerEnrollment');
                              }}
                            >
                              ADD
                            </Button>
                            <Button
                              className="font-mulish bg-[#AF8C3E]"
                              onClick={() =>
                                exportToCSV2(filteredEnrollData, 'enrollments')
                              }
                            >
                              EXPORT
                            </Button>
                          </div>
                        </div>
                        <hr className="my-5"></hr>
                        <div className="flex flex-col md:flex-row gap-2 md:items-center justify-between">
                          <div className="flex flex-col">
                            <div className="flex flex-col sm:flex-row gap-1">
                              <div className="flex flex-col xl:flex-row gap-1">
                                <div>
                                  <Input
                                    value={enrollId}
                                    onChange={handleEnrollIdChange}
                                    label="Enrollment ID"
                                  />
                                </div>
                                <div>
                                  <Input
                                    value={enrolledAt}
                                    onChange={handleDateChange}
                                    type="date"
                                    label="Enrollment Date"
                                  />
                                </div>
                              </div>
                              <div className="flex flex-col xl:flex-row gap-1">
                                <div className="flex justify-center items-center">
                                  <Input
                                    value={courseEnrollName}
                                    onChange={handleCourseEnroll}
                                    label="Course's Name"
                                  />
                                </div>
                                <div className="flex justify-center items-center">
                                  <Input
                                    value={customerName}
                                    onChange={handleEnrolNameChange}
                                    label="Customer's Name"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="mt-2">
                              <Dropdown
                                onStatusChange={(value) =>
                                  setStatusFilter(value)
                                }
                              />
                            </div>
                            <div className="flex gap-2 mt-3">
                              {/* <Button className="capitalize font-mulish font-normal text-xs shadow-xl rounded bg-[#AF8C3E] px-3 py-2 lg:px-1 lg:py-1 2xl:p-2 ">
                              Filters
                            </Button> */}
                              <Button
                                className="capitalize font-mulish font-normal shadow-xl rounded bg-[#AF8C3E]"
                                onClick={handleClearFilters}
                              >
                                Clear
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="overflow-x-auto mt-5">
                          <table class="table-auto text-center md:text-sm w-full text-xs font-mulish">
                            <thead className=" text-white">
                              <tr className=" border-gray-200">
                                <th className="p-3 rounded-l-xl bg-[#AF8C3E] font-mulish font-medium">
                                  S.No.
                                </th>
                                <th className="p-3  bg-[#AF8C3E] font-mulish font-medium">
                                  Course Name
                                </th>
                                <th className="p-3  bg-[#AF8C3E] font-mulish font-medium">
                                  Course Type
                                </th>
                                <th className="p-3  bg-[#AF8C3E] font-mulish font-medium">
                                  Customer Name
                                </th>
                                <th className="p-3  bg-[#AF8C3E] font-mulish font-medium">
                                  Slot
                                </th>
                                <th className="p-3  bg-[#AF8C3E] font-mulish font-medium">
                                  Enrollment Date
                                </th>
                                <th className="p-3  bg-[#AF8C3E] font-mulish font-medium">
                                  Amount Paid
                                </th>
                                <th className="p-3  bg-[#AF8C3E] font-mulish font-medium">
                                  Status
                                </th>
                                <th className="p-3  rounded-r-xl bg-[#AF8C3E] font-mulish font-medium">
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredEnrollData
                                .filter(
                                  (enrollment) =>
                                    enrollment.paymentStatus != 'pending',
                                )
                                .map((enrollment, index) => (
                                  <tr
                                    key={enrollment._id}
                                    className="border-b border-gray-200"
                                  >
                                    <td className="p-3">{`${index + 1}`}</td>
                                    <td className="p-3">
                                      {enrollment.courseId?.name}
                                    </td>
                                    <td className="p-3">
                                      {enrollment.courseId?.courseType}
                                    </td>
                                    <td className="p-3">{enrollment.name}</td>
                                    <td className="p-3">
                                      {enrollment.courseId?.timeSlot.startTime}{' '}
                                      - {enrollment.courseId?.timeSlot.endTime}
                                    </td>
                                    <td className="p-3">
                                      {new Date(
                                        enrollment.enrolledAt,
                                      ).toLocaleDateString()}
                                    </td>
                                    <td className="p-3">
                                      ₹ {enrollment.courseId?.discountedFee}
                                    </td>
                                    <td className="p-3">
                                      {enrollment.paymentStatus ||
                                        'registrationAmountPaid'}
                                    </td>
                                    <td className="p-3">
                                      <div className="flex justify-center">
                                        <FaEye
                                          onClick={() => {
                                            setActiveTab('viewenrollment');
                                            setSelectedEnrollmentId(
                                              enrollment._id,
                                            );
                                          }}
                                          className="cursor-pointer"
                                          size="20px"
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {activeTab === 'addcourse' && (
                      <div>
                        <div className="flex justify-between items-center">
                          <h2 className="text-xl font-mulish font-medium">
                            Add Course
                          </h2>
                          <IoArrowBackCircleOutline
                            className="cursor-pointer text-black"
                            size={40}
                            onClick={() => {
                              setActiveTab('coursemanagement');
                            }}
                          />
                        </div>
                        <hr className="my-5" />
                        <div className="flex flex-col justify-center">
                          <h1 className="block antialiased tracking-normal font-mulish text-lg font-medium leading-snug mb-5">
                            Add Course Information
                          </h1>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-5">
                            <div className="col-span-1">
                              <Input
                                name="name"
                                type="text"
                                label="Course's Name"
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-span-1">
                              <Dropdown4 onChange={handleInstructorChange} />
                            </div>
                            <div className="col-span-1">
                              <Input
                                name="duration"
                                type="number"
                                label="Course's Duration"
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-span-1">
                              <Dropdown5 onChange={handleDurationChange} />
                            </div>

                            <div className="col-span-1">
                              <Input
                                name="discountedFee"
                                type="number"
                                label="Discounted Fee"
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-span-1">
                              <Input
                                name="totalFee"
                                type="number"
                                label="Course's Total Fee"
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-span-1">
                              <Input
                                name="registrationAmount"
                                type="number"
                                label="Registration Amount"
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-span-1">
                              <Input
                                name="startDate"
                                type="date"
                                label="Start Date"
                                onChange={handleInputChange}
                                min={new Date().toISOString().split('T')[0]}
                              />
                            </div>
                            <div className="col-span-1">
                              <Input
                                name="introVideoLink"
                                type="text"
                                label="Introduction Video Link"
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                              <Input
                                name="description"
                                type="text"
                                label="Short Description"
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-span-1 flex justify-center items-center w-full gap-2 sm:col-span-2 lg:col-span-3">
                              <Typography className="font-mulish font-medium text-xl">
                                Choose Days
                              </Typography>
                            </div>
                            <div className="col-span-1 flex justify-evenly w-full gap-2 sm:col-span-2 lg:col-span-3">
                              {[
                                'Monday',
                                'Tuesday',
                                'Wednesday',
                                'Thursday',
                                'Friday',
                                'Saturday',
                                'Sunday',
                              ].map((day) => (
                                <div
                                  key={day}
                                  className="flex flex-col gap-1 justify-center"
                                >
                                  <label>{day}</label>
                                  <input
                                    type="checkbox"
                                    checked={formData.days.includes(day)}
                                    onChange={() => handleCheckboxChange(day)}
                                  />
                                </div>
                              ))}
                            </div>
                            <div className="col-span-1 flex justify-center items-center w-full gap-2 sm:col-span-2 lg:col-span-3">
                              <Typography className="font-mulish font-medium text-xl">
                                Choose Slot
                              </Typography>
                            </div>
                            <div className="col-span-1 flex justify-evenly items-center w-full gap-2 sm:col-span-2 lg:col-span-3">
                              <Input
                                type="time"
                                name="startTime"
                                onChange={handleTimeChange}
                                label="Start Time"
                              />
                              <Typography className="font-mulish font-normal text-sm">
                                To
                              </Typography>
                              <Input
                                type="time"
                                name="endTime"
                                onChange={handleTimeChange}
                                label="End Time"
                              />
                            </div>
                            <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                              <Typography className="font-mulish font-medium text-xl">
                                Course Type
                              </Typography>
                              <div className="flex justify-start gap-5 mt-2">
                                <div>
                                  <input
                                    type="radio"
                                    id="video"
                                    name="courseType"
                                    value="video"
                                    checked={formData.courseType === 'video'}
                                    onChange={handleCourseTypeChange}
                                  />
                                  <label htmlFor="video">Video Course</label>
                                </div>
                                <div>
                                  <input
                                    type="radio"
                                    id="live"
                                    name="courseType"
                                    value="live"
                                    checked={formData.courseType === 'live'}
                                    onChange={handleCourseTypeChange}
                                  />
                                  <label htmlFor="live">Live Course</label>
                                </div>
                              </div>
                            </div>
                            <div className="col-span-1 flex  items-center w-full  sm:col-span-2 lg:col-span-3">
                              <Typography className="font-mulish m-0 font-medium text-xl">
                                Select Thumbnail
                              </Typography>
                            </div>
                            <div className="col-span-1">
                              <Typography className="font-mulish font-semibold">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    setFormData({
                                      ...formData,
                                      thumbnail: e.target.files[0],
                                    });
                                  }}
                                />
                              </Typography>
                            </div>
                          </div>
                          <div className="flex justify-end mt-2">
                            <Button
                              onClick={handleSubmit}
                              className="font-mulish bg-[#AF8C3E]"
                              size="lg"
                            >
                              Proceed
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeTab === 'addcourse1' && (
                      <div>
                        <div className="flex justify-between items-center">
                          <h2 className="text-xl font-mulish font-medium">
                            Add Course
                          </h2>
                          <IoArrowBackCircleOutline
                            className="cursor-pointer text-black"
                            size={40}
                            onClick={() => {
                              setActiveTab('addcourse');
                            }}
                          />
                        </div>
                        <hr className="my-5" />
                        <h2 className="md:text-xl text-lg font-mulish font-medium">
                          Add Overview Details
                        </h2>
                        <TextEditor
                          courseId={courseId}
                          onComplete={() => setActiveTab('addcourse2')}
                        />
                      </div>
                    )}

                    {activeTab === 'addcourse2' && (
                      <div>
                        <div className="flex justify-between items-center">
                          <h2 className="text-xl font-mulish font-medium">
                            Add Course
                          </h2>
                          <IoArrowBackCircleOutline
                            className="cursor-pointer text-black"
                            size={40}
                            onClick={() => {
                              setActiveTab('addcourse1');
                            }}
                          />
                        </div>
                        <hr className="my-5" />
                        <h2 className="md:text-xl text-lg font-mulish font-medium">
                          Add Syllabus Details
                        </h2>
                        <TextsEditor
                          courseId={courseId}
                          apiEndpoint={`${BASE_URL}/api/add-course/step3`}
                          onComplete={(successMessage) => {
                            setSuccessMessage(successMessage);
                            setTimeout(() => {
                              setSuccessMessage('');
                              setActiveTab('coursemanagement');
                            }, 3000);
                          }}
                          placeholder="Write the course syllabus details here..."
                        />
                        {successMessage && (
                          <div className="mt-4 bg-green-100 text-green-800 p-3 rounded">
                            {successMessage}
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === 'editcourse' && (
                      <div>
                        <div className="flex justify-between items-center">
                          <h2 className="md:text-xl text-lg font-mulish font-medium">
                            Edit Course
                          </h2>
                          <IoArrowBackCircleOutline
                            className="cursor-pointer text-black flex"
                            size={40}
                            onClick={() => {
                              setActiveTab('coursemanagement');
                            }}
                          />
                        </div>
                        <hr className="my-5"></hr>
                        <div className=" flex flex-col justify-center">
                          <h1 className="block antialiased tracking-normal font-mulish text-lg font-medium leading-snug mb-5">
                            Edit Course Information
                          </h1>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-5">
                            <div className="col-span-1">
                              <Input
                                label="Course's Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="col-span-1">
                              <Dropdown4
                                name="instructor"
                                value={formData.instructor}
                                onChange={handleInstCheckChange}
                              />
                            </div>

                            <div className="col-span-1">
                              <Input
                                type="number"
                                name="duration"
                                label="Course's Duration"
                                value={formData.duration}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="col-span-1">
                              <Dropdown5
                                name="durationType"
                                value={formData.durationType}
                                onChange={handleInstCheckChange}
                              />
                            </div>
                            <div className="col-span-1">
                              <Input
                                name="discountedFee"
                                type="number"
                                label="Course's Total Discounted Fee"
                                value={formData.discountedFee}
                                onChange={handleChange}
                                // name={discountedFee}
                              />
                            </div>
                            <div className="col-span-1">
                              <Input
                                name="totalFee"
                                type="number"
                                label="Course's Total Fee"
                                value={formData.totalFee}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="col-span-1">
                              <Input
                                type="number"
                                label="Registration Amount"
                                name="registrationAmount"
                                value={formData.registrationAmount}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="col-span-1">
                              <Input
                                type="date"
                                label="Course's Start Date"
                                value={formData.startDate}
                                onChange={handleChange}
                                name="startDate"
                              />
                            </div>
                            <div className="col-span-1">
                              <Input
                                label="Course's Introduction Video Link"
                                name="introVideoLink"
                                value={formData.introVideoLink}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                              <Input
                                label="Course's Short Description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="col-span-1 flex justify-center items-center w-full gap-2 sm:col-span-2 lg:col-span-3">
                              <Typography className="font-mulish font-medium text-xl">
                                Choose Days
                              </Typography>
                            </div>
                            <div className="col-span-1 flex justify-evenly w-full gap-2 sm:col-span-2 lg:col-span-3">
                              {allDays.map((day) => (
                                <div
                                  key={day}
                                  className="flex flex-col gap-1 justify-center"
                                >
                                  <Typography className="font-mulish font-normal text-sm">
                                    {day}
                                  </Typography>
                                  <Checkbox
                                    checked={selectedDays.includes(day)}
                                    onChange={() => handleDayChange(day)}
                                  />
                                </div>
                              ))}
                            </div>

                            <div className="col-span-1 flex justify-center items-center w-full gap-2 sm:col-span-2 lg:col-span-3">
                              <Typography className="font-mulish font-medium text-xl">
                                Choose Slot
                              </Typography>
                            </div>

                            <div className="col-span-1 flex justify-evenly items-center w-full gap-2 sm:col-span-2 lg:col-span-3">
                              <Input
                                type="time"
                                name="startTime"
                                value={
                                  formData?.timeSlot?.startTime
                                    ? convertTo24HourFormat(
                                        formData.timeSlot.startTime,
                                      )
                                    : ''
                                }
                                onChange={(e) =>
                                  handleEditedTimeChange(e, 'startTime')
                                }
                                label="Start Time"
                              />
                              <Typography className="font-mulish font-normal text-sm">
                                To
                              </Typography>
                              <Input
                                type="time"
                                name="endTime"
                                value={
                                  formData?.timeSlot?.endTime
                                    ? convertTo24HourFormat(
                                        formData.timeSlot.endTime,
                                      )
                                    : ''
                                }
                                onChange={(e) =>
                                  handleEditedTimeChange(e, 'endTime')
                                }
                                label="End Time"
                              />
                            </div>

                            <div className="col-span-1">
                              <Typography className="font-mulish font-semibold">
                                Edit Course Thumbnail
                              </Typography>
                              <div className="flex mt-5 gap-5">
                                <div className="flex justify-center items-center">
                                  {previewUrl ? (
                                    <img
                                      src={previewUrl}
                                      alt="Thumbnail Preview"
                                      className="w-20 h-20 object-cover rounded"
                                    />
                                  ) : (
                                    <FaImage size={60} />
                                  )}
                                </div>
                                <div className="flex flex-col gap-2 justify-center items-center">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    id="thumbnail-upload"
                                    style={{ display: 'none' }}
                                    onChange={handleThumbnailFileChange}
                                  />
                                  <Button
                                    className="font-mulish bg-[#AF8C3E]"
                                    size="sm"
                                    onClick={() =>
                                      document
                                        .getElementById('thumbnail-upload')
                                        .click()
                                    }
                                  >
                                    Choose File
                                  </Button>
                                  <Button
                                    className="font-mulish bg-[#AF8C3E]"
                                    size="sm"
                                    onClick={handleUpload}
                                  >
                                    Upload
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end mt-2">
                            <Button
                              onClick={async () => {
                                try {
                                  await handleeditSubmit(formData._id);
                                  setActiveTab('editcourse1');
                                } catch (error) {
                                  console.error(
                                    'Error updating course:',
                                    error,
                                  );
                                }
                              }}
                              className="font-mulish bg-[#AF8C3E]"
                              size="lg"
                            >
                              Proceed
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeTab === 'editcourse1' && (
                      <div>
                        <div className="flex justify-between items-center">
                          <h2 className="text-xl font-mulish font-medium">
                            Edit Course
                          </h2>
                          <IoArrowBackCircleOutline
                            className="cursor-pointer text-black"
                            size={40}
                            onClick={() => {
                              setActiveTab('editcourse');
                            }}
                          />
                        </div>
                        <hr className="my-5"></hr>
                        <h2 className="md:text-xl text-lg font-mulish font-medium">
                          Edit Overview Details
                        </h2>
                        <TextEditor
                          courseId={formData._id}
                          prefilledData={formData.overview}
                          onComplete={() => setActiveTab('editcourse2')} // Move to next tab after save
                        />

                        <div className="flex justify-end mt-2">
                          <Button
                            onClick={() => {
                              setActiveTab('editcourse2');
                            }}
                            className="font-mulish bg-[#AF8C3E]"
                            size="lg"
                          >
                            Proceed
                          </Button>
                        </div>
                      </div>
                    )}
                    {activeTab === 'editcourse2' && (
                      <div>
                        <div className="flex justify-between items-center">
                          <h2 className="text-xl font-mulish font-medium">
                            Edit Course
                          </h2>
                          <IoArrowBackCircleOutline
                            className="cursor-pointer text-black"
                            size={40}
                            onClick={() => {
                              setActiveTab('editcourse1');
                            }}
                          />
                        </div>
                        <hr className="my-5"></hr>
                        <h2 className="md:text-xl text-lg font-mulish font-medium">
                          Edit Syllabus Details
                        </h2>
                        <TextsEditor
                          courseId={formData?._id || null} // Pass null if formData._id is undefined (e.g., new course)
                          prefilledData={formData?.syllabus || ''} // Use an empty string if prefilledData is not available
                          isEditing={!!formData?._id} // Pass true if courseId exists, false otherwise
                          onComplete={(message) => notify(message, 'success')} // Handle completion notification
                          placeholder="Write or edit the syllabus..."
                        />
                        {/* 
                        <div className="flex justify-end mt-2">
                          <Button className="font-mulish bg-[#AF8C3E]" size="lg">
                            Submit
                          </Button>
                        </div> */}
                      </div>
                    )}
                    {activeTab === 'customers' && (
                      <div>
                        <div className="flex items-center justify-between">
                          <h2 className="text-xl font-mulish font-medium">
                            Customers
                          </h2>
                          <div className="flex gap-2">
                            <Button
                              className="font-mulish bg-[#AF8C3E]"
                              onClick={() => {
                                setActiveTab('addcustomer');
                              }}
                            >
                              ADD
                            </Button>
                            <Button
                              className="font-mulish bg-[#AF8C3E]"
                              onClick={exportToCSV}
                            >
                              EXPORT
                            </Button>
                          </div>
                        </div>
                        <hr className="my-5"></hr>
                        <div className="flex flex-col md:flex-row gap-2 md:items-center justify-between">
                          <div className="flex flex-col">
                            <div className="flex flex-col sm:flex-row gap-1">
                              <div className="flex flex-col xl:flex-row gap-1">
                                <div>
                                  <Input
                                    label="Customer ID"
                                    value={customerId}
                                    onChange={handleCustIdChange}
                                  />
                                </div>
                                <div>
                                  <Input
                                    label="Customer Name"
                                    value={customerName2}
                                    onChange={handleCustNameChange}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            {/* <Button className="capitalize font-mulish font-normal text-xs shadow-xl rounded bg-[#AF8C3E] px-3 py-2 lg:px-1 lg:py-1 2xl:p-2 ">
                              Filters
                            </Button> */}
                            <Button
                              className="capitalize font-mulish font-normal shadow-xl rounded bg-[#AF8C3E]"
                              onClick={handleClearFilters}
                            >
                              Clear
                            </Button>
                          </div>
                        </div>
                        <div className="overflow-x-auto mt-5">
                          <table class="table-auto text-center md:text-sm w-full text-xs font-mulish">
                            <thead className=" text-white">
                              <tr className=" border-gray-200">
                                <th className="p-3 rounded-l-xl bg-[#AF8C3E] font-mulish font-medium">
                                  S.No.
                                </th>
                                <th className="p-3  bg-[#AF8C3E] font-mulish font-medium">
                                  Customer Name
                                </th>
                                <th className="p-3  bg-[#AF8C3E] font-mulish font-medium">
                                  Email
                                </th>
                                <th className="p-3  bg-[#AF8C3E] font-mulish font-medium">
                                  Registration Date
                                </th>
                                <th className="p-3  bg-[#AF8C3E] font-mulish font-medium">
                                  No. Of Courses Enrolled
                                </th>
                                <th className="p-3  rounded-r-xl bg-[#AF8C3E] font-mulish font-medium">
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {enrolledCustomer.map((cs, index) => (
                                <tr
                                  key={cs._id}
                                  className="border-b border-gray-200"
                                >
                                  <td className="p-3">{`${index + 1}`}</td>
                                  <td className="p-3">{cs.name}</td>
                                  <td className="p-3">{cs.email}</td>
                                  <td className="p-3">
                                    {cs.enrolledCourses.length > 0
                                      ? new Date(
                                          cs.enrolledCourses[0].enrolledAt,
                                        ).toLocaleDateString('en-GB')
                                      : ''}
                                  </td>
                                  <td className="p-3">
                                    {filteredCustomersCount}
                                  </td>
                                  {/* <td className="p-3">{cs.courseId.courseType}</td>
                  <td className="p-3">{cs.name}</td>
                  <td className="p-3">{cs.courseId.timeSlot.startTime}-{cs.courseId.timeSlot.endTime}</td>
                  <td className="p-3">{new Date(cs.enrolledAt).toLocaleDateString()}</td>
                  <td className="p-3">₹ {cs.courseId.discountedFee}</td>
                  <td className="p-3">{cs.paymentStatus}</td> */}
                                  <td className="p-3">
                                    <div className="flex justify-center">
                                      <FaEye
                                        onClick={() => {
                                          setActiveTab('viewcustomer');
                                          handleCustomersAction(cs._id);
                                        }}
                                        className="cursor-pointer"
                                        size="20px"
                                      />
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                    {activeTab === 'payments' && (
                      <div>
                        <div className="flex items-center justify-between">
                          <h2 className="text-xl font-mulish font-medium">
                            Payments
                          </h2>
                          <div className="flex gap-2">
                            <Button
                              className="font-mulish bg-[#AF8C3E]"
                              onClick={exportToCSV3}
                            >
                              EXPORT
                            </Button>
                          </div>
                        </div>
                        <hr className="my-5"></hr>
                        <div className="">
                          <div className="flex flex-col sm:flex-row gap-1">
                            <div className="flex flex-col xl:flex-row gap-1">
                              <div>
                                <Input
                                  label="Customer Name"
                                  value={filterCustomerName}
                                  onChange={handlePaymentCustomerFilter}
                                />
                              </div>
                              <div>
                                <Input
                                  value={filterDate}
                                  onChange={handlePaymentDateFilter}
                                  type="date"
                                  label="Date"
                                />
                              </div>
                            </div>
                          </div>
                          <Button
                            className="capitalize mt-3 font-mulish font-normal shadow-xl rounded bg-[#AF8C3E]  "
                            onClick={handleClearFilters}
                          >
                            Clear
                          </Button>
                        </div>
                        <br />
                        <div className="overflow-x-auto mt-5">
                          <table class="table-auto text-center w-full text-base font-mulish">
                            <thead className=" text-white">
                              <tr className=" border-gray-200">
                                <th className="md:p-3 p-2 rounded-l-xl bg-[#AF8C3E] font-mulish font-medium">
                                  S.No.
                                </th>
                                {/*                                 <th className="md:p-3 p-2  bg-[#AF8C3E] font-mulish font-medium">
                                  Transaction Id
                                </th> */}
                                <th className="md:p-3 p-2  bg-[#AF8C3E] font-mulish font-medium">
                                  Course Name
                                </th>
                                <th className="md:p-3 p-2  bg-[#AF8C3E] font-mulish font-medium">
                                  Customer Name
                                </th>
                                <th className="md:p-3 p-2  bg-[#AF8C3E] font-mulish font-medium">
                                  Date
                                </th>
                                <th className="md:p-3 p-2  bg-[#AF8C3E] font-mulish font-medium">
                                  Time
                                </th>
                                <th className="md:p-3 p-2  bg-[#AF8C3E] font-mulish font-medium">
                                  Status
                                </th>
                                <th className="md:p-3 p-2 rounded-r-xl bg-[#AF8C3E] font-mulish font-medium">
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredPaymentData.length > 0 ? (
                                filteredPaymentData
                                  .filter(
                                    (payment) => payment.status !== 'pending',
                                  )
                                  .map((payment, index) => (
                                    <tr
                                      className="border-b border-gray-200"
                                      key={index}
                                    >
                                      <td className="p-2 md:p-3">
                                        {index + 1}
                                      </td>
                                      {/* <td className="p-2 md:p-3">
                                      {payment.status === 'Paid'
                                        ? finaltransactionid || 'N/A'
                                        : payment.status === 'pending'
                                        ? canceltransactionid || 'N/A'
                                        : transactionId || 'N/A'}
                                    </td> */}
                                      <td className="p-2 md:p-3">
                                        {payment.courseName}
                                      </td>
                                      <td className="p-2 md:p-3">
                                        {payment.customerName}
                                      </td>
                                      <td className="p-2 md:p-3">
                                        {payment.date || 'N/A'}
                                      </td>
                                      <td className="p-2 md:p-3">
                                        {payment.time || 'N/A'}
                                      </td>
                                      <td className="p-2 md:p-3">
                                        {payment.status}
                                      </td>
                                      <td className="p-2 flex justify-center text-center md:p-3">
                                        {payment.status === 'Paid' && (
                                          <>
                                            <HiDocumentDownload
                                              title="Registration Amount Invoice"
                                              className="h-5 w-5 cursor-pointer"
                                              onClick={() =>
                                                downloadRegistrationInvoice(
                                                  payment,
                                                )
                                              }
                                            />
                                            <HiDocumentDownload
                                              title="Download Invoice"
                                              className="h-5 w-5 cursor-pointer"
                                              onClick={() =>
                                                downloadInvoice(payment)
                                              }
                                            />
                                          </>
                                        )}
                                        {payment.status ===
                                          'registrationAmountPaid' && (
                                          <HiDocumentDownload
                                            title="Registration Amount Invoice"
                                            className="h-5 w-5 cursor-pointer"
                                            onClick={() =>
                                              downloadRegistrationInvoice(
                                                payment,
                                              )
                                            }
                                          />
                                        )}
                                      </td>
                                    </tr>
                                  ))
                              ) : (
                                <tr>
                                  <td className="p-2 md:p-3" colSpan="8">
                                    No payment records found.
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                    {activeTab === 'reports' && (
                      <div>
                        <div className="flex items-center justify-between">
                          <h2 className="text-xl font-mulish font-medium">
                            Reports
                          </h2>
                          <div className="flex gap-2">
                            <Button
                              className="font-mulish bg-[#AF8C3E]"
                              onClick={exportReportToCSV}
                            >
                              EXPORT
                            </Button>
                          </div>
                        </div>
                        <hr className="my-5"></hr>
                        <div className="flex flex-col gap-2 justify-between">
                          <div className="flex flex-col md:flex-row gap-2">
                            <Dropdown3
                              onChange={handleCourseChange}
                              value={selectedCourse}
                            />
                            <RadioReport
                              onChange={setSelectedRadio}
                              selectedValue={selectedRadio}
                            />
                          </div>
                          <div className="flex flex-col md:flex-row gap-2">
                            <Input
                              type="date"
                              label="From"
                              value={fromDate}
                              onChange={(e) => setFromDate(e.target.value)}
                            ></Input>
                            <Input
                              type="date"
                              label="To"
                              value={toDate}
                              onChange={(e) => setToDate(e.target.value)}
                            ></Input>
                          </div>
                        </div>
                        <Button
                          className="capitalize font-mulish font-normal mt-3 shadow-xl rounded bg-[#AF8C3E]  "
                          onClick={handleClearFilters}
                        >
                          Clear
                        </Button>
                        <div className="grid mt-5 grid-cols-12 gap-2">
                          <div className="bg-[#AF8C3E] shadow-xl rounded-md p-5 col-span-12">
                            <div className="flex justify-between items-center">
                              <div>
                                <Typography className="font-mulish text-white font-medium">
                                  Sales In The Defined Period
                                </Typography>
                                <Typography className="font-mulish text-white text-2xl">
                                  ₹{courseData.totalSales}
                                </Typography>
                              </div>
                              <div>
                                <FaMoneyBillWave className="h-10 text-white w-10" />
                              </div>
                            </div>
                          </div>
                          <div className="bg-[#AF8C3E] shadow-xl rounded-md p-5 col-span-12 md:col-span-6 xl:col-span-6">
                            <div className="flex justify-between items-center">
                              <div>
                                <Typography className="font-mulish text-white font-medium">
                                  Total Course Bookings
                                </Typography>
                                <Typography className="font-mulish text-white text-2xl">
                                  {courseData.totalBookings}
                                </Typography>
                              </div>
                              <div>
                                <GiArchiveRegister className="h-10 text-white w-10" />
                              </div>
                            </div>
                          </div>
                          <div className="bg-[#AF8C3E] shadow-xl rounded-md p-5 col-span-12 md:col-span-6 xl:col-span-6">
                            <div className="flex justify-between items-center">
                              <div>
                                <Typography className="font-mulish text-white font-medium">
                                  Registered Customers
                                </Typography>
                                <Typography className="font-mulish text-white text-2xl">
                                  {courseData.registeredCustomers}
                                </Typography>
                              </div>
                              <div>
                                <FaUserCircle className="h-10 text-white w-10" />
                              </div>
                            </div>
                          </div>

                          <div className="bg-[#AF8C3E] shadow-xl rounded-md p-5 col-span-12 md:col-span-6 xl:col-span-6">
                            <div className="flex justify-between items-center">
                              <div>
                                <Typography className="font-mulish text-white font-medium">
                                  Onboarded Customers
                                </Typography>
                                <Typography className="font-mulish text-white text-2xl">
                                  {courseData.onboardedCustomers}
                                </Typography>
                              </div>
                              <div>
                                <FaUserCircle className="h-10 text-white w-10" />
                              </div>
                            </div>
                          </div>
                          {/* <div className="bg-[#AF8C3E] shadow-xl rounded-md p-5 col-span-12 md:col-span-6 xl:col-span-6"> */}
                          {/* <div className="flex justify-between items-center">
                              <div>
                                <Typography className="font-mulish text-white font-medium">
                                  Total Refunds
                                </Typography>
                                <Typography className="font-mulish text-white text-2xl">
                                  0
                                </Typography>
                              </div>
                              <div>
                                <RiRefund2Fill className="h-10 text-white w-10" />
                              </div>
                            </div> */}
                          {/* </div> */}
                        </div>
                        <ReportsChart courseData={courseData} />
                      </div>
                    )}
                    {activeTab === 'viewcustomer' && (
                      <div>
                        <div className="flex justify-between items-center">
                          <h2 className="text-xl font-mulish font-medium">
                            View Customer
                          </h2>
                          <IoArrowBackCircleOutline
                            className="cursor-pointer text-black"
                            size={40}
                            onClick={() => {
                              setActiveTab('customers');
                            }}
                          />
                        </div>
                        <hr className="my-5"></hr>
                        <div className="flex flex-col">
                          <div className="flex flex-col items-center">
                            <Image
                              className="aspect-square rounded-full object-cover object-center"
                              src="/Picture26.png"
                              alt="Customer Image"
                              height={130}
                              width={130}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <h2 className="text-xl mt-2 flex font-mulish font-medium">
                              Details
                            </h2>
                          </div>
                          <hr className="my-4"></hr>
                          <div className="grid grid-cols-12 gap-5">
                            <div className="flex lg:col-span-6 md:col-span-6 col-span-12 flex-col">
                              <Typography className="font-mulish font-semibold">
                                Full Name :
                              </Typography>
                              <Typography className="font-mulish border rounded shadow-2xl p-1 text-base font-normal">
                                {customerAction.name || ''}
                              </Typography>
                            </div>
                            <div className="flex lg:col-span-6 md:col-span-6 col-span-12 flex-col">
                              <Typography className="font-mulish font-semibold">
                                Phone :
                              </Typography>
                              <Typography className="font-mulish text-base border rounded shadow-2xl p-1 font-normal">
                                {customerAction.phone || 0}
                              </Typography>
                            </div>
                            <div className="flex lg:col-span-6 md:col-span-6 col-span-12 flex-col">
                              <Typography className="font-mulish font-semibold">
                                Email :
                              </Typography>
                              <Typography className="font-mulish border rounded shadow-2xl p-1 text-base font-normal">
                                {customerAction.email || ''}
                              </Typography>
                            </div>
                            <Button
                              className="font-mulish col-span-12 bg-[#AF8C3E]"
                              onClick={() => {
                                setActiveTab('enrollments');
                                // setSelectedCustomerId(customerAction._id); // Pass customer ID
                                setCustomerName(customerAction.name);
                              }}
                            >
                              VIEW ENROLLMENTS
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeTab === 'viewenrollment' && data && (
                      <div>
                        <div className="flex justify-between items-center">
                          <h2 className="text-xl font-mulish font-medium">
                            View Enrollment
                          </h2>
                          <IoArrowBackCircleOutline
                            className="cursor-pointer text-black"
                            size={40}
                            onClick={() => setActiveTab('enrollments')}
                          />
                        </div>
                        <hr className="my-5" />
                        <div className="col-span-12 flex mb-5 flex-col md:flex-row justify-between rounded-lg bg-gray-200 shadow-lg p-2.5 gap-5">
                          <div className="flex flex-col xl:flex-row gap-2">
                            <Typography className="font-mulish m-0 text-base font-medium">
                              Customer Name:
                            </Typography>
                            <Typography className="font-mulish m-0 text-base font-normal">
                              {data.userDetails.name}
                            </Typography>
                          </div>
                          <div className="flex flex-col xl:flex-row gap-2">
                            <Typography className="font-mulish m-0 text-base font-medium">
                              Customer Email:
                            </Typography>
                            <Typography className="font-mulish m-0 text-base font-normal">
                              {data.userDetails.email}
                            </Typography>
                          </div>
                          <div className="flex flex-col xl:flex-row gap-2">
                            <Typography className="font-mulish m-0 text-base font-medium">
                              Customer Phone No.:
                            </Typography>
                            <Typography className="font-mulish m-0 text-base font-normal">
                              {data.userDetails.phone
                                ? data.userDetails.phone
                                : 'No phone number added'}
                            </Typography>
                          </div>
                        </div>
                        <div className="flex flex-col items-center lg:flex-row rounded-xl mt-5 justify-between w-full shadow-lg border-gray-300 border p-5">
                          <Image
                            src={
                              `${BASE_URL}/${data?.courseId?.thumbnail?.replace(
                                /\\/g,
                                '/',
                              )}` || '/year.jpg'
                            }
                            height={400}
                            width={400}
                            className="rounded-xl"
                            alt="courseImg"
                          />
                          <div className="gap-2 p-5 flex items-center flex-col">
                            <Typography className="font-mulish m-0 text-center font-semibold text-2xl">
                              {data.courseDetails.name}
                            </Typography>
                            <Typography className="font-mulish m-0 text-center font-normal text-base">
                              Start Date:{' '}
                              {new Date(
                                data.courseDetails.startDate,
                              ).toLocaleDateString()}
                            </Typography>
                            <Typography className="font-mulish m-0 text-center font-normal text-base">
                              Duration: {data.courseDetails.duration} Month(s)
                            </Typography>
                            {/* <Typography className="font-mulish max-w-[50%] text-center font-normal text-base">
                              Description: {data.courseDetails.description}
                            </Typography> */}
                            <Typography className="font-mulish m-0 text-center font-normal text-base">
                              Platform: Zoom
                            </Typography>
                          </div>
                          <div className="gap-2 px-5 py-5 xl:py-10 flex justify-between flex-col">
                            <Typography className="font-mulish m-0 text-center font-normal text-xl">
                              Total Fees: INR {data.paymentDetails.courseAmount}
                              /-
                            </Typography>
                            <Typography className="font-mulish m-0 text-center font-normal text-xl">
                              Registration Paid: INR{' '}
                              {data.paymentDetails.registrationAmount}/-
                            </Typography>
                            <Typography className="font-mulish m-0 text-center font-normal text-xl">
                              Discount: INR {data.paymentDetails.discountCost}/-
                            </Typography>
                            <Typography className="font-mulish m-0 text-center font-normal text-xl">
                              Payment Status:{' '}
                              {data.paymentDetails.paymentStatus}
                            </Typography>
                          </div>
                        </div>
                        <div className="table-auto mt-5 text-center overflow-x-auto w-full text-base font-mulish">
                          <table className="w-full">
                            <thead className="text-white">
                              <tr className="border-gray-200">
                                <th className="md:p-3 p-2 rounded-l-xl bg-[#AF8C3E] font-mulish font-medium">
                                  Meeting ID
                                </th>
                                <th className="md:p-3 p-2 bg-[#AF8C3E] font-mulish font-medium">
                                  Join Link
                                </th>
                                <th className="md:p-3 p-2 rounded-r-xl bg-[#AF8C3E] font-mulish font-medium">
                                  Password
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-gray-200">
                                <td className="p-2 md:p-3">
                                  {data.zoomMeetingDetails.meetingId}
                                </td>
                                <td className="p-2 text-blue-500 md:p-3">
                                  {data?.zoomMeetingDetails?.joinUrl ? (
                                    <a
                                      href={data.zoomMeetingDetails.joinUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="hover:text-blue-700"
                                    >
                                      {
                                        new URL(data.zoomMeetingDetails.joinUrl)
                                          .origin
                                      }
                                    </a>
                                  ) : (
                                    'No join link available'
                                  )}
                                </td>
                                <td className="p-2 md:p-3">
                                  {data.zoomMeetingDetails.password}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                    {activeTab === 'zoomvideotab' &&
                      meetingDetails &&
                      zoomCourse && (
                        <div className="p-5">
                          <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-mulish font-medium">
                              {zoomCourse.name}
                            </h2>
                            <IoArrowBackCircleOutline
                              className="cursor-pointer text-black"
                              size={40}
                              onClick={() => setActiveTab('coursemanagement')}
                            />
                          </div>
                          <hr className="my-4" />
                          <div className="overflow-x-auto overflow-y-auto max-h-[500px]">
                            <table className="table-auto w-full text-base font-mulish border-collapse">
                              <thead className="bg-[#AF8C3E] text-white">
                                <tr>
                                  <th className="p-3">Course Date</th>
                                  <th className="p-3">Day</th>
                                  <th className="p-3">Meeting ID</th>
                                  <th className="p-3">Course Time</th>
                                  <th className="p-3">Password</th>
                                  <th className="p-3">Join Link</th>
                                  <th className="p-3">Upload Video</th>
                                  <th className="p-3">View Video</th>
                                </tr>
                              </thead>
                              <tbody>
                                {classDates.map((dateItem, index) => (
                                  <tr
                                    key={index}
                                    className="border-b border-gray-200 text-center"
                                  >
                                    <td className="p-3">{dateItem.date}</td>
                                    <td className="p-3">{dateItem.dayName}</td>
                                    <td className="p-3">
                                      {meetingDetails.meeting.meetingId}
                                    </td>
                                    <td className="p-3">{`${zoomCourse.timeSlot.startTime} - ${zoomCourse.timeSlot.endTime}`}</td>
                                    <td className="p-3">
                                      {meetingDetails.meeting.password}
                                    </td>
                                    <td className="p-3">
                                      <Button
                                        size="small"
                                        className="bg-[#AF8C3E] font-mulish"
                                        onClick={() =>
                                          window.open(
                                            meetingDetails.meeting.joinUrl,
                                            '_blank',
                                          )
                                        }
                                      >
                                        Join
                                      </Button>
                                    </td>
                                    <td className="p-3">
                                      {uploadedVideos[dateItem.date] ? (
                                        <span className="text-green-600 font-bold">
                                          ✅ Successfully Uploaded
                                        </span>
                                      ) : (
                                        <>
                                          <input
                                            type="file"
                                            accept="video/*"
                                            onChange={handleVideoChange}
                                            className="mb-2 block"
                                          />
                                          <Button
                                            size="small"
                                            className="bg-[#AF8C3E] font-mulish"
                                            onClick={() =>
                                              handlevideoUpload(
                                                zoomCourse._id,
                                                dateItem.date,
                                                index,
                                              )
                                            }
                                            disabled={
                                              loadingStates[dateItem.date]
                                            }
                                          >
                                            {loadingStates[dateItem.date]
                                              ? 'Uploading...'
                                              : 'Upload'}
                                          </Button>

                                          {/* Show progress bar only if uploading */}
                                          {loadingStates[dateItem.date] && (
                                            <div className="flex flex-col items-center">
                                              <p className="text-sm text-gray-500 mt-1">
                                                Uploading...
                                              </p>
                                              <CircularWithValueLabel
                                                value={
                                                  uploadProgress[
                                                    dateItem.date
                                                  ] || 0
                                                }
                                              />
                                            </div>
                                          )}
                                        </>
                                      )}
                                    </td>

                                    <td className="p-3">
                                      <Button
                                        size="small"
                                        className="bg-[#AF8C3E] font-mulish"
                                        onClick={() =>
                                          fetchVideos(
                                            zoomCourse._id,
                                            dateItem.date,
                                          )
                                        }
                                      >
                                        View Video
                                      </Button>

                                      {videoUrls[dateItem.date] &&
                                        videoUrls[dateItem.date].length > 0 && (
                                          <>
                                            {videoUrls[dateItem.date].map(
                                              (videoUrl, i) => (
                                                <div key={i} className="mt-2">
                                                  <Button
                                                    size="small"
                                                    className="bg-[#AF8C3E] font-mulish"
                                                    onClick={() => {
                                                      const newWindow =
                                                        window.open(
                                                          '',
                                                          '_blank',
                                                        );
                                                      if (newWindow) {
                                                        newWindow.document
                                                          .write(`
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
                                                    }}
                                                  >
                                                    Play Video {i + 1}
                                                  </Button>
                                                </div>
                                              ),
                                            )}
                                          </>
                                        )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                    {activeTab === 'addcustomer' && (
                      <div>
                        <div className="flex justify-between items-center">
                          <h2 className="text-xl font-mulish font-medium">
                            Add Customer
                          </h2>
                          <IoArrowBackCircleOutline
                            className="cursor-pointer text-black"
                            size={40}
                            onClick={() => {
                              setActiveTab('customers');
                            }}
                          />
                        </div>
                        <hr className="my-5" />
                        <div className="flex flex-col justify-center">
                          <div className="flex flex-col w-[50%] justify-center gap-5">
                            <div>
                              <Input
                                name="name"
                                type="text"
                                label="Name"
                                // onChange={handleInputChange}
                              />
                            </div>
                            <div>
                              <Input
                                name="email"
                                type="email"
                                label="Email"
                                // onChange={handleInputChange}
                              />
                            </div>
                            <div>
                              <Input
                                name="password"
                                type="password"
                                label="Password"
                                // onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="flex justify-left mt-5">
                            <Button
                              // onClick={handleSubmit}
                              className="font-mulish bg-[#AF8C3E]"
                              size="md"
                            >
                              Add
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeTab === 'addCustomerEnrollment' && (
                      <div>
                        <div className="flex justify-between items-center">
                          <h2 className="text-xl font-mulish font-medium">
                            Enroll Course
                          </h2>
                          <IoArrowBackCircleOutline
                            className="cursor-pointer text-black"
                            size={40}
                            onClick={() => {
                              setActiveTab('enrollments');
                            }}
                          />
                        </div>
                        <hr className="my-5" />
                        <div className="flex flex-col justify-center">
                          <h1 className="block antialiased tracking-normal font-mulish text-lg font-medium leading-snug mb-5">
                            Add Course Information
                          </h1>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-5">
                            <div className="col-span-1">
                              <Input
                                name="name"
                                type="text"
                                label="Course's Name"
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-span-1">
                              <Dropdown4 onChange={handleInstructorChange} />
                            </div>
                            <div className="col-span-1">
                              <Input
                                name="duration"
                                type="number"
                                label="Course's Duration"
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-span-1">
                              <Dropdown5 onChange={handleDurationChange} />
                            </div>

                            <div className="col-span-1">
                              <Input
                                name="discountedFee"
                                type="number"
                                label="Discounted Fee"
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-span-1">
                              <Input
                                name="totalFee"
                                type="number"
                                label="Course's Total Fee"
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-span-1">
                              <Input
                                name="registrationAmount"
                                type="number"
                                label="Registration Amount"
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-span-1">
                              <Input
                                name="startDate"
                                type="date"
                                label="Start Date"
                                onChange={handleInputChange}
                                min={new Date().toISOString().split('T')[0]}
                              />
                            </div>
                            <div className="col-span-1">
                              <Input
                                name="introVideoLink"
                                type="text"
                                label="Introduction Video Link"
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                              <Input
                                name="description"
                                type="text"
                                label="Short Description"
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-span-1 flex justify-center items-center w-full gap-2 sm:col-span-2 lg:col-span-3">
                              <Typography className="font-mulish font-medium text-xl">
                                Choose Days
                              </Typography>
                            </div>
                            <div className="col-span-1 flex justify-evenly w-full gap-2 sm:col-span-2 lg:col-span-3">
                              {[
                                'Monday',
                                'Tuesday',
                                'Wednesday',
                                'Thursday',
                                'Friday',
                                'Saturday',
                                'Sunday',
                              ].map((day) => (
                                <div
                                  key={day}
                                  className="flex flex-col gap-1 justify-center"
                                >
                                  <label>{day}</label>
                                  <input
                                    type="checkbox"
                                    checked={formData.days.includes(day)}
                                    onChange={() => handleCheckboxChange(day)}
                                  />
                                </div>
                              ))}
                            </div>
                            <div className="col-span-1 flex justify-center items-center w-full gap-2 sm:col-span-2 lg:col-span-3">
                              <Typography className="font-mulish font-medium text-xl">
                                Choose Slot
                              </Typography>
                            </div>
                            <div className="col-span-1 flex justify-evenly items-center w-full gap-2 sm:col-span-2 lg:col-span-3">
                              <Input
                                type="time"
                                name="startTime"
                                onChange={handleTimeChange}
                                label="Start Time"
                              />
                              <Typography className="font-mulish font-normal text-sm">
                                To
                              </Typography>
                              <Input
                                type="time"
                                name="endTime"
                                onChange={handleTimeChange}
                                label="End Time"
                              />
                            </div>
                            <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                              <Typography className="font-mulish font-medium text-xl">
                                Course Type
                              </Typography>
                              <div className="flex justify-start gap-5 mt-2">
                                <div>
                                  <input
                                    type="radio"
                                    id="video"
                                    name="courseType"
                                    value="video"
                                    checked={formData.courseType === 'video'}
                                    onChange={handleCourseTypeChange}
                                  />
                                  <label htmlFor="video">Video Course</label>
                                </div>
                                <div>
                                  <input
                                    type="radio"
                                    id="live"
                                    name="courseType"
                                    value="live"
                                    checked={formData.courseType === 'live'}
                                    onChange={handleCourseTypeChange}
                                  />
                                  <label htmlFor="live">Live Course</label>
                                </div>
                              </div>
                            </div>
                            <div className="col-span-1 flex  items-center w-full  sm:col-span-2 lg:col-span-3">
                              <Typography className="font-mulish m-0 font-medium text-xl">
                                Select Thumbnail
                              </Typography>
                            </div>
                            <div className="col-span-1">
                              <Typography className="font-mulish font-semibold">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    setFormData({
                                      ...formData,
                                      thumbnail: e.target.files[0],
                                    });
                                  }}
                                />
                              </Typography>
                            </div>
                          </div>
                          <div className="flex justify-end mt-2">
                            <Button
                              // onClick={handleSubmit}
                              className="font-mulish bg-[#AF8C3E]"
                              size="lg"
                            >
                              Enroll
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAccount;
