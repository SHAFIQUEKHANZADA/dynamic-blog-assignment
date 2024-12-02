import Link from 'next/link';
import { FaWhatsapp, FaLinkedin, FaTwitter, FaFacebookF } from 'react-icons/fa';

 
function generateShareLinks(slug: string, title: string) {
  const postUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/business/${slug}`;
  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(title);

  return {
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };
}

interface ShareButtonsProps {
  slug: string;
  title: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ slug, title }) => {
  const shareLinks = generateShareLinks(slug, title);

  return (
    <div className="flex space-x-4 mt-8 border-t pt-4">
      <span className="text-lg font-semibold">Share this post:</span>
      <Link
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-black text-white p-2 rounded-full dark:bg-gray-100 dark:text-gray-800 hover:dark:bg-gray-700 hover:dark:text-gray-200 hover:bg-gray-200 hover:text-black transition-all duration-300"
      >
        <FaWhatsapp className="sm:text-[16px] text-[12px]" />
      </Link>
      <Link
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-black text-white p-2   rounded-full dark:bg-gray-100 dark:text-gray-800 hover:dark:bg-gray-700 hover:dark:text-gray-200 hover:bg-gray-200 hover:text-black transition-all duration-300"
      >
        <FaLinkedin className="sm:text-[16px] text-[12px]" />
      </Link>
      <Link
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-black text-white p-2   rounded-full dark:bg-gray-100 dark:text-gray-800 hover:dark:bg-gray-700 hover:dark:text-gray-200 hover:bg-gray-200 hover:text-black transition-all duration-300"
      >
        <FaTwitter className="sm:text-[16px] text-[12px]" />
      </Link>
      <Link
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-black text-white p-2   rounded-full hover:bg-gray-200 dark:bg-gray-100 dark:text-gray-800 hover:dark:bg-gray-700 hover:dark:text-gray-200 hover:text-black transition-all duration-300"
      >
        <FaFacebookF className="sm:text-[16px] text-[12px]" />
      </Link>
    </div>
  );
};

export default ShareButtons;
