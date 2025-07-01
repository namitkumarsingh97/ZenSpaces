'use client';

import { StickyNavbar } from '@/components/Header';
import { StickyNavbar1 } from '@/components/HeaderAdmin';
import { usePathname } from 'next/navigation';

export default function NavbarWrapper() {
  const pathname = usePathname();
  const isAdminAccount = pathname === '/adminaccount';

  return isAdminAccount ? <StickyNavbar1 /> : <StickyNavbar />;
}
