"use client";
import React, { useState, useEffect } from 'react';
import { FaTwitter, FaLinkedin, FaWhatsapp, FaFacebookF } from 'react-icons/fa';

const ShareButton = ({ title, url }: any) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // This will ensure the component runs only on the client-side
        setIsClient(true);
    }, []);

    // Fallback if the component is not rendered on the client side
    if (!isClient) {
        return null;
    }

    const currentUrl = url || window.location.href;

    const shareOnFacebook = () => {
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
            '_blank',
            'width=600,height=400'
        );
    };

    const shareOnTwitter = () => {
        window.open(
            `https://twitter.com/intent/tweet?url=${currentUrl}&text=${title}`,
            '_blank',
            'width=600,height=400'
        );
    };

    const shareOnLinkedIn = () => {
        window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`,
            '_blank',
            'width=600,height=400'
        );
    };

    const shareOnWhatsapp = () => {
        window.open(
            `https://wa.me/?text=${title} ${currentUrl}`,
            '_blank',
            'width=600,height=400'
        );
    };

    return (
        <div className="flex sm:flex-row flex-col sm:gap-4 gap-2">
            <button onClick={shareOnFacebook} className="text-[12px] sm:text-[20px]">
                <FaFacebookF   />
            </button>
            <button onClick={shareOnTwitter} className="text-[12px] sm:text-[20px]">
                <FaTwitter   />
            </button>
            <button onClick={shareOnLinkedIn} className="text-[12px] sm:text-[20px]">
                <FaLinkedin   />
            </button>
            <button onClick={shareOnWhatsapp} className="text-[12px] sm:text-[20px]">
                <FaWhatsapp   />
            </button>
        </div>
    );
};

export default ShareButton;
