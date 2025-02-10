import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSpring, animated, useTrail } from '@react-spring/web';

interface Image {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const images: Image[] = [
  { src: '/api/placeholder/300/200', alt: 'Image 1', width: 300, height: 200 },
  { src: '/api/placeholder/400/250', alt: 'Image 2', width: 400, height: 250 },
  { src: '/api/placeholder/500/300', alt: 'Image 3', width: 500, height: 300 },
  { src: '/api/placeholder/350/200', alt: 'Image 4', width: 350, height: 200 },
  { src: '/api/placeholder/450/300', alt: 'Image 5', width: 450, height: 300 },
  { src: '/api/placeholder/600/400', alt: 'Image 6', width: 600, height: 400 },
];

const Gallery: React.FC = () => {
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Use useTrail instead of multiple useSpring calls
  const trail = useTrail(images.length, {
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(50px)' },
    config: { tension: 180, friction: 20 },
    delay: 100,
    // Only start animation when image becomes visible
    immediate: index => !visibleImages.has(index)
  });

  const setImageRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    imageRefs.current[index] = el;
  }, []);

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const imageIndex = imageRefs.current.findIndex(ref => ref === entry.target);
        if (imageIndex !== -1 && entry.isIntersecting) {
          setVisibleImages(prev => new Set([...prev, imageIndex]));
        }
      });
    }, observerOptions);

    imageRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="container mx-auto py-20 px-4">
      <h2 className="text-4xl text-center font-semibold mb-12">Notre Galerie</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {trail.map((style, index) => (
          <animated.div
            key={index}
            ref={setImageRef(index)}
            style={style}
            className="overflow-hidden rounded-lg shadow-lg"
          >
            <img
              src={images[index].src}
              alt={images[index].alt}
              className="w-full h-full object-cover rounded-lg transition-transform duration-500 ease-in-out"
            />
          </animated.div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;   