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
        className="text-[12px] sm:text-[20px]"
      >
        <FaFacebookF />
      </Link>
      <Link
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[12px] sm:text-[20px]"
      >
        <FaTwitter />
      </Link>
      <Link
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[12px] sm:text-[20px]"
      >
        <FaLinkedin />
      </Link>
      <Link
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[12px] sm:text-[20px]"
      >
        <FaWhatsapp />
      </Link>
    </div>
  );
};

export default ShareButton;
