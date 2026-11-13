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
        allowNull: false,            // NOT NULL => un artisan doit avoir un nom
        unique: true,                // UNIQUE => plusieurs artisans ne peuvent pas avoir le même nom
    },
    note: {
        type: DataTypes.DECIMAL(2, 1),  // DECIMAL(2, 1)
        allowNull: false,            // NOT NULL => un artisan doit avoir une note
        unique: false,                // NOT UNIQUE => plusieurs artisans peuvent avoir la même note
    },
    ville: {
        type: DataTypes.STRING(50),  // VARCHAR(50)
        allowNull: false,            // NOT NULL = > un artisan doit avoir une ville
        unique: false,                // NOT UNIQUE => plusieurs artisans peuvent être dans la même ville
    },
    a_propos: {
        type: DataTypes.TEXT,        // TEXT
        allowNull: false,            // NOT NULL => un artisan doit avoir une description
        unique: false,                // NOT UNIQUE => plusieurs artisans peuvent avoir le même texte
    },
    email: {
        type: DataTypes.STRING(100),  // VARCHAR(100)
        allowNull: false,            // NOT NULL => un artisan doit avoir un email
        unique: true,                // UNIQUE => plusieurs artisans ne peuvent pas avoir le même email
    },
    site_web: {
        type: DataTypes.STRING(255), // VARCHAR(255)
        allowNull: true,             // NULL allowed => un artisan peut ne pas avoir de site web
        unique: true,                // UNIQUE => plusieurs artisans ne peuvent pas avoir le même site web (ex: facebook)
    },
    top: {
        type: DataTypes.BOOLEAN,     // BOOLEAN
        allowNull: false,            // NOT NULL => on ne peut pas laisser ce champ vide 
        defaultValue: false,         // DEFAULT 0 = false => par défaut, un artisan n'est pas "top"
    },
    id_specialite: {
        type: DataTypes.INTEGER,     // INT
        allowNull: false,            // NOT NULL = > un artisan doit avoir une spécialité
        unique: false,                // NOT UNIQUE => plusieurs artisans peuvent avoir la même spécialité
    },
}, {
    tableName: 'artisan',   // nom exact de la table dans MySQL
    timestamps: false,        // nos tables n'ont pas de colonnes createdAt / updatedAt
});

module.exports = Artisan;