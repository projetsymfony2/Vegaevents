# Étape 1: Utiliser une image de base Node.js avec la version souhaitée
FROM node:16-alpine

# Étape 2: Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Étape 3: Copier les fichiers de configuration du projet
COPY package.json package-lock.json ./

# Étape 4: Installer les dépendances du projet
RUN npm install

# Étape 5: Copier le reste des fichiers du projet
COPY . .

# Étape 6: Compiler le code TypeScript en JavaScript
RUN npm run build

# Étape 7: Exposer le port sur lequel l'application écoute
EXPOSE 5000

# Étape 8: Commande pour démarrer l'application
CMD ["node", "dist/index.js"]