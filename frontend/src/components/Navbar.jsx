import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../services/UserContext";

export default function Navbar() {
  const { user } = useContext(UserContext);

  const isConnected = user.id && user.id !== "null";

  console.info("isConnected", isConnected);

  return (
    <nav>
      <Link to="/">Accueil</Link>
      {isConnected ? <Link to="/articles">Articles</Link> : null}
      {isConnected ? <Link to="/create">Créer un article</Link> : null}
      {!isConnected ? <Link to="/register">Créer un compte</Link> : null}
      {!isConnected ? <Link to="/login">Se connecter</Link> : null}
    </nav>
  );
}
