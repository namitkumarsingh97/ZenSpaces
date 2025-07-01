'use client';
import { Button, Input, Textarea, Typography } from '@material-tailwind/react';
import React, { useState } from 'react';
import { FaClock } from 'react-icons/fa';
import { FaLocationPin } from 'react-icons/fa6';
import { GiCrystalBall, GiEnvelope, GiPhone } from 'react-icons/gi';
import { CiLocationOn, CiPhone } from 'react-icons/ci';
import { MdOutlineEmail } from 'react-icons/md';
import { PiEnvelopeThin } from 'react-icons/pi';
import { CiClock1 } from 'react-icons/ci';
import { notify } from '../app/assets/Toastify';

const ContactPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const sendMail = async (e) => {
    e.preventDefault(); // Prevent page reload
    // Check if all fields are filled
    if (!firstName || !lastName || !email || !message) {
      notify('Please fill all the fields', 'info');
      return;
    }

    // Prepare the payload
    const payload = {
      to: email,
      subject: `New message from ${firstName} ${lastName}`,
      text: message,
      phone: 'No phone provided', // You can include phone here if needed
      firstname: firstName,
      lastname: lastName,
    };

    try {
      const response = await fetch('/api/sendMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        notify('Your message has been sent successfully!', 'success');
        // Reset form
        setFirstName('');
        setLastName('');
        setEmail('');
        setMessage('');
      } else {
        notify('Failed to send message: ', 'error' + result.message);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      notify('An error occurred while sending your message.', 'error');
    }
  };

  return (
    <div>
      <div className='w-full bg-cover  flex items-center justify-center mt-[-40%] md:mt-[-20%] lg:mt-[-15%] xl:mt-[-11%] h-[37vh] xl:h-[50vh] bg-no-repeat bg-[url("/aboutbg.webp")]'>
        <Typography className="font-manrope xl:text-6xl text-4xl md:text-5xl xl:mt-40 mt-20">
          Contact Us
        </Typography>
      </div>
      <div className='bg-[url("/contactbggg.png")] w-full bg-cover bg-center'>
        <section className="2xl:py-20 py-10 w-full xl:max-w-[80%] max-w-[90%] mx-auto">
          <div className="flex flex-col lg:flex-row justify-center items-start">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full 2xl:w-[50%]">
              <div className="bg-black transition hover:border border-opacity-0 hover:border-opacity-50 border hover:shadow-none hover:scale-110 duration-500 shadow-md border-[white] rounded-md flex flex-col gap-1 md:gap-2 lg:gap-3">
                <div className="flex items-center justify-center 2xl:p-5 p-2 flex-col gap-5 2xl:gap-10">
                  <CiPhone className="text-[#AF8C3E]" size={60} />
                  <div className="flex flex-col gap-3 2xl:gap-5 text-center">
                    <Typography className="font-manrope 2xl:text-4xl text-2xl">
                      Phone
                    </Typography>
                    <Typography className="font-mulish 2xl:text-lg">
                      +91 9810800988
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="bg-black transition hover:border border-opacity-0 hover:border-opacity-50 border hover:shadow-none hover:scale-110 duration-500 shadow-md border-[white] rounded-md flex flex-col gap-1 md:gap-2 lg:gap-3">
                <div className="flex items-center justify-center 2xl:p-5 p-2 flex-col gap-5 2xl:gap-10">
                  <PiEnvelopeThin className="text-[#AF8C3E]" size={60} />
                  <div className="flex flex-col gap-3 2xl:gap-5 text-center">
                    <Typography className="font-manrope 2xl:text-4xl text-2xl">
                      Email
                    </Typography>
                    <Typography className="font-mulish 2xl:text-lg">
                      astrovasturaman@gmail.com
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="bg-black transition hover:border border-opacity-0 hover:border-opacity-50 border hover:shadow-none hover:scale-110 duration-500 shadow-md border-[white] rounded-md flex flex-col gap-1 md:gap-2 lg:gap-3">
                <div className="flex items-center justify-center 2xl:p-5 p-2 flex-col gap-5 2xl:gap-10">
                  <CiLocationOn className="text-[#AF8C3E]" size={60} />
                  <div className="flex flex-col gap-3 2xl:gap-5 text-center">
                    <Typography className="font-manrope 2xl:text-4xl text-2xl">
                      Address
                    </Typography>
                    <Typography className="font-mulish 2xl:text-lg text-center">
                      PANCHAVATI APARTMENT, Promise Apartment, Block F,
                      Vikaspuri, New Delhi, Delhi, 110075
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="bg-black transition hover:border border-opacity-0 hover:border-opacity-50 border hover:shadow-none hover:scale-110 duration-500 shadow-md border-[white] rounded-md flex flex-col gap-1 md:gap-2 lg:gap-3">
                <div className="flex items-center justify-center 2xl:p-5 p-2 flex-col gap-5 2xl:gap-10">
                  <CiClock1 className="text-[#AF8C3E]" size={60} />
                  <div className="flex flex-col gap-3 2xl:gap-5 text-center">
                    <Typography className="font-manrope 2xl:text-4xl text-2xl">
                      Timings
                    </Typography>
                    <Typography className="font-mulish 2xl:text-lg">
                      Mon-Sat 10:00AM to 08:00PM
                    </Typography>
                  </div>
                </div>
              </div>
            </div>

            <form
              onSubmit={sendMail}
              className="flex 2xl:w-[40%] w-full flex-col gap-4 mt-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Typography
                    variant="small"
                    className="mb-2 text-left font-mulish font-medium !text-white"
                  >
                    First Name
                  </Typography>
                  <Input
                    color="white"
                    size="lg"
                    placeholder="First Name"
                    name="first-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="focus:border-t-white"
                    containerProps={{ className: 'min-w-full' }}
                    labelProps={{ className: 'hidden' }}
                  />
                </div>
                <div>
                  <Typography
                    variant="small"
                    className="mb-2 text-left font-medium font-mulish !text-white"
                  >
                    Last Name
                  </Typography>
                  <Input
                    color="white"
                    size="lg"
                    placeholder="Last Name"
                    name="last-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="focus:border-t-white"
                    containerProps={{ className: '!min-w-full' }}
                    labelProps={{ className: 'hidden' }}
                  />
                </div>
              </div>
              <div>
                <Typography
                  variant="small"
                  className="mb-2 text-left font-medium font-mulish !text-white"
                >
                  Your Email
                </Typography>
                <Input
                  color="white"
                  size="lg"
                  placeholder="name@email.com"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="focus:border-t-white"
                  containerProps={{ className: '!min-w-full' }}
                  labelProps={{ className: 'hidden' }}
                />
              </div>
              <div>
                <Typography
                  variant="small"
                  className="mb-2 text-left font-medium font-mulish !text-white"
                >
                  Your Message
                </Typography>
                <Textarea
                  placeholder="Message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="focus:border-white text-white focus:border-t-white"
                  containerProps={{ className: '!min-w-full' }}
                  labelProps={{ className: 'hidden' }}
                />
              </div>
              <Button
                type="submit"
                className="w-full font-mulish"
                color="white"
              >
                Send message
              </Button>
            </form>
          </div>
        </section>
      </div>
      {/* Uncomment this iframe for Google Maps if needed */}
      {/* <iframe className="w-full h-[60vh]" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.5878195930563!2d77.06416777613751!3d28.64211308364433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1beab24db74d%3A0x1e149849ad4fec6c!2sZenSpaces!5e0!3m2!1sen!2sin!4v1721642963847!5m2!1sen!2sin" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
    </div>
  );
};

export default ContactPage;
