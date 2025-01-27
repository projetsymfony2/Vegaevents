"use strict";
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const contactRoutes = require('./routes/contactRoutes');
const app = express();
const PORT = 5000; // Port du backend
// Middleware
app.use(cors()); // Autoriser les requêtes cross-origin
app.use(bodyParser.json()); // Parser les requêtes JSON
// Routes
app.use('/api/contact', contactRoutes); // Utiliser les routes
// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur backend en cours d'exécution sur http://localhost:${PORT}`);
});
