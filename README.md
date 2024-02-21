# Express - Création du controller et manager pour la gestion des articles (create & read)

## Objectif de l'atelier

Dans cet atelier, nous allons commencer notre CRUD, en faisant des fonctions capables de rédiger et créer des articles.

## Préambule

### Création de la base de données mySQL

Avant toute chose, il était important d'avoir une base de données afin de pouvoir intéragir avec via notre serveur API.
Depuis le template, nous pouvons directement éditer le fichier `schema.sql` qui se trouve dans le dossier **backend/database/**.
Nous pouvons créer nos tables ainsi que quelques données. Exemples

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
Bien qu'il n'y ai pas d'ordre à respecter lorsque l'on code, il me semble quand même plus logique de commencer à créer le **manager**.
Dans un premier temps nous allons nous contenter d'écrire la structure du code :

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

Il faut ensuite l'importer dans le fichier `tables.js` :

```js
// Import the manager modules responsible for handling data operations on the tables
const ArticleManager = require("./models/ArticleManager");

const managers = [
    ArticleManager,
];
```

Nous commençons par importer `ArticleManager` et nous le mettons dans le tableau `managers`. C'est tout ! Notre fichier est prêt à être utilisé.



