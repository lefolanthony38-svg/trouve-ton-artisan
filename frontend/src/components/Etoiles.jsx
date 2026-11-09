// Affiche une note sur 5 avec des étoiles (pleines, demi, vides)
function Etoiles({ note }) {
  const pleines = Math.floor(note);
  const demi = note - pleines >= 0.5 ? 1 : 0;
  const vides = 5 - pleines - demi;
  return (
    <span className="etoiles" role="img" aria-label={`Note : ${note} sur 5`}>
      {'★'.repeat(pleines)}
      {demi === 1 && '⯪'}
      {'☆'.repeat(vides)}
    </span>
  );
}

export default Etoiles;