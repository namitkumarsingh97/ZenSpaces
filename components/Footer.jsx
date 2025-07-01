'use client';

import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { FaCalendar, FaEnvelope, FaMap, FaPhone } from 'react-icons/fa';
import { FaLocationPin } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

const LINKS = [
  {
    title: 'Products',
    items: [
      { name: 'Vaastu Products', href: '/products' },
      { name: 'Pooja Products', href: '/products' },
      { name: 'Astrology Products', href: '/products' },
    ],
  },
  {
    title: 'Company',
    items: [
      { name: 'About us', href: '/about' },
      { name: 'Readings', href: '/readings' },
      { name: 'Courses', href: '/courses' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Reports', href: '/reports' },
    ],
  },
  {
    title: 'Quick Links',
    items: [
      { name: 'Terms & Conditions', href: '/termsandconditions' },
      { name: 'Privacy Policy', href: '/privacypolicy' },
      { name: 'Return and Refund Policy', href: '/returnandrefundpolicy' },
    ],
  },
];

const currentYear = new Date().getFullYear();

export function Footer() {
  const router = useRouter();

  const handleNavigation = (href) => {
    router.push(href);
  };

  return (
    <footer className="relative bg-[url('/ff.jpg')] bg-cover bg-center bg-black xl:pb-10 xl:pt-24 pt-10 w-full">
      <div className="mx-auto w-full max-w-[90%] md:max-w-[80%]">
        <div className="grid grid-cols-12 justify-between">
          <div className="col-span-12 xl:col-span-0 xl:hidden justify-center flex mb-10 cursor-pointer">
            <Image
              src="/logo.webp"
              width={150}
              height={150}
              className="w-[140px] sm:w-[110px] md:w-[120px] lg:w-[130px] h-[140px] sm:h-[110px] md:h-[120px] lg:h-[130px] xl:w-[130px] xl:h-[130px]"
            />
          </div>
          <div className="grid xl:col-span-12 col-span-12 xl:grid-cols-4 md:grid-cols-3 grid-cols-2">
            {LINKS.map(({ title, items }) => (
              <ul key={title}>
                <Typography
                  variant="small"
                  color="white"
                  className="mb-3 font-mulish xl:text-start text-[#d5a948] drop-shadow-xl font-medium text-xl"
                >
                  {title}
                </Typography>
                <li>
                  {items.map(({ name, href }) => (
                    <Typography
                      as="button" // Change to button for navigation
                      onClick={() => handleNavigation(href)} // Use handleNavigation for routing
                      color="white"
                      key={name}
                      className="py-1.5 font-mulish text-lg text-start xl:text-start transition duration-300 hover:scale-105 hover:text-[#d5a948]"
                    >
                      {name}
                    </Typography>
                  ))}
                </li>
              </ul>
            ))}
            <ul className="col-span-2 xl:col-span-1">
              <Typography
                variant="small"
                color="white"
                className="mb-3 font-mulish xl:text-start text-[#d5a948] drop-shadow-xl font-medium text-xl"
              >
                Contact Us
              </Typography>
              <li className="flex xl:justify-start items-center gap-3">
                <FaPhone className="text-white" />
                <Typography
                  as="a"
                  href="tel:+919999999999"
                  color="white"
                  className="py-1.5 font-mulish text-lg transition duration-300 hover:scale-105 hover:text-[#d5a948]"
                >
                  +91 9810800988
                </Typography>
              </li>
              <li className="flex xl:justify-start items-center gap-3">
                <FaEnvelope className="text-white" />
                <Typography
                  as="a"
                  href="mailto:astrovasturaman@gmail.com"
                  color="white"
                  className="py-1.5 font-mulish text-lg transition duration-300 hover:scale-105 hover:text-[#d5a948]"
                >
                  astrovasturaman@gmail.com
                </Typography>
              </li>
              <li className="flex xl:justify-start items-center gap-3">
                <FaLocationPin size={40} className="text-white" />
                <Typography
                  as="button" // Change to button for navigation
                  onClick={() => handleNavigation('#')} // Use handleNavigation for routing
                  color="white"
                  className="py-1.5 font-mulish text-start text-lg transition duration-300 hover:scale-105 hover:text-[#d5a948]"
                >
                  PANCHAVATI APARTMENT, Promise Apartment, Block F, Vikaspuri,
                  New Delhi, Delhi, 110075
                </Typography>
              </li>
              <li className="flex xl:justify-start items-center gap-3">
                <FaCalendar className="text-white" />
                <Typography
                  as="button" // Change to button for navigation
                  onClick={() => handleNavigation('#')} // Use handleNavigation for routing
                  color="white"
                  className="py-1.5 text-start font-mulish text-lg transition duration-300 hover:scale-105 hover:text-[#d5a948]"
                >
                  Mon - Fri 10.00AM - 07.00PM
                </Typography>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex w-full items-center justify-between border-t border-blue-gray-50 py-4">
          <Typography
            variant="small"
            className="mb-4 xl:text-center font-mulish text-white md:mb-0"
          >
            &copy; {currentYear} <a href="/">ZenSpaces</a>. All Rights Reserved.
          </Typography>
          <div className="flex gap-4 text-white">
            <Typography
              as="button"
              onClick={() => handleNavigation('#')}
              className="opacity-80 transition duration-300 hover:text-[#d5a948] hover:scale-125 hover:opacity-100"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </Typography>
            <Typography
              as="button"
              onClick={() => handleNavigation('#')}
              className="opacity-80 transition duration-300 hover:text-[#d5a948] hover:scale-125 hover:opacity-100"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.99-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427C2.013 14.97 2 14.624 2 12v-.08c0-2.643.012-2.99.06-4.043.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 017.887 2.06C8.523 2.013 8.88 2 11.315 2zm0 2h-2.623c-1.432 0-2.068.079-2.743.267-.646.195-1.097.473-1.479.815-.421.372-.749.826-.944 1.285-.165.396-.263.797-.263 1.73v.075c0 2.61-.012 2.949-.06 4.049-.048 1.064-.218 1.791-.465 2.427-.195.646-.473 1.097-.815 1.479-.372.421-.826.749-1.285.944-.396.165-.797.263-1.73.263h-.075c-1.432 0-2.068-.079-2.743-.267-.646-.195-1.097-.473-1.479-.815-.421-.372-.749-.826-.944-1.285-.165-.396-.263-.797-.263-1.73v-.075c0-2.61.012-2.949.06-4.049.048-1.064.218-1.791.465-2.427.195-.646.473-1.097.815-1.479.372-.421.826-.749 1.285-.944.396-.165.797-.263 1.73-.263h.075c1.432 0 2.068.079 2.743.267.646.195 1.097.473 1.479.815.421.372.749.826.944 1.285.165.396.263.797.263 1.73v.075c0 2.61-.012 2.949-.06 4.049-.048 1.064-.218 1.791-.465 2.427-.195.646-.473 1.097-.815 1.479-.372.421-.826.749-1.285.944-.396.165-.797.263-1.73.263h-.075c-1.432 0-2.068-.079-2.743-.267-.646-.195-1.097-.473-1.479-.815-.421-.372-.749-.826-.944-1.285-.165-.396-.263-.797-.263-1.73v-.075c0-2.61.012-2.949.06-4.049.048-1.064.218-1.791.465-2.427.195-.646.473-1.097.815-1.479.372-.421.826-.749 1.285-.944.396-.165.797-.263 1.73-.263h.075c1.432 0 2.068.079 2.743.267.646.195 1.097.473 1.479.815.421.372.749.826.944 1.285.165.396.263.797.263 1.73v.075c0 2.61-.012 2.949-.06 4.049-.048 1.064-.218 1.791-.465 2.427-.195.646-.473 1.097-.815 1.479-.372.421-.826.749-1.285.944-.396.165-.797.263-1.73.263h-.075c-1.432 0-2.068-.079-2.743-.267-.646-.195-1.097-.473-1.479-.815-.421-.372-.749-.826-.944-1.285-.165-.396-.263-.797-.263-1.73v-.075c0-2.61.012-2.949.06-4.049.048-1.064.218-1.791.465-2.427.195-.646.473-1.097.815-1.479.372-.421.826-.749 1.285-.944.396-.165.797-.263 1.73-.263h.075c1.432 0 2.068.079 2.743.267.646.195 1.097.473 1.479.815.421.372.749.826.944 1.285.165.396.263.797.263 1.73v.075c0 2.61-.012 2.949-.06 4.049-.048 1.064-.218 1.791-.465 2.427-.195.646-.473 1.097-.815 1.479-.372.421-.826.749-1.285.944-.396.165-.797.263-1.73.263h-.075c-1.432 0-2.068-.079-2.743-.267-.646-.195-1.097-.473-1.479-.815-.421-.372-.749-.826-.944-1.285-.165-.396-.263-.797-.263-1.73v-.075c0-2.61.012-2.949.06-4.049.048-1.064.218-1.791.465-2.427.195-.646.473-1.097.815-1.479.372-.421.826-.749 1.285-.944.396-.165.797-.263 1.73-.263h.075c1.432 0 2.068.079 2.743.267.646.195 1.097.473 1.479.815.421.372.749.826.944 1.285.165.396.263.797.263 1.73v.075c0 2.61-.012 2.949-.06 4.049-.048 1.064-.218 1.791-.465 2.427-.195.646-.473 1.097-.815 1.479-.372.421-.826.749-1.285.944-.396.165-.797.263-1.73.263h-.075c-1.432 0-2.068-.079-2.743-.267-.646-.195-1.097-.473-1.479-.815-.421-.372-.749-.826-.944-1.285-.165-.396-.263-.797-.263-1.73v-.075c0-2.61.012-2.949.06-4.049.048-1.064.218-1.791.465-2.427.195-.646.473-1.097.815-1.479.372-.421.826-.749 1.285-.944.396-.165.797-.263 1.73-.263h.075c1.432 0 2.068.079 2.743.267.646.195 1.097.473 1.479.815.421.372.749.826.944 1.285.165.396.263.797.263 1.73v.075c0 2.61-.012 2.949-.06 4.049-.048 1.064-.218 1.791-.465 2.427-.195.646-.473 1.097-.815 1.479-.372.421-.826.749-1.285.944-.396.165-.797.263-1.73.263h-.075c-1.432 0-2.068-.079-2.743-.267-.646-.195-1.097-.473-1.479-.815-.421-.372-.749-.826-.944-1.285-.165-.396-.263-.797-.263-1.73v-.075c0-2.61.012-2.949.06-4.049.048-1.064.218-1.791.465-2.427.195-.646.473-1.097.815-1.479.372-.421.826-.749 1.285-.944.396-.165.797-.263 1.73-.263h.075c1.432 0 2.068.079 2.743.267.646.195 1.097.473 1.479.815.421.372.749.826.944 1.285.165.396.263.797.263 1.73v.075c0 2.61-.012 2.949-.06 4.049-.048 1.064-.218 1.791-.465 2.427-.195.646-.473 1.097-.815 1.479-.372.421-.826.749-1.285.944-.396.165-.797.263-1.73.263h-.075c-1.432 0-2.068-.079-2.743-.267-.646-.195-1.097-.473-1.479-.815-.421-.372-.749-.826-.944-1.285-.165-.396-.263-.797-.263-1.73v-.075c0-2.61.012-2.949.06-4.049.048-1.064.218-1.791.465-2.427.195-.646.473-1.097.815-1.479.372-.421.826-.749 1.285-.944.396-.165.797-.263 1.73-.263h.075c1.432 0 2.068.079 2.743.267.646.195 1.097.473 1.479.815.421.372.749.826.944 1.285.165.396.263.797.263 1.73v.075c0 2.61-.012 2.949-.06 4.049-.048 1.064-.218 1.791-.465 2.427-.195.646-.473 1.097-.815 1.479-.372.421-.826.749-1.285.944-.396.165-.797.263-1.73.263h-.075z"
                  clipRule="evenodd"
                />
              </svg>
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
