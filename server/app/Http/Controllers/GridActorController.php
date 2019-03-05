<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Actor;

class GridActorController extends Controller
{
    public function getData()
    {
        $films = Actor::all();
        return response()->json($films);
    }

    public function updateData(Request $request, $id)
    {
        $firstName = $request->input('firstName');
        $lastName = $request->input('lastName');

        DB::table('actors')->where('id', $id)->update(array(
            'firstName' => $firstName,
            'lastName' => $lastName,
        ));
    }
}
