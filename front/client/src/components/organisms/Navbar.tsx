import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../atoms/Logo";
import ButtonBackoffice from "../atoms/Button/ButtonBackoffice";

const NAV_LINKS = [
  { to: "/animation", label: "Animation" },
  { to: "/aboutevents", label: "Événements" },
  { to: "#about", label: "Qui sommes-nous" },
  { to: "/contact", label: "Contact" },
  { to: "/recrutement", label: "Recrutement" },
] as const;

const Navbar: React.FC = () => {
  const [scrolling, setScrolling] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleScroll = useCallback(() => {
    setScrolling(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleLoginClick = () => {
    if (location.pathname !== "/login") {
      navigate("/login");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center h-20 justify-between">
          {/* Logo */}
          <div className="w-[150px] flex-shrink-0">
            <button
              onClick={handleLogoClick}
              className="flex items-center"
              aria-label="Retour en haut de la page d'accueil"
            >
              <Logo />
            </button>
          </div>

          {/* Menu desktop */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex space-x-8">
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
          </div>

          {/* Button Backoffice */}
          <div className="hidden md:flex w-[150px] justify-end flex-shrink-0">
            <ButtonBackoffice onClick={handleLoginClick} />
          </div>

          {/* Icone menu mobile */}
          <div className="flex md:hidden ml-auto">
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-600 hover:text-gray-900"
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        <div 
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? "max-h-screen opacity-100" 
              : "max-h-0 opacity-0"
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
            <div className="pt-4">
              <ButtonBackoffice onClick={handleLoginClick} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
