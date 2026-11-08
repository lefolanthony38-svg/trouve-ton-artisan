// Rassemble les modèles et déclare les relations (équivalent des JOIN)
const sequelize = require('../config/database');
const Categorie = require('./Categorie');
const Specialite = require('./Specialite');
const Artisan = require('./Artisan');

// Une catégorie contient plusieurs spécialités (1,N)
Categorie.hasMany(Specialite, { foreignKey: 'id_categorie' });
// Une spécialité appartient à une seule catégorie (1,1)
Specialite.belongsTo(Categorie, { foreignKey: 'id_categorie' });

// Une spécialité regroupe plusieurs artisans (1,N)
Specialite.hasMany(Artisan, { foreignKey: 'id_specialite' });
// Un artisan appartient à une seule spécialité (1,1)
Artisan.belongsTo(Specialite, { foreignKey: 'id_specialite' });

module.exports = { sequelize, Categorie, Specialite, Artisan };