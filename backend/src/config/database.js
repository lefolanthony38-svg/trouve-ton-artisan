// Charge les variables du fichier .env (mot de passe, nom de la base...)
require('dotenv').config({ quiet: true });

const { Sequelize } = require('sequelize');

// Crée la connexion à MySQL avec les informations du .env
const sequelize = new Sequelize(
  process.env.DB_NAME,      // nom de la base : trouve_ton_artisan
  process.env.DB_USER,      // utilisateur : root
  process.env.DB_PASSWORD,  // mot de passe (jamais écrit dans le code)
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',       // type de base de données
    logging: false,         // n'affiche pas chaque requête SQL dans le terminal
        dialectOptions: {
      decimalNumbers: true,  // la note arrive en nombre (4.9) et pas en texte ("4.9")
    },
  }
);

// Rend la connexion utilisable dans les autres fichiers
module.exports = sequelize;