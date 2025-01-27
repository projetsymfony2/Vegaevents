import React from 'react';

interface ButtonProps {
  onClick: () => void;
  text: string;
  icon?: React.ReactNode; 
}

const Button: React.FC<ButtonProps> = ({ onClick, text, icon }) => {
  return (
    <div className="flex justify-items-center "> {/* Suppression des classes before et after */}
      <button
        type="button"
        onClick={onClick}
        className="flex items-center rounded-full border border-gray-300 bg-secondary-50 px-6 py-4 text-center text-base font-medium text-gray-900 hover:bg-blue-300 mt-8"
      >
        {icon && <span className="mr-2 h-5 w-5">{icon}</span>}
        {text}
      </button>
    </div>
  );
};

export default Button;