import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/useAuth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';
import CvList from '../organisms/CvList';
import { Mail, Phone, Calendar, LogOut, AlertCircle } from 'lucide-react';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
}

interface CVFile {
  name: string;
  created_at: string;
}

const Backoffice: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [cvFiles, setCvFiles] = useState<CVFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      console.error('Erreur lors de la récupération des messages:', err);
      setError('Erreur lors de la récupération des messages');
    }
  };

  const fetchCVFiles = async () => {
    try {
      const { data, error } = await supabase
        .storage
        .from('cv-bucket')
        .list();
  
      if (error) {
        throw error;
      }
  
      console.log('Fichiers récupérés:', data);
      setCvFiles(data || []);
    } catch (err) {
      console.error('Erreur lors de la récupération des fichiers CV:', err);
      setError('Erreur lors de la récupération des fichiers CV');
    }
  };
  
  const refreshCvList = () => {
    fetchCVFiles();
  };

  useEffect(() => {
    if (isAuthenticated) {
      Promise.all([fetchMessages(), fetchCVFiles()]).finally(() => {
        setLoading(false);
      });
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full mx-4 border border-slate-100">
          <div className="mb-6">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Accès refusé</h2>
          <p className="text-slate-600">Vous devez être connecté pour accéder à cette page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <div className="mb-8 bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-slate-800">
                Tableau de bord
              </h1>
              <p className="text-slate-600">
                Gérez vos messages et candidatures en un seul endroit
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all duration-200 ease-in-out transform hover:scale-105"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </button>
          </div>
          {/* Stats Banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 pb-6">
            <div className="bg-blue-50 rounded-xl p-4 flex items-center space-x-4">
              <div className="bg-blue-100 rounded-lg p-2">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-blue-600 font-medium">Messages</p>
                <p className="text-2xl font-bold text-blue-800">{messages.length}</p>
              </div>
            </div>
            <div className="bg-green-50 rounded-xl p-4 flex items-center space-x-4">
              <div className="bg-green-100 rounded-lg p-2">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-green-600 font-medium">Candidatures</p>
                <p className="text-2xl font-bold text-green-800">{cvFiles.length}</p>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Messages Section */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200">
                <h2 className="text-xl font-semibold text-slate-800 flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-blue-500" />
                  Messages de contact
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Nom
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Téléphone
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Message
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {messages.map((message) => (
                      <tr key={message.id} className="hover:bg-slate-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-slate-900">{message.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <a href={`mailto:${message.email}`} className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                            <Mail className="w-4 h-4 mr-1" />
                            {message.email}
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <a href={`tel:${message.phone}`} className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                            <Phone className="w-4 h-4 mr-1" />
                            {message.phone}
                          </a>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-500 max-w-xs overflow-hidden hover:overflow-visible hover:whitespace-normal truncate">
                            {message.message}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-500 flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(message.created_at).toLocaleDateString('fr-FR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* CV Section */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200">
                <h2 className="text-xl font-semibold text-slate-800 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-green-500" />
                  Candidatures
                </h2>
              </div>
              <div className="p-6">
                <CvList cvFiles={cvFiles} refreshCvList={refreshCvList} />
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default Backoffice;
