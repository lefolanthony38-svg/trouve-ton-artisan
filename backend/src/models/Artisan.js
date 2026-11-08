const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Description de la table "Artisan"
const Artisan = sequelize.define('Artisan', {
    id_artisan: {
        type: DataTypes.INTEGER,
        primaryKey: true,       // clé primaire
        autoIncrement: true,    // AUTO_INCREMENT
    },
    nom: {
        type: DataTypes.STRING(50),  // VARCHAR(50)
        allowNull: false,            // NOT NULL
        unique: true,                // UNIQUE
    },
    note: {
        type: DataTypes.DECIMAL(2, 1),  // DECIMAL(2, 1)
        allowNull: false,            // NOT NULL
        unique: false,                // NOT UNIQUE
    },
    ville: {
        type: DataTypes.STRING(50),  // VARCHAR(50)
        allowNull: false,            // NOT NULL
        unique: false,                // NOT UNIQUE
    },
    a_propos: {
        type: DataTypes.TEXT,        // TEXT
        allowNull: false,            // NOT NULL
        unique: false,                // NOT UNIQUE
    },
    email: {
        type: DataTypes.STRING(100),  // VARCHAR(100)
        allowNull: false,            // NOT NULL
        unique: true,                // UNIQUE
    },
    site_web: {
        type: DataTypes.STRING(255), // VARCHAR(255)
        allowNull: true,             // NULL allowed
        unique: false,                // NOT UNIQUE
    },
    top: {
        type: DataTypes.BOOLEAN,     // BOOLEAN
        allowNull: false,            // NOT NULL
        defaultValue: false,         // DEFAULT 0
    },
    id_specialite: {
        type: DataTypes.INTEGER,     // INT
        allowNull: false,            // NOT NULL
        unique: false,                // NOT UNIQUE
    },
}, {
    tableName: 'artisan',   // nom exact de la table dans MySQL
    timestamps: false,        // nos tables n'ont pas de colonnes createdAt / updatedAt
});

module.exports = Artisan;