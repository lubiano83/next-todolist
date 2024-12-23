'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async() => {
    try {
      const response = await fetch("http://localhost:3000/api/users/logout", {
        cache: "no-store",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Logout successful:", data);
        router.push("/");
        router.refresh()
      } else {
        console.error("Failed to logout:", response.status);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div onClick={handleLogout} className='text-white flex justify-center items-center h-full hover:text-gray-500'>
     Salir
    </div>
  );
};

export default LogoutButton;