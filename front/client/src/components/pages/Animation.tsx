import React from 'react';
import { Link } from 'react-router-dom';
import image from '../../assets/image.png'; // Import de l'image locale

const AnimatedSection: React.FC = () => {
  return (
    <Link
      to="/aboutanimation"
      className="flex flex-col md:flex-row items-center justify-between w-full bg-gray-500 p-12 rounded-lg shadow-md space-y-16 mt-16 cursor-pointer transition-transform transform hover:scale-105 animate-fade-right"
    >
      {/* Image à gauche */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-start">
        <img
          src={image}
          alt="Animation"
          className="rounded-lg shadow-lg max-w-full"
        />
      </div>

      {/* Contenu textuel à droite */}
      <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          Découvrez Notre Expertise
        </h2>
        <p className="text-lg md:text-xl text-gray-300">
          Chez Vega Events, nous combinons innovation et professionnalisme pour créer des
          expériences mémorables. Rejoignez-nous pour transformer vos événements en succès.
        </p>
      </div>
    </Link>
  );
};

export default AnimatedSection;
