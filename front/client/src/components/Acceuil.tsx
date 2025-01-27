import React, { useEffect, useState } from 'react';

import { useSpring, useSprings, animated } from '@react-spring/web';

const Accueil: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true); // Déclenche les animations lorsque le composant est monté
  }, []);

  // Animation pour "Vega" (fade)
  const vegaAnimation = useSpring({
    opacity: isVisible ? 1 : 0, // Fade in
    from: { opacity: 0 },       // Départ invisible
    delay: 500,                 // Délai avant le début de l'animation
    config: { duration: 1000 }, // Durée de l'animation en millisecondes
  });

  // Séparer le mot "Events" en lettres
  const letters = 'Events'.split('');

  // Animation pour chaque lettre de "Events" (fade + slide)
  const [letterAnimations] = useSprings(
    letters.length,
    (index) => ({
      opacity: isVisible ? 1 : 0, // Fade in
      transform: isVisible ? 'translateY(0%)' : 'translateY(20%)', // Slide depuis le bas
      from: { opacity: 0, transform: 'translateY(20%)' }, // Départ invisible et décalé
      delay: 1000 + index * 300, // Délai progressif pour chaque lettre (augmenté à 300 ms)
      config: { duration: 800 }, // Durée de l'animation en millisecondes
    }),
    [isVisible] // Déclenche les animations lorsque `isVisible` change
  );

  return (
    <div className="header relative text-center bg-gradient-to-r from-purple-400 to-cyan-100 h-screen w-screen overflow-hidden">
      <div className="inner-header flex flex-col justify-center items-center h-screen w-full">
        {/* Animation du titre */}
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="font-montserrat font-bold tracking-wider text-3xl md:text-9xl mb-6">
            {/* "Vega" avec animation de fade */}
            <animated.span style={vegaAnimation} className="text-purple-600">
              Vega
            </animated.span>{' '}
            {/* "Events" avec animation de fade + slide pour chaque lettre */}
            {letterAnimations.map((animation, index) => (
              <animated.span key={index} style={animation} className="text-cyan-500">
                {letters[index]}
              </animated.span>
            ))}
          </h1>
          
          {/* Sous-titre animé */}
          <p className={`text-blue-600 text-xl md:text-2xl mb-8 transition-all duration-2000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            L'excellence dans l'événementiel pharmaceutique
          </p>

          {/* Éléments décoratifs */}
          <div className="absolute top-1/4 left-10 w-20 h-20 bg-blue-300 rounded-full opacity-20 animate-pulse" />
          <div className="absolute top-1/3 right-20 w-16 h-16 bg-purple-300 rounded-full opacity-20 animate-pulse delay-300" />
          <div className="absolute bottom-1/3 left-20 w-24 h-24 bg-cyan-300 rounded-full opacity-20 animate-pulse delay-700" />
        </div>

        {/* Flèche de défilement animée */}
        
      </div>

      {/* Vagues animées améliorées */}
      <div className="waves absolute bottom-0 w-full h-[15vh] min-h-[100px] max-h-[150px]">
        <svg
          className="waves-svg w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            >
              <animate
                attributeName="d"
                dur="10s"
                repeatCount="indefinite"
                values="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z;
                        M-160 34c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z;
                        M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </path>
          </defs>
          <g className="parallax">
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="0"
              fill="rgba(245,245,247,0.7)"
              className="animate-wave"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(245,245,247,0.5)"
              className="animate-wave-slow"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="5"
              fill="rgba(245,245,247,0.3)"
              className="animate-wave-slower"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="7"
              fill="#f5f5f7"
              className="animate-wave-slowest"
            />
          </g>
        </svg>
      </div>

      {/* Ajout d'un effet de particules légères */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s linear infinite`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Accueil;