"use client"
import client, { urlFor } from '../../sanityClient';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Heebo } from 'next/font/google';

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
        <div className={`${heebo.className} text-gray-600  dark:text-gray-400 body-font px-8 my-20`}>
            <h1 className='text-5xl font-bold'>Featured Post</h1>
            <div className='flex gap-4'>
                <section className=' w-[70%]'>
                    <div className="flex justify-between mt-10 mb-5">
                        {categories.map((cat) => (
                            <button
                                key={cat.value}
                                onClick={() => setSelectedCategory(cat.value)}
                                className={`px-2 py-2 relative text-gray-700 dark:text-gray-400 text-[16px] transition-all duration-300`}
                            >
                                {cat.label}
                                <span
                                    className={`absolute bottom-0 left-0 w-full h-[6px] bg-yellow-500 transform ${selectedCategory === cat.value ? 'scale-x-100' : 'scale-x-0'
                                        } transition-transform duration-300`}
                                />
                            </button>
                        ))}
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

                {/* Right Side - Other categories */}
                <div className="sticky top-16 sm:h-screen w-[30%] p-4 bg-gray-100 dark:bg-gray-900 dark:text-white rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Trending:</h3>
                   
                </div>
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
                <div className="absolute inset-0 bg-black bg-opacity-40 p-4 flex flex-col justify-end">

                    <h2
                        className={`${large ? 'text-3xl' : 'text-sm'
                            } text-white font-bold mb-2`}
                    >
                        {article.title}
                    </h2>
                    <p
                        className={`${large ? 'text-xs mb-2' : 'text-[10px] line-clamp-2 mb-1'
                            }  text-gray-300 w-fit p-1 px-2 line-clamp-3 `}
                    >
                        {article.overview}
                    </p>
                    <div className="flex items-center text-gray-300 text-sm">
                        <Image
                            src="/sa.png"
                            alt={article.authorName}
                            width={100}
                            height={100}
                            className={`${large ? "w-8 h-8" : "w-5 h-5"} rounded-full  mr-2`}
                        />
                        <span className={`${large ? "text-[18px]" : "text-[10px]"}`}>{article.authorName}</span>
                        <span className={`${large ? "text-[18px]" : "text-[10px]"} ml-2`}>| {article.publishedDate}</span>
                        {article.readTime && (
                            <span className={`${large ? "text-[18px]" : "text-[10px]"} ml-2`}>| {article.readTime} min read</span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}
