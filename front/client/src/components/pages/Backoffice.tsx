// src/components/pages/Backoffice.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/useAuth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient'; // Importe le client Supabase

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
}

const Backoffice: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fonction pour récupérer les messages depuis Supabase
  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages') // Nom de la table
        .select('*') // Sélectionne toutes les colonnes
        .order('created_at', { ascending: false }); // Trie par date de création

      if (error) {
        throw error;
      }

      setMessages(data || []); // Met à jour l'état des messages
    } catch (err) {
      console.error('Erreur lors de la récupération des messages:', err);
      setError('Erreur lors de la récupération des messages');
    } finally {
      setLoading(false); // Arrête le chargement
    }
  };

  // Charge les messages au montage du composant
  useEffect(() => {
    if (isAuthenticated) {
      fetchMessages();
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
    logout(); // Déconnecte l'utilisateur
    navigate('/'); // Redirige vers la page d'accueil
  };

  // Si l'utilisateur est connecté, affiche le tableau des messages
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
          <p className="text-gray-700">Chargement des messages...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
        )}
      </div>
    </div>
  );
};

export default Backoffice;