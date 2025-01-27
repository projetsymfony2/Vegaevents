//src/components/atoms/Button/Button.tsx
import React from 'react';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties; // Ajoutez cette ligne
}

const Button: React.FC<ButtonProps> = ({ type, disabled, children, className, style }) => (
  <button
    type={type}
    disabled={disabled}
    className={`py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${className}`}
    style={style} // Passez la propriété style ici
  >
    {children}
  </button>
);

export default Button;
