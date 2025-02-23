import { createContact, getContacts } from '../models/contactModel';
export const submitContactForm = async (req, res) => {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
        return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
    }
    try {
        const data = await createContact({ name, email, phone, message });
        res.status(200).json({ message: 'Message envoyé avec succès', data });
    }
    catch (error) {
        console.error('Erreur lors de l\'envoi du message:', error);
        res.status(500).json({ message: 'Erreur lors de l\'envoi du message' });
    }
};
export const getAllContacts = async (req, res) => {
    try {
        const data = await getContacts();
        res.status(200).json({ message: 'Messages récupérés avec succès', data });
    }
    catch (error) {
        console.error('Erreur lors de la récupération des messages:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des messages' });
    }
};
