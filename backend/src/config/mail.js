// Connexion au serveur d'envoi d'emails (SMTP), avec les infos du .env
require('dotenv').config({ quiet: true });
const nodemailer = require('nodemailer');

const transporteur = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

module.exports = transporteur;