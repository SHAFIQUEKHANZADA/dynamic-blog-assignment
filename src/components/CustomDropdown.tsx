"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import Link from "next/link";

const CustomDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isDropdownVisible = isOpen || isHovered;

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 text-[22px] cursor-pointer focus:outline-none"
      >
        Category{" "}
        <span className="transition-transform duration-300 text-[18px]">
          {isDropdownVisible ? <FaMinus /> : <FaPlus />}
        </span>
      </button>

      {(isDropdownVisible || isOpen) && (
        <div className="absolute left-0 sm:mt-2 w-64 sm:bg-white bg-transparent sm:dark:bg-neutral-800 sm:border border-none sm:border-gray-200 dark:border-neutral-700 sm:shadow-lg rounded-md p-4 z-50">
          <Link href={"/technology-and-innovation"}>
            <div className="text-[18px] py-2 sm:hover:bg-gray-100 sm:dark:hover:bg-neutral-700 rounded cursor-pointer">
              Technology and Innovation
            </div>
          </Link>
          <Link href={"/sports"}>
            <div className="text-[18px] py-2 sm:hover:bg-gray-100 sm:dark:hover:bg-neutral-700 rounded cursor-pointer">
              Sports
            </div>
          </Link>
          <Link href={"/business"}>
            <div className="text-[18px] py-2 sm:hover:bg-gray-100 sm:dark:hover:bg-neutral-700 rounded cursor-pointer">
              Business
            </div>
          </Link>
          <Link href={"/health-and-fitness"}>
            <div className="text-[18px] py-2 sm:hover:bg-gray-100 sm:dark:hover:bg-neutral-700 rounded cursor-pointer">
              Health & Fitness
            </div>
          </Link>
          <Link href={"/news-and-currentaffairs"}>
            <div className="text-[18px] py-2 sm:hover:bg-gray-100 sm:dark:hover:bg-neutral-700 rounded cursor-pointer">
              News and Current Affairs
            </div>
          </Link>
          <Link href={"/food-and-drink"}>
            <div className="text-[18px] py-2 sm:hover:bg-gray-100 sm:dark:hover:bg-neutral-700 rounded cursor-pointer">
              Food and Drink
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
