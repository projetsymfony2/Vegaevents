import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../organisms/Navbar';

const Layout: React.FC = () => {
  // Initialisation de particles.js
  useEffect(() => {
    // Utiliser une assertion de type pour window
    const particlesJS = (window as any).particlesJS;
    if (particlesJS) {
      particlesJS.load('particles-js', '/particles.json', () => {
        console.log('Particles.js config loaded');
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-apple-gray">
      {/* Conteneur pour particles.js */}
      <div id="particles-js" className="absolute inset-0 z-0"></div>

      {/* Navbar et contenu */}
      <div className="relative z-10">
        <Navbar />
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;