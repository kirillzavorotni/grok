<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateFilms2Table extends Migration
{
    public function up()
    {
        Schema::create('secondFilms', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->string('year');
            $table->integer('votes');
            $table->float('rating');
            $table->integer('rank');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('secondFilms');
    }
}

// https://adamosk.com/delete-migration-in-laravel/ - Delete migration In Laravel

