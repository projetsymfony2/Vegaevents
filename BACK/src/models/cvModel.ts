import { supabase } from '../supabaseClient';  // Ton client Supabase

// Type pour un fichier CV
type CVFile = {
  name: string;
  id: string;
  created_at: string;
};

// Fonction pour télécharger le fichier dans Supabase Storage
export const uploadCVToDatabase = async (file: any): Promise<{ fileName?: string; error?: any }> => {
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
    return { error: uploadError };  // Retourner l'erreur si présente
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
