import { notFound } from 'next/navigation';
import client from '../../../../../sanityClient';
import { PortableText } from '@portabletext/react';
import { TechandInnovation } from '../../../../../types';
import imageUrlBuilder from '@sanity/image-url';
import { Heebo, Lexend } from 'next/font/google';
import CommentSection from '@/components/comments';
import ShareButtons from '@/components/shareable';
import Image from 'next/image';
import Link from 'next/link';

const lexend = Lexend({ subsets: ['latin'] });
const heebo = Heebo({ subsets: ['latin'] });

const builder = imageUrlBuilder(client);

interface ImageAsset {
  _ref: string;
  _type: string;
}

interface ImageWithAsset {
  asset: ImageAsset;
  alt?: string;
}

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

function urlFor(source: ImageWithAsset) {
  return builder.image(source);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;

  // Updated Queries for consistency
  const articleQuery = `*[_type == "technology-and-innovation" && slug.current == $slug][0] {
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
        _type
      }
    },
    readTime,
    publishedDate
  }`;

  const relatedTopicsQuery = `*[_type == "technology-and-innovation" && slug.current != $slug] | order(_createdAt desc)[0...5] {
    title,
    slug {
      current
    },
    mainImage {
      asset {
        _ref,
        _type
      }
    },
    authorName,
    authorAvatar {
      asset {
        _ref,
        _type
      }
    },
    readTime,
    publishedDate
  }`;

  const article: TechandInnovation | null = await client.fetch(articleQuery, { slug });
  const relatedTopics: Array<TechandInnovation> = await client.fetch(relatedTopicsQuery, { slug });

  if (!article) {
    notFound();
  }

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
        <h1 className="sm:text-4xl text-3xl font-bold mb-4">{article.title}</h1>

        {article.mainImage?.asset && (
          <Image
            className="w-full object-cover object-center mb-6"
            src={urlFor(article.mainImage).url()}
            alt={article.mainImage.alt || 'Main image'}
            width={1200}
            height={600}
          />
        )}

        <div className="flex items-center mb-6">
          {article.authorAvatar?.asset?._ref ? (
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
              src="/sa.png"
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

        <p className={`${heebo.className} text-lg mb-6`}>{article.overview}</p>

        <div className={`${heebo.className} prose mb-8 dark:text-white dark:prose-invert`}>
          <PortableText value={article.content} />
        </div>


        <div className="mt-10">
          <ShareButtons slug={slug} title={article.title} />
        </div>

        <div className="mt-10">
          <CommentSection />
        </div>
      </div>

      <aside className={`${heebo.className} col-span-1 top-16 h-full`}>
        <h2 className="text-2xl font-semibold mb-4 sm:ml-4 ml-0">Related Topics</h2>
        <ul className="flex flex-col gap-4">
          {relatedTopics.map((topic) => (
            <li key={topic.slug.current} className="mb-4">
              <div className="ml-4">
                {topic.mainImage?.asset?._ref ? (
                  <Image
                    className="w-full h-48 object-cover mb-4"
                    src={urlFor(topic.mainImage).url()}
                    alt={topic.title}
                    width={500}
                    height={300}
                  />
                ) : (
                  <Image
                    className="w-full h-48 object-cover mb-4"
                    src="/placeholder-image.jpg"
                    alt="Fallback image"
                    width={500}
                    height={300}
                  />
                )}
                <Link href={`/technology-and-innovation/${topic.slug.current}`} className="text-blue-600 hover:underline text-lg font-semibold">
                  {topic.title}
                </Link>
                <div className="flex items-center mt-2">
                  {topic.authorAvatar?.asset?._ref ? (
                    <Image
                      className="w-8 h-8 rounded-full mr-2"
                      src={urlFor(topic.authorAvatar).url()}
                      alt={topic.authorName || 'Author Avatar'}
                      width={32}
                      height={32}
                    />
                  ) : (
                    <Image
                      className="w-8 h-8 rounded-full mr-2"
                      src="/sa.png"
                      alt="Default Author Avatar"
                      width={32}
                      height={32}
                    />
                  )}
                  <div>
                    <span className="text-sm text-gray-600">{topic.authorName || 'Unknown Author'}</span>
                    <div>
                      <span className="text-sm text-gray-600">{topic.publishedDate && `${topic.publishedDate}`}</span>
                      <span className="text-sm text-gray-600 ml-2">{topic.readTime && `${topic.readTime} min read`}</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
