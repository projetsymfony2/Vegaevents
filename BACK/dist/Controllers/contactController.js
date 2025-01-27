"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitContactForm = void 0;
const supabaseClient_1 = require("../supabaseClient");
/**
 * Soumettre un formulaire de contact
 * @param {Request} req - Requête HTTP
 * @param {Response} res - Réponse HTTP
 */
const submitContactForm = async (req, res) => {
    const { name, email, phone, message } = req.body;
    // Validation simple des données (optionnel)
    if (!name || !email || !phone || !message) {
        return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
    }
    try {
        // Insérer les données dans la table 'contact_messages'
        const { data, error } = await supabaseClient_1.supabase
            .from('contact_messages')
            .insert([{ name, email, phone, message }]);
        if (error) {
            throw error;
        }
        // Réponse en cas de succès
        res.status(200).json({ message: 'Message envoyé avec succès', data });
    }
    catch (error) {
        console.error('Erreur lors de l\'envoi du message:', error);
        res.status(500).json({ message: 'Erreur lors de l\'envoi du message' });
    }
};
exports.submitContactForm = submitContactForm;
