// Pages légales : un seul composant, le titre change selon l'adresse
import { useLocation } from 'react-router';

const TITRES = {
  '/mentions-legales': 'Mentions légales',
  '/donnees-personnelles': 'Données personnelles',
  '/accessibilite': 'Accessibilité',
  '/cookies': 'Cookies',
};

function PageLegale() {
  const { pathname } = useLocation();
  const titre = TITRES[pathname];

  return (
    <main className="container py-5 flex-grow-1">
            <title>{`${titre} | Trouve ton artisan`}</title>
            <meta name="description" content={`Page ${titre} du site Trouve ton artisan, pour trouver un artisan de confiance en Auvergne-Rhône-Alpes.`} />
      <h1 className="text-secondary fw-bold">{titre}</h1>
      <p>Page en construction. Son contenu sera ajouté prochainement.</p>
    </main>
  );
}

export default PageLegale;