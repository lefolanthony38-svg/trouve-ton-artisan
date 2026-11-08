DROP DATABASE IF EXISTS trouve_ton_artisan;
CREATE DATABASE trouve_ton_artisan
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE trouve_ton_artisan;

CREATE TABLE categorie (
  id_categorie INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(50) NOT NULL UNIQUE
);
CREATE TABLE specialite (
  id_specialite INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(50) NOT NULL UNIQUE,
  id_categorie INT NOT NULL,
  foreign KEY (id_categorie) REFERENCES categorie(id_categorie)
);
CREATE TABLE artisan (
  id_artisan INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(50) NOT NULL UNIQUE,
  note DECIMAL(2,1) NOT NULL,
  ville VARCHAR(50) NOT NULL,
  a_propos TEXT NOT NULL, 
  email VARCHAR(100) NOT NULL UNIQUE,
  site_web VARCHAR(255),
  top BOOLEAN NOT NULL DEFAULT 0,
  id_specialite INT NOT NULL,
  FOREIGN KEY (id_specialite) REFERENCES specialite(id_specialite)


);

