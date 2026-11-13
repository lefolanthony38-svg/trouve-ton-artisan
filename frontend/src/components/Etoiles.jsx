// Affiche une note sur 5 avec des étoiles (pleines, demi, vides)
function Etoiles({ note }) { // note = 0 à 5, peut être décimale
  const pleines = Math.floor(note);
  const demi = note - pleines >= 0.5 ? 1 : 0;
  const vides = 5 - pleines - demi;
  return (
    <span className="etoiles" role="img" aria-label={`Note : ${note} sur 5`}> // role="img" pour que les lecteurs d'écran lisent le texte alternatif
      {[...Array(pleines)].map((_, i) => <span key={`p${i}`}>★</span>)} // on crée un tableau de la taille du nombre d'étoiles pleines, puis on mappe dessus pour afficher une étoile pleine pour chaque élément
      {demi === 1 && <span>⯪</span>}
      {[...Array(vides)].map((_, i) => <span key={`v${i}`}>☆</span>)} // idem pour les étoiles vides
    </span>
  );
} 

export default Etoiles;