<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPosterFieldToFilm extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('firstFilms', function (Blueprint $table) {
            $table->unsignedInteger('media_id')->nullable(true)->default(null);
            $table->foreign('media_id')->references('id')->on('media');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('firstFilms', function (Blueprint $table) {
            $table->dropForeign('media_id');
            $table->dropColumn('media_id');
        });

    }
}
