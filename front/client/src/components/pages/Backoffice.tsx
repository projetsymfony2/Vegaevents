// src/components/pages/Backoffice.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/useAuth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';
import CvList from '../organisms/CvList'; // Importe le composant CvList

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
}

// src/components/pages/Backoffice.tsx
interface CVFile {
  name: string;
  created_at: string;
}

const Backoffice: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [cvFiles, setCvFiles] = useState<CVFile[]>([]); // État pour les fichiers CV
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fonction pour récupérer les messages depuis Supabase
  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setMessages(data || []);
    } catch (err) {
      console.error('Erreur lors de la récupération des messages:', err);
      setError('Erreur lors de la récupération des messages');
    }
  };

  // Fonction pour récupérer les fichiers CV depuis Supabase Storage
  const fetchCVFiles = async () => {
    try {
      const { data, error } = await supabase
        .storage
        .from('cv-bucket')
        .list();

      if (error) {
        throw error;
      }

      setCvFiles(data || []);
    } catch (err) {
      console.error('Erreur lors de la récupération des fichiers CV:', err);
      setError('Erreur lors de la récupération des fichiers CV');
    }
  };

  // Charge les données au montage du composant
  useEffect(() => {
    if (isAuthenticated) {
      fetchMessages();
      fetchCVFiles();
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Si l'utilisateur n'est pas connecté, affiche un message d'erreur
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-red-500">Accès refusé</h2>
          <p className="mt-4 text-gray-700">Vous devez être connecté pour accéder à cette page.</p>
        </div>
      </div>
    );
  }

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-500 mb-6">Backoffice</h2>
        <button
          onClick={handleLogout}
          className="mb-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          Déconnexion
        </button>

        {loading ? (
          <p className="text-gray-700">Chargement des données...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            {/* Tableau des messages */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <h3 className="text-xl font-bold text-gray-900 p-6">Messages de contact</h3>
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nom
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Téléphone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {messages.map((message) => (
                    <tr key={message.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {message.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {message.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {message.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {message.message}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(message.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Composant CvList */}
            <CvList cvFiles={cvFiles} />
          </>
        )}
      </div>
    </div>
  );
};

export default Backoffice;