// Page 404 : affichée pour toute adresse inconnue
import { Link, useNavigate } from "react-router";
import image404 from "../assets/404.svg";

function Page404() {
  const naviguer = useNavigate();

  return (
    <main className="container py-5 text-center flex-grow-1">
      <title>{`Page non trouvée | Trouve ton artisan`}</title>
      <meta
        name="description"
        content={`Page non trouvée sur le site Trouve ton artisan.`}
      />
      <img
        src={image404}
        alt=""
        className="img-fluid mb-4"
        style={{ maxWidth: "320px" }}
      />
      <h1 className="text-secondary fw-bold">Page non trouvée</h1>
      <p className="mb-4">
        La page que vous cherchez n'existe pas ou a été déplacée.
      </p>
      <Link to="/" className="btn btn-primary me-2">
        Retour à l'accueil
      </Link>
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={() => naviguer(-1)}
      >
        Page précédente
      </button>
    </main>
  );
}

export default Page404;
