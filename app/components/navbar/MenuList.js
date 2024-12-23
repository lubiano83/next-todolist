"use client";
import React from 'react';
import LogoutButton from '../users/logout/LogoutButton';
import Link from 'next/link';


const MenuList = ({ show, handleShow, isDarkMode, cookie }) => {

  return (
    <div className={`${show ? "opacity-100 visible" : "opacity-0 invisible"} transition-all fixed inset-0 bg-black/50 flex justify-start z-20`}>
      <aside className={`${!show ? "translate-x-48" : ""} transition-all w-72 bg-black text-xl text-white flex flex-col justify-evenly items-center p-8`}>
        { !cookie && <Link href={"/views/register"}> Register </Link> }
        { !cookie && <Link href={"/views/login"}> Login </Link> }
        { cookie && <LogoutButton /> }
      </aside>
    </div>
  )
}; export default MenuList;