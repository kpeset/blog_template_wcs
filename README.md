# React - Lier le front et le back
## Objectif de l'atelier

Dans cet atelier, nous avons crée deux pages côté frontend :
- lister / supprimer les articles
- création d'un article

## Lister les articles

### Création de la page

La première étape est de créer un composant React qui va nous servir de page.
Nous lui avons donné le nom de `Articles.jsx` :

<br />

```jsx
export default function Articles() {
  return (
    <>
      <h1>Liste des articles :</h1>
    </>
  );
}
```

<br />

Pour le moment nous n'avons pas besoin de faire grand chose de plus. Nous avons simplement crée la structure de la page. Nous la modifirons plus tard.

### Création de la route

Maintenant que notre page est crée il faut créer la route côté front :

<br />

```jsx
import Articles from "./pages/Articles";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/articles",
        element: <Articles />,
      }
    ],
  },
]);
```

<br />

**RAPPEL :** Ici il s'agit d'un léger rappel concernant les routes. N'oubliez pas de configurer le `Outlet` dans `App.jsx`. Observez bien le code si vous ne souvenez plus comment créer des routes sur React. Je vous invite aussi à revoir le workshop sur le sujet.

<br />

Maintenant que notre route est crée, nous allons exécuter notre requête API au chargement de la page. Nous allons rajouter un `loader` (n'oubliez pas d'installer / importer axios) :

<br />

```jsx
     {
        path: "/articles",
        element: <Articles />,
        loader: () =>
          axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/api/articles`)
            .then((response) => response.data),
      },
```

<br />

Le loader va exécuter une requête axios de la façon classique : `axios.get(url_du_backend).then(faire_quelque_chose_si_pas_erreur)`.

Ici pour l'url, je récupère d'abord l'url dans le .env :

<br />

```
VITE_BACKEND_URL=http://localhost:3310
```

<br />

Et j'ajoute ensuite le chemin exacte. Ce qui donne :

<br />

```js
`${import.meta.env.VITE_BACKEND_URL}/api/articles`
```

<br />

Puis dans le `then` nous retournons la propriété `data` de notre response.

**RAPPEL :** Si à ce moment là vous êtes perdus, je vous invite à relire le workshop sur le router ou a revoir les vidéos **React : Introduction aux requêtes API et React : Axios (router, useEffect)**.

### Récupération des articles

Maintenant il ne nous reste plus qu'à afficher le résultat de la requête sur notre page.
Nous avons crée un composant `Article.jsx` :

<br />

```jsx
export default function Article({ article }) {
  return (
    <article>
      <h3>{article.title}</h3>
      <h5>{article.username}</h5>
      <p>{article.content}</p>
    </article>
  );
}
```

<br />

Notre composant va, de la façon la plus classique recevoir des props.
Nous appelerons ce composant sur la page `Articles.jsx` autant de fois qu'il y aura de résultats dans la requête grace à la méthode `map` :

<br />

```jsx
import { useLoaderData } from "react-router-dom";
import Article from "../components/Article";

export default function Articles() {
  const articles = useLoaderData();

  return (
    <>
      <h1>Liste des articles :</h1>
      {articles.map((article) => (
        <Article key={article.id} article={article} refreshPage={refreshPage} />
      ))}
    </>
  );
}
```

<br />

Comme d'habitude, nous avons utilisé le hook `useLoaderData` afin de récupérer ce que nous a retourné le `loader` dans la route de `main.jsx`.

## Création d'un article

### Création du formulaire

### Envoie du formulaire au backend
