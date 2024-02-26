"use client";
import React, { useState, useEffect } from "react";
import moonImage from "./assets/moon.png";
import sunImage from "./assets/sun.png";
import Image from "next/image";

const Navbar = () => {
  const [darkTheme, setDarkTheme] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkTheme ? "dark" : "light"
    );
  }, [darkTheme]);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <nav className="text-3xl flex items-center p-3">
      <span
        onClick={() => (window.location.href = `/`)}
        className="cursor-pointer"
      >
        Library Store
      </span>
      <span onClick={toggleTheme}>
        <span className="flex cursor-pointer">
          <span className="text-xl font-semibold ">Theme</span>
          <Image
            className="inline pb-1"
            width={30}
            height={30}
            src={darkTheme ? sunImage : moonImage}
            alt={darkTheme ? "sunImage" : "moonImage"}
          />
        </span>
      </span>
    </nav>
  );
};

export default Navbar;
