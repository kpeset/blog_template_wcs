import { useState } from "react";
import axios from "axios";

export default function CreateArticle() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    userId: 1,
  });

  const handleChangeForm = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const submitArticle = (event) => {
    event.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/articles/`, form)
      .then((response) => console.info(response))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <h1>Créer un article</h1>
      <form onSubmit={submitArticle}>
        <label htmlFor="title">Titre de l&apos;article :</label>
        <input
          type="text"
          name="title"
          onChange={handleChangeForm}
          id="title"
        />
        <label htmlFor="content">Contenu de l&apos;article :</label>
        <textarea name="content" onChange={handleChangeForm} id="content" />
        <input type="submit" />
      </form>
    </>
  );
}
