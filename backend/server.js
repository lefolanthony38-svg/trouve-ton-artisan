// Point d'entrée de l'API "Trouve ton artisan"
require('dotenv').config({ quiet: true });
const express = require('express');
   const { sequelize, Categorie, Artisan, Specialite } = require('./src/models');
const { Op } = require('sequelize');

const helmet = require('helmet');

const nodemailer = require('nodemailer');
const transporteur = require('./src/config/mail');

const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(helmet()); // ajoute des en-têtes de sécurité et cache "X-Powered-By: Express"
app.use(cors({ origin: process.env.FRONT_URL })); // autorise les requêtes depuis le site React
app.use(express.json()); // permet de lire le JSON envoyé par le formulaire de contact

// Vérifie qu'une valeur est un texte dont la longueur est entre min et max
function texteValide(valeur, min, max) {
  return typeof valeur === 'string' && valeur.trim().length >= min && valeur.length <= max;
}
  // Vigile : refuse toute demande qui n'a pas la bonne clé d'API
function verifierCleApi(req, res, next) {
  const cle = req.get('x-api-key');          // la clé envoyée par le site React
  if (cle !== process.env.API_KEY) {
    return res.status(401).json({ message: 'Accès non autorisé' });   // trou : quel code ?
  }
  next(); // bonne clé : on laisse passer vers la route
}
app.use('/api', verifierCleApi); // le vigile contrôle toutes les adresses /api


// Vérifie les 4 champs du formulaire de contact
// Renvoie la liste des erreurs, par exemple { email: 'Saisissez une adresse email valide.' }
function validerContact({ nom, email, objet, message }) {
  const erreurs = {};
  const formeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // texte@texte.texte

  if (!texteValide(nom, 2, 100)) {
    erreurs.nom = 'Le nom doit contenir entre 2 et 100 caractères.';
  }
  if (!texteValide(email, 6, 254) || !formeEmail.test(email)) {
    erreurs.email = 'Saisissez une adresse email valide.';
  }
  if (!texteValide(objet, 3, 50)) {
    erreurs.objet = 'L\'objet doit contenir entre 3 et 50 caractères.';
  }
  if (!texteValide(message, 10, 500)) {
    erreurs.message = 'Le message doit contenir entre 10 et 500 caractères.';
  }

  return erreurs;
}

// Route de test : GET /api/categories -> la liste des catégories pour le menu
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Categorie.findAll({ order: [['nom', 'ASC']] });
    res.json(categories);
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Page d'accueil : GET /api/artisans/top -> les 3 artisans du mois
app.get('/api/artisans/top', async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      where: { top: true },                                // seulement les artisans du mois
      include: { model: Specialite, attributes: ['nom'] }, // + le nom de leur spécialité (JOIN)
      attributes: { exclude: ['email'] },                  // on ne veut pas l'email
    });
    res.json(artisans);
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Fiche artisan : GET /api/artisans/:id -> un seul artisan
app.get('/api/artisans/:id', async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id, {
      include: { model: Specialite, attributes: ['nom'] },
      attributes: { exclude: ['email'] },
    });

    if (!artisan) {
      return res.status(404).json({ message: 'Artisan non trouvé' });
    }

    res.json(artisan);
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Page catégorie : GET /api/categories/:id/artisans -> les artisans d'une catégorie
app.get('/api/categories/:id/artisans', async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      attributes: { exclude: ['email'] },          // trou 1
      include: {
        model: Specialite,
        attributes: ['nom'],
        where: { id_categorie: req.params.id },           // trou 2 : le filtre sur la catégorie
      },
    });
    res.json(artisans);
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Recherche : GET /api/artisans?recherche=fleur -> les artisans dont le nom contient le texte
app.get('/api/artisans', async (req, res) => {
  try {
    const texte = req.query.recherche || '';     // trou 1 : le nom du paramètre après le « ? »

    const artisans = await Artisan.findAll({
      where: { nom: { [Op.like]: `%${texte}%` } },
      attributes: { exclude: ['email'] },     // trou 2
      include: { model: Specialite, attributes: ['nom'] },
    });
    res.json(artisans);
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Anti-spam : 5 messages de contact maximum par heure et par adresse IP
const limiteContact = rateLimit({
  windowMs: 60 * 60 * 1000, // fenêtre de 1 heure (en millisecondes)
    limit: process.env.NODE_ENV === 'production' ? 5 : 100, // 5 en ligne, 100 en développement                 // 5 envois maximum dans cette fenêtre
  message: { message: 'Trop de messages envoyés. Réessayez dans une heure.' },
});

// Contact : POST /api/artisans/:id/contact -> envoie le message du visiteur à l'artisan
app.post('/api/artisans/:id/contact',limiteContact, async (req, res) => {
  try {
    // 1. On vérifie les champs
    const erreurs = validerContact(req.body || {});
    if (Object.keys(erreurs).length > 0) {
      return res.status(400).json({ message: 'Formulaire invalide', erreurs });
    }

    // 2. On vérifie que l'artisan existe
    const artisan = await Artisan.findByPk(req.params.id);
    if (!artisan) {
      return res.status(404).json({ message: 'Artisan non trouvé' });
    }

      // 3. On envoie l'email à l'artisan (en texte brut : aucun code ne peut s'exécuter)
    const { nom, email, objet, message } = req.body;
    const info = await transporteur.sendMail({
      from: '"Trouve ton artisan" <no-reply@trouve-ton-artisan.fr>',
      to: artisan.email,          // trou 1 : l'adresse de l'artisan
      replyTo: email,     // trou 2 : l'adresse du visiteur
      subject: `[Trouve ton artisan] ${objet}`,
      text: `Bonjour ${artisan.nom},

Vous avez reçu un message depuis le site Trouve ton artisan.

Nom : ${nom}
Email : ${email}
Objet : ${objet}

Message :
${message}`,
    });

    // En développement : lien pour lire l'email intercepté par Ethereal
    console.log('📧 Aperçu de l\'email :', nodemailer.getTestMessageUrl(info));

    res.json({ message: 'Votre message a bien été envoyé.' });
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Filet 1 : adresse inconnue -> 404 en JSON
app.use((req, res) => {
  res.status(404).json({ message: 'Ressource introuvable' });
});

// Filet 2 : toute erreur non prévue -> message neutre, détail seulement dans le terminal
app.use((erreur, req, res, next) => {
  console.error(erreur);
  const code = erreur.status === 400 ? 400 : 500;
  res.status(code).json({ message: code === 400 ? 'Requête invalide' : 'Erreur serveur' });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ API démarrée sur http://localhost:${PORT}`);
});

