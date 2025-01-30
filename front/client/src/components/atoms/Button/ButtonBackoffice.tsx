import React from 'react';
import { motion } from 'framer-motion';

const ButtonBackoffice: React.FC<{ onClick: () => void; className?: string }> = ({ 
  onClick,
  className = "" 
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center justify-center w-12 h-12 rounded-lg
      bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300
      group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`}
      aria-label="Accéder au backoffice"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="w-7 h-7 text-white transition-transform duration-300 group-hover:scale-110"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    </motion.button>
  );
};

export default ButtonBackoffice;