import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// 🔹 Fonction pour uploader une image
export const uploadImage = async (file: File, folder = "services") => {
  const fileName = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from('images') // Nom du bucket
    .upload(`${folder}/${fileName}`, file, { upsert: true });

  if (error) {
    console.error("Erreur lors de l'upload :", error.message);
    return null;
  }

  return data.path; // Retourne le chemin de l’image
};

// 🔹 Fonction pour récupérer une image
export const getImageUrl = (path: string) => {
  return `${supabase.storage.from('images').getPublicUrl(path).data.publicUrl}`;
};
