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



