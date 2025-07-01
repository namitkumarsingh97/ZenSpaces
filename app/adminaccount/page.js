'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminAccount from '@/components/AdminAccount';

const Page = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token =localStorage.getItem('enrollmentToken');
    if (token) {
      setIsAuthorized(true);
    } else {
      router.push('/adminlogin');
    }
  }, [router]);

  if (!isAuthorized) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <AdminAccount />
    </div>
  );
};

export default Page;
