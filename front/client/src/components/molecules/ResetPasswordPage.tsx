import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenParam = params.get('access_token'); // Supabase passe ce token automatiquement
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      setError('Lien invalide ou expiré.');
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    if (!token) {
      setError('Token de réinitialisation manquant.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/update-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, token }), // Envoie le token au backend
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Une erreur est survenue');
      }

      setMessage('Mot de passe mis à jour avec succès.');
      setError('');
      navigate('/login'); // Redirige vers la connexion
    } catch (err) {
      console.error('Erreur lors de la mise à jour du mot de passe:', err);
      setError('Impossible de mettre à jour le mot de passe.');
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Réinitialisation du mot de passe</h2>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
      {!error && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nouveau mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirmer le nouveau mot de passe</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Mettre à jour le mot de passe</button>
        </form>
      )}
    </div>
  );
};

export default ResetPasswordPage;


