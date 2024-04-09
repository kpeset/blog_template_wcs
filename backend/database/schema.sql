-- Création de la table user
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL
);

-- Création de la table article
CREATE TABLE article (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    creation_datetime DATETIME NOT NULL,
    image VARCHAR(255),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user (id)
);

CREATE TABLE message (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT,
    receiver_id INT,
    content TEXT,
    TIMESTAMP DATETIME DEFAULT CURRENT_TIMESTAMP,
    Foreign Key (sender_id) REFERENCES user (id),
    Foreign Key (receiver_id) REFERENCES user (id)
);

-- Création des utilisateurs
INSERT INTO
    user (email, password, username)
VALUES
    (
        'admin@gmail.com',
        'secret',
        'admin'
    ),
    (
        'kevin@gmail.com',
        'viveleback',
        'Kevin'
    ),
    (
        'ninon@gmail.com',
        'middleages',
        'Ninon'
    ),
    (
        'windy@gmail.com',
        'croquette',
        'Windy'
    );

INSERT INTO
    message (sender_id, receiver_id, content)
VALUES
    (1, 2, "Coucou"),
    (2, 1, "Salut, ça fait longtemps !"),
    (
        3,
        2,
        "Popopo tu viens au toto loco ?"
    );

-- Création des articles
INSERT INTO
    article (
        title,
        content,
        creation_datetime,
        user_id
    )
VALUES
    (
        'Les meilleurs restos de Liège',
        'Lorem ipsum dolor sit amet, consectetur.',
        NOW(),
        1
    ),
    (
        'Ruby : Quel merveilleux language',
        'Amet consectetur adipiscing elit, sed do eiusmod.',
        NOW(),
        2
    ),
    (
        'PHP : Quel ...language !',
        'Dolor sit amet, consectetur.',
        NOW(),
        2
    ),
    (
        'Le moyen-âge : vaste sujet',
        'Tempor incididunt ut labore et dolore magna.',
        NOW(),
        3
    );