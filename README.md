# Express - Création du controller et manager pour la gestion des articles (create & read)

## Objectif de l'atelier

Dans cet atelier, nous allons commencer notre CRUD, en faisant des fonctions capables de lire et créer des articles.

## Préambule

### Création de la base de données mySQL

Avant toute chose, il était important d'avoir une base de données afin de pouvoir intéragir avec via notre serveur API.
Depuis le template, nous pouvons directement éditer le fichier `schema.sql` qui se trouve dans le dossier **backend/database/**.
Nous pouvons créer nos tables ainsi que quelques données. Exemples

<br />

```sql
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL
);

INSERT INTO user (email, password, username) VALUES
('admin@gmail.com', 'secret', 'admin'),
('kevin@gmail.com', 'viveleback', 'Kevin'),
('ninon@gmail.com', 'middleages', 'Ninon'),
('windy@gmail.com', 'croquette', 'Windy');
```

<br />

**RAPPEL : Pour pouvoir importer ces données dans notre BDD, le template nous propose de faire la commande **`npm run db:migrate`**.**

## Organisation

### Le MVC

Le modèle MVC, pour **Modèle-Vue-Contrôleur**, est une architecture qui va nous permettre de développer notre API de manière organisée et modulaire. 
Le "Modèle" représente la structure des données et la logique métier, la "Vue" correspond à l'affichage de ces données, et le "Contrôleur" fait le lien entre le modèle et la requête provenant du client.
<br />
Afin de mieux organiser la logique de code, nous aurons alors :
- un fichier `Manager` par table qui contiendra nos requêtes SQL
- un fichier `Controller` par table
- un fichier `Router` pour y mettre toutes les routes

<br />

### Le Manager
Bien qu'il n'y ai pas d'ordre à respecter lorsque l'on code, il me semble quand même plus logique de commencer par créer le **manager**.
Dans un premier temps nous allons nous contenter d'écrire la structure du code :

<br />

```js
const AbstractManager = require("./AbstractManager");

class ArticleManager extends AbstractManager {
  constructor() {
    super({ table: "article" });
  }

  // Nous mettrons nos fonctions ici

}

module.exports = ArticleManager;
```

<br />

**RAPPEL :** Ici nous sommes en **Programmation Orientée Objet**. Nous avons crée une class `ArticleManager` qui va hériter des propriété du parent `AbstractManager`. Nous reviendrons sur cela plus tard.

Il faut ensuite l'importer dans le fichier `tables.js` :

```js
// Import the manager modules responsible for handling data operations on the tables
const ArticleManager = require("./models/ArticleManager");

const managers = [
    ArticleManager,
];
```

Nous commençons par importer `ArticleManager` et nous le mettons dans le tableau `managers`. C'est tout ! Notre fichier est prêt à être utilisé.

<br />

### Le Controller
Maintenant nous allons créer un fichier `ArticleControllers` dans le dossier `/backend/src/controllers`.
Dans un premier temps, nous allons juste nous content d'écrire la structure de nos fonctions. Aucune logique dedans. Cela va juste nous servir à importer nos fonctions pour la création des routes :

<br />

```js
const browse = async (req, res, next) => {
  try {
    // do something
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    // do something
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  try {
    // do something
  } catch (err) {
    next(err);
  }
};


module.exports = {
  browse,
  read,
  add,
};
```

<br />

Ici nous avons utilisé une syntaxe `async / await`, néanmoins nous aurions pu utiliser le système de promesses `then / catch`. Encore une fois, c'est selon les préférences.

**RAPPEL :** nos fonctions prennent obligatoirement trois paramètres :
- `req` pour la requête
- `res` pour la réponse
- `next` pour la gestion des erreurs

<br />

### Les routes

Maintenant que tout est "prêt", nous pouvons créer nos routes dans le fichier `router.js`.
La première étape est d'importer notre controller précédemment crée :

<br />

```js
const articleControllers = require("./controllers/articleControllers");
```

<br />

Nous pouvons maintenant créer nos routes en conséquence :

<br />

```js
router.get("/articles", articleControllers.browse);
router.get("/articles/:id/", articleControllers.read);
router.post("/articles", articleControllers.add);
```

<br />

Nous utilisons une méthode `http` sur notre router (ici `get` ou `post`). Cette fonction prend deux paramètres :
- le path (exemple : `/articles`)
- une fonction liée à un controller (exemple : la fonction `read` qui provient du `articleControllers`)

## Explication du code

### Lister tous les articles

Pour le moment, les différentes fonctions que nous avons crée ne servent à rien. Nous n'avons encore mis aucune logique dans le controller ou le manager.
Il est temps d'y remédier !

<br />

Nous voulons ici lister tous nos articles qui sont présents dans la bdd. Si nous étions dans un terminal SQL nous aurions fait la commande `SELECT * FROM article;`.
Et bien là c'est la même chose ! Comme nous l'avons vu dans les cours et live co, nous pouvons éxecuter des requêtes SQL dans du javascript à l'intérieur de notre `ArticleManager.js` :

<br />

```js
  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }
```

<br />

Cette fonction a plusieurs spécificités : 

- Cette fonction `readAll`, marquée par le mot-clé `async`, indique qu'elle s'exécute de manière `asynchrone`. 
- Elle utilise `await` pour attendre le résultat d'une requête SQL envoyée à la base de données par `this.database.query()`. 
- Dans `query()` nous mettons alors notre requête sql.
- Nous avons `${this.table}` qui fait référence à la table du manager.
- La déstructuration de `[rows]` est utilisée pour extraire le premier élément de ce tableau, qui correspond aux lignes de la table qui sont ensuite retournées par la fonction. Cela permet de récupérer directement les données de la base de données.

<br />

Maintenant que la requête est prète, il ne nous reste plus qu'à écrire la logique dans la fonction `browser` de notre `articleControllers.js` :

<br />

```js
const browse = async (req, res, next) => {
  try {
    const articles = await tables.article.readAll();
    res.json(articles);
  } catch (err) {
    next(err);
  }
};
```

<br />

Dans cette fonction `browse`, nous utilisons la fonction `readAll()` précédement crée.
La syntaxe `await tables.article.readAll()` peut être interprété de la façon suivante :

_Dans le manager Article je veux exécuter la fonction readAll_

Nous enregistrons le résultat de cette fonction dans `const articles` que nous afficherons au format `json` dans la réponse de notre requête :

<br />

```js
    res.json(articles);
```

<br />

Notre route est maintenant totalement fonctionnelle !

<br />

### Lire un article selon son ID

Maintenant que nous avons vu comment créer un controller/manager de A à Z, il est maintenant beaucoup plus facile de créer nos autre requêtes.
Les choses qui vont varier sont :
- les éléments que nous avons besoin pour exécuter une requête (ici un id)
- la requête SQL

<br />

Tout ce que nous avons à faire, c'est de créer notre fonction dans `ArticleManager.js` qui permet de créer notre requête :

<br />

```js
  async read(id) {
    // do something
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );
    return rows;
  }
```

<br />

Dans un terminal MySQL, pour chercher un article selon son id (exemple l'id 34), nous aurions exécuté cette commande :

```sql
SELECT * FROM article WHERE id = 34;
```

<br />

Et bien là c'est pareil ! À la différence que nous voulons que l'id soit dynamique. Nous ne voulons pas uniquement afficher l'article qui a l'id 34 ! Nous voulons pouvoir aussi afficher l'article 92, 73 etc...

<br />

```js
      `select * from ${this.table} where id = ?`,
```

<br />

Ici nous avons mis un `?` pour que l'id soit dynamique. Ce `?` sera remplacé par les éléments qui sont dans le tableau qui suit la requête :

<br />

```js

  `select * from ${this.table} where id = ?`,
      [id]

```

<br />

Dans notre tableau, nous avons mis un `id` qui va provenir des paramètres de la fonction que l'on va exécuter :

<br />

```js
  async read(id)
```

<br />

Maintenant nous pouvons ajouter la logique à la fonction du controller :

<br />

```js
const read = async (req, res, next) => {
  const { id } = req.params;
  try {
    const article = await tables.article.read(id);
    res.json(article);
  } catch (err) {
    next(err);
  }
};
```

<br />

Nous avions besoin d'un id. Pour le récupérer nous allons utiliser les params de l'url avec `req.params`. 
Pour configurer les params sur notre route, nous avons du l'écrire comme ceci dans `router.js` :

<br />

```js
router.get("/articles/:id/", articleControllers.read);
```

<br />

Les `:id` signifie que la route va devoir prendre en compte des `params` que l'on a appelé **id**. Ce sont ces params là que nous allons récupérer lorsque nous ferons la requête `http://localhost:3311/api/articles/34`.

<br />

### Création d'un article

Pour créer un article, nous allons encore une fois utiliser la même logique que précédemment. Il y aura cependant quelques différences :

- La méthode http `post` sera exécuter sur notre route
- La requête SQL sera un `insert into`
- Nous utiliserons le `body` plutôt que les `params`

Je vous invite à bien analyser la fonction `add` du controller et `create` du manager.

<br />

```js

// fonction add du controller

const add = async (req, res, next) => {
  const articleInfos = {
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId,
  };

  try {
    const result = await tables.article.create(articleInfos);
    console.info(result);
    res.status(200).json({
      msg: "article enregistré avec succès",
      status: result,
    });
  } catch (err) {
    next(err);
  }
};

// fonction create du manager

  async create(article) {
    const [rows] = await this.database.query(
      `INSERT INTO ${this.table} (title, content, user_id, creation_datetime) VALUES (?, ?, ?, NOW())`,
      [article.title, article.content, article.userId]
    );
    return rows;
  }

```

<br />

**RAPPEL :** Par défaut, on ne peut pas envoyer un format `json` dans le body de notre requête. Il est important d'ajouter la ligne suivante dans `App.js` :

<br />

```js
app.use(express.json());
```

La fonction `create` s'attend à recevoir un paramètre. Nous lui envoyons donc l'objet `articleInfos` qui va récupérer ce qu'il y aura dans le corps (`body`) de notre requête.

