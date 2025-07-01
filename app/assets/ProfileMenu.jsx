'use client';

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
} from '@material-tailwind/react';
import { IoIosArrowDown } from 'react-icons/io';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function ProfileMenu() {
  const router = useRouter();

  const handleAvatarClick = () => {
    router.push('/myaccount');
  };

  return (
    <Menu>
      <MenuHandler>
        <div className="flex items-center p-1 border rounded-3xl cursor-pointer border-gray-600">
          <Avatar
            onClick={handleAvatarClick}
            variant="circular"
            alt="Binod"
            className=" w-8 h-8"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
        </div>
      </MenuHandler>
    </Menu>
  );
}
