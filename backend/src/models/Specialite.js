const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Description de la table "specialite"
const Specialite = sequelize.define('Specialite', {
    id_specialite: {
        type: DataTypes.INTEGER,
        primaryKey: true,       // clé primaire
        autoIncrement: true,    // AUTO_INCREMENT
    },
    nom: {
        type: DataTypes.STRING(50),  // VARCHAR(50)
        allowNull: false,            // NOT NULL
        unique: true,                // UNIQUE
    },
    id_categorie: {
        type: DataTypes.INTEGER,  // INT
        allowNull: false,         // NOT NULL
    },
}, {
    tableName: 'specialite',   // nom exact de la table dans MySQL
    timestamps: false,        // nos tables n'ont pas de colonnes createdAt / updatedAt
});

module.exports = Specialite;