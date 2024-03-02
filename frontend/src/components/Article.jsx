import axios from "axios";
import PropTypes from "prop-types";

export default function Article({ article, refreshPage }) {
  const deleteArticle = () => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/articles/${article.id}`)
      .then(() => refreshPage())
      .catch((error) => console.error(error));
  };

  return (
    <article>
      <h3>{article.title}</h3>
      <h5>{article.username}</h5>
      <p>{article.content}</p>
      <button type="button" onClick={deleteArticle}>
        Supprimer article
      </button>
    </article>
  );
}

Article.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  refreshPage: PropTypes.func.isRequired,
};
