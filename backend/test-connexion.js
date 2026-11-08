// Petit script pour vérifier que l'API arrive à parler à MySQL
const sequelize = require('./src/config/database');

sequelize.authenticate()
  .then(() => console.log('✅ Connexion à MySQL réussie'))
  .catch((erreur) => console.error('❌ Connexion impossible :', erreur.message))
  .finally(() => sequelize.close());
  