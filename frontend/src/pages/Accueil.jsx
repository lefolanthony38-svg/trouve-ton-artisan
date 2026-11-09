// Page d'accueil : explication en 4 étapes + les 3 artisans du mois
import { useState, useEffect } from 'react';
import { appelerApi } from '../services/api';
import CarteArtisan from '../components/CarteArtisan';

// Les 4 étapes imposées par le brief
const ETAPES = [
  "Choisir la catégorie d'artisanat dans le menu.",
  'Choisir un artisan.',
  'Le contacter via le formulaire de contact.',
  'Une réponse sera apportée sous 48h.',
];

function Accueil() {
  const [artisans, setArtisans] = useState([]);

  useEffect(() => {
    appelerApi('/artisans/top')
    .then((donnees) => setArtisans(donnees))
      .catch(() => setArtisans([]));
  }, []);

  return (
    <main className="flex-grow-1">
      <section className="bg-light py-5">
        <div className="container">
          <h1 className="text-secondary fw-bold">Trouvez l'artisan qu'il vous faut, près de chez vous</h1>
          <p className="lead mb-0">
            Choisissez une catégorie, consultez la fiche d'un artisan et contactez-le directement.
          </p>
        </div>
      </section>

      <section className="container py-5">
        <h2 className="text-secondary mb-4">Comment trouver mon artisan ?</h2>
        <ol className="row list-unstyled g-4">
          {ETAPES.map((texte, index) => (
            <li className="col-12 col-md-6 col-lg-3 d-flex align-items-center gap-3" key={index}>
              <span className="numero-etape" aria-hidden="true">{index + 1}</span>
              <p className="mb-0">{texte}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container pb-5">
        <h2 className="text-secondary mb-4">Les artisans du mois</h2>
        <div className="row g-4">
          {artisans.map((artisan) => (
            <div className="col-12 col-md-4" key={artisan.id_artisan}>
              <CarteArtisan artisan={artisan} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Accueil;