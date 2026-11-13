// Fiche artisan : infos détaillées (+ formulaire de contact, bientôt)
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { appelerApi } from '../services/api';
import Etoiles from '../components/Etoiles';
import Page404 from './Page404';
import imageArtisan from '../assets/artisan.svg';

function FicheArtisan() {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [introuvable, setIntrouvable] = useState(false);
  const [form, setForm] = useState({ nom: '', email: '', objet: '', message: '' });

  function changerChamp(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function envoyerMessage(event) {
    event.preventDefault();
    console.log('Clic reçu, envoi de :', form);
    appelerApi(`/artisans/${id}/contact`, {
      method: 'POST',
      body: JSON.stringify(form),
    })
      .then(() => console.log('Message envoyé'))
      .catch((erreur) => console.log(erreur.status, erreur.erreurs));
  }

  useEffect(() => {
    setArtisan(null);
    setIntrouvable(false);
    appelerApi(`/artisans/${id}`)
      .then((donnees) => setArtisan(donnees))
      .catch(() => setIntrouvable(true)); // 404 de l'API → page introuvable
  }, [id]);

  // Cas 1 : l'artisan n'existe pas
  if (introuvable) return <Page404 />;

  // Cas 2 : la réponse n'est pas encore arrivée
  if (!artisan) {
    return <main className="container py-5 flex-grow-1"><p>Chargement…</p></main>;
  }

  // Cas 3 : on affiche la fiche
  return (
    <main className="flex-grow-1">
      <section className="bg-light py-4">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-12 col-md-4">
              <img src={imageArtisan} alt={`Illustration de ${artisan.nom}`} className="img-fluid rounded border border-primary" />
            </div>
            <div className="col-12 col-md-8">
              <h1 className="text-secondary fw-bold">{artisan.nom}</h1>
              <p className="mb-1">
                <Etoiles note={artisan.note} /> <span className="ms-1">{artisan.note} / 5</span>
              </p>
              <p className="h5 text-primary mb-1">{artisan.Specialite.nom}</p>
              <p className="mb-3">📍 {artisan.ville}</p>

              {artisan.site_web && (
                <a className="btn btn-outline-primary" href={artisan.site_web} target="_blank" rel="noopener noreferrer">
                  Visiter le site web <span className="visually-hidden">(nouvel onglet)</span>↗
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="container py-4">
        <h2 className="text-secondary">À propos</h2>
        <p>{artisan.a_propos}</p>
      </section>
                 <section className="container pb-5">
        <h2 className="text-secondary">Contacter l'artisan</h2>
        <form onSubmit={envoyerMessage}>
          <div className="mb-3">
            <label htmlFor="nom" className="form-label">Nom</label>
            <input id="nom" name="nom" type="text" className="form-control" maxLength={100} required value={form.nom} onChange={changerChamp} />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input id="email" name="email" type="email" className="form-control" required value={form.email} onChange={changerChamp} />
          </div>

          <div className="mb-3">
            <label htmlFor="objet" className="form-label">Objet</label>
            <input id="objet" name="objet" type="text" className="form-control" maxLength={50} required value={form.objet} onChange={changerChamp} />
          </div>

          <div className="mb-3">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea id="message" name="message" className="form-control" maxLength={500} rows={4} required value={form.message} onChange={changerChamp} />
          </div>

          <button type="submit" className="btn btn-primary">Envoyer</button>
        </form>
      </section>
    </main>
  );
}

export default FicheArtisan;