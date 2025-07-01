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
import { NotificationBell } from '../app/assets/NotificationBell';
import { ProfileMenu } from '../app/assets/ProfileMenu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function StickyNavbar1() {
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
    router.push('/adminlogin');
    setIsLoggedIn(false);
    router.refresh();
  };

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center xl:gap-6">
      {isLoggedIn ? (
        <></>
      ) : (
        <Link
          href="/login"
          onClick={() => setOpenNav(false)}
          className="flex items-center"
        >
          <Typography
            as="li"
            variant="small"
            color="white"
            className="py-2 px-3 font-mulish text-sm font-normal bg-[#70A9A1] transform transition duration-500 text-[#2C3E50]"
          >
            Login
          </Typography>
        </Link>
      )}
    </ul>
  );

  return (
    <div className="w-full">
      <div className="mx-auto shadow-none w-full max-w-[80%] bg-black z-999 sticky rounded-none border-none ">
        <Navbar className="mx-auto bg-black z-999 sticky max-w-none p-0 backdrop-saturate-0 shadow-none rounded-none border-none py-2">
          <div className="flex items-center justify-between text-white">
            <div className="cursor-pointer">
              <Link href="/adminaccount">
                <Image
                  src="/logo.webp"
                  width={150}
                  height={150}
                  className="w-[100px] sm:w-[110px] md:w-[120px] lg:w-[130px] xl:w-[120px] 2xl:w-[130px] h-auto"
                />
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="2xl:mr-[10vw] hidden lg:block">{navList}</div>

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
        </Navbar>
      </div>
    </div>
  );
}
