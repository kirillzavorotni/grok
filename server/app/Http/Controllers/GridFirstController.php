<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\FirstFilm;

class GridFirstController extends Controller
{
    public function getData()
    {
        $films = FirstFilm::all();
        return response()->json($films);
    }

    public function updateData(Request $request, $id)
    {
        $title = $request->input('title');
        $year = $request->input('year');
        $votes = $request->input('votes');
        $rating = $request->input('rating');
        $rank = $request->input('rank');

        DB::table('firstFilms')->where('id', $id)->update(array(
            'title' => $title,
            'year' => $year,
            'votes' => $votes,
            'rating' => $rating,
            'rank' => $rank,
        ));
    }
}

