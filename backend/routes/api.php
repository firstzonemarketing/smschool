<?php

use App\Http\Controllers\Api\AdminAuthController;
use App\Http\Controllers\Api\AdminCategoryController;
use App\Http\Controllers\Api\AdminContentController;
use App\Http\Controllers\Api\AdminEnquiryController;
use App\Http\Controllers\Api\AdminGalleryController;
use App\Http\Controllers\Api\PublicController;
use Illuminate\Support\Facades\Route;

// Public Website Endpoints
Route::get('/categories', [PublicController::class, 'categories']);
Route::get('/gallery', [PublicController::class, 'gallery']);
Route::get('/content', [PublicController::class, 'content']);
Route::post('/enquiries', [PublicController::class, 'storeEnquiry']);
Route::get('/media/{path}', [PublicController::class, 'media'])->where('path', '.*');

// Admin Login (No public registration route)
Route::post('/admin/login', [AdminAuthController::class, 'login'])->middleware('throttle:10,1');

// Protected Admin Portal Endpoints
Route::middleware(['auth:sanctum', 'admin'])
    ->prefix('admin')
    ->group(function (): void {
        Route::get('/me', [AdminAuthController::class, 'me']);
        Route::post('/logout', [AdminAuthController::class, 'logout']);
        Route::put('/password', [AdminAuthController::class, 'updatePassword']);

        Route::get('/gallery', [AdminGalleryController::class, 'index']);
        Route::post('/gallery', [AdminGalleryController::class, 'store']);
        Route::post('/gallery/reorder', [AdminGalleryController::class, 'reorder']);
        Route::put('/gallery/{galleryImage}', [AdminGalleryController::class, 'update']);
        Route::delete('/gallery/{galleryImage}', [AdminGalleryController::class, 'destroy']);

        Route::get('/categories', [AdminCategoryController::class, 'index']);
        Route::post('/categories', [AdminCategoryController::class, 'store']);
        Route::put('/categories/{galleryCategory}', [AdminCategoryController::class, 'update']);
        Route::delete('/categories/{galleryCategory}', [AdminCategoryController::class, 'destroy']);

        Route::get('/enquiries', [AdminEnquiryController::class, 'index']);
        Route::patch('/enquiries/{contactEnquiry}', [AdminEnquiryController::class, 'updateStatus']);
        Route::delete('/enquiries/{contactEnquiry}', [AdminEnquiryController::class, 'destroy']);

        Route::get('/content', [AdminContentController::class, 'index']);
        Route::put('/content/{sectionKey}', [AdminContentController::class, 'upsert']);
    });
