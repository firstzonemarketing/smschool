<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GalleryImage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AdminGalleryController extends Controller
{
    public function index(): JsonResponse
    {
        $images = GalleryImage::with('category')
            ->orderBy('display_order')
            ->orderByDesc('created_at')
            ->get();

        return response()->json(['data' => $images]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'image' => ['required', 'file', 'image', 'mimes:jpg,jpeg,png,webp,gif', 'max:10240'],
            'title' => ['required', 'string', 'min:2', 'max:200'],
            'description' => ['nullable', 'string', 'max:2000'],
            'category_id' => ['nullable', 'uuid', 'exists:gallery_categories,id'],
            'is_featured' => ['nullable', 'boolean'],
            'is_published' => ['nullable', 'boolean'],
            'display_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $file = $request->file('image');
        $ext = strtolower($file->getClientOriginalExtension() ?: 'jpg');
        $slug = Str::slug($validated['title']);
        $filename = now()->format('YmdHis').'-'.Str::random(6).'-'.Str::limit($slug ?: 'photo', 48, '').'.'.$ext;

        $storagePath = $file->storeAs('gallery', $filename, 'public');
        $imageUrl = '/api/media/'.$storagePath;

        $nextOrder = $validated['display_order']
            ?? ((GalleryImage::max('display_order') ?? 0) + 1);

        $image = GalleryImage::create([
            'title' => trim($validated['title']),
            'description' => trim($validated['description'] ?? ''),
            'image_url' => $imageUrl,
            'storage_path' => $storagePath,
            'category_id' => $validated['category_id'] ?? null,
            'is_featured' => $request->boolean('is_featured', false),
            'is_published' => $request->boolean('is_published', true),
            'display_order' => $nextOrder,
        ]);

        $image->load('category');

        return response()->json(['data' => $image], 201);
    }

    public function update(Request $request, GalleryImage $galleryImage): JsonResponse
    {
        $validated = $request->validate([
            'title' => ['sometimes', 'required', 'string', 'min:2', 'max:200'],
            'description' => ['sometimes', 'nullable', 'string', 'max:2000'],
            'category_id' => ['sometimes', 'nullable', 'uuid', 'exists:gallery_categories,id'],
            'is_featured' => ['sometimes', 'boolean'],
            'is_published' => ['sometimes', 'boolean'],
            'display_order' => ['sometimes', 'integer', 'min:0'],
        ]);

        if (array_key_exists('description', $validated) && $validated['description'] === null) {
            $validated['description'] = '';
        }

        $galleryImage->update($validated);
        $galleryImage->load('category');

        return response()->json(['data' => $galleryImage]);
    }

    public function reorder(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'ordered_ids' => ['required', 'array', 'min:1'],
            'ordered_ids.*' => ['required', 'uuid'],
        ]);

        foreach ($validated['ordered_ids'] as $index => $id) {
            GalleryImage::where('id', $id)->update(['display_order' => $index + 1]);
        }

        return response()->json(['message' => 'Display order updated.']);
    }

    public function destroy(GalleryImage $galleryImage): JsonResponse
    {
        $path = $galleryImage->storage_path;
        if ($path && ! str_starts_with($path, 'seed/') && Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }

        $galleryImage->delete();

        return response()->json(null, 204);
    }
}
