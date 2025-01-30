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
  const [visibleParagraphs, setVisibleParagraphs] = useState<Set<string>>(new Set());
  const introRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const paragraphRefs = useRef<(HTMLLIElement | null)[]>([]);

  const setSectionRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    sectionRefs.current[index] = el;
  }, []);

  const setParagraphRef = useCallback((index: number, sectionIndex: number) => (el: HTMLLIElement | null) => {
    paragraphRefs.current[sectionIndex * 10 + index] = el;
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
          } else {
            const paragraphIndex = paragraphRefs.current.findIndex(ref => ref === entry.target);
            if (paragraphIndex !== -1 && entry.isIntersecting) {
              setVisibleParagraphs(prev => new Set([...prev, paragraphIndex.toString()]));
              observer.unobserve(entry.target);
            }
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

    paragraphRefs.current.forEach(ref => {
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
        <h1 className="text-3xl md:text-6xl font-montserrat font-bold bg-gradient-to-r from-indigo-600 via-purple-700 to-blue-800 bg-clip-text text-transparent z-10 leading-tight tracking-wider">
          L'Expertise au Service de vos Animations et Événements
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Nous vous offrons des solutions personnalisées pour rendre chaque événement unique et
          inoubliable.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full justify-items-center max-w-7xl mx-auto">
        {sections.map((section, sectionIndex) => (
          <div
            key={section.title}
            ref={setSectionRef(sectionIndex)}
            className={`
              bg-gradient-to-b from-white via-gray-50 to-gray-100 rounded-2xl shadow-xl p-6 w-full
              transform transition-all duration-700 ease-in-out
              ${visibleSections.has(sectionIndex) 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'}
            `}
            aria-hidden={!visibleSections.has(sectionIndex)}
          >
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 mb-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
                <span className="text-xl font-bold text-white">
                  {sectionIndex + 1}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                {section.title}
              </h2>
              <ul className="space-y-3 text-gray-700">
                {section.content.map((item, paragraphIndex) => (
                  <li 
                    key={paragraphIndex}
                    ref={setParagraphRef(paragraphIndex, sectionIndex)}
                    className={`
                      text-base flex items-start leading-relaxed
                      transition-all duration-700 ease-in-out transform
                      ${visibleParagraphs.has((sectionIndex * 10 + paragraphIndex).toString()) 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-6'}
                    `}
                    aria-hidden={!visibleParagraphs.has((sectionIndex * 10 + paragraphIndex).toString())}
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
