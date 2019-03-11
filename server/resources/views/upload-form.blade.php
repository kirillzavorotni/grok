<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Upload file</title>
    </head>
    <body>
    <form method="post" action="{{ route('upload_file') }}" enctype="multipart/form-data">
        <input name="_token" type="hidden" value="{{ csrf_token() }}">
        <input type="file" multiple name="file[]">
        <button type="submit">Загрузить</button>
    </form>
    </body>
</html>
