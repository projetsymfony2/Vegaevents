import React from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated, SpringValue, config } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';

// Importation des images
import animationImage from '../../assets/animation.jpeg';
import evenementsImage from '../../assets/events.svg';

interface SpringStyles {
  opacity: SpringValue<number>;
  transform: SpringValue<string>;
}

const Services: React.FC = () => {
  const [refTitle, inViewTitle] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [refSubtitle, inViewSubtitle] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [refAnimation, inViewAnimation] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [refEvenements, inViewEvenements] = useInView({ triggerOnce: true, threshold: 0.2 });

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

  return (
    <section className="relative w-full py-20 mx-auto ">
      <div className="container mx-auto text-center relative pt-4">
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
            image={animationImage}
            alt="Animations"
            title="Animations"
            style={animationStyle}
            text="Magasins de vente de parfums et produits de beauté, Salons, parcs des expositions, grandes surfaces de distribution alimentaire"
          />

          {/* Bloc Événements */}
          <ServiceBlock
            ref={refEvenements}
            to="/aboutevents"
            image={evenementsImage}
            alt="Événements"
            title="Événements"
            style={evenementsStyle}
            text="Organisation d'événements artistiques : Congrès, défilés de mode, expositions d'arts plastiques, galas, mariages"
          />
        </div>
      </div>
    </section>
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
                e.currentTarget.src = 'path/to/fallback-image.jpg';
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