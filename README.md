# grok_webix_app
Start client - 1) npm install 2) npm run start 3) change urls in datacollections for request (
  models/actors
  models/filmset1

  view/filmSet1 -> row 44
  view/filmSet2 -> rows 19, 20
)

Start server - 1) composer install 2) Create db 3) create .env file like .env.example and add db name, pass, host 4) php artisan migrate (create tables in db) 5) php artisan db:seed (fill all the tables) 6) php artisan serve (start server); 7) php artisan key:generate - generate key(если нужно)