// src/routes/authRoutes.ts
import { Router } from 'express';
import { signIn, signOut, getCurrentUser } from '../Controllers/authController';

const router = Router();

// Route pour la connexion
router.post('/signin', signIn);

// Route pour la déconnexion
router.post('/signout', signOut);

// Route pour récupérer l'utilisateur actuel
router.get('/user', getCurrentUser);

export default router;