"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MyAccount from "@/components/MyAccount";

const Page = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token =localStorage.getItem("enrollmentToken");
    if (token) {
      setIsAuthorized(true);
    } else {
      router.push("/login");
    }
  }, [router]);

  if (!isAuthorized) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <MyAccount />
    </div>
  );
};

export default Page;
