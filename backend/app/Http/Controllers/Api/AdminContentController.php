<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteContent;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminContentController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => SiteContent::orderBy('section_key')->get(),
        ]);
    }

    public function upsert(Request $request, string $sectionKey): JsonResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'min:2', 'max:255'],
            'subtitle' => ['nullable', 'string', 'max:255'],
            'body' => ['required', 'string', 'max:5000'],
        ]);

        $content = SiteContent::updateOrCreate(
            ['section_key' => $sectionKey],
            [
                'title' => trim($validated['title']),
                'subtitle' => trim($validated['subtitle'] ?? ''),
                'body' => trim($validated['body']),
            ]
        );

        return response()->json(['data' => $content]);
    }
}
