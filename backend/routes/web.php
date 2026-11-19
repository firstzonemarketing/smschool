<?php

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;

// Serve built React SPA when deployed as a single unified Laravel + React container
Route::get('/{any?}', function () {
    $spaPath = resource_path('views/spa.html');
    if (File::exists($spaPath)) {
        return response(File::get($spaPath), 200, ['Content-Type' => 'text/html; charset=UTF-8']);
    }

    return response()->json([
        'app' => 'SM English School API',
        'status' => 'ok',
    ]);
})->where('any', '^(?!api|up).*$');
