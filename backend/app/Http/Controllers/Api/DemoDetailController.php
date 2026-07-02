<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateDemoDetailRequest;
use App\Http\Resources\DemoDetailResource;
use App\Services\DemoDetailService;
use App\Services\ShopLeadService;
use App\Traits\ApiResponser;
use Illuminate\Http\JsonResponse;

class DemoDetailController extends Controller
{
    use ApiResponser;

    protected DemoDetailService $demoDetailService;
    protected ShopLeadService $shopLeadService;

    public function __construct(DemoDetailService $demoDetailService, ShopLeadService $shopLeadService)
    {
        $this->demoDetailService = $demoDetailService;
        $this->shopLeadService = $shopLeadService;
    }

    /**
     * Get demo details for a specific shop lead.
     */
    public function show(int $leadId): JsonResponse
    {
        $lead = $this->shopLeadService->getLeadById($leadId);
        if (!$lead) {
            return $this->errorResponse('Shop lead not found.', 404);
        }

        $details = $this->demoDetailService->getByLeadId($leadId);
        if (!$details) {
            return $this->errorResponse('Demo details not found for this lead.', 404);
        }

        return $this->successResponse(
            new DemoDetailResource($details),
            'Demo details retrieved successfully.'
        );
    }

    /**
     * Create or update demo details for a specific shop lead.
     */
    public function update(UpdateDemoDetailRequest $request, int $leadId): JsonResponse
    {
        $lead = $this->shopLeadService->getLeadById($leadId);
        if (!$lead) {
            return $this->errorResponse('Shop lead not found.', 404);
        }

        $details = $this->demoDetailService->saveDemoDetails($leadId, $request->validated());

        return $this->successResponse(
            new DemoDetailResource($details),
            'Demo details saved successfully.'
        );
    }
}
