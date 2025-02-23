import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated, SpringValue, config } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import { supabase } from '../../utils/supabaseClient';

interface SpringStyles {
  opacity: SpringValue<number>;
  transform: SpringValue<string>;
}

const Services: React.FC = () => {
  const [refTitle, inViewTitle] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [refSubtitle, inViewSubtitle] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [refAnimation, inViewAnimation] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [refEvenements, inViewEvenements] = useInView({ triggerOnce: true, threshold: 0.2 });
  
  // State for storing image URLs from Supabase
  const [animationImageUrl, setAnimationImageUrl] = useState<string | null>(null);
  const [evenementsImageUrl, setEvenementsImageUrl] = useState<string | null>(null);
  
  // Animation pour le titre principal
  const titleStyle = useSpring({
    from: { 
      opacity: 0, 
      transform: 'translateY(-50px)',
      scale: 0.8
    },
    to: {
      opacity: inViewTitle ? 1 : 0,
      transform: inViewTitle ? 'translateY(0px)' : 'translateY(-50px)',
      scale: inViewTitle ? 1 : 0.8
    },
    config: {
      mass: 1,
      tension: 180,
      friction: 12
    }
  });

  // Animation pour le sous-titre
  const subtitleStyle = useSpring({
    from: { 
      opacity: 0, 
      transform: 'translateY(30px)'
    },
    to: {
      opacity: inViewSubtitle ? 1 : 0,
      transform: inViewSubtitle ? 'translateY(0px)' : 'translateY(30px)'
    },
    delay: 200,
    config: config.molasses
  });

  // Animations pour les blocs de service
  const animationStyle = useSpring({
    opacity: inViewAnimation ? 1 : 0,
    transform: inViewAnimation ? 'translateX(0) rotateY(0deg)' : 'translateX(-100px) rotateY(-10deg)',
    config: {
      tension: 100,
      friction: 16
    },
    delay: 300
  });

  const evenementsStyle = useSpring({
    opacity: inViewEvenements ? 1 : 0,
    transform: inViewEvenements ? 'translateX(0) rotateY(0deg)' : 'translateX(100px) rotateY(10deg)',
    config: {
      tension: 100,
      friction: 16
    },
    delay: 400
  });
  
  // Fetch images from Supabase storage
  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Get animation image
        const { data: animationData } = await supabase
          .storage
          .from('images')
          .getPublicUrl('animation.jpeg');
        
        if (animationData) {
          setAnimationImageUrl(animationData.publicUrl);
        }
        
        // Get events image
        const { data: eventsData } = await supabase
          .storage
          .from('images')
          .getPublicUrl('events.svg');
        
        if (eventsData) {
          setEvenementsImageUrl(eventsData.publicUrl);
        }
      } catch (error) {
        console.error('Error in fetching images:', error);
      }
    };
    
    fetchImages();
  }, []);

  // Fallback images if Supabase fails
  const fallbackAnimationImage = '/fallback/animation.jpeg';
  const fallbackEvenementsImage = '/fallback/events.svg';

  return (
    <div className="relative w-full min-h-screen bg-white">
      {/* Modern Geometric Background Divider */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Main geometric shape */}
        <svg 
          className="absolute w-full h-4/5"
          viewBox="0 0 1200 800" 
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f3e8ff" />
              <stop offset="100%" stopColor="#f0f9ff" />
            </linearGradient>
          </defs>
          
          {/* Base geometric shape */}
          <path 
            d="M0,0 L1200,0 L1200,600 C900,550 700,700 0,670 Z" 
            fill="url(#bgGradient)"
          />
          
          {/* Subtle accent lines */}
          <path 
            d="M0,50 C300,30 600,70 1200,40" 
            fill="none" 
            stroke="#c4b5fd" 
            strokeWidth="1" 
            opacity="0.3"
          />
          <path 
            d="M0,100 C400,80 800,120 1200,90" 
            fill="none" 
            stroke="#c4b5fd" 
            strokeWidth="1" 
            opacity="0.3"
          />
          <path 
            d="M0,150 C350,130 750,170 1200,140" 
            fill="none" 
            stroke="#c4b5fd" 
            strokeWidth="1" 
            opacity="0.3"
          />
          
          {/* Subtle accent circles */}
          <circle cx="200" cy="200" r="5" fill="#8b5cf6" opacity="0.15" />
          <circle cx="400" cy="120" r="3" fill="#8b5cf6" opacity="0.1" />
          <circle cx="600" cy="250" r="7" fill="#8b5cf6" opacity="0.1" />
          <circle cx="900" cy="180" r="4" fill="#8b5cf6" opacity="0.15" />
          <circle cx="1100" cy="240" r="6" fill="#8b5cf6" opacity="0.1" />
        </svg>
      </div>

      {/* Contenu Principal */}
      <section className="relative w-full py-20 mx-auto">
        <div className="container mx-auto text-center relative pt-4 z-10">
          {/* Titre principal animé avec effet de gradient */}
          <div className="flex justify-center items-center mb-10">
            <animated.h1
              ref={refTitle}
              style={titleStyle}
              className="text-5xl md:text-6xl font-montserrat font-bold bg-gradient-to-r from-indigo-600 via-purple-700 to-blue-800 bg-clip-text text-transparent z-10 leading-tight tracking-wider"
            >
              Préstations
            </animated.h1>
          </div>

          {/* Sous-titre avec animation */}
          <animated.div 
            ref={refSubtitle}
            style={subtitleStyle}
            className="text-xl md:text-2xl text-gray-700 px-4 md:px-12 mx-auto max-w-4xl"
          >
            <h2 className="font-montserrat text-gray-800 mb-4 text-center leading-relaxed">
              Vega Events : <span className="text-purple-600">Votre partenaire incontournable</span> pour des événements et animations inoubliables
            </h2>
          </animated.div>

          {/* Conteneur Flex pour les blocs */}
          <div className="flex flex-col md:flex-row w-full h-auto justify-center gap-8 mt-12 px-4">
            {/* Bloc Animations */}
            <ServiceBlock
              ref={refAnimation}
              to="/animation"
              image={animationImageUrl || fallbackAnimationImage}
              alt="Animations"
              title="Animations"
              style={animationStyle}
              text="Magasins de vente de parfums et produits de beauté, Salons, parcs des expositions, grandes surfaces de distribution alimentaire"
            />

            {/* Bloc Événements */}
            <ServiceBlock
              ref={refEvenements}
              to="/aboutevents"
              image={evenementsImageUrl || fallbackEvenementsImage}
              alt="Événements"
              title="Événements"
              style={evenementsStyle}
              text="Organisation d'événements artistiques : Congrès, défilés de mode, expositions d'arts plastiques, galas, mariages"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

interface ServiceBlockProps {
  to: string;
  image: string;
  alt: string;
  title: string;
  style: SpringStyles;
  text: string;
}

const ServiceBlock = React.forwardRef<HTMLAnchorElement, ServiceBlockProps>(
  ({ to, image, alt, title, style, text }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const hoverStyle = useSpring({
      scale: isHovered ? 1.05 : 1,
      shadow: isHovered ? 24 : 8,
      config: {
        mass: 1,
        tension: 200,
        friction: 20
      }
    });

    return (
      <Link
        to={to}
        ref={ref}
        className="relative w-full md:w-1/2 lg:w-2/5 h-64 md:h-96 group mx-4 rounded-xl overflow-hidden"
        aria-label={`Learn more about ${title}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <animated.div 
          style={{
            ...style,
            ...hoverStyle,
            boxShadow: hoverStyle.shadow.to(s => `0 ${s}px ${s * 2}px rgba(0, 0, 0, 0.1)`)
          }}
          className="w-full h-full rounded-xl overflow-hidden bg-white"
        >
          <div className="relative w-full h-full">
            <img
              src={image}
              alt={alt}
              className="w-full h-full object-cover object-top rounded-xl transform transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = '/fallback/fallback-image.jpg';
              }}
            />
            {/* Overlay avec titre */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70 rounded-xl flex flex-col items-center justify-between p-6 transition-opacity duration-300">
              <h3 className="text-3xl font-bold text-white text-shadow-lg tracking-wider transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                {title}
              </h3>
              
              {/* Texte avec animation de fade */}
              <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white text-lg font-light leading-relaxed">
                  {text}
                </p>
              </div>
            </div>
          </div>
        </animated.div>
      </Link>
    );
  }
);

ServiceBlock.displayName = 'ServiceBlock';

export default Services;