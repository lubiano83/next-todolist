"use client";
import React from 'react';

const MenuList = ({ show, handleShow, isDarkMode }) => {

  return (
    <div className={`${show ? "opacity-100 visible" : "opacity-0 invisible"} transition-all fixed inset-0 bg-black/50 flex justify-start z-20`}>
      <aside className={`${!show ? "translate-x-48" : ""} transition-all w-72 ${isDarkMode ? 'bg-white' : 'bg-black'}`}>
        
      </aside>
    </div>
  )
}; export default MenuList;