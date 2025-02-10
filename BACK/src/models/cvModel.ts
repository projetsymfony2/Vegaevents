// cvModel.tsx
import { supabase } from '../supabaseClient'; 

// Type pour un fichier CV
type CVFile = {
  name: string;
  id: string;
  created_at: string;
};

// Type de réponse pour l'upload d'un CV
type UploadResponse = {
  fileName?: string;
  uploadError?: any;  // Propriété spécifique pour l'erreur d'upload
};

// Type de réponse pour l'enregistrement d'une candidature
type SaveCandidatureResponse = {
  data?: any;
  saveError?: any;  // Propriété pour l'erreur de sauvegarde
};

// Fonction pour télécharger le fichier dans Supabase Storage
export const uploadCVToDatabase = async (file: any): Promise<UploadResponse> => {
  const { name, data } = file;

  const fileName = `${Date.now()}-${name}`;  // Nom unique pour le fichier
  const bucket = 'cv-bucket';  // Le nom du bucket où les fichiers seront stockés

  // Télécharger le fichier dans le storage de Supabase
  const { error: uploadError } = await supabase
    .storage
    .from(bucket)
    .upload(fileName, data, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    console.error('Erreur lors du téléchargement du fichier dans le stockage:', uploadError);
    return { uploadError };  // Retourner l'erreur si présente
  }

  return { fileName };  // Retourner le nom du fichier si tout se passe bien
};

// Fonction pour récupérer tous les CVs depuis Supabase Storage
export const getAllCVsFromDatabase = async (): Promise<{ files: CVFile[] | null; error?: any }> => {
  const bucket = 'cv-bucket';

  const { data, error } = await supabase
    .storage
    .from(bucket)
    .list();

  if (error) {
    console.error('Erreur lors de la récupération des fichiers:', error);
    return { files: null, error };  // Retourner l'erreur si présente
  }

  return { files: data as CVFile[] | null };  // Retourner les fichiers si tout se passe bien
};

// Fonction pour supprimer un fichier CV depuis Supabase Storage
export const deleteCVFromDatabase = async (fileName: string): Promise<{ error?: any }> => {
  const bucket = 'cv-bucket';  // Le nom du bucket où les fichiers sont stockés

  // Supprimer le fichier du storage de Supabase
  const { error } = await supabase
    .storage
    .from(bucket)
    .remove([fileName]);  // La méthode 'remove' supprime le fichier spécifié

  if (error) {
    console.error('Erreur lors de la suppression du fichier:', error);
    return { error };  // Retourner l'erreur si elle est présente
  }

  return {};  // Si tout s'est bien passé, retourner un objet vide
};

// Fonction pour enregistrer une candidature
export const saveCandidature = async (fullName: string, phoneNumber: string, fileUrl: string): Promise<SaveCandidatureResponse> => {
  const { data, error } = await supabase
    .from('candidatures')  // Nom de la table où enregistrer les candidatures
    .insert([{ fullName, phoneNumber, fileUrl }]);

  if (error) {
    console.error('Erreur lors de l\'enregistrement de la candidature:', error);
    return { saveError: error };  // Retourner l'erreur avec 'saveError'
  }

  return { data };  // Retourner les données si tout se passe bien
};
