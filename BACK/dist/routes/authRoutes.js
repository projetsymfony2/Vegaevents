// src/routes/authRoutes.ts
import { Router } from 'express';
import { signIn, signOut, getCurrentUser } from '../Controllers/authController';
import { resetPassword, updatePassword } from '../Controllers/authController';
const router = Router();
// Route pour la connexion
router.post('/signin', signIn);
// Route pour la déconnexion
router.post('/signout', signOut);
// Route pour récupérer l'utilisateur actuel    
router.get('/user', getCurrentUser);
// Route pour envoyer un e-mail de réinitialisation de mot de passe
router.post('/reset-password', resetPassword);
// Route pour mettre à jour le mot de passe
router.post('/update-password', updatePassword);
export default router;
