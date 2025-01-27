import React from 'react';

// Liste des images stockées dans public/images
const images = [
  'photo.jpeg',
  'photo.jpeg',
  'photo.jpeg',
  'photo.jpeg',
  'photo.jpeg',
  'photo.jpeg',
  'photo.jpeg',
  'photo.jpeg',
  'photo.jpeg',
];

// Fonction pour générer une taille aléatoire
const getRandomSize = () => {
  const sizes = [1, 2, 3]; // tailles possibles : 1, 2, 3 colonnes
  return sizes[Math.floor(Math.random() * sizes.length)];
};

const Gallery: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {images.map((image, index) => {
        const size = getRandomSize(); // Taille aléatoire pour chaque image

        return (
          <div
            key={index}
            className={`col-span-${size} relative`}
          >
            <img
              src={`/images/${image}`}
              alt={`Gallery Image ${index + 1}`}
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>
        );
      })}
    </div>
  );
};

export default Gallery;
