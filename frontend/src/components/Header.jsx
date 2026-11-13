// En-tête : logo (lien vers l'accueil) + menu des catégories (venant de la base) + recherche par nom + menu mobile
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { appelerApi } from "../services/api";
import logo from "../assets/logo.svg";

function Header() {
  // La boîte "categories", le texte de recherche, et l'état du menu mobile
  const [categories, setCategories] = useState([]);
  const [texte, setTexte] = useState("");
  const [menuOuvert, setMenuOuvert] = useState(false);
  const naviguer = useNavigate();

  // Quand on valide la recherche : on va sur /recherche?q=...
  function lancerRecherche(event) {
    event.preventDefault();
    const motCle = texte.trim();
    if (motCle === "") return; // recherche vide : on ne fait rien
    naviguer(`/recherche?q=${encodeURIComponent(motCle)}`);
    setMenuOuvert(false); // on ferme le menu mobile si on était dessus
  }
  // Au démarrage : on demande les catégories à l'API, puis on les range dans la boîte
  useEffect(() => {
    appelerApi("/categories")
      .then((donnees) => setCategories(donnees))
      .catch(() => setCategories([])); // si l'API ne répond pas, le menu reste vide
  }, []);

  return (
    <header className="border-bottom border-primary border-3 bg-white">
      <nav
        className="container d-flex flex-wrap align-items-center gap-3 py-3"
        aria-label="Navigation principale"
      >
        <Link to="/" className="me-auto">
          <img
            src={logo}
            alt="Trouve ton artisan – retour à l'accueil"
            height="50"
          />
        </Link>
        <button // bouton du menu mobile
          type="button"
          className="btn btn-outline-primary d-md-none"
          aria-label={menuOuvert ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOuvert}
          onClick={() => setMenuOuvert(!menuOuvert)}
        >
          {menuOuvert ? "✕" : "☰"}
        </button>
        <div
          className={`${menuOuvert ? "d-flex" : "d-none"} d-md-flex flex-column flex-md-row align-items-md-center gap-3 col-12 col-md-auto`}
        >
          <ul className="nav flex-column flex-md-row">
            {categories.map((categorie) => (
              <li className="nav-item" key={categorie.id_categorie}>
                <Link className="nav-link fw-medium" to={`/categorie/${categorie.id_categorie}`} onClick={() => setMenuOuvert(false)}>
                  {categorie.nom}
                </Link>
              </li>
            ))}
          </ul>
          <form className="d-flex" role="search" onSubmit={lancerRecherche}>
            <label htmlFor="recherche" className="visually-hidden">
              Rechercher un artisan par son nom
            </label>
            <input
              id="recherche"
              type="search"
              className="form-control rounded-pill border-primary"
              placeholder="Rechercher un artisan…"
              value={texte}
              onChange={(event) => setTexte(event.target.value)}
            />
            <button type="submit" className="btn btn-primary rounded-pill ms-2">
              Rechercher
            </button>
          </form>
        </div>
      </nav>
    </header>
  );
}

export default Header;
