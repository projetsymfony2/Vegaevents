import { Request, Response } from 'express';
import { uploadCVToDatabase } from '../models/cvModel'; // Importer la fonction du modèle

export const uploadCV = async (req: Request, res: Response) => {
  if (!req.files || !req.files.cv) {
    return res.status(400).send('Aucun fichier téléchargé.');
  }

  // Vérifier si plusieurs fichiers sont envoyés ou un seul
  const file = Array.isArray(req.files.cv) ? req.files.cv[0] : req.files.cv;

  // Vérifier que le fichier existe et qu'il a les propriétés nécessaires
  if (!file || !(file instanceof Object) || !file.name || !file.data) {
    return res.status(400).send('Fichier invalide.');
  }

  try {
    // Appel du modèle pour télécharger le fichier dans Supabase Storage
    const { fileName, error } = await uploadCVToDatabase(file);

    if (error) {
      return res.status(500).send('Erreur lors du téléchargement du fichier dans Supabase.');
    }

    // Répondre avec le nom du fichier et un message de succès
    res.status(200).send({ message: 'CV téléchargé et enregistré avec succès', fileName });
  } catch (err) {
    console.error('Erreur lors du téléchargement du fichier:', err);
    return res.status(500).send('Erreur lors du téléchargement du fichier.');
  }
};
