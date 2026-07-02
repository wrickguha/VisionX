<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFollowUpRequest;
use App\Http\Requests\UpdateFollowUpRequest;
use App\Http\Resources\FollowUpResource;
use App\Services\FollowUpService;
use App\Services\ShopLeadService;
use App\Traits\ApiResponser;
use Illuminate\Http\JsonResponse;

class FollowUpController extends Controller
{
    use ApiResponser;

    protected FollowUpService $followUpService;
    protected ShopLeadService $shopLeadService;

    public function __construct(FollowUpService $followUpService, ShopLeadService $shopLeadService)
    {
        $this->followUpService = $followUpService;
        $this->shopLeadService = $shopLeadService;
    }

    /**
     * Get list of follow-ups for a specific shop lead.
     */
    public function index(int $leadId): JsonResponse
    {
        $lead = $this->shopLeadService->getLeadById($leadId);
        if (!$lead) {
            return $this->errorResponse('Shop lead not found.', 404);
        }

        $followUps = $this->followUpService->getByLeadId($leadId);

        return $this->successResponse(
            FollowUpResource::collection($followUps),
            'Follow-up notes retrieved successfully.'
        );
    }

    /**
     * Create a follow-up note for a specific shop lead.
     */
    public function store(StoreFollowUpRequest $request, int $leadId): JsonResponse
    {
        $lead = $this->shopLeadService->getLeadById($leadId);
        if (!$lead) {
            return $this->errorResponse('Shop lead not found.', 404);
        }

        $data = $request->validated();
        $data['shop_lead_id'] = $leadId;

        $followUp = $this->followUpService->createFollowUp($data);

        return $this->successResponse(
            new FollowUpResource($followUp),
            'Follow-up note scheduled successfully.',
            201
        );
    }

    /**
     * Update a specific follow-up note.
     */
    public function update(UpdateFollowUpRequest $request, int $id): JsonResponse
    {
        $updated = $this->followUpService->updateFollowUp($id, $request->validated());
        if (!$updated) {
            return $this->errorResponse('Follow-up note not found or update failed.', 404);
        }

        // Retrieve the updated task to return in response
        $lead = $this->followUpService->getByLeadId($id); // Wait, this gets by lead ID. Let's make sure we retrieve by FollowUp ID.
        // Let's implement a quick find in FollowUpService or directly in the controller using Model or Repository.
        // Wait, the repository has find(int $id). We should add find to FollowUpService, or since this is a thin controller:
        // Actually, we can fetch it via model or repo directly or inject repository. Let's look at what we can do.
        // Yes, we can fetch the followUp from model or repository in controller. Since we bound it:
        // Let's inject FollowUpRepositoryInterface or let's load it from FollowUp model directly for convenience.
        $followUp = \App\Models\FollowUp::find($id);

        return $this->successResponse(
            new FollowUpResource($followUp),
            'Follow-up note updated successfully.'
        );
    }

    /**
     * Delete a specific follow-up note.
     */
    public function destroy(int $id): JsonResponse
    {
        $deleted = $this->followUpService->deleteFollowUp($id);
        if (!$deleted) {
            return $this->errorResponse('Follow-up note not found or delete failed.', 404);
        }

        return $this->successResponse(null, 'Follow-up note deleted successfully.');
    }
}
