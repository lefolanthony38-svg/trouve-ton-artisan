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
      <h1 className="text-secondary fw-bold">{titre}</h1>
      <p>Page en construction. Son contenu sera ajouté prochainement.</p>
    </main>
  );
}

export default PageLegale;