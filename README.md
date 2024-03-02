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

**RAPPEL :** Ici il s'agit d'un léger rappel concernant les routes. N'oubliez pas de configurer le `Outlet` dans `App.jsx`. Observez bien le code si vous ne souvenez plus comment créer des routes sur React.

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

### Récupération des articles


## Création d'un article

### Création du formulaire

### Envoie du formulaire au backend
