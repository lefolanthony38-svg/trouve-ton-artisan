// Aiguillage du site : chaque adresse affiche une page
import { Routes, Route } from 'react-router';
import Accueil from './pages/Accueil';
import ListeArtisans from './pages/ListeArtisans';
import FicheArtisan from './pages/FicheArtisan';
import PageLegale from './pages/PageLegale';
import Page404 from './pages/Page404';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Accueil />} />
      <Route path="/categorie/:id" element={<ListeArtisans />} />
      <Route path="/recherche" element={<ListeArtisans />} />
      <Route path="/artisan/:id" element={<FicheArtisan />} />
      <Route path="/mentions-legales" element={<PageLegale />} />
      <Route path="/donnees-personnelles" element={<PageLegale />} />
      <Route path="/accessibilite" element={<PageLegale />} />
      <Route path="/cookies" element={<PageLegale />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;