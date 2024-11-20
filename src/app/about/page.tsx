import Link from 'next/link'
import React from 'react'

const About = () => {
  return (
    <div className="bg-white dark:bg-neutral-950 text-gray-800 dark:text-gray-200 px-6 py-12">
  <div className="max-w-5xl mx-auto">
    {/* Header */}
    <h1 className="text-5xl font-bold text-center mb-6">
      About <span className="text-yellow-500">Blog Sphare</span>
    </h1>
    <p className="text-lg text-center mb-8 leading-7">
      Welcome to Blog Sphare – your ultimate source for insightful, engaging, and inspiring content! 
      We aim to inform, inspire, and connect people through diverse topics spanning multiple industries and lifestyles.
    </p>

    {/* Purpose Section */}
    <div className="mb-12">
      <h2 className="text-3xl font-semibold mb-4">Our Purpose</h2>
      <p className="leading-7">
        Blog Sphare was created to cultivate a space for curious minds to explore, learn, and grow. 
        Whether you&apos;re a tech enthusiast, a fitness lover, or a business strategist, our blog brings 
        you well-researched content that keeps you informed and motivated.
      </p>
    </div>

    {/* Meet the Creator Section */}
    <div className="mb-12">
      <h2 className="text-3xl font-semibold mb-4">Meet the Creator</h2>
      <p className="leading-7 mb-4">
        Hi, I&apos;m <span className="font-bold">Shafique Ur Rehman</span>, the creator of Blog Sphare. With a 
        passion for storytelling and a love for exploring new ideas, I started this platform to 
        share knowledge and ignite discussions on topics that matter. Along with a talented team of 
        contributors, we&apos;re committed to making Blog Sphare your go-to destination for quality content.
      </p>
      <p className="leading-7">
        Outside of blogging, I enjoy [your hobbies or interests, e.g., coding, traveling, or experimenting in the kitchen]. 
        Feel free to connect with me through our social links below!
      </p>
    </div>

    {/* Categories Section */}
    <div className="mb-12">
      <h2 className="text-3xl font-semibold mb-4">Explore Our Categories</h2>
      <p className="leading-7 mb-6">
        Dive into a variety of topics designed to inspire and inform. Here&apos;s what you can explore:
      </p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <li>
          <Link
            href="/business"
            className="block bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-lg shadow-md hover:bg-yellow-500 dark:hover:bg-yellow-600 hover:text-white transition-all duration-300"
          >
            <strong>Business</strong> - Strategies and insights for success.
          </Link>
        </li>
        <li>
          <Link
            href="/health-and-fitness"
            className="block bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-lg shadow-md hover:bg-yellow-500 dark:hover:bg-yellow-600 hover:text-white transition-all duration-300"
          >
            <strong>Health & Fitness</strong> - Tips for a healthier lifestyle.
          </Link>
        </li>
        <li>
          <Link
            href="/technology-and-innovation"
            className="block bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-lg shadow-md hover:bg-yellow-500 dark:hover:bg-yellow-600 hover:text-white transition-all duration-300"
          >
            <strong>Technology</strong> - Insights into the latest tech trends.
          </Link>
        </li>
        <li>
          <Link
            href="/food-and-drink"
            className="block bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-lg shadow-md hover:bg-yellow-500 dark:hover:bg-yellow-600 hover:text-white transition-all duration-300"
          >
            <strong>Food & Drink</strong> - Culinary journeys and recipes.
          </Link>
        </li>
        <li>
          <Link
            href="/news-and-currentaffairs"
            className="block bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-lg shadow-md hover:bg-yellow-500 dark:hover:bg-yellow-600 hover:text-white transition-all duration-300"
          >
            <strong>News & Current Affairs</strong> - Stay updated with the latest happenings.
          </Link>
        </li>
        <li>
          <Link
            href="/sports"
            className="block bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-lg shadow-md hover:bg-yellow-500 dark:hover:bg-yellow-600 hover:text-white transition-all duration-300"
          >
            <strong>Sports</strong> - All the buzz from the world of sports.
          </Link>
        </li>
      </ul>
    </div>

    {/* Call to Action Section */}
    <div className="text-center mt-12">
      <h2 className="text-3xl font-semibold mb-4">Join the Conversation</h2>
      <p className="leading-7 mb-6">
        We value your input and love hearing from you! Subscribe to our newsletter, share your thoughts, or 
        follow us on social media for the latest updates.
      </p>
      <a
        href="/subscribe"
        className="px-6 py-3 bg-yellow-500 dark:bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 dark:hover:bg-yellow-700 transition-all duration-300"
      >
        Subscribe Now
      </a>
    </div>
  </div>
</div>

  )
}

export default About