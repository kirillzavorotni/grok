<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateFilmsTable extends Migration
{
    public function up()
    {
        Schema::create('firstFilms', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->string('year');
            $table->integer('votes');
            $table->float('rating');
            $table->integer('rank');
            $table->integer('categoriesID');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('firstFilms');
    }
}

// https://adamosk.com/delete-migration-in-laravel/ - Delete migration In Laravel