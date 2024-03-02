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
