"use client";
import { useEffect, useState } from "react";

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme === "dark") {
        setIsDarkMode(true);
        document.documentElement.classList.add("dark");
      } else {
        setIsDarkMode(false);
        document.documentElement.classList.remove("dark");
      }
    } catch (error) {
      console.log("useEffect", error.message);
    }
  }, []);

  const toggleDarkMode = () => {
    try {
      setIsDarkMode((prev) => {
        const newMode = !prev;
        if (newMode) {
          document.documentElement.classList.add("dark");
          localStorage.setItem("theme", "dark");
        } else {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("theme", "light");
        }
        window.location.reload();
        return newMode;
      });
    } catch (error) {
      console.log("toggleDarkMode", error.message);
    }
  };

  return { isDarkMode, toggleDarkMode };
};