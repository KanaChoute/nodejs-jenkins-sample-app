const express = require('express');
const app = express();
const PORT = 3000;

let server; // on gardera ici la référence au serveur

app.get('/', (req, res) => {
  res.json({ 
    message: 'Hello from Jenkins CI/CD!',
    build: process.env.BUILD_NUMBER || 'local',
    timestamp: new Date().toISOString()
  });

  console.log('✓ Requête / reçue, arrêt propre du serveur...');

  // on ferme le serveur une fois la réponse envoyée
  server.close(() => {
    console.log('✓ Serveur fermé proprement');
    process.exit(0); // termine le process pour que le job Jenkins se finisse
  });
});

server = app.listen(PORT, () => {
  console.log(`✓ Serveur démarré sur le port ${PORT}`);
});
