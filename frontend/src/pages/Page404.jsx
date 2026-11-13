// Page 404 : affichée pour toute adresse inconnue
import { Link, useNavigate } from 'react-router';

function Page404() {
  const naviguer = useNavigate();

  return (
    <main className="container py-5 text-center flex-grow-1">
      <h1 className="text-secondary fw-bold">Page non trouvée</h1>
      <p className="mb-4">La page que vous cherchez n'existe pas ou a été déplacée.</p>
      <Link to="/" className="btn btn-primary me-2">Retour à l'accueil</Link>
      <button type="button" className="btn btn-outline-primary" onClick={() => naviguer(-1)}>
        Page précédente
      </button>
    </main>
  );
}

export default Page404;