import { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Evenements = () => {
  const [introVisible, setIntroVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const introRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<SwiperType>();

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
    <main className="min-h-screen bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500">
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
          <h1 className="text-4xl lg:text-6xl font-extrabold text-white bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-200 drop-shadow-lg">
            Votre partenaire pour des événements réussis
          </h1>
          <p className="text-xl text-white leading-relaxed">
            Confiez-nous l'organisation de vos événements, et laissez-nous créer des moments exceptionnels qui marqueront les esprits.
          </p>
        </div>

        {/* Section Contenu Principal avec Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {/* Texte à gauche avec animations de fondu et montée */}
          <div
            ref={textRef}
            className={`
              relative w-full
              ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              transition-all duration-1000 ease-out transform
            `}
          >
            {/* Fond avec dégradé et ombre */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-blue-300 to-indigo-400 rounded-lg shadow-2xl transform -rotate-3"></div>
            <div className="relative z-10 p-8 space-y-6 bg-white/90 backdrop-blur-sm rounded-lg border border-white/20 shadow-lg">
              <h2 className="text-4xl font-bold text-blue-800 mb-6 tracking-wide transform transition-all duration-800 hover:scale-105">
                Vous avez les produits, nous avons le savoir-vendre
              </h2>

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

          {/* Carrousel à droite */}
          <div className="relative w-full h-[400px] flex items-center mt-24">
            <Swiper
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation, Pagination, Mousewheel]}
              direction="vertical"
              loop={true}
              spaceBetween={30}
              mousewheel={true}
              pagination={{
                clickable: true,
                el: '.swiper-pagination',
                type: 'bullets',
              }}
              className="w-full h-full rounded-lg"
            >
              <SwiperSlide>
                <div className="bg-indigo-50 rounded-lg h-full w-full flex justify-center items-center">
                  <span className="text-3xl font-semibold text-indigo-600">Slide 1</span>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="bg-indigo-50 rounded-lg h-full w-full flex justify-center items-center">
                  <span className="text-3xl font-semibold text-indigo-600">Slide 2</span>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="bg-indigo-50 rounded-lg h-full w-full flex justify-center items-center">
                  <span className="text-3xl font-semibold text-indigo-600">Slide 3</span>
                </div>
              </SwiperSlide>
              <div className="swiper-pagination absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-10"></div>
            </Swiper>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Evenements;


