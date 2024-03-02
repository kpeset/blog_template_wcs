# Express - Finalisation du CRUD pour les articles (update & delete) et création d'utilisateurs

## Objectif de l'atelier

Dans cet atelier, nous allons finaliser notre CRUD concernant la gestion des articles et des utilisateurs.

## Explication du code

### Notre premiere jointure

Actuellement quand nous utilisons la route `/articles`, nous avons le résultat suivant :

<br />

```json
[
  {
    "id": 1,
    "title": "Les meilleurs restos de Liège",
    "content": "Lorem ipsum dolor sit amet, consectetur.",
    "creation_datetime": "2024-03-02T10:31:35.000Z",
    "user_id": 1
  }
]
```

<br />

Comme vous pouvez le constater, nous affichons des informations qui sont exploitables, à l'exception d'une seule vraiment utile : le nom d'utilisateur.
Lorsque nous faisons cette requête, nous voulons avoir le nom d'utilisateur, mais celui-ci n'apparait pas lorsque l'on fait notre requête puisqu'il provient d'une autre table :

<br />

```SQL
select * from articles;
```

<br />

Lors de cette requête nous n'avons que l'id de l'utilisateur.

Nous allons devoir faire une jointure entre la table `article` et `user` afin de récupérer les informations qui nous intéressent dans dans la table `user` :

<br />

```sql
select article.id, article.title, article.content, article.creation_datetime, user.username from ${this.table} JOIN user ON article.user_id = user.id
```

<br />

Quel est le point commun entre le `user_id` qui provient de `article` et `id` de la table `user` ?
La réponse est simple 😉 L'id de l'utilisateur qui a crée l'article. C'est cet id qui va nous servir à faire la jointure.

De cette façon, nous pouvons récupérer tout ce qu'il y a dans la table `user`.

Maintenant le résultat de notre requête pour lister les articles est le suivant :

```json
[
  {
    "id": 1,
    "title": "Les meilleurs restos de Liège",
    "content": "Lorem ipsum dolor sit amet, consectetur.",
    "creation_datetime": "2024-03-02T10:31:35.000Z",
    "username": "admin"
  }
]
```

Plutôt cool, non ?
Les jointures vont permettre de relier les tables pour récupérer de tables en tables les informations qui nous intéressent.

<br />

### Modification d'un article

Maintnenant nous allons faire en sorte de pouvoir modifier les éléments suivants d'un article :
- le titre
- le contenu
- la date

**Conseil :** Avant même de coder quoi que ce soit, je vous conseille de trouver la requête SQL pour réaliser ce que vous voulez faire.

<br />

C'est d'ailleurs ce que nous allons faire ! Trouver la requête SQL qui nous permet de mettre à jour un article :

<br />

```sql
UPDATE article SET title="Nouveau titre", content="Texte de notre article", creation_datetime=NOW() WHERE id=3
```
<br />

Ici nous utilisons la commande SQL `UPDATE` pour modifier la table article.
La clause `SET` permet de dire quelle propriété va être modifiée et sa valeur.
La clause `WHERE` permet de dire quel id va être concerné par les modifications.

**ATTENTION :** Si nous ne spécifions pas d'id alors TOUS les articles seront modifiés.

<br />

Maintenant que nous avons notre commande SQL, nous pouvons créer la fonction `update` dans notre manager :

<br />

```js
  async update(article) {
    const [rows] = await this.database.query(
      `UPDATE ${this.table} SET title=?, content=?, creation_datetime=NOW() WHERE id=?`,
      [article.title, article.content, article.id]
    );
    return rows;
  }
```

<br />

Nous savons que le titre, le contenu et l'id de l'article sont dynamiques puisque c'est l'utlisateur (qui possède un id), qui va écrire du nouveau contenu pour son article.

Toutes ces informations vont être récupérées dans les paramètres (ici `article`) de la fonction que nous exécuterons dans le controller.

Il est temps de nous occuper du controller :

<br />

```js
const update = async (req, res, next) => {
  const articleInfos = {
    title: req.body.title,
    content: req.body.content,
    id: req.params.id,
  };

  try {
    const result = await tables.article.update(articleInfos);
    if (result.affectedRows === 0) {
      res.status(404).json({ msg: "article introuvable" });
    } else {
      res.json({ msg: "article modifié avec succès" });
    }
  } catch (err) {
    next(err);
  }
};
```

<br />

Nous avons dans notre controller crée la fonction `update`.
Dans cette fonction nous allons créer l'objet `articleInfos` que nous enverons à notre manager.
Cet objet contient :
- le title qui provient du `req.body`
- le content qui provient de `req.body`
- l'id de l'article qui lui provient des params `req.params` de l'url de la requête (`/api/articles/3` : ici 3 est le params)
