# Trouve ton artisan

Site web commandé par la **Région Auvergne-Rhône-Alpes** (antenne de Lyon).

Il recense les artisans de la région et permet aux particuliers de les trouver facilement (par catégorie ou par recherche), puis de les contacter grâce à un formulaire.

---

## Technologies

**Frontend**
- React 19 + React Router
- Vite (outil de développement)
- Bootstrap 5 + Sass (charte graphique)

**Backend**
- Node.js + Express 5 (API REST)
- Sequelize (ORM : communique avec MySQL)
- Nodemailer (envoi des emails, testé avec Ethereal)
- Sécurité : helmet, cors, express-rate-limit, dotenv

**Base de données**
- MySQL 8

**Outils**
- Figma (maquettes), Git + GitHub, VS Code

---

## Installation

### 1. Prérequis
- Node.js 20 ou plus
- MySQL 8
- Git

### 2. Récupérer le projet
```bash
git clone https://github.com/lefolanthony38-svg/trouve-ton-artisan.git
cd trouve-ton-artisan
```

### 3. Base de données
Dans MySQL (par exemple avec MySQL Workbench), exécuter dans l'ordre :
1. `sql/01_creation_schema.sql` : crée la base et les tables
2. `sql/02_insertion_donnees.sql` : ajoute les catégories, spécialités et artisans
3. `sql/03_requetes_test.sql` : facultatif, pour vérifier

### 4. Backend (API)
```bash
cd backend
npm install
```
Copier `.env.example` en `.env`, puis le remplir (identifiants MySQL, SMTP, clé d'API).
```bash
npm run dev
```
L'API tourne sur http://localhost:3000

### 5. Frontend (dans un 2e terminal)
```bash
cd frontend
npm install
```
Copier `.env.example` en `.env` (mettre la **même clé d'API** que dans le backend).
```bash
npm run dev
```
Le site est visible sur http://localhost:5173

---

## Sécurité

| # | Protection | Contre quoi |
|---|---|---|
| 1 | Secrets dans `.env` (jamais sur GitHub) | vol des mots de passe |
| 2 | Requêtes via Sequelize | injection SQL |
| 3 | Email des artisans jamais envoyé au navigateur | collecte d'adresses / spam |
| 4 | Validation des champs côté serveur (longueurs, format email) | données invalides ou malveillantes |
| 5 | Email envoyé en texte brut | code caché dans un message |
| 6 | Helmet (en-têtes de sécurité) | attaques courantes du navigateur |
| 7 | CORS limité au site | appels depuis d'autres sites |
| 8 | Limite de 5 messages par heure | spam / surcharge (code 429) |
| 9 | Clé d'API obligatoire | accès non autorisé (code 401) |
| 10 | Erreurs neutres, sans détails | fuite d'informations techniques |
| 11 | Réponse 404 en JSON pour les adresses inconnues | exploration de l'API |
| 12 | Contraintes de la base (NOT NULL, UNIQUE, clés étrangères) | données incohérentes |

---

## Crédits
- Illustrations : [unDraw](https://undraw.co), licence libre
- Projet réalisé par Anthony Lefol, Titre Professionnel Développeur Web et Web Mobile
