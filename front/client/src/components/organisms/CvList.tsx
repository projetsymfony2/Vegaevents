import React, { useState, useCallback } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Download, FileText, Calendar, Loader, Trash2 } from 'lucide-react';
import ConfirmDeleteModal from '../molecules/ConfirmDeleteModal';

interface CVFile {
  name: string;
  created_at: string;
}

interface CvListProps {
  cvFiles: CVFile[];
  refreshCvList: () => void; // Fonction pour actualiser la liste après suppression
}

const CvList: React.FC<CvListProps> = ({ cvFiles, refreshCvList }) => {
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [showModal, setShowModal] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleDownload = useCallback(async (fileName: string) => {
    try {
      setLoading((prev) => ({ ...prev, [fileName]: true }));
      const { data, error } = await supabase.storage.from('cv-bucket').download(fileName);
      
      if (error) {
        throw error;
      }
      
      if (!data) {
        throw new Error('Fichier non trouvé');
      }

      const blob = new Blob([data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName.split('/').pop() || fileName;
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (err) {
      console.error('Erreur lors du téléchargement:', err);
      alert('Erreur lors du téléchargement du fichier');
    } finally {
      setLoading((prev) => ({ ...prev, [fileName]: false }));
    }
  }, []);

  const handleDelete = (fileName: string) => {
    setFileToDelete(fileName);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!fileToDelete) return;

    try {
      setLoading((prev) => ({ ...prev, [fileToDelete]: true }));
      const response = await fetch(`http://localhost:5000/api/cv/delete-cv/${fileToDelete}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression du CV');
      }

      setSuccessMessage('CV supprimé avec succès');
      refreshCvList(); // Appeler la fonction de mise à jour de la liste des CV
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      alert('Erreur lors de la suppression du fichier');
    } finally {
      setLoading((prev) => ({ ...prev, [fileToDelete]: false }));
      setShowModal(false);
      setFileToDelete(null);
    }
  };

  const sortedFiles = [...cvFiles].sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Fichier
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {sortedFiles.map((file) => (
              <tr key={file.name} className="hover:bg-slate-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-50 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-slate-900 hover:text-blue-600 transition-colors">
                        {file.name}
                      </div>
                      <div className="text-sm text-slate-500">PDF Document</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-slate-500">
                    <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                    {format(new Date(file.created_at), "dd MMMM yyyy HH:mm", { locale: fr })}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => handleDownload(file.name)}
                    disabled={loading[file.name]}
                    className={`
                      inline-flex items-center px-3 py-2 border border-slate-200 rounded-lg
                      text-sm font-medium transition-all duration-200
                      ${loading[file.name]
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 hover:shadow-sm'
                      }
                    `}
                  >
                    {loading[file.name] ? (
                      <>
                        <Loader className="animate-spin h-4 w-4 mr-2" />
                        Téléchargement...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Télécharger
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleDelete(file.name)}
                    disabled={loading[file.name]}
                    className={`
                      ml-2 inline-flex items-center px-3 py-2 border border-red-200 rounded-lg
                      text-sm font-medium transition-all duration-200
                      ${loading[file.name]
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-white text-red-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 hover:shadow-sm'
                      }
                    `}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
            {sortedFiles.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center">
                  <div className="flex flex-col items-center justify-center text-slate-500">
                    <FileText className="h-12 w-12 mb-4 text-slate-300" />
                    <p className="text-sm">Aucun CV téléchargé pour le moment</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {successMessage && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
          {successMessage}
        </div>
      )}

      <ConfirmDeleteModal
        open={showModal}
        fileName={fileToDelete || ''}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default CvList;
