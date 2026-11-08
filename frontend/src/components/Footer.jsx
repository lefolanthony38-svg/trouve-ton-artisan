// Pied de page : adresse de l'antenne de Lyon + liens vers les pages légales
import { Link } from 'react-router';

function Footer() {
  return (
    <footer className="bg-secondary text-white py-4 mt-auto">
      <div className="container">
        <div className="row g-4">

          <div className="col-12 col-md-8">
            <h2 className="h5">Région Auvergne-Rhône-Alpes – Antenne de Lyon</h2>
            <address className="mb-0">
              101 cours Charlemagne<br />
              CS 20033<br />
              69269 LYON CEDEX 02<br />
              France<br />
              <a className="link-light" href="tel:+33426734000">+33 (0)4 26 73 40 00</a>
            </address>
          </div>

          <nav className="col-12 col-md-4" aria-label="Pages légales">
            <ul className="list-unstyled mb-0">
              <li><Link className="link-light" to="/mentions-legales">Mentions légales</Link></li>
                <li><Link className="link-light" to="/donnees-personnelles">Données personnelles</Link></li>
                <li><Link className="link-light" to="/accessibilite">Accessibilité</Link></li>
                <li><Link className="link-light" to="/cookies">Cookies</Link></li>
                
            </ul>
          </nav>

        </div>
      </div>
    </footer>
  );
}

export default Footer;