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
