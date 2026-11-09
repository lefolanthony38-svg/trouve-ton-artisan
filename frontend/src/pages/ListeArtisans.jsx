// Page liste : les artisans d'une catégorie
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { appelerApi } from '../services/api';
import CarteArtisan from '../components/CarteArtisan';

function ListeArtisans() {
  const { id } = useParams();
  const [artisans, setArtisans] = useState([]);

    const [categorie, setCategorie] = useState(null);

  // On récupère toutes les catégories, puis on garde celle de la page
  useEffect(() => {
    appelerApi('/categories')
      .then((categories) => setCategorie(categories.find((c) => c.id_categorie === Number(id))))
      .catch(() => setCategorie(null));
  }, [id]);

  useEffect(() => {
    appelerApi(`/categories/${id}/artisans`)
      .then((donnees) => setArtisans(donnees))
      .catch(() => setArtisans([]));
  }, [id]);

  return (
    <main className="container py-4 flex-grow-1">
      <h1 className="text-secondary">{categorie ? categorie.nom : 'Liste des artisans'}</h1>
      <p>{artisans.length} artisan(s) trouvé(s)</p>

      {artisans.length === 0 && (
        <p className="alert alert-info">Aucun artisan trouvé dans cette catégorie.</p>
      )}

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