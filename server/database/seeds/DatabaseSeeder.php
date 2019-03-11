<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
//use App\Films;
use Faker\Generator as Faker;

class DatabaseSeeder extends Seeder
{
    public function run(Faker $faker)
    {
        for ($i = 1; $i <= 50; $i++) {
            DB::table('firstFilms')->insert([
                'title' => $faker->realText($maxNbChars = 20, $indexSize = 2),
                'year' => $faker->year($max = 'now'),
                'votes' => $faker->numberBetween($min = 1000, $max = 9000),
                'rating' => $faker->randomFloat($nbMaxDecimals = NULL, $min = 0, $max = 10),
                'rank' => $faker->numberBetween($min = 1, $max = 9000),
                'categoriesID' => $faker->numberBetween($min = 1, $max = 7),

            ]);
        }

        for ($i = 1; $i <= 1000; $i++) {
            DB::table('secondFilms')->insert([
                'title' => $faker->realText($maxNbChars = 20, $indexSize = 2),
                'year' => $faker->year($max = 'now'),
                'votes' => $faker->numberBetween($min = 1000, $max = 9000),
                'rating' => $faker->randomFloat($nbMaxDecimals = NULL, $min = 0, $max = 10),
                'rank' => $faker->numberBetween($min = 1, $max = 9000),
            ]);
        }

        for ($i = 1; $i <= 100; $i++) {
            DB::table('actors')->insert([
                'firstName' => $faker->firstNameMale,
                'lastName' => $faker->lastName,
                'birthday' => $faker->year($max = 'now'),
                'country' => $faker->countryCode,
                'filmID' => $faker->numberBetween($min = 1, $max = 10),
            ]);
        }

        $categories = ['Comedy', 'Horror', 'Romance', 'Action', 'Crime', 'Thriller', 'Drama'];
        foreach($categories as $category) {
            DB::table('film_categories')->insert([
                'value' => $category
            ]);
        }
    }
}
