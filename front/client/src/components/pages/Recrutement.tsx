import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';

const RecruitmentPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [contentVisible, setContentVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'application/pdf') {
        setMessage('Veuillez sélectionner un fichier PDF.');
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        setMessage('Le fichier ne doit pas dépasser 5 Mo.');
        return;
      }
      setFile(selectedFile);
      setMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !fullName || !phoneNumber) {
      setMessage('Veuillez remplir tous les champs (Nom, Numéro de téléphone et CV).');
      return;
    }
    setUploading(true);
    setMessage(null);
    try {
      const fileName = `${Date.now()}-${file.name}`;
      const { error } = await supabase.storage
        .from('cv-bucket')
        .upload(fileName, file);
      if (error) throw error;

      // Vous pouvez ici appeler votre API pour envoyer `fullName` et `phoneNumber` avec l'URL du fichier
      // par exemple, avec fetch ou Axios

      setMessage('CV téléchargé avec succès !');
      setFile(null);
      setFullName('');
      setPhoneNumber('');
    } catch (error) {
      console.error('Erreur lors du téléchargement du fichier :', error);
      setMessage('Erreur lors du téléchargement du fichier.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100">
      <section className="container mx-auto px-4 py-16 lg:py-24">
        {/* Section Introduction */}
        <div
          className={`
            max-w-4xl mx-auto space-y-8 text-center mb-20
            opacity-100 translate-x-0 transition-all duration-1000 ease-out
          `}
        >
          <h1 className="text-4xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            Rejoignez Notre Équipe
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Découvrez les opportunités qui vous attendent et participez à l'aventure 
            en partageant votre expérience avec nous.
          </p>
        </div>

        {/* Section Formulaire */}
        <div className="mt-8">
          <div className="flex justify-center items-center max-w-7xl mx-auto">
            <div
              ref={contentRef}
              className={`
                relative max-w-2xl w-full
                ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                transition-all duration-1000 ease-out transform
              `}
            >
              {/* Fond avec dégradé et ombre */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-200 rounded-lg shadow-2xl transform -rotate-2"></div>
              
              {/* Contenu du formulaire */}
              <div className="relative z-10 p-8 space-y-6 bg-white/90 backdrop-blur-sm rounded-lg border border-white/20 shadow-lg">
                <h2 className="text-2xl font-bold text-purple-700 mb-6 tracking-wide">
                  Déposez votre candidature
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Champ Nom */}
                  <div className="space-y-4">
                    <label
                      htmlFor="fullName"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Nom Complet
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                  </div>

                  {/* Champ Numéro de téléphone */}
                  <div className="space-y-4">
                    <label
                      htmlFor="phoneNumber"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Numéro de téléphone
                    </label>
                    <input
                      type="text"
                      id="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                  </div>

                  {/* Zone de dépôt de fichier stylisée */}
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-purple-400 transition-colors duration-300">
                    <div className="space-y-2 text-center">
                      <div className="flex text-sm text-gray-600">
                        <input
                          type="file"
                          id="cv"
                          accept=".pdf"
                          onChange={handleFileChange}
                          disabled={uploading}
                          className="sr-only"
                        />
                        <label
                          htmlFor="cv"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
                        >
                          <div className="flex flex-col items-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span className="mt-2">{file ? file.name : 'Sélectionner un fichier'}</span>
                          </div>
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">
                        PDF jusqu'à 5MB
                      </p>
                    </div>
                  </div>

                  {/* Bouton Submit */}
                  <button
                    type="submit"
                    disabled={uploading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 transition-all duration-300 transform hover:scale-105"
                  >
                    {uploading ? 'Téléchargement en cours...' : 'Envoyer ma candidature'}
                  </button>
                </form>

                {/* Message de retour */}
                {message && (
                  <div
                    className={`mt-4 p-4 rounded-lg text-center text-sm font-medium transition-all duration-300 ${
                      message.includes('Erreur')
                        ? 'bg-red-100 text-red-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RecruitmentPage;
