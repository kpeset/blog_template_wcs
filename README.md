# Express - Création des middlewares (avec JOI)

## Objectif de l'atelier

Dans cet atelier, nous allons créer nos premiers middlewares, du moins utile au plus utile.

## Explication du code

### Définition


Un middleware dans Express comme un intermédiaire qui traite les requêtes avant qu'elles n'atteignent la route finale. Il peut exécuter des fonctions comme authentifier des utilisateurs, logger des informations, ou modifier des requêtes, facilitant ainsi la gestion et l'organisation du flux de données.

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

**Note : ** Ici, `currentUser` est évidement en "dur". Mais très bientôt nous serons capable de récupérer dynamiquement le rôle d'un utilisateur.






