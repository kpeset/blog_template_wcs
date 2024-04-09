import { useState } from "react";
import axios from "axios";

export default function CreateArticle() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    userId: 1,
  });

  const [image, setImage] = useState("");

  const handleChangeForm = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const submitArticle = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("userId", form.userId);
    formData.append("image", image);

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/articles/`, formData)
      .then((response) => console.info(response))
      .catch((err) => console.error(err));
  };

  console.info("IMAGE", image);

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
        <label htmlFor="image">Image de l'article</label>
        <input
          type="file"
          name="image"
          onChange={(event) => setImage(event.target.files[0])}
        />
        <label htmlFor="content">Contenu de l&apos;article :</label>
        <textarea name="content" onChange={handleChangeForm} id="content" />
        <input type="submit" />
      </form>
    </>
  );
}
