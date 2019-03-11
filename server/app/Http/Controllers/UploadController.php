<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
//use Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class UploadController extends Controller
{
    // test
//    public function upload(Request $request) {
//
//        $file = $request->file('upload');
//        $destinationPath = storage_path('images');
//        $filename =  uniqid().'_'.$file->getClientOriginalName();
//        $file->move($destinationPath, $filename);
//
//        $md5 = md5($destinationPath . '/' . $filename);
//        $id = DB::table('media')->insertGetId(array(
//            'filename' => $filename,
//            'md5' => $md5,
//        ));
//
//        return response()->json([
//            'md5' => $md5,
//            'media_id' => $id,
//            'status' => 'server'
//        ]);
//    }
//
//    public function get(Request $request)
//    {
//        $md5 = $request->get('md5');
//
//        $media = DB::table('media')->select()->where(['md5' => $md5])->first();
//        $filePath = storage_path('images').'/'.$media->filename;
//        $file =  file_get_contents($filePath);
//
//        return response(
//            $file,
//            200,
//            ['Content-Type' => mime_content_type($filePath)]
//        );
//    }

    public function upload(Request $request) {
        $filmId = $request->get('film_id');
        $file = $request->file('upload');

        $destinationPath = storage_path('images');
        $filename =  uniqid().'_'.$file->getClientOriginalName();
        $file->move($destinationPath, $filename);

        $md5 = md5($destinationPath . '/' . $filename);
        $id = DB::table('media')->insertGetId(array(
            'filename' => $filename,
            'md5' => $md5,
        ));

        DB::table('firstFilms')->where('id', $filmId)->update(array(
            'media_id' => $id,
        ));

        return response()->json([
            'md5' => $md5,
            'media_id' => $id,
            'film_id' => $filmId,
            'status' => 'server'
        ]);
    }

    public function getData($id)
    {
        $media = DB::table('media')->where('id', $id)->get()->first();
        $filePath = storage_path('images').'/'.$media->filename;
        $file =  file_get_contents($filePath);
        return response($file, 200)-> header('Content-Type', mime_content_type($filePath));
    }
}
