import { FaWhatsapp, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';

 
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
      <a
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-500"
      >
        <FaWhatsapp size={30} />
      </a>
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700"
      >
        <FaLinkedin size={30} />
      </a>
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400"
      >
        <FaTwitter size={30} />
      </a>
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600"
      >
        <FaFacebook size={30} />
      </a>
    </div>
  );
};

export default ShareButtons;
