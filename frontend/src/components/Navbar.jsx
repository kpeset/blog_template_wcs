import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Accueil</Link>
      <Link to="/articles">Articles</Link>
      <Link to="/create">Créer un article</Link>
    </nav>
  );
}
