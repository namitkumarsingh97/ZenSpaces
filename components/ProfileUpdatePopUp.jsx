import React, { useState } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Input,
} from '@material-tailwind/react';
import axios from 'axios';
import { BASE_URL } from '@/utils/apiClient';

function ProfileUpdatePopUp({ user }) {
  const [open, setOpen] = React.useState(false);

  const [formData, setFormData] = useState({
    fullName: user.user.fullName || '',
    phone: user.user.phone || '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleOpen = () => setOpen(!open);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setMessage('');

      const response = await axios.put(
        `${BASE_URL}/api/profile/update`,
        {
          fullName: formData.fullName,
          phone: formData.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem(
              'enrollmentToken',
            )}`,
          },
        },
      );

      if (response.data.success) {
        setMessage('Profile updated successfully!');
        handleOpen();
      }
    } catch (error) {
      console.error('Update Error:', error);
      setMessage(
        error.response?.data?.message || 'An error occurred. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        className="font-mulish w-full rounded-lg border opacity-100 border-white transform transition duration-500 bg-[#AF8C3E] capitalize font-medium text-base max-w-[130px]"
      >
        Update
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="flex font-mulish justify-center border-b-2">
          Update Personal Details
        </DialogHeader>
        <DialogBody>
          <h1 className="block antialiased tracking-normal font-mulish font-semibold leading-snug text-blue-gray-900 pb-3">
            Personal Details
          </h1>
          <div className="grid grid-cols-12 w-full gap-5">
            <div className="md:col-span-6 col-span-12">
              <Input
                label="Enter Your Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </div>
            <div className="md:col-span-6 col-span-12">
              <Input
                label="Enter Your Mail ID"
                value={user.user.email}
                readOnly
              />
            </div>
            <div className="md:col-span-6 col-span-12">
              <Input
                label="Enter Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            variant="text"
            color="black"
            className="capitalize font-mulish"
            onClick={handleOpen}
          >
            Cancel
          </Button>
          <Button
            className="bg-[#AF8C3E] capitalize font-mulish"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Submit'}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

function ProfileUpdatePopUp1() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button
        onClick={handleOpen}
        className="font-mulish w-full rounded-lg border opacity-100 border-white transform transition duration-500 bg-[#AF8C3E] capitalize font-medium text-base max-w-[130px]"
      >
        Update
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="flex font-mulish justify-center border-b-2">
          Update Password
        </DialogHeader>
        <DialogBody>
          <h1 className="block antialiased tracking-normal font-mulish font-semibold leading-snug text-blue-gray-900 pb-3">
            Personal Details
          </h1>
          <div className="grid grid-cols-12 w-full gap-5">
            <div className="md:col-span-6 col-span-12">
              <Input label="Enter Your Phone Number" />
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            variant="text"
            color="black"
            className="capitalize font-mulish"
            onClick={handleOpen}
          >
            Cancel
          </Button>
          <Button
            className="bg-[#AF8C3E] capitalize font-mulish"
            onClick={handleOpen}
          >
            Submit
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export { ProfileUpdatePopUp, ProfileUpdatePopUp1 };
