USE trouve_ton_artisan;

-- Page d'accueil : les 3 artisans du mois
SELECT nom, note, ville
FROM artisan
WHERE top = 1;

SELECT nom, note, ville, a_propos, email, site_web, top, id_specialite -- la liste peut etre remplacer par * --
FROM artisan
WHERE id_artisan = 3;

-- Recherche : les artisans dont le nom contient « fleur » -- declinnable a condition que la particule se trouve dans le nom --
SELECT nom, note, ville
FROM artisan
WHERE nom LIKE '%fleur%';

SELECT nom, note, ville
FROM artisan
WHERE nom LIKE '%choco%';

-- Recherche par spécialité : les coiffeurs
SELECT artisan.nom, artisan.ville, specialite.nom
FROM artisan
JOIN specialite ON artisan.id_specialite = specialite.id_specialite
WHERE specialite.nom LIKE '%coif%';

-- Recherche par spécialité : les bijoutier
SELECT artisan.nom, artisan.ville, specialite.nom
FROM artisan
JOIN specialite ON artisan.id_specialite = specialite.id_specialite
WHERE specialite.nom LIKE '%bijou%';

-- Page catégorie : les artisans du Bâtiment
SELECT artisan.nom, artisan.ville, specialite.nom, categorie.nom
FROM artisan
JOIN specialite ON artisan.id_specialite = specialite.id_specialite
JOIN categorie ON specialite.id_categorie = categorie.id_categorie
WHERE categorie.nom = 'Bâtiment';