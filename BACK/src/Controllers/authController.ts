  // src/controllers/authController.ts
import { Request, Response } from 'express';
import { supabase } from '../Utils/supabaseClient';

/**
 * Connexion d'un utilisateur
 */
export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    res.status(200).json({ message: 'Connexion réussie !', data });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ error: 'Erreur lors de la connexion' });
  }
};

/**
 * Déconnexion d'un utilisateur
 */
export const signOut = async (req: Request, res: Response) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    res.status(200).json({ message: 'Déconnexion réussie !' });
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    res.status(500).json({ error: 'Erreur lors de la déconnexion' });
  }
};

/**
 * Récupérer l'utilisateur actuellement connecté
 */
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      throw error;
    }

    res.status(200).json({ message: 'Utilisateur récupéré avec succès !', user });
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' });
  }
};
/**
 * Demande de réinitialisation du mot de passe
 */
export const resetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:5173/reset-password', // Laisse Supabase ajouter le token automatiquement
    });
    if (error) {
      throw error;
    }
    res.status(200).json({ message: 'Un e-mail de réinitialisation a été envoyé !', data });
  } catch (error) {
    console.error('Erreur lors de la demande de réinitialisation:', error);
    res.status(500).json({ error: 'Erreur lors de la demande de réinitialisation' });
  }
};
export const updatePassword = async (req: Request, res: Response) => {
  const { password, token } = req.body; // Ajoutez le token dans le corps de la requête
  try {
    const { data, error } = await supabase.auth.updateUser({ password });
    if (error) {
      throw error;
    }
    res.status(200).json({ message: 'Mot de passe mis à jour avec succès !', data });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du mot de passe:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du mot de passe' });
  }
}