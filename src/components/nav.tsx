"use client";
import React, { useState } from 'react';
import { ModeToggle } from './toggleMode';
import { Bokor, Kings } from 'next/font/google';
import Link from 'next/link';
import { Heebo } from 'next/font/google';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IoIosArrowDown } from 'react-icons/io';
import ShareButton from './shareBtn';
import { FaSearch } from 'react-icons/fa';


 
const heebo = Heebo({ subsets: ['latin'] });
const king = Kings({ subsets: ['latin'], weight: ['400'] });
const bokor = Bokor({ subsets: ['latin'], weight: ['400'] })

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


        <div className='flex flex-col justify-center sm:items-center items-end relative sm:mb-4'>
            <div className="flex sm:items-start items-center justify-between w-full relative sm:px-5 px-2 sm:pb-14 sm:pt-8 pt-2">
                {/* ShareButton on the left */}
                <div className="flex items-center">
                <ShareButton title="Check out this amazing post!" />
                </div>

                {/* Modern Narrative in the center */}
                <div className={`${king.className} md:text-6xl text-3xl font-bold absolute left-1/2 transform -translate-x-1/2 text-center`}>
                The Modern Narrative
                </div>

                {/* FaSearch on the right */}
                <div className="flex items-center">
                    <FaSearch />
                </div>
            </div>

            <div className="flex justify-end sm:justify-between sm:px-4 px-2 items-center w-full sm:border-t sm:border-b border-gray-300">

                <span className='sm:hidden block'><ModeToggle /></span>

                <div className={`${bokor.className} sm:text-[20px] flex items-center  sm:space-x-10`}>
                    {items.map((item, i) => (
                        <li key={i} className="list-none hidden sm:flex">
                            <Link href={item.link}>
                                {item.name}
                            </Link>
                        </li>
                    ))}

                    <div className='sm:flex hidden'>
                        <DropdownMenu>
                            <DropdownMenuTrigger className='flex gap-2 items-center'>
                                Category <span><IoIosArrowDown /></span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className={`${bokor.className} p-4 mr-3 mt-[14px] rounded-sm`}>
                                <Link href={"/technology-and-innovation"}>
                                    <DropdownMenuItem className='text-[20px]'>Technology and Innovation</DropdownMenuItem>
                                </Link>
                                <Link href={"/sports"}>
                                    <DropdownMenuItem className='text-[20px]'>Sports</DropdownMenuItem>
                                </Link>
                                <Link href={"/business"}>
                                    <DropdownMenuItem className='text-[20px]'>Business</DropdownMenuItem>
                                </Link>
                                <Link href={"/health-and-fitness"}>
                                    <DropdownMenuItem className='text-[20px]'>Health & Fitness</DropdownMenuItem>
                                </Link>
                                <Link href={"/news-and-currentaffairs"}>
                                    <DropdownMenuItem className='text-[20px]'>News and Current Affairs</DropdownMenuItem>
                                </Link>
                                <Link href={"/food-and-drink"}>
                                    <DropdownMenuItem className='text-[20px]'>Food and Drink</DropdownMenuItem>
                                </Link>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

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
                </div>


                <span className='sm:block hidden'><ModeToggle /></span>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className={`${heebo.className} fixed top-0 left-0 h-full w-[65%] sm:w-[60%] bg-white dark:bg-neutral-950 dark:text-white text-black shadow-lg transition-transform transform translate-x-0 z-50`}>
                        <div className="flex justify-between items-center p-4 pt-5">
                            <span className={`${king.className} text-lg font-bold`}>The Modern Narrative</span>
                            <button onClick={toggleMenu} className="focus:outline-none dark:text-white text-black">
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
                        <ul className={`${bokor.className} p-4 space-y-4`}>
                            {items.map((item, i) => (
                                <li key={i} className="list-none">
                                    <Link href={item.link}>
                                        <span className="block dark:text-white text-black hover:text-gray-400">{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                            <div className={`${bokor.className} sm:hidden block`}>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className='flex gap-2 items-center'>Category   <span><IoIosArrowDown /></span></DropdownMenuTrigger>
                                    <DropdownMenuContent className={`${bokor.className} border-none shadow-none`}>
                                        <Link href={"/technology-and-innovation"}><DropdownMenuItem>Technology and Innovation</DropdownMenuItem></Link>
                                        <Link href={"/sports"}><DropdownMenuItem>Sports</DropdownMenuItem></Link>
                                        <Link href={"/business"}><DropdownMenuItem>Business</DropdownMenuItem></Link>
                                        <Link href={"/health-and-fitness"}><DropdownMenuItem>Health & Fitness</DropdownMenuItem></Link>
                                        <Link href={"/news-and-currentaffairs"}><DropdownMenuItem>News and Current Affairs</DropdownMenuItem></Link>
                                        <Link href={"/food-and-drink"}><DropdownMenuItem>Food and Drink</DropdownMenuItem></Link>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                        </ul>
                    </div>
                )}
                {/* Overlay/Blur Effect */}
                {isMenuOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"></div>
                )}
            </div>
        </div>

    );
};

export default Navbar;
