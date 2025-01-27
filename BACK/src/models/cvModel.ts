import { supabase } from '../supabaseClient';  // Ton client Supabase

// Fonction pour télécharger le fichier dans Supabase Storage
export const uploadCVToDatabase = async (file: any) => {
  // Récupérer le fichier (assumer que c'est un seul fichier)
  const { name, data } = file;

  // Téléchargement du fichier dans Supabase Storage
  const fileName = `${Date.now()}-${name}`;  // Nom unique pour le fichier
  const bucket = 'cv-bucket';  // Le nom du bucket où les fichiers seront stockés

  // Télécharger le fichier dans le storage de Supabase
  const { error: uploadError } = await supabase
    .storage
    .from(bucket)
    .upload(fileName, data, {
      cacheControl: '3600',  // Contrôle du cache, peut être ajusté selon les besoins
      upsert: false,  // ne pas écraser un fichier existant
    });

  if (uploadError) {
    console.error('Erreur lors du téléchargement du fichier dans le stockage:', uploadError);
    return { error: uploadError };
  }

  // Si l'upload a réussi, retourner les informations du fichier
  return { fileName };
};
