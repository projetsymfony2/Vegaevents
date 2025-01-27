import React from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated, SpringValue } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';

// Importation des images
import animationImage from '../../assets/animation.jpeg';
import evenementsImage from '../../assets/evenements.jpg';

// Typage des styles React Spring
interface SpringStyles {
  opacity: SpringValue<number>;
  transform: SpringValue<string>;
}

// Supprimez l'interface ServicesProps
const Services: React.FC = () => {
  const [refTitle, inViewTitle] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [refAnimation, inViewAnimation] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [refEvenements, inViewEvenements] = useInView({ triggerOnce: true, threshold: 0.2 });

  const commonAnimationConfig = { tension: 120, friction: 14, mass: 1 };

  const titleStyle = useSpring({
    opacity: inViewTitle ? 1 : 0,
    transform: inViewTitle ? 'translateY(0)' : 'translateY(-20px)',
    config: commonAnimationConfig,
  });

  const animationStyle = useSpring({
    opacity: inViewAnimation ? 1 : 0,
    transform: inViewAnimation ? 'translateX(0)' : 'translateX(-100%)',
    config: commonAnimationConfig,
  });

  const evenementsStyle = useSpring({
    opacity: inViewEvenements ? 1 : 0,
    transform: inViewEvenements ? 'translateX(0)' : 'translateX(100%)',
    config: commonAnimationConfig,
  });

  return (
    <section className="w-4/5 py-40  mx-auto">
      <div className="container mx-auto text-center relative pt-4">
        {/* Texte animé - Centré en haut */}
        <div className="flex justify-center items-start">
          <animated.h1
            ref={refTitle}
            style={titleStyle}
            className="text-4xl md:text-5xl font-montserrat text-gray-800 z-10 "
          >
            Préstations
          </animated.h1>
          
        </div>

        {/* Conteneur Flex pour les blocs */}
        <div className="flex flex-col md:flex-row w-full  h-auto justify-center gap-8 mt-24">
          {/* Bloc Animations */}
          <ServiceBlock
            ref={refAnimation}
            to="/aboutanimation"
            image={animationImage}
            alt="Animations"
            title="Animations"
            style={animationStyle}
          />

          {/* Bloc Événements */}
          <ServiceBlock
            ref={refEvenements}
            to="/aboutevents"
            image={evenementsImage}
            alt="Événements"
            title="Événements"
            style={evenementsStyle}
          />
        </div>
      </div>
    </section>
  );
};

// Typage des props pour ServiceBlock
interface ServiceBlockProps {
  to: string;
  image: string;
  alt: string;
  title: string;
  style: SpringStyles;
}

// Composant ServiceBlock avec forwardRef et typage
const ServiceBlock = React.forwardRef<HTMLAnchorElement, ServiceBlockProps>(
  ({ to, image, alt, title, style }, ref) => (
    <Link
      to={to}
      ref={ref}
      className="relative w-full md:w-1/2 lg:w-2/5 h-64 md:h-96 transition-all group mx-4 rounded-xl overflow-hidden"
      aria-label={`Learn more about ${title}`}
    >
      <animated.div style={style} className="w-full h-full rounded-xl">
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover rounded-xl transform transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'path/to/fallback-image.jpg'; // Fallback image
          }}
        />
        {/* Titre toujours visible */}
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/30 rounded-xl">
          <h3 className="text-2xl font-light text-white absolute bottom-8 left-8">
            {title}
          </h3>
        </div>
      </animated.div>
    </Link>
  )
);

// Nom du composant pour le débogage
ServiceBlock.displayName = 'ServiceBlock';

export default Services;