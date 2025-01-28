// src/RecruitmentPage.tsx
import React, { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';

const RecruitmentPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

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
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setMessage('Veuillez sélectionner un fichier.');
      return;
    }

    setUploading(true);
    setMessage(null);

    try {
      const fileName = `${Date.now()}-${file.name}`;
      const { error } = await supabase.storage
        .from('cv-bucket')
        .upload(fileName, file);

      if (error) {
        throw error;
      }

      setMessage('CV téléchargé avec succès !');
      setFile(null);
    } catch (error) {
      console.error('Erreur lors du téléchargement du fichier :', error);
      setMessage('Erreur lors du téléchargement du fichier.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Postuler chez Nous
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="cv"
              className="block text-sm font-medium text-gray-700"
            >
              Téléchargez votre CV (PDF uniquement, max 5 Mo) :
            </label>
            <div className="mt-1">
              <input
                type="file"
                id="cv"
                accept=".pdf"
                onChange={handleFileChange}
                disabled={uploading}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={uploading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              {uploading ? 'Téléchargement en cours...' : 'Envoyer'}
            </button>
          </div>
        </form>
        {message && (
          <p
            className={`mt-4 text-sm text-center ${
              message.includes('Erreur') ? 'text-red-600' : 'text-green-600'
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default RecruitmentPage;