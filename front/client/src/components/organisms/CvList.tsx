import React, { useState} from 'react';
import { supabase } from '../../utils/supabaseClient';

interface CVFile {
  name: string;
  created_at: string;
}



interface CvListProps {
  cvFiles: CVFile[];
}



const CvList: React.FC<CvListProps> = ({ cvFiles }) => {
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});

  const handleDownload = async (fileName: string) => {
    try {
      setLoading({ ...loading, [fileName]: true });

      // 1. Récupérer le fichier depuis Supabase Storage
      const { data, error } = await supabase
        .storage
        .from('cv-bucket')
        .download(fileName);

      if (error) {
        throw error;
      }

      if (!data) {
        throw new Error('Fichier non trouvé');
      }

      // 2. Créer un blob URL pour le fichier
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      

      // 3. Créer un élément <a> temporaire pour le téléchargement
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName.split('/').pop() || fileName; // Extraire le nom du fichier de base
      document.body.appendChild(link);
      link.click();



      // 4. Nettoyer
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (err) {
      console.error('Erreur lors du téléchargement:', err);
      alert('Erreur lors du téléchargement du fichier');
    } finally {
      setLoading({ ...loading, [fileName]: false });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <h3 className="text-xl font-bold text-gray-900 p-6">CVs téléchargés</h3>
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nom du fichier
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date de téléchargement
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Télécharger
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {cvFiles.map((file) => (
            <tr key={file.name}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {file.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(file.created_at).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <button
                  onClick={() => handleDownload(file.name)}
                  disabled={loading[file.name]}
                  className={`text-blue-500 hover:text-blue-700 ${
                    loading[file.name] ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading[file.name] ? 'Téléchargement...' : 'Télécharger'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CvList;