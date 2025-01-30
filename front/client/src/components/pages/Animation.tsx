import { useState, useRef, useEffect } from 'react';

const Animations = () => {
  const [introVisible, setIntroVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const introRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === introRef.current && entry.isIntersecting) {
            setIntroVisible(true);
          }
          if (entry.target === textRef.current && entry.isIntersecting) {
            setTextVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = introRef.current;
    const currentTextRef = textRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    if (currentTextRef) {
      observer.observe(currentTextRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      if (currentTextRef) {
        observer.unobserve(currentTextRef);
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100">
      <section className="container mx-auto px-4 py-16 lg:py-24">
        {/* Section Introduction */}
        <div
          ref={introRef}
          className={`
            max-w-4xl mx-auto space-y-8 text-center mb-20
            ${introVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}
            transition-all duration-1000 ease-out
          `}
          aria-hidden={!introVisible}
        >
          <h1 className="text-4xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            Votre succès est notre mission
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Des solutions personnalisées pour mettre en valeur vos produits, 
            dynamiser vos ventes et fidéliser votre clientèle grâce à notre personnel qualifié.
          </p>
        </div>

        {/* Section Contenu Principal */}
        <div className="p-8 mt-16">
          <div className="flex justify-center items-center max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 items-center justify-center w-full">
              {/* Image à gauche */}
              <div className="flex justify-center mb-4 lg:mb-0">
                <img
                  src="/animation.svg"
                  alt="Illustration"
                  className="h-auto rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-500"
                  width="400"
                  height="400"
                />
              </div>

              {/* Texte à droite avec animations de fondu et montée */}
              <div
                ref={textRef}
                className={`
                  relative max-w-2xl lg:max-w-xl w-full
                  ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                  transition-all duration-1000 ease-out transform
                `}
              >
                {/* Fond avec dégradé et ombre */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-200 rounded-lg shadow-2xl transform -rotate-3"></div>
                <div className="relative z-10 p-8 space-y-6 bg-white/90 backdrop-blur-sm rounded-lg border border-white/20 shadow-lg">
                  {/* Titre avec animation */}
                  <h2 className="text-4xl font-bold text-purple-700 mb-6 tracking-wide transform transition-all duration-800 hover:scale-105">
                    Vous avez les produits, nous avons le savoir-vendre
                  </h2>

                  {/* Paragraphes avec espacement et taille de police améliorés */}
                  <div className="space-y-6 text-gray-700">
                    <p className="text-lg leading-relaxed tracking-wide">
                      Notre indéniable expérience acquise et le fruit de plusieurs années
                      de travail sur le terrain en contact direct avec les clients et tous
                      les acteurs partenaires et responsables nous ont permis de comprendre
                      la complexité de leurs attentes.
                    </p>
                    <p className="text-lg leading-relaxed tracking-wide">
                      Ainsi, nous avons pu faire une analyse objective et rationnelle,
                      créant un climat favorable à la vente. Une communication de qualité,
                      une vente fondée sur le respect, l'écoute du client et répondre à
                      ses attentes dans un milieu où le professionnalisme est de mise.
                    </p>  
                    <p className="text-lg leading-relaxed tracking-wide">
                      VEGA EVENTS s'engage à faire connaître votre produit,
                      le vendre et fidéliser la clientèle grâce à notre approche
                      professionnelle et rigoureuse.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Animations;
