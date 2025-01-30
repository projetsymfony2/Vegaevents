import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../organisms/Navbar';

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
    <div className="relative min-h-screen">
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
      </div>
    </div>
  );
};

export default Layout;