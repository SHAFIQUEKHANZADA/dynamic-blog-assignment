import { Dancing_Script, Dosis, Heebo } from 'next/font/google';
import Link from 'next/link';
import { FaFacebookF, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';



const dosis = Dosis({ subsets: ['latin'] });
const heebo = Heebo({ subsets: ['latin'] });
const dance_font = Dancing_Script({ subsets: ['latin'] });
const Footer = () => {
    return (
        <div>
        <footer className="footer text-base-content flex md:flex-row flex-col sm:gap-0 gap-10 justify-between sm:py-10 lg:px-16 sm:px-4 p-3  bg-white dark:bg-neutral-950 dark:text-white">
            <aside className='flex flex-col'>
                <div className={`${dosis.className} sm:text-[24px] text-[18px] sm:mb-16 mb-4`}>
                    <span className={`${dance_font.className} bg-gray-900 text-white dark:bg-white dark:text-black px-5 py-2`}>Blog</span> Sphere
                </div>
                <p className={`${heebo.className}`}>
                    Blog Sphere
                    <br />
                    Providing reliable tech since 1992
                </p>
            </aside>
            <nav className={`${heebo.className} text-[18px] flex flex-col`}>
                <h6 className=" mb-2 font-bold dark:text-gray-500 text-gray-800">Top category</h6>
                <Link href={"/technology-and-innovation"} className="link link-hover">Technology and Innovation</Link>
                 <Link href={"/sports"}  className="link link-hover">Sports</Link>
                 <Link href={"/business"}  className="link link-hover">Business</Link>
                 <Link href={"/news-and-innovation"}  className="link link-hover">News and Current Affairs</Link>
            </nav>
            <nav className={`${heebo.className} text-[18px]  flex flex-col`}>
                <h6 className="mb-2 font-bold dark:text-gray-500 text-gray-800">Company</h6>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </nav>
            <nav className={`${heebo.className} text-[18px]  flex flex-col`}>
                <h6 className=" mb-2 font-bold dark:text-gray-500 text-gray-800">Legal</h6>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </nav>
            <nav className={`${heebo.className} text-[18px]`}>
                <h6 className=" mb-2 font-bold dark:text-gray-500 text-gray-800">Social</h6>
                <div className="flex sm:gap-8 gap-4">
                    <Link href={"/"}>
                        <FaLinkedin className='text-[30px]' />
                    </Link>

                    <Link href={"/"}>
                        <FaXTwitter className='text-[30px]' />
                    </Link>


                    <Link href={"/"}>
                        <FaFacebookF className='text-[30px]' />
                    </Link>


                </div>
            </nav>
        </footer>


        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mb-8 sm:mt-0 mt-6 h-[1px] w-full">
        {/* <hr className=""/> */}
        <p className={`${heebo.className} px-10 text-center py-6 font-normal text-[12px] dark:text-zinc-200 dark:bg-neutral-950`}>
          © 2024 Blog Sphere™. All Rights Reserved.
        </p>
      </div>
        </div>
    )
}

export default Footer