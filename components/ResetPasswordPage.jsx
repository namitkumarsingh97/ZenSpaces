'use client'; // Ensure this component runs on the client side

import { Button, Input, Typography } from '@material-tailwind/react';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BASE_URL } from '@/utils/apiClient';

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();
  const [token, setToken] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const tokenFromUrl = new URLSearchParams(window.location.search).get(
        'token',
      );
      if (tokenFromUrl) {
        setToken(tokenFromUrl);
      } else {
        setError('Invalid or missing token.');
      }
    }
  }, []);

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/resetPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        setError('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => router.push('/login'), 3000);
      } else {
        console.error('Error:', data);
        setError(data.message || 'An error occurred. Please try again.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <Typography className="text-2xl font-bold mb-6 text-center text-gray-800">
          Reset Password
        </Typography>
        <div className="mb-4">
          <Typography className="mb-1 text-gray-700">New Password</Typography>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <Typography className="mb-1 text-gray-700">
            Confirm Password
          </Typography>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <Button
          onClick={handleResetPassword}
          variant="filled"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-200"
        >
          Reset Password
        </Button>
        {error && (
          <Typography className="text-red-500 mt-2 text-center">
            {error}
          </Typography>
        )}
        {successMessage && (
          <Typography className="text-green-500 mt-2 text-center">
            {successMessage}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
