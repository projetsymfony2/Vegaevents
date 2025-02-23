// cvRoutes.tsx
import express from 'express';
import { uploadCV, getAllCVs, deleteCV } from '../Controllers/cvController';
const router = express.Router();
// Route pour télécharger un CV
router.post('/upload-cv', async (req, res) => {
    try {
        await uploadCV(req, res); // Utilise 'await' pour gérer la promesse
    }
    catch (error) {
        res.status(500).send('Erreur lors du téléchargement du CV.');
    }
});
// Route pour récupérer tous les CVs
router.get('/get-cv', getAllCVs);
// Route pour supprimer un CV
router.delete('/delete-cv/:fileName', async (req, res) => {
    try {
        await deleteCV(req, res); // Utilise la fonction deleteCV pour gérer la suppression
    }
    catch (error) {
        res.status(500).send('Erreur lors de la suppression du CV.');
    }
});
export default router;
