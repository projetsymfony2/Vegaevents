import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../atoms/Logo";
import ButtonBackoffice from "../atoms/Button/ButtonBackoffice";

const NAV_LINKS = [
  { to: "/animation", label: "Animation" },
  { to: "/evenements", label: "Événements" },
  { to: "#about", label: "Qui sommes-nous" },
  { to: "/contact", label: "Contact" },
  { to: "/recrutement", label: "Recrutement" },
] as const;

const Navbar: React.FC = () => {
  const [scrolling, setScrolling] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Gestion du scroll
  const handleScroll = useCallback(() => {
    setScrolling(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Navigation vers la connexion
  const handleLoginClick = () => {
    if (location.pathname !== "/login") {
      navigate("/login");
    }
  };

  // Gestion du menu mobile
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Gestion des liens vers des ancres (#about)
  const handleLinkClick = (to: string) => {
    if (to.startsWith("#")) {
      setTimeout(() => {
        const element = document.getElementById(to.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      navigate(to);
      setIsMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolling ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center relative">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center" aria-label="Accueil">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center space-x-8">
            {NAV_LINKS.map(({ to, label }) => (
              <div key={to} className="relative">
                <Link
                  to={to.startsWith("#") ? "/" : to}
                  onClick={() => to.startsWith("#") && handleLinkClick(to)}
                  className={`
                    relative
                    inline-block
                    px-4
                    py-2
                    text-lg
                    font-semibold
                    text-gray-900
                    tracking-wide
                    transition-all
                    duration-300
                    hover:text-blue-700
                    before:content-['']
                    before:absolute
                    before:bottom-0
                    before:left-0
                    before:w-full
                    before:h-1
                    before:bg-blue-600
                    before:scale-x-0
                    before:transition-transform
                    before:duration-300
                    hover:before:scale-x-100
                    hover:before:origin-left
                    ${location.pathname === to ? "text-blue-700 before:scale-x-100" : ""}
                  `}
                >
                  {label}
                </Link>
              </div>
            ))}
          </div>

          {/* Boutons & Menu Mobile */}
          <div className="flex items-center space-x-4">
            <ButtonBackoffice
              onClick={handleLoginClick}
              className="hidden md:flex"
            />
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-screen opacity-100 scale-y-100" : "max-h-0 opacity-0 scale-y-0"
          } bg-white overflow-hidden`}
        >
          <div className="px-4 py-4 space-y-4">
            {NAV_LINKS.map(({ to, label }) => (
              <button
                key={to}
                onClick={() => handleLinkClick(to)}
                className={`
                  block w-full text-left py-2
                  text-lg font-semibold text-gray-900
                  transition-colors duration-200 
                  hover:text-blue-700
                  ${location.pathname === to ? "text-blue-700" : ""}
                `}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
