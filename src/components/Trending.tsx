"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import client, { urlFor } from "../../sanityClient";
import Loading from "@/app/loading";

interface BlogPost {
  title: string;
  overview: string;
  slug: { current: string };
  mainImage?: { asset: { _id: string; url: string }; alt?: string };
  category: string;
  authorName: string;
  authorAvatar?: { asset: { _ref: string; _type: string } };
  publishedDate: string;
  readTime?: string;
}

const categories = [
  "business",
  "health-and-fitness",
  "sports",
  "news-and-currentaffairs",
  "food-and-drink",
  "technology-and-innovation",
];

const Trending = () => {
  const [trendingPosts, setTrendingPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      setLoading(true);

      const queries = categories.map(
        (category) => `*[_type == "${category}"] | order(_createdAt desc)[0] {
            title,
            overview,
            slug,
            mainImage {
              asset,
              alt
            },
            category,
            authorName,
            authorAvatar {
              asset {
                _ref,
                _type
              }
            },
            publishedDate,
            readTime
          }`
      );

      try {
        const results = await Promise.all(queries.map((query) => client.fetch(query)));
        setTrendingPosts(results.filter((post) => post));
      } catch (error) {
        console.error("Error fetching trending posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingPosts();
  }, []);

  return (
    <div className="w-full bg-white dark:bg-neutral-950 dark:text-white rounded-lg">
      <h3 className="text-2xl font-semibold mb-4 dark:text-gray-400">Trending:</h3>
      {loading ? (
        <Loading />
      ) : trendingPosts.length === 0 ? (
        <p className="text-gray-500">No trending posts available.</p>
      ) : (
        <div className="space-y-6">
          {trendingPosts.map((post) => (
            <TrendingCard key={post.slug.current} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

const TrendingCard = ({ post }: { post: BlogPost }) => {
  return (
    <Link href={`/${post.category}/${post.slug.current}`}>
      <div className="flex items-center gap-2 sm:gap-0 group sm:my-10 my-5">
        {/* Thumbnail */}
        <div className="sm:w-28 sm:h-28">
          {post.mainImage?.asset && (
            <Image
              src={urlFor(post.mainImage.asset).url()}
              alt={post.mainImage.alt || "Trending image"}
              width={100}
              height={100}
              className=""
            />
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <p className="text-sm font-medium text-yellow-500">{post.category}</p>
          <h4 className="text-sm font-semibold text-gray-800 dark:text-white group-hover:underline">
            {post.title}
          </h4>
          <p className="text-[12px] text-gray-600 dark:text-gray-400 line-clamp-2">
            {post.overview}
          </p>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            {post.authorAvatar?.asset ? (
              <Image
                className="w-5 h-5 rounded-full mr-2"
                src={urlFor(post.authorAvatar.asset).url()}
                alt={post.authorName || "Author Avatar"}
                width={32}
                height={32}
              />
            ) : (
              <Image
                className="w-5 h-5 rounded-full mr-2"
                src="/sa.png"
                alt="Default Author Avatar"
                width={32}
                height={32}
              />
            )}
            <span className="text-[10px]">{post.authorName}</span>
            <span className="ml-2 text-[10px]">| {post.publishedDate}</span>
            {post.readTime && <span className="ml-2 text-[10px]">| {post.readTime} min read</span>}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Trending;
