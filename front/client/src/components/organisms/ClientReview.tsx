import React, { useEffect, useRef, useState } from 'react';

interface Testimonial {
  name: string;
  role: string;
  comment: string;
}

const TestimonialsSection: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const testimonials: Testimonial[] = [
    {
      name: 'Jean Dupont',
      role: 'Pharmacien',
      comment: 'Service impeccable, une équipe très professionnelle qui a su répondre à tous nos besoins pour notre événement annuel.',
    },
    {
      name: 'Marie Lemoine',
      role: 'Directrice Marketing',
      comment: 'Une très bonne organisation et un suivi constant. Leur expertise a fait toute la différence dans la réussite de notre projet.',
    },
    {
      name: 'Paul Morel',
      role: 'Gérant',
      comment: 'Merci à Vega Events pour leur travail exceptionnel. Leur créativité et leur professionnalisme ont dépassé nos attentes.',
    },
    {
      name: 'Claire Fontaine',
      role: 'Responsable Communication',
      comment: 'Une équipe à lécoute qui sait sadapter aux besoins spécifiques de chaque client. Une collaboration très enrichissante.',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = itemRefs.current.indexOf(entry.target as HTMLDivElement);
          if (index !== -1) {
            setVisibleItems((prev) => {
              const newSet = new Set(prev);
              if (entry.isIntersecting) {
                newSet.add(index);
              }
              return newSet;
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '50px',
      }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className=" py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-montserrat font-bold bg-gradient-to-r from-indigo-600 via-purple-700 to-blue-800 bg-clip-text text-transparent z-10 leading-tight tracking-wider">
            Ils nous font confiance
          </h2>
          <p className="text-xl text-gray-600">
            Découvrez ce que nos clients disent de notre collaboration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              className={`
                bg-white p-8 rounded-xl shadow-lg
                transform transition-all duration-700 ease-out
                ${visibleItems.has(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'}
              `}
              style={{
                transitionDelay: `${index * 150}ms`
              }}
            >
              <div className="relative">
                <span className="text-6xl text-gray-200 absolute -top-4 left-0">"</span>
                <p className="text-gray-700 text-lg relative z-10 pt-4 mb-6">
                  {testimonial.comment}
                </p>
                <div className="flex items-center mt-6">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-xl font-semibold text-gray-600">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;