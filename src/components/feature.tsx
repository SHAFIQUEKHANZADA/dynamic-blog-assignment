"use client"
import client, { urlFor } from '../../sanityClient';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Heebo } from 'next/font/google';
import Trending from './Trending';

const heebo = Heebo({ subsets: ['latin'] });

const categories = [
    { label: 'Business', value: 'business' },
    { label: 'Technology and Innovation', value: 'technology-and-innovation' },
    { label: 'Sports', value: 'sports' },
    { label: 'Health and Fitness', value: 'health-and-fitness' },
    { label: 'Food and Drink', value: 'food-and-drink' },
    { label: 'News and Current Affairs', value: 'news-and-currentaffairs' },
];

export default function BusinessPage() {
    const [selectedCategory, setSelectedCategory] = useState('business');
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);

            const categoryFilter =
                `[_type == "${selectedCategory}"]`;
            const query = `*${categoryFilter} | order(publishedDate desc)[0...3] {
        title,
        overview,
        slug,
        mainImage {
          asset,
          alt
        },
        category,
        authorName,
        publishedDate,
        readTime
      }`;

            const fetchedArticles = await client.fetch(query);
            setArticles(fetchedArticles);
            setLoading(false);
        };

        fetchArticles();
    }, [selectedCategory]);

    return (
        <div className={`${heebo.className} text-gray-600  dark:text-gray-400 body-font sm:px-8 px-2 my-20`}>
            <h1 className='text-5xl font-bold'>Featured Post</h1>
            <div className='flex sm:flex-row flex-col gap-4'>
                <section className='sm:w-[70%] w-[100%]'>
                    <div className="flex justify-between mt-10 mb-5 flex-wrap sm:flex-nowrap">
                        {/* Category Buttons (visible on medium and above) */}
                        <div className="hidden sm:flex space-x-4">
                            {categories.map((cat) => (
                                <button
                                    key={cat.value}
                                    onClick={() => setSelectedCategory(cat.value)}
                                    className={`px-1 py-2 relative text-gray-700 dark:text-gray-400 text-[16px] transition-all duration-300`}
                                >
                                    {cat.label}
                                    <span
                                        className={`absolute bottom-0 left-0 w-full h-[6px] bg-yellow-500 transform ${selectedCategory === cat.value ? 'scale-x-100' : 'scale-x-0'
                                            } transition-transform duration-300`}
                                    />
                                </button>
                            ))}
                        </div>
                        {/* Select Dropdown (visible on small screens) */}
                        <div className="sm:hidden w-fit relative">
                            <select
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                value={selectedCategory}
                                className="block w-full px-4 py-2 bg-gray-100 text-[14px] text-gray-700 rounded-lg shadow-md 
                   focus:ring-2 focus:ring-yellow-500 focus:outline-none dark:bg-gray-800 dark:text-white 
                   transition-all duration-300 cursor-pointer"
                            >
                                {categories.map((cat) => (
                                    <option
                                        key={cat.value}
                                        value={cat.value}
                                        className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                                    >
                                        {cat.label}
                                    </option>
                                ))}
                            </select>

                        </div>

                    </div>


                    {/* Articles Grid */}
                    {loading ? (
                        <p className="text-center text-gray-500">Loading articles...</p>
                    ) : articles.length === 0 ? (
                        <p className="text-center text-gray-500">No articles found.</p>
                    ) : (
                        <div className="grid grid-cols-3 gap-1">
                            {/* Featured Article */}
                            <div className="col-span-2 row-span-2">
                                <ArticleCard article={articles[0]} large />
                            </div>

                            {/* Small Articles */}
                            {articles.slice(1).map((article, index) => (
                                <div key={index} className="col-span-1">
                                    <ArticleCard article={article} />
                                </div>
                            ))}
                        </div>
                    )}
                </section>
                <aside className="sm:w-[30%] scrollDiv w-[100%] bg-white h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent  dark:scrollbar-thumb-neutral-950  dark:bg-neutral-950 rounded-lg">
                    <Trending />
                </aside>
            </div>
        </div>
    );
}
interface Article {
    title: string;
    overview: string;
    slug: {
        current: string;
    };
    mainImage: {
        asset: {
            url: string;
        };
        alt: string;
    };
    authorName: string;
    publishedDate: string;
    readTime: string;
    category?: string;
}

interface ArticleCardProps {
    article: Article;
    large?: boolean;
}

function ArticleCard({ article, large = false }: ArticleCardProps) {
    if (!article) return null;

    return (
        <Link href={`/${article.category}/${article.slug.current}`} passHref>
            <div
                className={`relative group ${large ? 'h-full' : 'h-[250px]'
                    } rounded-lg overflow-hidden shadow-lg`}
            >
                {article.mainImage?.asset && (
                    <Image
                        src={urlFor(article.mainImage).url()}
                        alt={article.mainImage.alt || 'Main image'}
                        layout="fill"
                        objectFit="cover"
                        className="group-hover:scale-110 transition-transform duration-300"
                    />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-40 sm:p-4 p-1 flex flex-col justify-end">

                    <h2
                        className={`${large ? 'text-3xl mb-2' : 'sm:text-[15px] text-[10px] sm:mb-2 mb-0'
                            } text-white font-bold`}
                    >
                        {article.title}
                    </h2>
                    <p
                        className={`${large ? 'text-xs sm:text-[14px] mb-2 line-clamp-3 ' : 'text-[10px] sm:text-[13px] line-clamp-2 mb-1 p-1'
                            }  text-gray-300 w-fit`}
                    >
                        {article.overview}
                    </p>
                    <div className="flex sm:flex-row flex-col sm:gap-0 gap-2 items-start sm:items-center text-gray-300 text-sm">
                        <div className='flex items-center'>
                            <Image
                                src="/sa.png"
                                alt={article.authorName}
                                width={100}
                                height={100}
                                className={`${large ? "w-8 h-8" : "w-5 h-5"} rounded-full  mr-2`}
                            />
                            <span className={`${large ? "text-[18px]" : "text-[10px]"}`}>{article.authorName}</span>
                        </div>
                        <div className='flex'>
                            <span className={`${large ? "text-[18px]" : "text-[10px]"} sm:ml-2`}>| {article.publishedDate}</span>
                            {article.readTime && (
                                <span className={`${large ? "text-[18px]" : "text-[10px]"} ml-2`}>| {article.readTime} min read</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
