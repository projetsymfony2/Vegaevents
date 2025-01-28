import { Request, Response } from 'express';
import { uploadCVToDatabase, getAllCVsFromDatabase } from '../models/cvModel';

// Fonction pour télécharger un CV
export const uploadCV = async (req: Request, res: Response): Promise<void> => {
  if (!req.files || !req.files.cv) {
    res.status(400).send('Aucun fichier téléchargé.');
    return;
  }

  const file = Array.isArray(req.files.cv) ? req.files.cv[0] : req.files.cv;

  if (!file || !(file instanceof Object) || !file.name || !file.data) {
    res.status(400).send('Fichier invalide.');
    return;
  }

  try {
    const { fileName, error } = await uploadCVToDatabase(file);

    if (error) {
      res.status(500).send('Erreur lors du téléchargement du fichier dans Supabase.');
      return;
    }

    res.status(200).send({ message: 'CV téléchargé et enregistré avec succès', fileName });
  } catch (err) {
    console.error('Erreur lors du téléchargement du fichier:', err);
    res.status(500).send('Erreur lors du téléchargement du fichier.');
  }
};

// Fonction pour récupérer tous les CVs
export const getAllCVs = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await getAllCVsFromDatabase();

    if (result.error) {
      res.status(500).send('Erreur lors de la récupération des CVs.');
      return;
    }

    res.status(200).send(result.files || []);  // Envoie les fichiers ou un tableau vide si aucune donnée
  } catch (err) {
    console.error('Erreur lors de la récupération des CVs:', err);
    res.status(500).send('Erreur lors de la récupération des CVs.');
  }
};
