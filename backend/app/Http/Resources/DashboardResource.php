<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DashboardResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'summary' => $this['summary'],
            'monthly_growth' => $this['monthly_growth'],
            'status_distribution' => $this['status_distribution'],
            'business_type_distribution' => $this['business_type_distribution'],
            'camera_distribution' => $this['camera_distribution'],
            'upcoming_followups' => FollowUpResource::collection($this['upcoming_followups']),
            'overdue_followups' => FollowUpResource::collection($this['overdue_followups']),
        ];
    }
}
