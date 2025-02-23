// src/routes/contactRoutes.ts
import { Router } from 'express';
import { createContact, getContacts } from '../models/contactModel';
import { supabase } from '../Utils/supabaseClient';
const router = Router();
// Fonction pour gérer la route POST /api/contact
export const handleContactForm = (supabase) => {
    return async (req, res) => {
        try {
            const { name, email, phone, message } = req.body;
            // Insérer les données dans la table `contact_messages` de Supabase
            const data = await createContact({ name, email, phone, message });
            res.status(200).json({
                message: 'Message reçu et sauvegardé !',
                data,
            });
        }
        catch (error) {
            console.error('Erreur:', error);
            res.status(500).json({
                error: 'Une erreur est survenue lors du traitement de la requête',
            });
        }
    };
};
// Fonction pour gérer la route GET /api/contact
export const getContactsHandler = (supabase) => {
    return async (req, res) => {
        try {
            // Récupérer tous les messages de la table `contact_messages`
            const data = await getContacts();
            res.status(200).json({
                message: 'Messages récupérés avec succès !',
                data,
            });
        }
        catch (error) {
            console.error('Erreur:', error);
            res.status(500).json({
                error: 'Une erreur est survenue lors de la récupération des messages',
            });
        }
    };
};
// Routes
router.post('/contact', handleContactForm(supabase));
router.get('/contact', getContactsHandler(supabase));
export default router;
