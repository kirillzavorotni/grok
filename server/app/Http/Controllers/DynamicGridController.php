<?php

namespace App\Http\Controllers;

use App\SecondFilm;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DynamicGridController extends Controller{

    public function getData(Request $request){
        $data = SecondFilm::query();
        $sort = $request->input('sort', false);

        if ($sort)
            foreach($sort as $key => $value){
                $data = $data->orderBy($key, $value);
            }
        $total = $data->count();
        $start = $request->input('start', 0);
        $count = $request->input('count', 50);
        $data  = $data->limit($count)->offset($start)->get();
        return response()->json([
            "total_count" => $total,
            "pos" =>  $start,
            "data" => $data
        ]);
    }
}