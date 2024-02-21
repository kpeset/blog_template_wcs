# Express - Création du controller et manager pour la gestion des articles (create & read)

## Objectif de l'atelier

Dans cet atelier, nous allons commencer notre CRUD, en faisant des fonctions capables de rédiger et créer des articles.

## Explication du code

### Préambule

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
