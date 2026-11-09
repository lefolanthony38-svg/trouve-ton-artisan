// Page liste : les artisans d'une catégorie
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { appelerApi } from '../services/api';
import CarteArtisan from '../components/CarteArtisan';

function ListeArtisans() {
  const { id } = useParams();
  const [artisans, setArtisans] = useState([]);

  useEffect(() => {
    appelerApi(`/categories/${id}/artisans`)
      .then((donnees) => setArtisans(donnees))
      .catch(() => setArtisans([]));
  }, [id]);

  return (
    <main className="container py-4 flex-grow-1">
      <h1 className="text-secondary">Liste des artisans</h1>
      <p>{artisans.length} artisan(s) trouvé(s)</p>

      <div className="row g-4">
        {artisans.map((artisan) => (
          <div className="col-12 col-md-6 col-lg-4" key={artisan.id_artisan}>
            <CarteArtisan artisan={artisan} />
          </div>
        ))}
      </div>
    </main>
  );
}

export default ListeArtisans;