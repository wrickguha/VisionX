<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\DashboardService;
use App\Http\Resources\DashboardResource;
use App\Traits\ApiResponser;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    use ApiResponser;

    protected DashboardService $dashboardService;

    public function __construct(DashboardService $dashboardService)
    {
        $this->dashboardService = $dashboardService;
    }

    /**
     * Get dashboard metrics.
     */
    public function index(): JsonResponse
    {
        $metrics = $this->dashboardService->getMetrics();
        return $this->successResponse(
            new DashboardResource($metrics),
            'Dashboard metrics retrieved successfully.'
        );
    }
}
