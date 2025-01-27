interface ButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  ariaLabel: string; // Utiliser ariaLabel en camelCase
}

const Button: React.FC<ButtonProps> = ({ onClick, icon, ariaLabel }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-20 transition-all"
      aria-label={ariaLabel} // Utiliser aria-label ici pour correspondre à l'HTML
    >
      {icon}
    </button>
  );
};

export default Button;