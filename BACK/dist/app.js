//app.ts
import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload'; // Importer express-fileupload
import contactRoutes from './routes/contactRoutes';
import authRoutes from './routes/authRoutes';
import cvRoutes from './routes/cvRoutes'; // Assure-toi d'importer ton routeur
const app = express();
// Middleware pour autoriser les requêtes CORS depuis le frontend
app.use(cors({ origin: 'http://localhost:5173' }));
// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());
// Middleware pour gérer les fichiers téléchargésa
app.use(fileUpload());
// Routes
app.use('/api', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cv', cvRoutes); // Ajoute la route pour gérer les CV
// Route pour la racine
app.get('/', (req, res) => {
    res.send('Bienvenue sur le serveur backend !');
});
// Middleware pour ignorer les requêtes favicon.ico
app.get('/favicon.ico', (req, res) => {
    res.status(204).end();
});
export default app;
