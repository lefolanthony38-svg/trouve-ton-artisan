// Carte d'un artisan : nom, note en étoiles, spécialité, ville (cliquable vers sa fiche)
import { Link } from 'react-router';
import Etoiles from './Etoiles';

function CarteArtisan({ artisan }) {
  return (
    <article className="card h-100 border-primary shadow-sm">
      <div className="card-body">
        <h3 className="h5 card-title">
          <Link className="stretched-link text-secondary text-decoration-none" to={`/artisan/${artisan.id_artisan}`}>
            {artisan.nom}
          </Link>
        </h3>
        <p className="mb-1">
          <Etoiles note={artisan.note} /> <span className="ms-1">{artisan.note}</span>
        </p>
            <p className="mb-1 text-primary">{artisan.Specialite.nom}</p>
            <p className="mb-0">📍 { artisan.ville }</p>
      </div>
    </article>
  );
}

export default CarteArtisan;