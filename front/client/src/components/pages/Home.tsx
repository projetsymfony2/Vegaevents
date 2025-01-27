import React, { useRef, useState, useEffect, useMemo } from 'react';
import About from '../organisms/About';
import Services from '../organisms/Services';
import ClientReviews from '../organisms/ClientReview';
import Button from '../atoms/btviewmore';
import Homepage from '../Acceuil';
import PageContact from '../pages/PageContact';

const Home: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null); // Référence pour Header
  const aboutRef = useRef<HTMLDivElement>(null); // Référence pour About
  const servicesRef = useRef<HTMLDivElement>(null); // Référence pour Services
  const clientReviewsRef = useRef<HTMLDivElement>(null); // Référence pour ClientReviews
  const contactRef = useRef<HTMLDivElement>(null); // Référence pour Contact

  // Utiliser useMemo pour stabiliser sectionsRefs
  const sectionsRefs = useMemo(
    () => [headerRef, aboutRef, servicesRef, clientReviewsRef, contactRef], // Inclure toutes les sections
    [headerRef, aboutRef, servicesRef, clientReviewsRef, contactRef] // Dépendances de useMemo
  );

  const [visibleSectionIndex, setVisibleSectionIndex] = useState(0);

  // Détecter la section actuellement visible
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Déclencher lorsque 50% de la section est visible
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sectionsRefs.findIndex((ref) => ref.current === entry.target);
          if (index !== -1) {
            setVisibleSectionIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    sectionsRefs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      sectionsRefs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [sectionsRefs]); // sectionsRefs est maintenant stable

  // Fonction pour faire défiler vers la section suivante
  const scrollToNextSection = () => {
    const nextSectionIndex = (visibleSectionIndex + 1) % sectionsRefs.length;
    const nextSectionRef = sectionsRefs[nextSectionIndex];

    if (nextSectionRef.current) {
      nextSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Vérifier si l'utilisateur est sur la dernière section
  const isLastSection = visibleSectionIndex === sectionsRefs.length - 1;

  return (
    <div className="flex flex-col justify-start">
      {/* En-tête avec effet de parallaxe */}
      <div ref={headerRef}>
        <Homepage />
      </div>

      {/* Section "À propos" */}
      <div ref={aboutRef}>
        <About />
      </div>

      {/* Section "Services" */}
      <div ref={servicesRef}>
        <Services />
      </div>

      {/* Section "Avis Clients" */}
      <div ref={clientReviewsRef}>
        <ClientReviews />
      </div>

      {/* Section "Contact" */}
      <div ref={contactRef}>
        <PageContact />
      </div>

      {/* Bouton fixe en bas à droite */}
      {!isLastSection && ( // Masquer le bouton sur la dernière section
        <div className="fixed bottom-4 right-10 z-20"> {/* Changé de left-10 à right-10 */}
          <Button
            onClick={scrollToNextSection}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-12 w-12"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            }
            ariaLabel="Voir la section suivante"
          />
        </div>
      )}
    </div>
  );
};

export default Home;