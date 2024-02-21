Patience ... Le README arrive ...

En attendant voici un exercice :

Vous allez faire en sorte qu'il y ai maintenant la possibilité de lister les utilisateurs (de la table user ! Vous êtes perdus ? Regardez le fichier schema.sql dans le dossier database !) et de pouvoir en créer.
Donc vous allez devoir, je suppose, créer les deux routes, le controller, et le manager.

Si vous avez des soucis, vous pouvez regarder ce qui a été fait précédemment dans la step 01 !

Executer les routes sur Postman suffira (pas besoin de le faire côté React)

Bon courage !

PS : N'oubliez pas de faire les choses suivantes :

- créer le .env dans le backend et le configurer :

APP_PORT=3311
APP_SECRET=YOUR_APP_SECRET_KEY
DB_HOST=localhost
DB_PORT=3306
DB_USER=VOTRE_NOM_D_UTILISATEUR_MYSQL
DB_PASSWORD=VOTRE_MDP
DB_NAME=blog_template_wcs
FRONTEND_URL=http://localhost:3000

- npm run db:migrate
- et npm run dev
