import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../organisms/Navbar';
import { Phone, Mail, MapPin } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons'; // Importation des icônes

// Définition du type pour particlesJS
interface ParticlesJS {
  load: (
    domId: string,
    configPath: string,
    callback?: () => void
  ) => void;
}

// Déclaration pour étendre l'interface Window
declare global {
  interface Window {
    particlesJS: ParticlesJS;
  }
}

const Layout: React.FC = () => {
  useEffect(() => {
    if (typeof window.particlesJS !== 'undefined') {
      window.particlesJS.load('particles-js', '/particles.json', () => {
        console.log('Particles.js config loaded');
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen font-sans bg-gray-50">
      {/* Conteneur pour particles.js */}
      <div
        id="particles-js"
        className="absolute inset-0 z-0"
        aria-hidden="true"
      />

      {/* Conteneur principal */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-10 mt-auto">
          <div className="container mx-auto text-center">
            <div className="flex flex-col lg:flex-row justify-center items-center space-y-6 lg:space-y-0 lg:space-x-12">
              {/* Informations de contact */}
              <div className="flex flex-col items-center space-y-4">
                <h3 className="text-xl font-bold">Nos coordonnées</h3>

                <a href="mailto:contact@vegaevents.com" className="flex items-center justify-center space-x-2 text-sm hover:opacity-80">
                  <Mail className="w-6 h-6 text-purple-500" />
                  <span>contact@vegaevents.com</span>
                </a>

                <a href="tel:+336789898989" className="flex items-center justify-center space-x-2 text-sm hover:opacity-80">
                  <Phone className="w-6 h-6 text-blue-500" />
                  <span>+33 6 78 89 89 89</span>
                </a>

                <div className="flex items-center justify-center space-x-2 text-sm">
                  <MapPin className="w-6 h-6 text-indigo-500" />
                  <span>13 rue rosa parks, Paris 75000</span>
                </div>
              </div>

              {/* Réseaux sociaux */}
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com"
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-purple-600 hover:bg-purple-700 transition"
                  aria-label="Instagram"
                >
                  <FontAwesomeIcon icon={faInstagram} className="text-white w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com"
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-700 hover:bg-blue-800 transition"
                  aria-label="LinkedIn"
                >
                  <FontAwesomeIcon icon={faLinkedin} className="text-white w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com"
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-700 transition"
                  aria-label="Facebook"
                >
                  <FontAwesomeIcon icon={faFacebook} className="text-white w-5 h-5" />
                </a>
              </div>
            </div>
            <p className="mt-6 text-sm text-gray-500">&copy; 2025 Vega Events. Tous droits réservés.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
