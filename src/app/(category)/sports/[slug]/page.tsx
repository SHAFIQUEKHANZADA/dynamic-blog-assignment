import { notFound } from 'next/navigation';
import client from '../../../../../sanityClient';
import { PortableText } from '@portabletext/react';
import { Sports } from '../../../../../types';
import imageUrlBuilder from '@sanity/image-url';
import { Heebo, Lexend } from 'next/font/google';
import CommentSection from '@/components/comments';
import ShareButtons from '@/components/shareable';
import Image from 'next/image';

const lexend = Lexend({ subsets: ['latin'] });
const heebo = Heebo({ subsets: ['latin'] });

const builder = imageUrlBuilder(client);

// Define the type for the source parameter
interface ImageSource {
  asset: {
    _ref: string;
    _type: string;
    url?: string; // Optional, based on your Sanity schema
  };
}

function urlFor(source: ImageSource) {
  return builder.image(source);
}

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;

  // Fetch the individual article using the slug
  const articleQuery = `*[_type == "sports" && slug.current == $slug][0] {
    title,
    overview,
    mainImage {
      asset,
      alt
    },
    content,
    authorName,
    authorAvatar {
      asset {
        _ref,
        _type,
        url
      }
    },
    readTime,
    publishedDate
  }`;

  const relatedTopicsQuery = `*[_type == "sports" && slug.current != $slug] | order(_createdAt desc)[0...5] {
    title,
    slug {
      current
    }
  }`;

  const article: Sports | null = await client.fetch(articleQuery, { slug });
  const relatedTopics: Array<{ title: string; slug: { current: string } }> = await client.fetch(relatedTopicsQuery, { slug });

  if (!article) {
    notFound();
  }

  // Format the published date
  const formattedDate = article.publishedDate
    ? new Date(article.publishedDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <div className="container mx-auto px-4 sm:px-1 sm:py-16 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="col-span-2">
        {/* Title */}
        <h1 className="sm:text-4xl text-3xl font-bold mb-4">{article.title}</h1>

        {/* Main Image */}
        {article.mainImage?.asset && (
          <Image
            className="w-full object-cover object-center mb-6"
            src={urlFor(article.mainImage).url()}
            alt={article.mainImage.alt || 'Main image'}
            width={800} // Adjust width and height as needed
            height={400}
          />
        )}

        {/* Author Info, Read Time, and Publish Date */}
        <div className="flex items-center mb-6">
          {article.authorAvatar?.asset?.url ? (
            <Image
              className="w-10 h-10 rounded-full mr-3"
              src={urlFor(article.authorAvatar).url()}
              alt={article.authorName || 'Author Avatar'}
              width={40}
              height={40}
            />
          ) : (
            <Image
              className="w-10 h-10 rounded-full mr-3"
              src="/sa.png" // Fallback image
              alt="Default Author Avatar"
              width={40}
              height={40}
            />
          )}
          <div>
            <span className={`${lexend.className} text-sm text-gray-600 dark:text-gray-400 block`}>
              {article.authorName || 'Unknown Author'}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {article.readTime && `${article.readTime} min read`} {formattedDate && `• ${formattedDate}`}
            </span>
          </div>
        </div>

        {/* Overview */}
        <p className={`${heebo.className} text-lg mb-6`}>{article.overview}</p>

        {/* Render Content using PortableText */}
        <div className={`${heebo.className} prose mb-8`}>
          <PortableText value={article.content} />
        </div>

        {/* Share Buttons */}
        <div className="mt-10">
          <ShareButtons slug={slug} title={article.title} />
        </div>

        {/* Comment Section */}
        <div className="mt-10">
          <CommentSection />
        </div>
      </div>

      {/* Related Topics Sidebar */}
      <aside className={`${heebo.className} col-span-1 sticky top-16 sm:h-screen h-fit sm:mt-20`}>
        <h2 className="text-2xl font-semibold mb-4">Related Topics</h2>
        <ul>
          {relatedTopics.map((topic) => (
            <li key={topic.slug.current} className="mb-2">
              <a href={`/sports/${topic.slug.current}`} className="text-blue-600 hover:underline">
                {topic.title}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
