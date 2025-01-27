import React from 'react';

const AboutEvents: React.FC = () => {
  // Contenu des événements
  const eventDetails = [
    'Événements personnalisés pour chaque client.',
    'Gestion complète de l’événement de A à Z.',
    'Solutions créatives adaptées à vos besoins.',
    'Équipe de professionnels dédiée à la réussite de votre projet.',
  ];
  

  const testimonials = [
    {
      name: 'Jean Dupont',
      feedback: 'Vega Events a organisé notre conférence annuelle et tout s’est parfaitement déroulé. Ils sont très professionnels et réactifs.',
    },
    {
      name: 'Marie Leclerc',
      feedback: 'Un événement mémorable! L’équipe a su répondre à nos attentes et offrir une expérience inoubliable à nos invités.',
    },
  ];

  return (
    <section className="w-full bg-gray-50 py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Nos Événements</h2>
        
        {/* Détails sur les événements */}
        <div className="space-y-6 mb-12">
          {eventDetails.map((detail, index) => (
            <p key={index} className="text-lg text-gray-700">{detail}</p>
          ))}
        </div>

        {/* Témoignages */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Ce que nos clients disent de nous</h3>
          <div className="flex flex-col items-center space-y-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto">
                <p className="text-lg italic text-gray-600">"{testimonial.feedback}"</p>
                <p className="mt-4 text-md font-bold text-gray-800">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutEvents;
