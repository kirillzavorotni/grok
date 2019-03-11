<?php

namespace App\Http\Controllers;

use App\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LoadCategoryController extends Controller
{

    public function getData(Request $request)
    {
        $category = Category::all();
        return response()->json($category);
    }
}