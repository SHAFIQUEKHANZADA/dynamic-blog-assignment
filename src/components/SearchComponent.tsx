"use client"
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SearchComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleSearch = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Search Icon */}
      <motion.div
        className={`flex items-center justify-center p-2 cursor-pointer transition-all duration-300 ${
          isOpen ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={handleToggleSearch}
        whileHover={{ scale: 1.1 }}
      >
        <FaSearch className="text-gray-600 dark:text-white" />
      </motion.div>

      {/* Animated Input */}
      <motion.input
        type="text"
        placeholder="Search..."
        className={`transition-all duration-300 rounded-md px-4 py-2 absolute right-0 top-0 border dark:border-gray-300 border-gray-600 outline-none ${
          isOpen ? 'w-64' : 'w-0 opacity-0'
        }`}
        onBlur={() => setIsOpen(false)}  
        onFocus={() => setIsOpen(true)} 
        animate={isOpen ? { opacity: 1, width: '16rem' } : { opacity: 0, width: 0 }}
      />
 
    </div>
  );
};

export default SearchComponent;
