// components/atoms/Title.tsx
import React from 'react';

interface TitleProps {
  text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => {
  return (
    <div className="w-full bg-black h-12 flex items-center justify-center">
      <h2 className="text-white text-xl">{text}</h2>
    </div>
  );
};

export default Title;
