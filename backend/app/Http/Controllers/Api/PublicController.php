<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactEnquiry;
use App\Models\GalleryCategory;
use App\Models\GalleryImage;
use App\Models\SiteContent;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class PublicController extends Controller
{
    public function categories(): JsonResponse
    {
        $categories = GalleryCategory::orderBy('name')->get();

        return response()->json(['data' => $categories]);
    }

    public function gallery(Request $request): JsonResponse
    {
        $query = GalleryImage::with('category')
            ->where('is_published', true)
            ->orderBy('display_order')
            ->orderByDesc('created_at');

        if ($request->boolean('featured')) {
            $query->where('is_featured', true);
        }

        if ($categoryId = $request->query('category_id')) {
            $query->where('category_id', $categoryId);
        }

        if ($limit = $request->integer('limit')) {
            $query->limit(min(max($limit, 1), 200));
        }

        return response()->json(['data' => $query->get()]);
    }

    public function content(): JsonResponse
    {
        $blocks = SiteContent::orderBy('section_key')->get();

        return response()->json(['data' => $blocks]);
    }

    public function storeEnquiry(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'min:2', 'max:160'],
            'email' => ['required', 'email', 'max:190'],
            'phone' => ['nullable', 'string', 'max:40'],
            'subject' => ['required', 'string', 'min:2', 'max:240'],
            'message' => ['required', 'string', 'min:5', 'max:5000'],
            'enquiry_type' => ['required', 'in:general,admission'],
        ]);

        $enquiry = ContactEnquiry::create([
            'name' => trim($validated['name']),
            'email' => trim($validated['email']),
            'phone' => trim($validated['phone'] ?? ''),
            'subject' => trim($validated['subject']),
            'message' => trim($validated['message']),
            'enquiry_type' => $validated['enquiry_type'],
            'status' => 'new',
        ]);

        return response()->json([
            'message' => 'Enquiry submitted successfully.',
            'data' => $enquiry,
        ], 201);
    }

    public function media(string $path): StreamedResponse
    {
        $cleanPath = ltrim(str_replace(['..', '\\'], ['', '/'], $path), '/');
        if (! Storage::disk('public')->exists($cleanPath)) {
            abort(404);
        }

        return Storage::disk('public')->response($cleanPath, null, [
            'Cache-Control' => 'public, max-age=31536000',
        ]);
    }
}
