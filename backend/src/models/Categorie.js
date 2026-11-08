const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Description de la table "categorie"
const Categorie = sequelize.define('Categorie', {
  id_categorie: {
    type: DataTypes.INTEGER,
    primaryKey: true,       // clé primaire
    autoIncrement: true,    // AUTO_INCREMENT
  },
  nom: {
    type: DataTypes.STRING(50),  // VARCHAR(50)
    allowNull: false,            // NOT NULL
    unique: true,                // UNIQUE
  },
}, {
  tableName: 'categorie',   // nom exact de la table dans MySQL
  timestamps: false,        // nos tables n'ont pas de colonnes createdAt / updatedAt
});

module.exports = Categorie;