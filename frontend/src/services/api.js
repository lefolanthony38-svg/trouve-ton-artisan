// Toutes les demandes à l'API passent par ici (adresse + clé ajoutées automatiquement)
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export async function appelerApi(chemin, options = {}) {
  const reponse = await fetch(API_URL + chemin, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    },
  });

  const donnees = await reponse.json();

  // Si l'API répond une erreur (400, 404, 429, 500…), on la transmet à la page
  if (!reponse.ok) {
    const erreur = new Error(donnees.message || 'Erreur de communication avec le serveur');
    erreur.status = reponse.status;
    erreur.erreurs = donnees.erreurs; // les erreurs du formulaire de contact, s'il y en a
    throw erreur;
  }

  return donnees;
}