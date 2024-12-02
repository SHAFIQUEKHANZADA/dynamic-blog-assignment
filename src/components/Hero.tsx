"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heebo } from 'next/font/google';
import client, { urlFor } from '../../sanityClient';
import Loading from '@/app/loading';

const heebo = Heebo({ subsets: ['latin'] });

// Define the Article type
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
  category: string;
  authorName: string;
  authorImage: {
    asset: {
      _id: string;
    };
  };
  publishedDate: string;
  readTime: string;
}

export default function HeroSection() {
    // Define the type of `articles` explicitly
    const [articles, setArticles] = useState<Article[]>([]);  
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchArticles = async () => {
            const queries = [
                `*[_type == "technology-and-innovation"] | order(publishedDate desc)[0] {
                  title,
                  overview,
                  slug,
                  mainImage {
                    asset,
                    alt
                  },
                  category,
                  authorName,
                  authorImage {
                    asset {
                      _id
                    }
                  },
                  publishedDate,
                  readTime,
                }`,
                `*[_type == "business"] | order(publishedDate desc)[0] {
                  title,
                  overview,
                  slug,
                  mainImage {
                    asset,
                    alt
                  },
                  category,
                  authorName,
                  authorImage {
                    asset {
                      _id
                    }
                  },
                  publishedDate,
                  readTime,
                }`,
                `*[_type == "news-and-currentaffairs"] | order(publishedDate desc)[0] {
                  title,
                  overview,
                  slug,
                  mainImage {
                    asset,
                    alt
                  },
                  category,
                  authorName,
                  authorImage {
                    asset {
                      _id
                    }
                  },
                  publishedDate,
                  readTime,
                }`,
            ];

            const results = await Promise.all(queries.map((query) => client.fetch(query)));
            setArticles(results);
        };

        fetchArticles();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [articles]);

    if (articles.length === 0) {
        return  <Loading/>;
    }

    return (
        <section className={`${heebo.className} relative w-full h-[calc(100vh-7rem)] sm:h-[calc(100vh-9rem)]  overflow-hidden`}>
            <div className="relative w-full h-full flex overflow-hidden">
                {articles.map((article, index) => (
                    <div
                        key={index}
                        className={`absolute w-full h-full transition-transform duration-700 ease-in-out ${
                            index === currentIndex
                                ? 'translate-x-0 opacity-100'
                                : index > currentIndex
                                ? 'translate-x-full opacity-0'
                                : '-translate-x-full opacity-0'
                        }`}
                        style={{ zIndex: index === currentIndex ? 1 : 0 }}
                    >
                        <Image
                            src={urlFor(article.mainImage).url()}
                            alt={article.mainImage.alt || 'Main image'}
                            layout="fill"
                            objectFit="cover"
                            className="w-full h-full"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40" />

                        {/* Author Information - Bottom Left */}
                        <div className="absolute bottom-8 left-4 text-white flex flex-col gap-5">
                            <h3 className="sm:text-5xl text-4xl font-bold">{article.title}</h3>

                            {/* Overview Text - Infinite Scroll Effect */}
                            <div className="sm:h-24 h-40 overflow-hidden relative">
                                <div className="animate-scrollUp absolute inset-0 sm:w-[70%] w-[100%]">
                                    <p className="sm:text-2xl text-xl text-gray-300">{article.overview}</p>
                                </div>
                            </div>

                            <div className="flex items-end justify-between pr-4 sm:pr-6">
                                <div className="flex items-center mt-2 space-x-2">
                                    <Image
                                        src={article.authorImage?.asset?._id ? urlFor(article.authorImage).url() : '/sa.png'}
                                        alt={article.authorName || 'Author Image'}
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                    />
                                    <div className="text-sm">
                                        <p>{article.authorName}</p>
                                        <div className="flex gap-2">
                                            <p>{article.publishedDate}</p>
                                            |
                                            <p>{article.readTime} min read</p>
                                        </div>
                                    </div>
                                </div>

                                <Link href={`/${article.category}/${article.slug.current}`} passHref>
                                    <button className="bg-transparent border dark:border-white hover:bg-transparent/45 duration-300 hover:scale-105 text-[12px] text-white font-bold py-2 px-4 rounded-3xl">
                                        Read More
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
