'use client';
import { Button, Input, Typography } from '@material-tailwind/react';
import React, { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { BASE_URL } from '@/utils/apiClient';

const AdminLogin = () => {
  const [ifLogin, setIfLogin] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('enrollmentToken');
    if (token) {
      setIsLoggedIn(true);
      router.replace('/adminaccount');
    }
  }, []);

  function handleClear() {
    setFullName('');
    setEmail('');
    setPassword('');
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password) {
      setError('Password cannot be empty');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/adminlogin`, {
        username: email,
        password,
      });

      localStorage.setItem('enrollmentToken', response.data.token);

      setIsLoggedIn(true);
      setSuccessMessage('Login successful!');
      handleClear();

      router.replace('/adminaccount');
      window.location.reload();
    } catch (error) {
      handleClear();
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/forgot-Password`, {
        email,
      });
      setSuccessMessage(response.data.message);
      setError('');
      handleClear();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          'An error occurred while sending the reset link.',
      );
      setSuccessMessage('');
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('enrollmentToken');
    setIsLoggedIn(false);
    setSuccessMessage('Successfully signed out!');
    router.push('/adminlogin');
    router.refresh();
  };

  return (
    <form>
      <div className="relative mt-[-30%] bg-[url('/loginbg.jpg')] bg-cover bg-left 2xl:mt-[-20%] flex items-center justify-center flex-col h-[100vh] lg:h-[150vh] overflow-hidden">
        <div className="w-full flex flex-col md:flex-row lg:max-w-[60%] max-w-[80%] xl:mt-[25%] 2xl:mt-[5%] h-auto">
          <div className="h-full hidden lg:flex w-full md:w-[50%] flex-col rounded-s-xl p-5 justify-between border-8 border-white">
            <Typography className="font-jost mb-0 font-lg italic">
              Discover Your Path Through Astrology
            </Typography>
            <div className="flex flex-col gap-1">
              <Typography className="font-ibarra m-0 italic text-4xl md:text-6xl 2xl:text-6xl xl:text-3xl">
                Life
              </Typography>
              <Typography className="font-ibarra m-0 italic text-4xl md:text-5xl xl:text-3xl 2xl:text-5xl">
                Among the Stars...
              </Typography>
              <Typography className="w-full m-0 md:w-[70%] font-jost">
                Unlock the ancient wisdom of the cosmos.
              </Typography>
            </div>
          </div>

          <div className="w-full flex items-center p-5 lg:rounded-e-xl h-auto justify-center lg:w-[50%] bg-white">
            <div className="flex flex-col h-full w-full items-center justify-between">
              <Typography className="font-jost text-black font-normal text-xl">
                Astropathways
              </Typography>

              <>
                <div className="flex flex-col gap-3 justify-center items-center">
                  <div className="flex flex-col w-full xl:w-[20vw] gap-2">
                    <Typography className="font-ibarra text-center m-0 text-black text-3xl xl:text-4xl 2xl:text-5xl">
                      Admin Login
                    </Typography>
                    <Typography className="font-jost text-center text-black text-base">
                      Enter your email and password to access your account
                    </Typography>
                  </div>
                  <div className="w-full">
                    <Input
                      color="black"
                      label="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="w-full">
                    <Input
                      color="black"
                      label="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button
                    variant="filled"
                    className="w-full font-jost"
                    type="submit"
                    onClick={handleLogin}
                  >
                    Log In
                  </Button>
                </div>
              </>

              {error && (
                <Typography className="text-red-500">{error}</Typography>
              )}
              {successMessage && (
                <Typography className="text-green-500">
                  {successMessage}
                </Typography>
              )}
            </div>
          </div>
        </div>

        {showForgotPassword && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <Typography className="text-black font-jost text-lg mb-4">
                Reset Password
              </Typography>
              <Input
                color="black"
                label="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                variant="filled"
                className="w-full font-jost mt-4"
                onClick={handleForgotPassword}
                type="submit"
              >
                Send Reset Link
              </Button>
              <Button
                variant="text"
                className="font-jost text-black text-lg mt-2"
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

export default AdminLogin;
