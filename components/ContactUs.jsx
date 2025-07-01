"use client";
import React, { useState } from "react";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { notify } from "../app/assets/Toastify";

export function ContactUs() {
  // State variables to capture form data
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Function to send email via API
  const sendMail = async (e) => {
    e.preventDefault(); // Prevent page reload
    // Check if all fields are filled
    if (!firstName || !lastName || !email || !message) {
      notify('Please fill all the fields',"info");
      return;
    }

    // Prepare the payload
    const payload = {
      to: email,
      subject: `New message from ${firstName} ${lastName}`,
      text: message,
      phone: 'No phone provided',  // You can include phone here if needed
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
        notify('Your message has been sent successfully!',"success");
        // Reset form
        setFirstName('');
        setLastName('');
        setEmail('');
        setMessage('');
      } else {
        notify('Failed to send message: ',"error" + result.message);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      notify('An error occurred while sending your message.',"error");
    }
  };

  return (
    <div className="w-full bg-contain bg-[url('/contactbg2.jpg')]">
    <section className="2xl:py-20 py-10 w-full 2xl:max-w-[80%] max-w-[90%] mx-auto">
      <div className="text-center mx-auto">
        <Typography
          color="white"
          className="mb-4 font-ibarra italic text-lg md:text-xl lg:text-2xl"
        >
          Customer Care
        </Typography>
        <Typography
          variant="h1"
          color="white"
          className="mb-4 font-ibarra text-4xl md:text-5xl lg:text-6xl"
        >
          We&apos;re Here to Help
        </Typography>
        <Typography className="mb-10 font-ibarra italic !text-base lg:mb-20 mx-auto max-w-3xl text-white">
          Whether it&apos;s a question about our services, a request for technical assistance, or suggestions for improvement, our team is eager to hear from you.
        </Typography>
        <div className="flex flex-col lg:flex-row gap-10 justify-center">
          <iframe className="rounded-2xl 2xl:w-[50%] 2xl:h-auto w-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.5878195930504!2d77.06416777601677!3d28.6421130836445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1beab24db74d%3A0x1e149849ad4fec6c!2sAstropathways!5e0!3m2!1sen!2sin!4v1734423596771!5m2!1sen!2sin"></iframe>
          <form
            onSubmit={sendMail}  // Submit handler
            className="flex 2xl:w-[40%] w-full flex-col gap-4 mx-auto" // Add mx-auto for centering
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Typography
                  variant="small"
                  className="mb-2 text-left font-jost font-medium !text-white"
                >
                  First Name
                </Typography>
                <Input
                  color="white"
                  size="lg"
                  placeholder="First Name"
                  name="first-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}  // Set state on change
                  className="focus:border-t-white"
                  containerProps={{
                    className: "min-w-full",
                  }}
                  labelProps={{
                    className: "hidden",
                  }}
                />
              </div>
              <div>
                <Typography
                  variant="small"
                  className="mb-2 text-left font-medium font-jost !text-white"
                >
                  Last Name
                </Typography>
                <Input
                  color="white"
                  size="lg"
                  placeholder="Last Name"
                  name="last-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}  // Set state on change
                  className="focus:border-t-white"
                  containerProps={{
                    className: "!min-w-full",
                  }}
                  labelProps={{
                    className: "hidden",
                  }}
                />
              </div>
            </div>
            <div>
              <Typography
                variant="small"
                className="mb-2 text-left font-medium font-jost !text-white"
              >
                Your Email
              </Typography>
              <Input
                color="white"
                size="lg"
                placeholder="name@email.com"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}  // Set state on change
                className="focus:border-t-white"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <div>
              <Typography
                variant="small"
                className="mb-2 text-left font-medium font-jost !text-white"
              >
                Your Message
              </Typography>
              <Textarea
                placeholder="Message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}  // Set state on change
                className="focus:border-white text-white focus:border-t-white focus:cursor-"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <Button type="submit" className="w-full font-jost" color="white">
              Send message
            </Button>
          </form>
        </div>
      </div>
    </section>
  </div>
  );
}

export default ContactUs;
