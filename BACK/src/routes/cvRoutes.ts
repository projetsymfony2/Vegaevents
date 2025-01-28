import express from 'express';
import { uploadCV, getAllCVs } from '../Controllers/cvController';

const router = express.Router();

// Route pour télécharger un CV
router.post('/upload-cv', async (req, res) => {
  try {
    await uploadCV(req, res);  // Utilise 'await' pour gérer la promesse
  } catch (error) {
    res.status(500).send('Erreur lors du téléchargement du CV.');
  }
});

// Route pour récupérer tous les CVs
router.get('/get-cv', getAllCVs);

export default router;
