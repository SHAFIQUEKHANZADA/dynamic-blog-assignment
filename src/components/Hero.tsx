"use client"
import client, { urlFor } from '../../sanityClient';
import Link from 'next/link';
import Image from 'next/image';
import { Heebo } from 'next/font/google';
import { useEffect, useState } from 'react';

const heebo = Heebo({ subsets: ['latin'] });

export default async function BusinessPage() {
    // Fetch the most recently published article
    const query = `*[_type == "business"] | order(publishedDate desc)[0] {
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
    readTime,
  }`;
    // Fetch the most recently published article
    const query2 = `*[_type == "technology-and-innovation"] | order(publishedDate desc)[0] {
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
    readTime,
  }`;
    // Fetch the most recently published article
    const query3 = `*[_type == "news-and-currentaffairs"] | order(publishedDate desc)[0] {
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
    readTime,
  }`;

    // Fetch the most recent article
    const article = await client.fetch(query);
    const articleTwo = await client.fetch(query2);
    const articleThree = await client.fetch(query3);

    // Check if an article was found
    if (!article) {
        return <p className="text-center text-gray-500">No recent articles found.</p>;
    }
    // Check if an article was found
    if (!articleTwo) {
        return <p className="text-center text-gray-500">No recent articles found.</p>;
    }
    // Check if an article was found
    if (!articleThree) {
        return <p className="text-center text-gray-500">No recent articles found.</p>;
    }

    return (
        <section className={`${heebo.className} text-gray-600 body-font px-10`}>
            <div className='grid grid-cols-3 space-x-2 space-y-2'>
                {/* 1 */}
                <div className="container mx-auto col-span-2 row-span-2 mt-2">
                    <Link href={`/technology-and-innovation/${articleTwo.slug.current}`} passHref>
                        <div className="relative group h-full rounded-lg overflow-hidden shadow-lg">
                            {articleTwo.mainImage?.asset && (
                                <Image
                                    src={urlFor(articleTwo.mainImage).url()}
                                    alt={articleTwo.mainImage.alt || 'Main image'}
                                    layout="fill"
                                    objectFit="cover"
                                    className="group-hover:scale-110 transition-transform duration-300"
                                />
                            )}
                            <div className="absolute inset-0 bg-black bg-opacity-40 p-4 flex flex-col justify-end">
                                <p className='text-black font-bold bg-yellow-500 bg-opacity-70 w-fit p-1  px-2'>Technology and Innovation</p>
                                <p className="text-sm text-gray-300 mb-1">{articleTwo.category}</p>
                                <h2 className="text-white text-6xl font-bold mb-2">{articleTwo.title}</h2>
                                <div className="flex items-center text-gray-300 text-sm">
                                   <Image src={"/sa.png"} alt='as' width={100} height={100} className='rounded-full w-10 h-10 mr-2'/>
                                    <span>{articleTwo.authorName}</span>
                                    <span className="ml-2">| {articleTwo.publishedDate}</span>
                                    {articleTwo.readTime && (
                                        <span className="ml-2">| {articleTwo.readTime} min read</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* 2 */}
                <div className="container mx-auto">
                    <Link href={`/business/${article.slug.current}`} passHref>
                        <div className="relative group h-[300px] rounded-lg overflow-hidden shadow-lg">
                            {article.mainImage?.asset && (
                                <Image
                                    src={urlFor(article.mainImage).url()}
                                    alt={article.mainImage.alt || 'Main image'}
                                    layout="fill"
                                    objectFit="cover"
                                    className="group-hover:scale-110 transition-transform duration-300"
                                />
                            )}
                            <div className="absolute inset-0 bg-black bg-opacity-40 p-4 flex flex-col justify-end">
                            <p className='text-white font-bold bg-blue-500 bg-opacity-70 w-fit p-1   px-2'>Business</p>
                                <p className="text-sm text-gray-300 mb-1">{article.category}</p>
                                <h2 className="text-white text-2xl font-bold mb-2">{article.title}</h2>
                                <div className="flex items-center text-gray-300 text-sm">
                                <Image src={"/sa.png"} alt='as' width={100} height={100} className='rounded-full w-8 h-8 mr-2'/>
                                    <span>{article.authorName}</span>
                                    <span className="ml-2">| {article.publishedDate}</span>
                                    {article.readTime && (
                                        <span className="ml-2">| {article.readTime} min read</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* 3 */}
                <div className="container mx-auto">
                    <Link href={`/news-and-currentaffairs/${articleThree.slug.current}`} passHref>
                        <div className="relative group h-[300px] rounded-lg overflow-hidden shadow-lg">
                            {articleThree.mainImage?.asset && (
                                <Image
                                    src={urlFor(articleThree.mainImage).url()}
                                    alt={articleThree.mainImage.alt || 'Main image'}
                                    layout="fill"
                                    objectFit="cover"
                                    className="group-hover:scale-110 transition-transform duration-300"
                                />
                            )}
                            <div className="absolute inset-0 bg-black bg-opacity-40 p-4 flex flex-col justify-end">
                            <p className='text-white font-bold bg-blue-500 bg-opacity-70 w-fit p-1  px-2'>News and Current Affairs</p>
                                <p className="text-sm text-gray-300 mb-1">{articleThree.category}</p>
                                <h2 className="text-white text-2xl font-bold mb-2">{articleThree.title}</h2>
                                <div className="flex items-center text-gray-300 text-sm">
                                <Image src={"/sa.png"} alt='as' width={100} height={100} className='rounded-full w-8 h-8 mr-2'/>
                                    <span>{articleThree.authorName}</span>
                                    <span className="ml-2">| {articleThree.publishedDate}</span>
                                    {articleThree.readTime && (
                                        <span className="ml-2">| {articleThree.readTime} min read</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
