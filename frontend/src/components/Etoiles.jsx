 // Affiche une note sur 5 avec des étoiles (pleines, demi, vides)
function Etoiles({ note }) { // note = 0 à 5, peut être décimale
  const pleines = Math.floor(note); // on prend la partie entière de la note pour le nombre d'étoiles pleines
  const demi = note - pleines >= 0.5 ? 1 : 0; // si la partie décimale est >= 0.5, on ajoute une étoile demi
  const vides = 5 - pleines - demi; // le reste des étoiles sont vides
  
  // role="img" : le lecteur d'écran lit l'aria-label au lieu des symboles
  // [...Array(n)] crée un tableau de n cases, .map affiche une étoile par case
  // Chaque étoile dans son <span> pour avoir la même largeur (voir main.scss)
  return (
    <span className="etoiles" role="img" aria-label={`Note : ${note} sur 5`}> 
      {[...Array(pleines)].map((_, i) => <span key={`p${i}`}>★</span>)} 
      {demi === 1 && <span>⯪</span>}
      {[...Array(vides)].map((_, i) => <span key={`v${i}`}>☆</span>)}
    </span>
  );
} 

export default Etoiles;