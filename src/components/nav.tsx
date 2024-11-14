"use client";
import React, { useState } from 'react';
import { ModeToggle } from './toggleMode';
import { Dancing_Script, Dosis } from 'next/font/google';
import Link from 'next/link';

const dance_font = Dancing_Script({ subsets: ['latin'] });
const dosis = Dosis({ subsets: ['latin'] });

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const items = [
        {
            name: "Home",
            link: "/"
        },
        {
            name: "About",
            link: "/about"
        },
        {
            name: "Blog",
            link: "/blog"
        },
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="flex justify-between sm:px-6 px-2 py-3 items-center border-b-2">
            <div className={`${dosis.className} text-[24px]`}>
                <span className={`${dance_font.className} bg-black text-white dark:bg-white dark:text-black px-5 py-2`}>Blog</span> Sphere
            </div>

            <div className="flex items-center sm:space-x-5 space-x-2">
                {items.map((item, i) => (
                    <li key={i} className="list-none hidden sm:flex">
                        <Link href={item.link}>
                            {item.name}
                        </Link>
                    </li>
                ))}

                <button
                    className="sm:hidden text-black dark:text-white focus:outline-none"
                    onClick={toggleMenu}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                        />
                    </svg>
                </button>
                <span><ModeToggle /></span>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="fixed top-0 left-0 h-full w-[65%] sm:w-[60%] bg-zinc-900 dark:bg-zinc-600 text-white shadow-lg transition-transform transform translate-x-0 z-50">
                    <div className="flex justify-between items-center p-4 pt-5 border-b border-gray-700">
                        <span className="text-lg font-bold">Menu</span>
                        <button onClick={toggleMenu} className="focus:outline-none text-white">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <ul className="p-4 space-y-4">
                        {items.map((item, i) => (
                            <li key={i} className="list-none">
                                <Link href={item.link}>
                                    <span className="block text-white hover:text-gray-400">{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {/* Overlay/Blur Effect */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"></div>
            )}
        </div>
    );
};

export default Navbar;
