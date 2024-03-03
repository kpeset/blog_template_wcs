import { useLoaderData, useNavigate } from "react-router-dom";
import Article from "../components/Article";

export default function Articles() {
  const articles = useLoaderData();

  const navigate = useNavigate();

  const refreshPage = () => {
    navigate("/articles", { replace: true });
  };

  return (
    <>
      <h1>Liste des articles :</h1>
      {articles.map((article) => (
        <Article key={article.id} article={article} refreshPage={refreshPage} />
      ))}
    </>
  );
}
