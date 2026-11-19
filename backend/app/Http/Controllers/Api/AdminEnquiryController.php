<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactEnquiry;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminEnquiryController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => ContactEnquiry::orderByDesc('created_at')->get(),
        ]);
    }

    public function updateStatus(Request $request, ContactEnquiry $contactEnquiry): JsonResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'in:new,in_progress,resolved,archived'],
        ]);

        $contactEnquiry->update(['status' => $validated['status']]);

        return response()->json(['data' => $contactEnquiry]);
    }

    public function destroy(ContactEnquiry $contactEnquiry): JsonResponse
    {
        $contactEnquiry->delete();

        return response()->json(null, 204);
    }
}
