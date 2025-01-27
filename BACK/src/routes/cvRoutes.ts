// cvRoutes.ts
import express from 'express';
import { uploadCV } from '../Controllers/cvController';

const router = express.Router();

// Route pour télécharger un CV
router.post('/upload-cv', async (req, res) => {
  try {
    await uploadCV(req, res);  // Utilise 'await' pour gérer la promesse
  } catch (error) {
    res.status(500).send('Erreur lors du téléchargement du CV.');
  }
});

export default router;
