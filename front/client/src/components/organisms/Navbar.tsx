import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../atoms/Logo';

// Liens de navigation
const NAV_LINKS = [
  { to: '/animation', label: 'Animation' },
  { to: '/evenements', label: 'Événements' },
  { to: '/qui-sommes-nous', label: 'Qui sommes-nous' },
  { to: '/contact', label: 'Contact' },
  { to: '/recrutement', label: 'Recrutement' }, // Ajout de la page Recrutement
] as const;

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false); // État pour détecter le scroll
  const location = useLocation();
  const navigate = useNavigate();

  // Fonction pour ouvrir/fermer le menu mobile
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Effet pour détecter le scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Fonction pour rediriger vers la page de connexion
  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 w-full h-20 flex items-center transition-all duration-300 ${
        scrolling ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center" aria-label="Accueil">
          <Logo />
        </Link>

        {/* Liens de navigation pour écrans larges */}
        <div className="hidden md:flex space-x-8">
          {NAV_LINKS.map(({ to, label }) => (
            <motion.div key={to} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to={to}
                className={`
                  text-gray-950
                  font-medium 
                  font-bebas 
                  relative 
                  group
                  hover:text-gray-700
                  transition-all duration-300
                  ${location.pathname === to ? 'text-gray-900' : ''}
                `}
              >
                {label}
                <span className="absolute bottom-[-6px] left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bouton de connexion */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLoginClick}
          className="hidden md:block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Connexion
        </motion.button>

        {/* Bouton hamburger pour mobile */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMobileMenu}
          className="md:hidden text-white focus:outline-none"
          aria-label="Menu mobile"
          aria-expanded={isMobileMenuOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </motion.button>

        {/* Menu mobile */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed top-20 left-0 right-0 bg-black/90 backdrop-blur-md"
            >
              <div className="flex flex-col items-center space-y-4 py-6">
                {NAV_LINKS.map(({ to, label }) => (
                  <motion.div key={to} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to={to}
                      onClick={toggleMobileMenu}
                      className={`
                        text-white 
                        text-xl 
                        font-medium 
                        font-bebas
                        hover:text-blue-400
                        transition-colors
                        ${location.pathname === to ? 'text-blue-400' : ''}
                      `}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
                {/* Bouton de connexion pour mobile */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLoginClick}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Connexion
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;