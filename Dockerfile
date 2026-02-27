# Étape 1 : On part d'une image Node.js
FROM node:18-alpine

# Étape 2 : On crée un dossier de travail dans le conteneur
WORKDIR /app

# Étape 3 : On copie les fichiers de dépendances d'abord
COPY package.json package-lock.json ./

# Étape 4 : On installe les dépendances
RUN npm install

# Étape 5 : On copie le reste du code
COPY . .

# Étape 6 : On build
RUN npm run build

# Étape 7 : On expose le port
EXPOSE 3000

# Étape 8 : On lance l'app
CMD ["npm", "start"]

