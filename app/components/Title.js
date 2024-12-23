"use client";
import React from 'react';
import { useDarkMode } from '../hooks/useDarkMode';

const Title = ({ children }) => {

  const { isDarkMode } = useDarkMode();

  return (
    <h2 className="text-black font-bold text-center text-2xl underline">
      {children}
    </h2>
  )
}; export default Title;