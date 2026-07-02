<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreShopLeadRequest;
use App\Http\Requests\UpdateShopLeadRequest;
use App\Http\Resources\ShopLeadResource;
use App\Services\ShopLeadService;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ShopLeadController extends Controller
{
    use ApiResponser;

    protected ShopLeadService $shopLeadService;

    public function __construct(ShopLeadService $shopLeadService)
    {
        $this->shopLeadService = $shopLeadService;
    }

    /**
     * Get list of shop leads.
     */
    public function index(Request $request): JsonResponse
    {
        $leads = $this->shopLeadService->getLeads($request->all());
        
        return response()->json([
            'success' => true,
            'message' => 'Shop leads retrieved successfully.',
            'data' => ShopLeadResource::collection($leads)->response()->getData()->data,
            'meta' => [
                'current_page' => $leads->currentPage(),
                'last_page' => $leads->lastPage(),
                'per_page' => $leads->perPage(),
                'total' => $leads->total(),
            ]
        ]);
    }

    /**
     * Store a new shop lead.
     */
    public function store(StoreShopLeadRequest $request): JsonResponse
    {
        $lead = $this->shopLeadService->createLead($request->validated());
        return $this->successResponse(
            new ShopLeadResource($lead),
            'Shop lead created successfully.',
            201
        );
    }

    /**
     * Display a specific shop lead.
     */
    public function show(int $id): JsonResponse
    {
        $lead = $this->shopLeadService->getLeadById($id);
        if (!$lead) {
            return $this->errorResponse('Shop lead not found.', 404);
        }

        // Load relationships for details page
        $lead->load(['demoDetail', 'followUps']);

        return $this->successResponse(
            new ShopLeadResource($lead),
            'Shop lead retrieved successfully.'
        );
    }

    /**
     * Update the specified shop lead in storage.
     */
    public function update(UpdateShopLeadRequest $request, int $id): JsonResponse
    {
        $lead = $this->shopLeadService->getLeadById($id);
        if (!$lead) {
            return $this->errorResponse('Shop lead not found.', 404);
        }

        $this->shopLeadService->updateLead($id, $request->validated());
        $updatedLead = $this->shopLeadService->getLeadById($id)->load(['demoDetail']);

        return $this->successResponse(
            new ShopLeadResource($updatedLead),
            'Shop lead updated successfully.'
        );
    }

    /**
     * Remove the specified shop lead from storage.
     */
    public function destroy(int $id): JsonResponse
    {
        $lead = $this->shopLeadService->getLeadById($id);
        if (!$lead) {
            return $this->errorResponse('Shop lead not found.', 404);
        }

        $this->shopLeadService->deleteLead($id);
        return $this->successResponse(null, 'Shop lead deleted successfully.');
    }
}
