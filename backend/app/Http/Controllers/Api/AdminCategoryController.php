<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GalleryCategory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class AdminCategoryController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => GalleryCategory::orderBy('name')->get(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'min:2', 'max:120', 'unique:gallery_categories,name'],
            'slug' => ['nullable', 'string', 'max:120', 'unique:gallery_categories,slug'],
            'description' => ['nullable', 'string', 'max:1000'],
        ]);

        $slug = Str::slug($validated['slug'] ?: $validated['name']);

        $category = GalleryCategory::create([
            'name' => trim($validated['name']),
            'slug' => $slug,
            'description' => trim($validated['description'] ?? ''),
        ]);

        return response()->json(['data' => $category], 201);
    }

    public function update(Request $request, GalleryCategory $galleryCategory): JsonResponse
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'min:2',
                'max:120',
                Rule::unique('gallery_categories', 'name')->ignore($galleryCategory->id),
            ],
            'slug' => [
                'required',
                'string',
                'max:120',
                Rule::unique('gallery_categories', 'slug')->ignore($galleryCategory->id),
            ],
            'description' => ['nullable', 'string', 'max:1000'],
        ]);

        $galleryCategory->update([
            'name' => trim($validated['name']),
            'slug' => Str::slug($validated['slug']),
            'description' => trim($validated['description'] ?? ''),
        ]);

        return response()->json(['data' => $galleryCategory]);
    }

    public function destroy(GalleryCategory $galleryCategory): JsonResponse
    {
        $galleryCategory->delete();

        return response()->json(null, 204);
    }
}
