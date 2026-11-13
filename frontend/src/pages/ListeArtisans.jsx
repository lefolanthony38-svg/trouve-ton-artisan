// Page liste : les artisans d'une catégorie
import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router';
import { appelerApi } from '../services/api';
import CarteArtisan from '../components/CarteArtisan';

function ListeArtisans() {
  const { id } = useParams();
    const [parametres] = useSearchParams();
  const motCle = parametres.get('q'); // "fleur" sur /recherche?q=fleur, sinon null
  const [artisans, setArtisans] = useState([]);

    const [categorie, setCategorie] = useState(null);

  // On récupère toutes les catégories, puis on garde celle de la page
  useEffect(() => {
    appelerApi('/categories')
      .then((categories) => setCategorie(categories.find((c) => c.id_categorie === Number(id))))
      .catch(() => setCategorie(null));
  }, [id]);

    useEffect(() => {
    // Recherche par nom OU artisans d'une catégorie
    const chemin = motCle
      ? `/artisans?recherche=${encodeURIComponent(motCle)}`
      : `/categories/${id}/artisans`;

    appelerApi(chemin)
      .then((donnees) => setArtisans(donnees))
      .catch(() => setArtisans([]));
  }, [id, motCle]);

    const titre = motCle ? `Résultats pour « ${motCle} »` : categorie ? categorie.nom : 'Liste des artisans';
  return (
    <main className="container py-4 flex-grow-1">
      <title>{`${titre} | Trouve ton artisan`}</title>
      <meta name="description" content="Liste des artisans de la région Auvergne-Rhône-Alpes." />
      <h1 className="text-secondary">{titre}</h1>     
      <p>{artisans.length} artisan(s) trouvé(s)</p>

      {artisans.length === 0 && (
        <p className="alert alert-info">Aucun artisan trouvé. Vérifiez l'orthographe ou choisissez une catégorie dans le menu.</p>      )}

      <div className="row g-4">        {artisans.map((artisan) => (
          <div className="col-12 col-md-6 col-lg-4" key={artisan.id_artisan}>
            <CarteArtisan artisan={artisan} />
          </div>
        ))}
      </div>
    </main>
  );
}

export default ListeArtisans;