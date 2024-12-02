"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaTwitter, FaLinkedin, FaWhatsapp, FaFacebookF } from "react-icons/fa";

function generateShareLinks(url: string, title: string) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return {
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };
}

interface ShareButtonProps {
  title: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ title }) => {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  if (!currentUrl) return null;

  const shareLinks = generateShareLinks(currentUrl, title);

  return (
    <div className="flex sm:flex-row flex-col sm:gap-4 gap-2">
      <Link
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-black text-white sm:p-2 p-1 rounded-full hover:bg-gray-200 dark:bg-gray-100 dark:text-gray-800 hover:dark:bg-gray-700 hover:dark:text-gray-200 hover:text-black transition-all duration-300"
      >
        <FaFacebookF className="sm:text-[16px] text-[10px]" />
      </Link>
      <Link
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-black text-white sm:p-2 p-1 rounded-full dark:bg-gray-100 dark:text-gray-800 hover:dark:bg-gray-700 hover:dark:text-gray-200 hover:bg-gray-200 hover:text-black transition-all duration-300"
      >
        <FaTwitter className="sm:text-[16px] text-[10px]" />
      </Link>
      <Link
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-black text-white sm:p-2 p-1 rounded-full dark:bg-gray-100 dark:text-gray-800 hover:dark:bg-gray-700 hover:dark:text-gray-200 hover:bg-gray-200 hover:text-black transition-all duration-300"
      >
        <FaLinkedin className="sm:text-[16px] text-[10px]" />
      </Link>
      <Link
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-black text-white sm:p-2 p-1 rounded-full dark:bg-gray-100 dark:text-gray-800 hover:dark:bg-gray-700 hover:dark:text-gray-200 hover:bg-gray-200 hover:text-black transition-all duration-300"
      >
        <FaWhatsapp className="sm:text-[16px] text-[10px]" />
      </Link>
    </div>

  );
};

export default ShareButton;
