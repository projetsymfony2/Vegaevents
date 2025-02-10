import React, { useRef, useMemo, useState, useEffect } from 'react';
import About from '../organisms/About';
import Services from '../organisms/Services';
import ClientReviews from '../organisms/ClientReview';
import Button from '../atoms/btviewmore';
import Homepage from '../Acceuil';
import PageContact from '../pages/PageContact';
import Personnel from '../organisms/Personnel';

const Home: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const personnelRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const clientReviewsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const sectionsRefs = useMemo(() => [
    headerRef, 
    aboutRef, 
    personnelRef,  // Ajout de la section "Personnel"
    servicesRef, 
    clientReviewsRef, 
    contactRef
  ], []);
  const [visibleSectionIndex, setVisibleSectionIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionsRefs.findIndex((ref) => ref.current === entry.target);
            if (index !== -1) {
              setVisibleSectionIndex(index);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

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
  }, [sectionsRefs]);

  const scrollToNextSection = () => {
    const nextSectionIndex = (visibleSectionIndex + 1) % sectionsRefs.length;
    const nextSectionRef = sectionsRefs[nextSectionIndex];

    if (nextSectionRef.current) {
      nextSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isLastSection = visibleSectionIndex === sectionsRefs.length - 1;

  return (
    <div className="flex flex-col justify-start">
      <div ref={headerRef}>
        <Homepage />
      </div>
      <div ref={aboutRef} id="about">
        <About />
      </div>
      <div ref={personnelRef}>
        <Personnel />
      </div>
      <div ref={servicesRef}>
        <Services />
      </div>
      <div ref={clientReviewsRef}>
        <ClientReviews />
      </div>
      <div ref={contactRef}>
        <PageContact />
      </div>
      
      {!isLastSection && (
        <div className="fixed bottom-4 right-10 z-20">
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
