'use client';
import { Button, Input, Typography } from '@material-tailwind/react';
import React, { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { notify } from '../app/assets/Toastify';
import { BASE_URL } from '@/utils/apiClient';

const RegisterEnroll3 = () => {
  const [ifLogin, setIfLogin] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [courseData, setCourseData] = useState('');

  //   useEffect(() => {
  //     const userId = localStorage.getItem('userId');
  //     if (userId) {
  //       router.push('/courseenroll2');
  //     }
  //   }, []);

  useEffect(() => {
    const storedCourseData = localStorage.getItem('courseData');
    if (storedCourseData) {
      try {
        setCourseData(JSON.parse(storedCourseData));
      } catch (error) {
        console.error('Error parsing course data:', error);
      }
    }
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem('userId') || '';

    // if (!userId) {
    //   console.error('No userId found. Redirecting to login...');
    //   return;
    // }

    const fetchCustomerData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/customers/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch customer data');
        }
        const data = await response.json();
        setCustomerData(data);
        setFullName(data.name);
        setEmail(data.email);
        setPassword(data.password);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [router]);

  if (loading) {
    return <p>Loading customer data...</p>;
  }

  function handleClear() {
    setFullName('');
    setEmail('');
    setPassword('');
  }

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!email || !password) {
      setError('Both email and password are required to proceed.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please provide a valid email address.');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/user-auth`, {
        email,
        password,
      });

      const { token, role, userId, message } = response.data;
      console.log(response.data);

      localStorage.setItem('enrollmentToken', token);
      localStorage.setItem('userId', userId);

      const expirationTime = Date.now() + 2 * 60 * 60 * 1000; // 2 hours
      localStorage.setItem('tokenExpiration', expirationTime);

      setIsLoggedIn(true);
      setSuccessMessage(message);

      handleClear();

      setTimeout(() => {
        if (role === 'admin') {
          router.push('/adminaccount');
        } else {
          // const courseData = localStorage.getItem('courseData');
          // if (courseData) {
          router.push('/courseenroll2');
          // } else {
          //   router.push('/myaccount');
          // }
        }
      }, 1000);
    } catch (error) {
      handleClear();
      setError(
        error.response?.data?.message ||
          'Something went wrong. Please try again.',
      );
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!fullName || !email || !password) {
      setError('All fields are required to complete your registration.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please provide a valid email address.');
      return;
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        'Your password must be at least 8 characters long and include an uppercase letter, a number, and a special character.',
      );
      return;
    }

    try {
      // Sign up the user
      const signupResponse = await axios.post(`${BASE_URL}/api/signup`, {
        fullName,
        email,
        password,
      });

      // Automatically log in the user after successful signup
      const loginResponse = await axios.post(`${BASE_URL}/api/login`, {
        email,
        password,
      });

      const { token, role, userId } = loginResponse.data;

      // Store authentication details
      localStorage.setItem('enrollmentToken', token);
      localStorage.setItem('userId', userId);

      // Set token expiration time
      const expirationTime = Date.now() + 2 * 60 * 60 * 1000;
      localStorage.setItem('tokenExpiration', expirationTime);

      setIsLoggedIn(true);
      //   setSuccessMessage('Sign-up successful! Redirecting...');

      handleClear();

      // Redirect based on user role
      setTimeout(() => {
        if (role === 'admin') {
          router.push('/adminaccount');
        } else {
          const courseData = localStorage.getItem('courseData');
          if (courseData) {
            router.push('/courseenroll2');
          } else {
            router.push('/myaccount');
          }
        }
      }, 1000);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          'An error occurred during registration. Please try again.',
      );
      setSuccessMessage('');
    }
  };

  //   const handleLogin = (e) => {
  //     e.preventDefault();
  //     setError('');
  //     setSuccessMessage('');

  //   const userId = localStorage.getItem('userId');

  //   if (userId) {
  //     router.push('/courseenroll2');
  //   } else {
  //     router.push('/login');
  //   }
  //   };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!email || !password) {
      setError('Both email and password are required to proceed...');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please provide a valid email address.');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/login`, {
        email,
        password,
      });

      const { token, role, userId, message } = response.data;

      localStorage.setItem('enrollmentToken', token);
      localStorage.setItem('userId', userId);

      const expirationTime = Date.now() + 2 * 60 * 60 * 1000;
      localStorage.setItem('tokenExpiration', expirationTime);

      setIsLoggedIn(true);

      if (role === 'admin') {
        setSuccessMessage('Welcome, Admin! Redirecting to your dashboard...');
        router.push('/adminaccount');
      } else if (role === 'customer') {
        // setSuccessMessage('Welcome back! Redirecting to the homepage...');
        router.push('/courseenroll2');
      } else {
        throw new Error('Invalid role detected. Please contact support.');
      }

      //   window.location.reload();
    } catch (error) {
      handleClear();
      setError(
        error.response?.data?.message ||
          'Login failed. Please check your credentials and try again.',
      );
    }
  };

  const checkTokenExpiration = () => {
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    if (tokenExpiration && Date.now() > tokenExpiration) {
      localStorage.removeItem('enrollmentToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('tokenExpiration');
      setIsLoggedIn(false);
    }
  };

  //   useEffect(() => {
  //     checkTokenExpiration();
  //   }, []);

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/forgot-Password`, {
        email,
      });

      notify(
        response.data.message || 'Password reset link sent successfully!',
        'info',
      );

      handleClear();
    } catch (error) {
      notify(
        error.response?.data?.message ||
          'An error occurred while sending the reset link.',
        'error',
      );
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('enrollmentToken');
    setIsLoggedIn(false);
    setSuccessMessage('Successfully signed out!');
    router.push('/login');
    router.refresh();
  };

  return (
    // <form>
    //   <div className="relative mt-[-30%] bg-[url('/loginbg.jpg')] bg-cover bg-left xl:mt-[-23%] 2xl:mt-[-28%] flex items-center justify-center flex-col h-[100vh] xl:h-[150vh] overflow-hidden">
    //     <div className="w-full flex flex-col md:flex-row lg:max-w-[60%] xl:mt-[20%] md:mt-[35%] max-w-[80%] mt-[6%] h-auto flex items-center justify-center">
    //       {/* <div className="h-full hidden lg:flex w-full md:w-[50%] flex-col rounded-s-xl p-5 justify-between border-8 border-white"> */}
    //         {/* <Typography className="font-mulish mb-0 font-lg italic">
    //           Discover Your Path Through Astrology
    //         </Typography> */}
    //         {/* <div className="flex flex-col gap-1"> */}
    //           {/* <Typography className="font-manrope m-0 italic text-4xl md:text-6xl 2xl:text-6xl xl:text-3xl">
    //             Life
    //           </Typography>
    //           <Typography className="font-manrope m-0 italic text-4xl md:text-5xl xl:text-3xl 2xl:text-5xl">
    //             Among the Stars...
    //           </Typography>
    //           <Typography className="w-full m-0 md:w-[70%] font-mulish">
    //             Unlock the ancient wisdom of the cosmos.
    //           </Typography> */}
    //         {/* </div> */}
    //       {/* </div> */}

    //       {/* Main Content */}
    //       <div className=" w-full flex items-center p-10 lg:rounded-xl h-auto justify-center lg:w-[50%] bg-white">
    //         <div className="flex flex-col h-full w-full items-center justify-between">
    //           <Typography className="font-manrope text-center m-0 text-black text-2xl xl:text-3xl 2xl:text-4xl pb-5">
    //             ZenSpaces - {courseData?.courseTitle || ''}
    //           </Typography>
    //           {ifLogin ? (
    //             <>
    //               <div className="flex flex-col gap-3 justify-center items-center">
    //                 <div className="flex flex-col w-full lg:w-[20vw] gap-2">
    //                   {/* <Typography className="font-manrope text-center m-0 text-black text-3xl xl:text-4xl 2xl:text-5xl">
    //                     Welcome Back
    //                   </Typography> */}
    //                   {/* <Typography className="font-mulish text-center text-black text-base">
    //                     Enter your email and password to access your account
    //                   </Typography> */}
    //                 </div>
    //                 <div className="w-full">
    //                   <Input
    //                     color="black"
    //                     label="Email"
    //                     type="email"
    //                     value={email}
    //                     onChange={(e) => setEmail(e.target.value)}
    //                   />
    //                 </div>
    //                 <div className="w-full">
    //                   <Input
    //                     color="black"
    //                     label="Password"
    //                     type="password"
    //                     value={password}
    //                     onChange={(e) => setPassword(e.target.value)}
    //                   />
    //                 </div>
    //                 {/* <Button
    //                   variant="filled"
    //                   className="w-full font-mulish"
    //                   type="submit"
    //                   onClick={handleLogin}
    //                 >
    //                   Sign In
    //                 </Button> */}
    //               </div>
    //               <div className="flex flex-between gap-1 items-center">
    //                 <Typography className="font-mulish text-black text-lg">
    //                   Don&apos;t have an account?
    //                 </Typography>
    //                 <Typography
    //                   className="font-mulish cursor-pointer text-black font-bold text-base"
    //                   onClick={() => {
    //                     setIfLogin(false);
    //                     setError('');
    //                     setSuccessMessage('');
    //                   }}
    //                 >
    //                   Sign Up
    //                 </Typography>
    //               </div>

    //               <div className="flex flex-col gap-3 justify-center items-center">
    //                 <div className="flex flex-col w-full lg:w-[20vw] gap-2">
    //                 </div>
    //                 <div className="w-full">
    //                   <Input
    //                     color="black"
    //                     label="Course Name"
    //                     type="courseName"
    //                     value={courseData?.courseTitle || ''}
    //                     readOnly
    //                   />
    //                 </div>
    //                 <div className="w-full">
    //                   <Input
    //                     color="black"
    //                     label="Course Duration"
    //                     type="courseDuration"
    //                     value={courseData?.duration || ''}
    //                     readOnly
    //                   />
    //                 </div>
    //                 <div className="w-full">
    //                   <Input
    //                     color="black"
    //                     label="Amount"
    //                     type="amount"
    //                     value={courseData?.registrationAmount || ''}
    //                     readOnly
    //                   />
    //                 </div>
    //                 <Button
    //                   variant="filled"
    //                   className="w-full font-mulish"
    //                   type="submit"
    //                   onClick={handleLogin}
    //                 >
    //                   Checkout with Razorpay
    //                 </Button>
    //               </div>
    //             </>
    //           ) : (
    //             <>
    //               <div className="flex flex-col gap-3 justify-center items-center">
    //                 <div className="flex flex-col w-full md:w-[20vw] gap-2">
    //                   {/* <Typography className="font-manrope text-center m-0 text-black text-3xl xl:text-4xl 2xl:text-5xl">
    //                     Welcome
    //                   </Typography> */}
    //                   {/* <Typography className="font-mulish text-center text-black text-base">
    //                     Enter the following details to register your account
    //                   </Typography> */}
    //                 </div>
    //                 <div className="w-full">
    //                   <Input
    //                     color="black"
    //                     label="Name"
    //                     value={fullName}
    //                     onChange={(e) => setFullName(e.target.value)}
    //                   />
    //                 </div>
    //                 <div className="w-full">
    //                   <Input
    //                     color="black"
    //                     label="Email"
    //                     type="email"
    //                     value={email}
    //                     onChange={(e) => setEmail(e.target.value)}
    //                   />
    //                 </div>
    //                 <div className="w-full">
    //                   <Input
    //                     color="black"
    //                     label="Password"
    //                     type="password"
    //                     value={password}
    //                     onChange={(e) => setPassword(e.target.value)}
    //                   />
    //                 </div>
    //                 {/* <Button
    //                   variant="filled"
    //                   className="w-full font-mulish"
    //                   onClick={handleSignup}
    //                   type="submit"
    //                 >
    //                   Create Account
    //                 </Button> */}
    //               </div>
    //               <div className="flex flex-between gap-1 items-center">
    //                 <Typography className="font-mulish text-black text-lg">
    //                   Already have an account?
    //                 </Typography>
    //                 <Typography
    //                   className="font-mulish cursor-pointer text-black font-bold text-base"
    //                   onClick={() => {
    //                     setIfLogin(true);
    //                     setError('');
    //                     setSuccessMessage('');
    //                   }}
    //                 >
    //                   Sign In
    //                 </Typography>
    //               </div>
    //               <div className="flex flex-col gap-3 justify-center items-center">
    //                 <div className="flex flex-col w-full lg:w-[20vw] gap-2">
    //                 </div>
    //                 <div className="w-full">
    //                   <Input
    //                     color="black"
    //                     label="Course Name"
    //                     type="courseName"
    //                     value={courseData?.courseTitle || ''}
    //                     readOnly
    //                   />
    //                 </div>
    //                 <div className="w-full">
    //                   <Input
    //                     color="black"
    //                     label="Course Duration"
    //                     type="courseDuration"
    //                     value={courseData?.duration || ''}
    //                     readOnly
    //                   />
    //                 </div>
    //                 <div className="w-full">
    //                   <Input
    //                     color="black"
    //                     label="Amount"
    //                     type="amount"
    //                     value={courseData?.registrationAmount || ''}
    //                     readOnly
    //                   />
    //                 </div>
    //                 <Button
    //                   variant="filled"
    //                   className="w-full font-mulish"
    //                   type="submit"
    //                   onClick={handleSignup}
    //                 >
    //                   Checkout with Razorpay
    //                 </Button>
    //               </div>
    //             </>
    //           )}
    //           {error && (
    //             <Typography className="text-red-500">{error}</Typography>
    //           )}
    //           {successMessage && (
    //             <Typography className="text-green-500">
    //               {successMessage}
    //             </Typography>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //     {showForgotPassword && (
    //       <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
    //         <div className="bg-white p-6 rounded-lg shadow-lg w-80">
    //           <Typography className="text-black font-mulish text-lg mb-4">
    //             Reset Password
    //           </Typography>
    //           <Input
    //             color="black"
    //             label="Enter your email"
    //             value={email}
    //             type="email"
    //             onChange={(e) => setEmail(e.target.value)}
    //           />
    //           <Button
    //             variant="filled"
    //             className="w-full font-mulish mt-4"
    //             onClick={handleForgotPassword}
    //           >
    //             Send Reset Link
    //           </Button>
    //           <Button
    //             variant="text"
    //             className="font-mulish text-black text-lg mt-2"
    //             onClick={() => setShowForgotPassword(false)}
    //           >
    //             Close
    //           </Button>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </form>
    <form>
      <div className="relative bg-white bg-[url('/bgenroll.jpg')] bg-cover bg-center flex items-center justify-center min-h-screen overflow-hidden">
        <div className="w-full max-w-2xl mx-auto p-6 transform -translate-y-16">
          <div className="bg-white rounded-xl shadow-2xl p-8">
            <Typography className="font-manrope text-center text-3xl text-gray-800 mb-6">
              ZenSpaces - {courseData?.courseTitle || ''}
            </Typography>

            {/* {ifLogin ? ( */}
            <>
              <div className="space-y-6">
                <div className="space-y-4">
                  <Input
                    color="gray"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                  />
                  <Input
                    color="gray"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>

              {/* <div className="mt-4 text-center">
                <Typography className="font-mulish text-gray-600">
                  Don&apos;t have an account?{' '}
                  <span
                    className="text-black font-semibold cursor-pointer"
                    onClick={() => {
                      setIfLogin(false);
                      setError('');
                      setSuccessMessage('');
                    }}
                  >
                    Sign Up
                  </span>
                </Typography>
              </div> */}
            </>
            {/* // : (
            // <>
            //   <div className="space-y-6">
            //     <div className="space-y-4">
            //       <Input */}
            {/* //         color="gray"
            //         label="Name"
            //         value={fullName}
            //         onChange={(e) => setFullName(e.target.value)}
            //         className="w-full"
            //       />
            //       <Input */}
            {/* //         color="gray"
            //         label="Email"
            //         type="email"
            //         value={email}
            //         onChange={(e) => setEmail(e.target.value)}
            //         className="w-full"
            //       />
            //       <Input */}
            {/* //         color="gray"
            //         label="Password"
            //         type="password"
            //         value={password}
            //         onChange={(e) => setPassword(e.target.value)}
            //         className="w-full"
            //       />
            //     </div>
            //   </div>
  
            //   <div className="mt-4 text-center"> */}
            {/* //     <Typography className="font-mulish text-gray-600">
            //       Already have an account?{' '}
            //       <span */}
            {/* //         className="text-black font-semibold cursor-pointer"
            //         onClick={() => { */}
            {/* //           setIfLogin(true);
            //           setError('');
            //           setSuccessMessage('');
            //         }}
            //       >
            //         Sign In
            //       </span>
            //     </Typography>
            //   </div>
            // </> */}
            {/* // ) */}

            {/* Course Details Section */}
            <div className="mt-8 space-y-4">
              <Typography className="font-manrope text-center text-2xl text-gray-800">
                Course Details
              </Typography>
              <Input
                color="gray"
                label="Course Name"
                value={courseData?.courseTitle || ''}
                readOnly
                className="w-full"
              />
              <Input
                color="gray"
                label="Course Duration"
                value={courseData?.duration || ''}
                readOnly
                className="w-full"
              />
              <Input
                color="gray"
                label="Amount"
                value={courseData?.registrationAmount || ''}
                readOnly
                className="w-full"
              />
              <Button
                variant="filled"
                style={{ backgroundColor: 'rgb(213, 169, 72)', color: 'white' }}
                className="w-full font-mulish py-2 rounded-lg hover:bg-opacity-90 transition-all"
                // onClick={ifLogin ? handleLogin : handleSignup}
                onClick={handleAuth}
              >
                Checkout with Razorpay
              </Button>
            </div>

            {/* Error and Success Messages */}
            {error && (
              <Typography className="text-red-500 text-center mt-4">
                {error}
              </Typography>
            )}
            {successMessage && (
              <Typography className="text-green-500 text-center mt-4">
                {successMessage}
              </Typography>
            )}
          </div>
        </div>

        {/* Forgot Password Modal */}
        {showForgotPassword && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <Typography className="font-manrope text-2xl text-gray-800 mb-4">
                Reset Password
              </Typography>
              <Input
                color="gray"
                label="Enter your email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-4"
              />
              <Button
                variant="filled"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-mulish py-2 rounded-lg"
                onClick={handleForgotPassword}
              >
                Send Reset Link
              </Button>
              <Button
                variant="text"
                className="w-full text-gray-600 font-mulish mt-2"
                onClick={() => setShowForgotPassword(false)}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default RegisterEnroll3;
