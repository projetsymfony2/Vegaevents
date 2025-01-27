import React, { useEffect, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

const Header: React.FC = () => { // Supprimez l'interface HeaderProps
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Animation pour le titre avec React Spring
  const titleAnimation = useSpring({
    from: { opacity: 0, transform: 'scale(0.7) translateY(50px)' },
    to: { opacity: 1, transform: 'scale(1) translateY(0)' },
    config: { tension: 120, friction: 14, mass: 1 },
    delay: 200,
    immediate: typeof window !== 'undefined' && window.innerWidth < 768,
  });

  // Effet de parallaxe avec GSAP
  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    if (parallaxRef.current) {
      const parallaxElement = parallaxRef.current;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parallaxElement,
          start: '0% 0%',
          end: '100% 0%',
          scrub: 0,
        },
      });

      const layers = [
        { layer: '1', yPercent: 70 },
        { layer: '2', yPercent: 55 },
        { layer: '3', yPercent: 40 },
        { layer: '4', yPercent: 10 },
      ];

      layers.forEach((layerObj, idx) => {
        const elements = parallaxElement.querySelectorAll(
          `[data-parallax-layer="${layerObj.layer}"]`
        );
        if (elements) {
          tl.to(
            elements,
            {
              yPercent: layerObj.yPercent,
              ease: 'none',
            },
            idx === 0 ? undefined : '<'
          );
        }
      });
    }

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) => trigger.kill());
    };
  }, []);

  return (
    <header className="relative w-full h-screen overflow-hidden">
      {/* Section de parallaxe */}
      <div className="parallax" ref={parallaxRef}>
        <section className="parallax__header">
          <div className="parallax__visuals relative z-0">
            <div className="parallax__black-line-overflow"></div>
            <div data-parallax-layers className="parallax__layers">
              <img
                src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795be09b462b2e8ebf71_osmo-parallax-layer-3.webp"
                loading="eager"
                width="800"
                data-parallax-layer="1"
                alt=""
                className="parallax__layer-img"
              />
              <img
                src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795b4d5ac529e7d3a562_osmo-parallax-layer-2.webp"
                loading="eager"
                width="800"
                data-parallax-layer="2"
                alt=""
                className="parallax__layer-img"
              />
              <div data-parallax-layer="3" className="parallax__layer-title">
                <animated.h2
                  style={titleAnimation}
                  className="parallax__title -mt-20 text-transparent bg-clip-text font-montserrat text-7xl bg-gradient-to-r bg-white"
                >
                  Bienvenue sur Vega Events
                </animated.h2>
              </div>
              <img
                src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795bb5aceca85011ad83_osmo-parallax-layer-1.webp"
                loading="eager"
                width="800"
                data-parallax-layer="4"
                alt=""
                className="parallax__layer-img"
              />
            </div>
            <div className="parallax__fade"></div>
          </div>
        </section>
      </div>
    </header>
  );
};

export default Header;