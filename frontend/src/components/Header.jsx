// En-tête : logo (lien vers l'accueil) + menu des catégories (venant de la base)
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { appelerApi } from '../services/api';
import logo from '../assets/logo.svg';

function Header() {
  // La boîte "categories", vide au départ
  const [categories, setCategories] = useState([]);
  const [texte, setTexte] = useState('');
  const naviguer = useNavigate();

  // Quand on valide la recherche : on va sur /recherche?q=...
  function lancerRecherche(event) {
    event.preventDefault();
    const motCle = texte.trim();
    if (motCle === '') return; // recherche vide : on ne fait rien
    naviguer(`/recherche?q=${encodeURIComponent(motCle)}`);
  }
  // Au démarrage : on demande les catégories à l'API, puis on les range dans la boîte
  useEffect(() => {
    appelerApi('/categories')
      .then((donnees) => setCategories(donnees))
      .catch(() => setCategories([])); // si l'API ne répond pas, le menu reste vide
  }, []);

  return (
    <header className="border-bottom border-primary border-3 bg-white">
      <nav className="container d-flex flex-wrap align-items-center gap-3 py-3" aria-label="Navigation principale">

        <Link to="/" className="me-auto">
          <img src={logo} alt="Trouve ton artisan – retour à l'accueil" height="50" />
        </Link>

        <ul className="nav">
          {categories.map((categorie) => (
            <li className="nav-item" key={categorie.id_categorie}>
              <Link className="nav-link fw-medium" to={`/categorie/${categorie.id_categorie}`}>
                {categorie.nom}
              </Link>
            </li>
          ))}
        </ul>
        <form className="d-flex" role="search" onSubmit={lancerRecherche}>
          <label htmlFor="recherche" className="visually-hidden">Rechercher un artisan par son nom</label>
          <input
            id="recherche"
            type="search"
            className="form-control rounded-pill border-primary"
            placeholder="Rechercher un artisan…"
            value={texte}
            onChange={(event) => setTexte(event.target.value)}
          />
          <button type="submit" className="btn btn-primary rounded-pill ms-2">Rechercher</button>
        </form>
      </nav>
    </header>
  );
}

export default Header;