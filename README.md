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

Après avoir crée la page `Register.jsx` et de l'avoir ajouté à la route, nous allons créer un formulaire de base :

<br />

```jsx
    <>
      <h1>Page de register</h1>
      <form onSubmit={submitForm}>
        <label>Email</label>
        <input type="email" onChange={handleChangeEmail} />
        <label>Password</label>
        <input type="password" onChange={handleChangePassword} />
        <label>Username</label>
        <input type="text" onChange={handleChangeUsername} />
        <input type="submit" />
      </form>
    </>
```

Comme dans les formulaires que l'on a fait précédemment, nous allons créer trois fonctions pour récupérer :
- la valeur de l'input qui concerne l'émail
- la valeur de l'input qui concerne le password
- la valeur de l'input qui concerne le username

<br />

```jsx
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
```

<br />

Bien entendu, n'oubliez pas créer les states :

<br /> 

```js
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
```

Ces states vont contenir la valeur des champs que nous allons envoyer dans la requête axios :

<br />

```js
  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3310/api/users/", {
        email,
        password,
        username,
      })
      .then((response) => console.info(response))
      .catch((error) => console.error(error));
  };
```

Et voilà ! Un utilisateur peut maintenant créer son compte !
