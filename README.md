# grok_webix_app
Start client - 1) npm install 2) npm run start 3) change server-path in sources\models\serverUrl.js

Start server - 1) composer install 2) Create db 3) create .env file like .env.example and add db name, pass, host 4) php artisan migrate (create tables in db) 5) php artisan db:seed (fill all the tables) 6) php artisan serve (start server); 7) php artisan key:generate - generate key(если нужно)