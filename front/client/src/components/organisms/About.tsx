import React, { useState, useEffect, useRef, useCallback } from 'react';

// Définir les types
interface Section {
  title: string;
  content: string[];
}

// Données des sections
const sections: Section[] = [
  {
    title: 'Nos Services',
    content: [
      'Animations en pharmacie adaptées à vos besoins.',
      'Organisation complète d’événements professionnels.',
      'Conseils et accompagnement personnalisés.',
    ],
  },
  {
    title: 'Nos Valeurs',
    content: [
      'Engagement envers la qualité et la satisfaction.',
      'Innovation pour des expériences uniques.',
      'Professionnalisme et transparence dans nos services.',
    ],
  },
  {
    title: 'Pourquoi Nous Choisir ?',
    content: [
      'Une équipe d’experts passionnés à votre écoute.',
      'Des solutions sur-mesure pour vos projets.',
      'Des résultats à la hauteur de vos attentes.',
    ],
  },
];

const About: React.FC = () => {
  const [introVisible, setIntroVisible] = useState<boolean>(false);
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
  const introRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Gestion des références avec useCallback
  const setSectionRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    sectionRefs.current[index] = el;
  }, []);

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void => {
      entries.forEach((entry) => {
        if (entry.target === introRef.current && entry.isIntersecting) {
          setIntroVisible(true);
          observer.unobserve(entry.target);
        } else {
          const sectionIndex = sectionRefs.current.findIndex(ref => ref === entry.target);
          if (sectionIndex !== -1 && entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, sectionIndex]));
            observer.unobserve(entry.target);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    if (introRef.current) {
      observer.observe(introRef.current);
    }

    sectionRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="container h-max mx-auto px-4 pt-28">
      {/* Introduction Section */}
      <div
        ref={introRef}
        className={`
          space-y-6 text-center mb-16 relative
          transition-all duration-1000 ease-in-out transform
          ${introVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}
        aria-hidden={!introVisible}
      >
        {/* Image décorative */}
        {/* <img 
          src="/Calendar_object.svg" 
          alt="Objet calendrier décoratif" 
          className="fixed w-32 h-32 top-24 right-0  transform -translate-x-1/2" 
        /> */}

        {/* Titre et texte */}
        <h1 className="text-3xl md:text-5xl font-montserrat text-gray-900">
          L'Expertise au Service de vos Animations et Événements
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Nous vous offrons des solutions personnalisées pour rendre chaque événement unique et
          inoubliable.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full justify-items-center max-w-7xl mx-auto">
        {sections.map((section, index) => (
          <div
            key={section.title}
            ref={setSectionRef(index)}
            className={`
              bg-white rounded-xl shadow-lg p-8 max-w-xs w-full
              transform transition-all duration-700 ease-in-out
              ${visibleSections.has(index) 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'}
            `}
            aria-hidden={!visibleSections.has(index)}
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-2xl text-blue-600">
                  {index + 1}
                </span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {section.title}
              </h2>
              <ul className="space-y-3">
                {section.content.map((item, idx) => (
                  <li 
                    key={idx}
                    className="text-gray-600 text-lg flex items-start"
                  >
                    <span className="block">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;