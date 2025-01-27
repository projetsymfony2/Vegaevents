//App.ts

import express from 'express';
import cors from 'cors';
import contactRoutes from './routes/contactRoutes';
import authRoutes from './routes/authRoutes'; 

const app = express();

// Middleware pour autoriser les requêtes CORS depuis le frontend
app.use(cors({ origin: 'http://localhost:5173' }));

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Routes
app.use('/api', contactRoutes); 
app.use('/api/auth', authRoutes);

// Route pour la racine
app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur backend !');
});

// Middleware pour ignorer les requêtes favicon.ico
app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

export default app;