# Express & React - Hashage de password & Création page Register avec React

## Objectif de l'atelier

Dans cet atelier, nous allons devoir réaliser plusieurs étapes afin de finaliser la création d'utilisateur :

- Hashage du password côté Backend avec Argon2
- Création du formulaire côté frontend

Rappelez-vous, nous avons déjà créer la table user et son manager/controller associé à cette route lors de l'étape 3 ([**voir le commit**](https://github.com/kpeset/blog_template_wcs/commit/1dbf8e46524ee9813e3a4f1085e666c92771c04b))


## Hashage du password

### Création du middlewaire

Nous allons créer un middleware qui va hasher le password avant de l'enregistrer dans la base de données.
Dans le dossier `services` nous allons créer le fichier `auth.js` et utiliser le code suivant :

<br />

```js
const argon2 = require("argon2");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hashedPassword = await argon2.hash(password, hashingOptions);

    req.body.hashedPassword = hashedPassword;
    delete req.body.password;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { hashPassword };

```

<br />

Dans ce code nous allons d'abord créer un objet `hashingOptions` qui contient les paramètres de hashage. Ici nous n'avons rien inventé. Cela provient directement de la documentation.
Puis nous avons crée la fonction `hashPassword` qui va dans un premier temps récupérer le password du `req.body` puis utiliser la fonction `hash` de argon2.
Cette fonction prend deux paramètres :
- le mot de passe
- les options de hashage

Le résultat de cette fonction sera enregistré dans le `req.body` sous le nom de `hashedPassword`.


### Modification de la route

Maintenant que notre middleware est crée il faut l'incorporer à notre route côté express :

<br />

```js
router.post("/users", authMiddlewares.hashPassword, userControllers.add);
```

<br />

Nous utilisons d'abord la fonction `hashPassword` de notre middleware avant d'éxecuter la fonction `add` de notre controller.

<br />

### Modification du controller

La dernière étape côté backend est de modifier le controller.
Jusqu'à maintenant, c'était le `req.body.password` qui était enregistré dans la BDD. Mais rappelez vous que dans le middleware, nous avons enregistré le mot de passe hashé dans `req.body.hashedPassword`.
Nous allons donc l'ajouter à l'objet `userInfos` de la fonction `add` du controller :

<br />

```js
  const userInfos = {
    email: req.body.email,
    password: req.body.hashedPassword,
    username: req.body.username,
  };
```

## Création de la page Register sur React

### Création du formulaire

La première chose à faire est de créer la page `CreateArticle` et de l'ajouter à nos routes dans `Main.jsx`.
Dans cette page, nous allons créer le formulaire suivant :

```jsx
export default function CreateArticle() {
  return (
    <>
      <h1>Créer un article</h1>
      <form>
        <label htmlFor="title">Titre de l&apos;article :</label>
        <input
          type="text"
          name="title"
          onChange={handleChangeForm}
          id="title"
        />
        <label htmlFor="content">Contenu de l&apos;article :</label>
        <textarea name="content" id="content" />
        <input type="submit" />
      </form>
    </>
  );
}
```

Nous devons à présent enregistrer dans un `state` (état), ce que l'on va écrire dans les différents champs à l'aide d'une fonction.
Nous allons d'abord commencer par le `state` :

<br />

```jsx
const [form, setForm] = useState({
  title: "",
  content: "",
  userId: 1,
});
```

<br />

Notre state `form` est un objet qui contient trois propriétés :

- title
- content
- userId (donc la valeur par défaut est 1)

**Rappel :** `userId` est l'id de l'utilisateur qui va écrire l'article. Comme pour l'instant nous ne pouvons pas nous connecter, nous allons mettre par défaut le `userId` à 1.

<br />

Maintenant nous allons créer la fonction `handleChangeForm` qui va écouter ce qu'il se passe dans les champs et enregistrer son contenu dans le state `form` :

<br />

```jsx
const handleChangeForm = (event) => {
  setForm({
    ...form,
    [event.target.name]: event.target.value,
  });
};
```

<br />

Cette fonction va changer le state `form` avec la fonction `setForm` qui prendre en paramètre un objet.
Le `...form` permet de récupérer les propriétés et valeurs, ce qui nous permet de ne pas écraser à chaque fois les précédentes données.
Ensuite nous avons `[event.target.name]` qui permet de nommer dynamiquement la propriété de notre objet par rapport au `name` du champ que subit l'action et `event.target.value` nous permet de récupérer la `value` du champ qui subit l'action.

<br />

Il ne nous reste plus qu'à lier cette fonction à nos champs :

<br />

```jsx
        <input
          type="text"
          name="title"
          onChange={handleChangeForm}
          id="title"
        />
        <textarea name="content" onChange={handleChangeForm} id="content" />

```

<br />

### Envoie du formulaire au backend

<br />

Maintenant que nous arrivons à enregistrer les données dans un `state`, il ne nous reste plus qu'à l'envoyer au backend.
Nous allons créer la fonction suivante :

<br />

```jsx
const submitArticle = (event) => {
  event.preventDefault();
  axios
    .post(`${import.meta.env.VITE_BACKEND_URL}/api/articles/`, form)
    .then((response) => console.info(response))
    .catch((err) => console.error(err));
};
```

Cette fonction permet d'utiliser la méthode `post` d'axios sur l'URL provenant du `.env`. En deuxième paramètre à la fonction `post`, nous envoyons ce qu'il y a dans le state `form`.

Il ne faut pas oublier d'exécuter cette fonction à la soumission du formulaire :

<br />

```jsx
      <form onSubmit={submitArticle}>
```

<br />

Et voilà ! Maintenant depuis le front, vous êtes capables d'intéragir avec le back ! 🚀
