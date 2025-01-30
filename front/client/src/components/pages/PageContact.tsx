import { useState, useRef, useEffect } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import ContactForm from './Contacts';

const PageContact = () => {
  const [contentVisible, setContentVisible] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setContentVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = contentRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div 
        ref={contentRef}
        className={`
          mt-24 max-w-6xl mx-auto px-4
          ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          transition-all duration-1000 ease-out
        `}
      >
        {/* En-tête */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            Contactez-nous
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Vous avez un projet ou une idée à développer ? Notre équipe est là pour vous accompagner dans sa réalisation.
          </p>
        </div>

        {/* Conteneur principal */}
        <div className="flex flex-col lg:flex-row lg:space-x-12 space-y-12 lg:space-y-0">
          {/* Partie gauche: Informations de contact */}
          <div className="flex-1 relative">
            {/* Fond décoratif */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl shadow-xl transform -rotate-2"></div>
            
            {/* Contenu */}
            <div className="relative z-10 p-10 bg-white/90 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Nos coordonnées
              </h2>

              {/* Liste des contacts */}
              <div className="space-y-6">
                <a href="mailto:contact@vegaevents.com" className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition-colors group">
                  <div className="h-12 w-12 flex items-center justify-center bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-700 font-medium">contact@vegaevents.com</p>
                  </div>
                </a>

                <a href="tel:+336789898989" className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition-colors group">
                  <div className="h-12 w-12 flex items-center justify-center bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Téléphone</p>
                    <p className="text-gray-700 font-medium">+33 6 78 89 89 89</p>
                  </div>
                </a>

                <div className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition-colors group">
                  <div className="h-12 w-12 flex items-center justify-center bg-indigo-100 rounded-full group-hover:bg-indigo-200 transition-colors">
                    <MapPin className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Adresse</p>
                    <p className="text-gray-700 font-medium">13 rue rosa parks, Paris 75000</p>
                  </div>
                </div>
              </div>

              {/* Réseaux sociaux */}
              <div className="pt-8 border-t border-gray-200">
                <h3 className="text-gray-600 font-medium mb-4">Suivez-nous</h3>
                <div className="flex space-x-4">
                  {/* Instagram, LinkedIn, Facebook */}
                  <a
                    href="https://www.instagram.com"
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition-opacity"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      stroke="none"
                    >
                      <path d="M12 2.2c3.26 0 5.8 2.56 5.8 5.8 0 3.26-2.54 5.8-5.8 5.8-3.24 0-5.8-2.54-5.8-5.8 0-3.24 2.56-5.8 5.8-5.8zm0 9c1.8 0 3.25-1.45 3.25-3.25 0-1.8-1.45-3.25-3.25-3.25-1.8 0-3.25 1.45-3.25 3.25 0 1.8 1.45 3.25 3.25 3.25z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com"
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition-opacity"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      stroke="none"
                    >
                      <path d="M4.25 2C3.56 2 3 2.56 3 3.25v17.5C3 21.44 3.56 22 4.25 22h15.5c.69 0 1.25-.56 1.25-1.25V3.25c0-.69-.56-1.25-1.25-1.25h-15.5zm.5 17h14v-9h-3.6v2h1.1v7zm0 0h14V6h-14v9H4.75v2H8v7H5.25z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com"
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition-opacity"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      stroke="none"
                    >
                      <path d="M12 2.2c3.26 0 5.8 2.56 5.8 5.8 0 3.26-2.54 5.8-5.8 5.8-3.24 0-5.8-2.54-5.8-5.8 0-3.24 2.56-5.8 5.8-5.8zm0 9c1.8 0 3.25-1.45 3.25-3.25 0-1.8-1.45-3.25-3.25-3.25-1.8 0-3.25 1.45-3.25 3.25 0 1.8 1.45 3.25 3.25 3.25z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Partie droite: Formulaire */}
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl shadow-xl transform rotate-2"></div>
           
              <ContactForm />
            </div>
          
        </div>
      </div>
    </div>
  );
};

export default PageContact;
