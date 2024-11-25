import client, { urlFor } from '../../../../sanityClient';
import Link from 'next/link';
import { NewsandCurrentAffairs} from '../../../../types';
import { Heebo } from 'next/font/google';
import Image from 'next/image';

 
const heebo = Heebo({ subsets: ['latin'] });
 

export default async function BusinessPage() {
  const query = `*[_type == "news-and-currentaffairs"] {
    title,
    overview,
    slug,
    mainImage {
      asset,
      alt
    },
    content,
    authorName,
    authorAvatar {
      asset {
        url
      }
    },
    readTime,
    publishedDate
  }`;

  const articles: NewsandCurrentAffairs[] = await client.fetch(query);

  return (
    <section className={`${heebo.className}  text-gray-600 body-font overflow-hidden`}>
      <div className="container sm:px-0 px-5 py-12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Side - Articles */}
        <div className="col-span-2">
          <div className="-my-8 divide-y-2 divide-gray-100">
            {articles.map((article) => (
              <Link
                key={article.slug.current}
                href={`/news-and-currentaffairs/${article.slug.current}`}
                passHref
                className="py-8 flex flex-wrap md:flex-nowrap"
              >
                <div className="w-full md:w-64 mb-6 md:mb-0 md:mr-4 flex-shrink-0 sm:h-[250px]">
                  {article.mainImage?.asset && (
                    <Image
                    src={urlFor(article.mainImage).width(500).height(300).url()}  
                    alt={article.mainImage.alt || 'Main image'}
                    width={500}
                    height={300}
                    className="object-cover w-full h-48 md:h-full"
                  />
                  )}
                </div>
                <div className="md:flex-grow">
                  <div className="mb-3">
                    {article.authorName && (
                      <span className="font-semibold text-gray-700 dark:text-gray-400">{article.authorName}</span>
                    )}
                    {article.publishedDate && (
                      <span className="block mt-1 text-gray-500 dark:text-gray-400 text-sm">{article.publishedDate}</span>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 title-font mb-2 dark:text-gray-100">
                    {article.title}
                  </h2>
                  <p className="leading-relaxed mb-3 sm:text-sm text-[14px] dark:text-white">
                    {article.overview}
                  </p>
                  {/* Display estimated read time if available */}
                  {article.readTime && (
                    <p className="text-gray-500 dark:text-gray-300 sm:text-[16px] text-[12px] mb-2">
                      Estimated read time: {article.readTime} minute(s)
                    </p>
                  )}
                  <div className="text-indigo-500 inline-flex items-center ">
                    Read More
                    <svg
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Side - Other categories */}
        <div className="sticky top-16 sm:h-screen p-4 bg-gray-100 dark:bg-gray-900 dark:text-white rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Other Category:</h3>
          <ul className="space-y-2">
          <li>
              <Link href="/business" className="text-indigo-500 hover:underline">
                Business
              </Link>
            </li>
            <li>
              <Link href="/food-and-drink" className="text-indigo-500 hover:underline">
                Food and Drink
              </Link>
            </li>
            <li>
              <Link href="/health-and-fitness" className="text-indigo-500 hover:underline">
               Health and Fitness
              </Link>
            </li>
            <li>
              <Link href="/sports" className="text-indigo-500 hover:underline">
               Sports
              </Link>
            </li>
            <li>
              <Link href="/technology-and-innovation" className="text-indigo-500 hover:underline">
               Technology and Innovation
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
