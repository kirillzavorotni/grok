<?php

use Illuminate\Http\Request;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods:  POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Origin, Authorization');

Route::get('/firstFilms', 'GridFirstController@getData');
Route::put('/firstFilms/{id}', 'GridFirstController@updateData');

Route::get('/secondFilms', 'DynamicGridController@getData');
Route::put('/secondFilms/{id}', 'GridSecondController@updateData');

Route::get('/actors', 'GridActorController@getData');
Route::put('/actors/{id}', 'GridActorController@updateData');

Route::get('/category', 'LoadCategoryController@getData');

Route::post('/upload', 'UploadController@upload');
Route::get('get/{id}', 'UploadController@getData');
