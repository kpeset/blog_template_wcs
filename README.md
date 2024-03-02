# Express - Création des middlewares (avec JOI)

## Objectif de l'atelier

Dans cet atelier, nous allons créer nos premiers middlewares, du moins utile au plus utile.

## Explication du code

### Définition

Un middleware dans Express agit comme un intermédiaire qui traite les requêtes avant qu'elles n'atteignent la route finale. Il peut exécuter des fonctions comme authentifier des utilisateurs, logger des informations, ou modifier des requêtes, facilitant ainsi la gestion et l'organisation du flux de données.

### Notre premier middleware

Nous avons commencé par créer un middleware très basique qui va nous envoyer un `console.info` dans le terminal de notre IDE :

<br />

```js
const sayHello = (req, res, next) => {
  console.info("coucou depuis le middleware");
  next();
};
```

<br />

Un middleware prend trois paramètres :

- `req` pour la requête
- `res` pour la réponse
- `next` pour passer au middleware/fonction du controlleur suivante

Il ne faut pas oublier de l'exporter !

<br />

```js
module.exports = { sayHello };
```

<br />

Ici notre middleware va simplement exécuter un `console.info` et passer directement à la fonction `browse` du controller qui gère les articles (dans `router.js` :

<br />

```js
const articleMiddlewares = require("./middlewares/articleMiddlewares");

router.get("/articles", articleMiddlewares.sayHello, articleControllers.browse);
```

<br />

Ici nous avons donc commencé par importer notre middleware que nous utilisons dans notre route avec la fonction désirée.
Notre route va agir en deux étape :

- exécution de la fonction `sayHello` de `articleMiddlewares`
- exécution de la fonction `browse` de `articleControllers`

<br />

### Mise en place de conditions

Notre premier middleware ne fait pas grand chose ! Nous allons mettre en place une fonction qui vérifie le role d'un utilisateur.
Si le role est admin alors nous pourrons accéder à la fonction qui permet de lister tous les articles, sinon nous déclencherons une erreur :

<br />

```js
const checkIfAdmin = (req, res, next) => {
  const currentUser = "admin";

  if (currentUser !== "admin") {
    res.status(400).send("Accès non autorisé");
  } else {
    next();
  }
};
```

<br />

Nous avons crée la fonction `checkIfAdmin` dans notre middleware. Et tout ce que nous avons fait, c'est de mettre une condition à l'intérieur de cette fonction.
Si le rôle n'est pas admin alors le client recevra un status 400 avec le message d'erreur "accès non autorisé".
Si le rôle est admin alors nous faisons `next()` pour passer à la fonctionnalité suivante de notre route.

**Note** : Ici, `currentUser` est évidement en "dur". Mais très bientôt nous serons capable de récupérer dynamiquement le rôle d'un utilisateur.

<br />

### Validation des champs avec JOI

Nous allons maintenant faire un middleware pour vérifier les champs lors de la création d'un article en supposant les spécificités suivantes :

- un titre est obligatoire et doit contenir au minimum 5 caractères et maximum 10 caractères
- un contenu est obligatoire et doit contenir au minimum 20 caractères et maximum 400 caractères

Pour cela nous allons utiliser [JOI](https://www.npmjs.com/package/joi), donc n'oubliez pas de l'installer dans le dossier backend.

Nous commençons par importer Joi dans notre middleware :

<br />

```js
const Joi = require("joi");
```

<br />

Puis nous allons créer la structure de la fonction de notre middleware :

<br />

```js
const validateArticleFields = (req, res, next) => {
  // ici nous mettrons notre code
};
```

<br />

Afin de configurer les spécificités de nos champs nous devons créer un schéma :

```js
const articleSchema = Joi.object({
  title: Joi.string().min(5).max(10).required(),
  content: Joi.string().min(20).max(400).required(),
});
```

<br />

Ici nous avons un schéma basique. Concernant la personnalisation des messages d'erreurs, je vous invite à regarder directement le code.

Puis nous pouvons créer les conditions :

<br />

```js
 const { error } = articleSchema.validate(req.body);

  if (error) {
    res.status(400).json({
      msg: error.details[0].message,
    });
  } else {
    next();
  }
};
```

Dans un premier temps nous voulons récupérer les éventuelles erreurs que va déclencher la fonction `validate`.
Pour cela nous appliquons la fonction `validate` de joi sur notre schema. Cette fonction prend en paramètre les données que nous lui envoyons (ici les données qui proviennent du `body` de la requête).

Si il y a une erreur de saisie, alors nous envoyons au client une erreur 400 au format json avec le message d'erreur provenant de JOI.
Si il n'y a pas d'erreur nous faisons `next()` pour passer à l'étape suivante de notre route.
