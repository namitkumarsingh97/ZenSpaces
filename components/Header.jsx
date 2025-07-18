'use client';
import React, { useEffect, useState } from 'react';
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from '@material-tailwind/react';
import Image from 'next/image';
import { FaShoppingCart } from 'react-icons/fa';
import { RiAdminFill } from 'react-icons/ri';
import { NotificationBell } from '../app/assets/NotificationBell';
import { ProfileMenu } from '../app/assets/ProfileMenu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function StickyNavbar() {
  const [openNav, setOpenNav] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('enrollmentToken');
    setIsLoggedIn(!!token);

    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogin = () => {
    localStorage.setItem('enrollmentToken', 'your-token-value');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('enrollmentToken');
    localStorage.removeItem('courseData');
    router.push('/login');
    setIsLoggedIn(false);
    router.refresh();
  };

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center xl:gap-6">
      <Link
        href="/"
        onClick={() => setOpenNav(false)}
        className="flex items-center"
      >
        <Typography
          as="li"
          variant="small"
          // color="white"
          className="py-2 px-3 font-mulish text-lg font-normal rounded text-[#2C3E50]"
        >
          HOME
        </Typography>
      </Link>
      <Link
        href="/about"
        onClick={() => setOpenNav(false)}
        className="flex items-center"
      >
        <Typography
          as="li"
          variant="small"
          // color="white"
          className="py-2 px-3 font-mulish text-lg font-normal rounded text-[#2C3E50]"
        >
          ABOUT
        </Typography>
      </Link>
      <Link
        href="/courses"
        onClick={() => setOpenNav(false)}
        className="flex items-center"
      >
        <Typography
          as="li"
          variant="small"
          // color="white"
          className="py-2 px-3 font-mulish text-lg font-normal rounded text-[#2C3E50]"
        >
          COURSES
        </Typography>
      </Link>
      <Link
        href="/readings"
        onClick={() => setOpenNav(false)}
        className="flex items-center"
      >
        <Typography
          as="li"
          variant="small"
          // color="white"
          className="py-2 px-3 font-mulish text-lg font-normal rounded text-[#2C3E50]"
        >
          READINGS
        </Typography>
      </Link>
      <Link
        href="/reports"
        onClick={() => setOpenNav(false)}
        className="flex items-center"
      >
        <Typography
          as="li"
          variant="small"
          // color="white"
          className="py-2 px-3 font-mulish text-lg font-normal rounded text-[#2C3E50]"
        >
          REPORTS
        </Typography>
      </Link>
      <Link
        href="/products"
        onClick={() => setOpenNav(false)}
        className="flex items-center"
      >
        <Typography
          as="li"
          variant="small"
          // color="white"
          className="py-2 px-3 font-mulish text-lg font-normal rounded text-[#2C3E50]"
        >
          PRODUCTS
        </Typography>
      </Link>
      <Link
        href="/contact"
        onClick={() => setOpenNav(false)}
        className="flex items-center"
      >
        <Typography
          as="li"
          variant="small"
          // color="white"
          className="py-2 px-3 font-mulish text-lg font-normal rounded transform text-[#2C3E50]"
        >
          CONTACT
        </Typography>
      </Link>
      {isLoggedIn ? (
        <>
          <Typography
            as="li"
            className="py-2 px-3 font-mulish text-lg cursor-pointer"
            onClick={handleLogout}
          >
            Sign Out
          </Typography>
        </>
      ) : (
        <>
          <Link
            href="/login"
            onClick={() => setOpenNav(false)}
            className="flex items-center"
          >
            <Typography
              as="li"
              variant="small"
              color="white"
              className="py-2 px-6 font-mulish text-sm bg-[#70A9A1] font-normal hover:scale-125 rounded transform transition duration-500 text-[#2C3E50]"
            >
              LOGIN
            </Typography>
          </Link>
        </>
      )}
    </ul>
  );

  return (
    <div className="w-full sticky top-0 bg-[#CCE3DE]">
      <div className="flex items-center justify-between text-[#2C3E50]">
        <div className="cursor-pointer">
          <Link href="/">
            <Image
              src="/logo.png"
              width={150}
              height={150}
              className="w-[100px] sm:w-[110px] md:w-[120px] lg:w-[130px] xl:w-[120px] 2xl:w-[130px] h-auto"
            />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="2xl:mr-[10vw] hidden lg:block">{navList}</div>
          <div className="flex items-center gap-x-2">
            {isLoggedIn && <ProfileMenu />}
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <MobileNav
        className="bg-black z-999 fixed p-2 left-0 shadow-2xl"
        open={openNav}
      >
        {navList}
      </MobileNav>
    </div>
  );
}
