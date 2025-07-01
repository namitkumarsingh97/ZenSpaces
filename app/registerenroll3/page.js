'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import RegisterEnroll3 from '@/components/RegisterEnroll3';

const page = () => {
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const courseData = localStorage.getItem('courseData');

    if (!courseData) {
      router.push('/courses');
    } else {
      setIsAllowed(true);
    }
  }, []);

  if (!isAllowed) return null;

  return <RegisterEnroll3 />;
};

export default page;
