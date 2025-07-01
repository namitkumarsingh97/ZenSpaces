import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { CiEdit } from 'react-icons/ci';
import { ProfileUpdatePopUp, ProfileUpdatePopUp1 } from './ProfileUpdatePopUp';
import axios from 'axios';
import { MdOutlineFileUpload } from 'react-icons/md';
import { FaFilePdf } from 'react-icons/fa6';
import { notify } from '../app/assets/Toastify';
import { BASE_URL } from '@/utils/apiClient';

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileImage, setProfileImage] = useState('/Picture29.png');
  const [fileToUpload, setFileToUpload] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('enrollmentToken');

      if (!token) {
        console.error('No token found. Please log in.');
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        setProfileImage(response.data.user.image);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user found.</div>;
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileToUpload(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadToDatabase = async () => {
    const token = localStorage.getItem('enrollmentToken');
    if (!token) {
      console.error('No token found. Please log in.');
      return;
    }

    if (!fileToUpload) {
      notify('No file selected', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('image', fileToUpload);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/profile/image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      alert('Image uploaded successfully!');

      // setProfileImage(response.data.image);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image.');
    }
  };

  return (
    <div className="grid grid-rows-12">
      <div className="row-span-1">
        <h2 className="text-xl font-jost font-medium">My Profile</h2>
        <hr className="my-5" />
        <div className="flex flex-col items-center">
          <Image
            className="aspect-square rounded-full object-cover object-center"
            src={profileImage || '/Picture29.png'}
            alt="User image"
            height={130}
            width={130}
          />
          <CiEdit
            size={'30px'}
            className="rounded-full text-white bg-black p-[2px] relative top-[-130px] left-[40px] cursor-pointer"
            onClick={() => document.getElementById('profileImageInput').click()}
          />
          <MdOutlineFileUpload
            size={'30px'}
            className="relative top-[-50px] left-[360px] cursor-pointer"
            onClick={uploadToDatabase}
          />
          <input
            id="profileImageInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-xl mt-2 font-jost font-medium">
            Personal Details
          </h2>
          <ProfileUpdatePopUp user={user} />
        </div>

        <hr className="my-4" />

        <div className="grid grid-cols-12 gap-5">
          <div className="flex lg:col-span-6 md:col-span-6 col-span-12 flex-col">
            <Typography className="font-jost mt-0 font-semibold">
              Full name:
            </Typography>
            <Typography className="font-jost border mt-0 rounded shadow-2xl p-1 text-base font-normal">
              {user.user.fullName}
            </Typography>
          </div>

          <div className="flex lg:col-span-6 md:col-span-6 col-span-12 flex-col"></div>
          <div className="flex lg:col-span-6 md:col-span-6 col-span-12 flex-col">
            <Typography className="font-jost mt-0 font-semibold">
              Phone:
            </Typography>
            <Typography className="font-jost mt-0 text-base border rounded shadow-2xl p-1 font-normal">
              {user.user.phone ? user.user.phone : 'No phone number added'}
            </Typography>
          </div>
        </div>

        <div className="flex mt-10 justify-between">
          <h2 className="text-xl mt-2 font-jost font-medium">Login Details</h2>
        </div>

        <hr className="my-4" />
        <div className="grid grid-cols-12 gap-5">
          <div className="flex lg:col-span-6 md:col-span-6 col-span-12 flex-col">
            <Typography className="font-jost font-semibold">Email:</Typography>
            <Typography className="font-jost border rounded shadow-2xl p-1 text-base font-normal">
              {user.user.email}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
