<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShopLeadResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'shop_name' => $this->shop_name,
            'owner_name' => $this->owner_name,
            'phone' => $this->phone,
            'location' => $this->location,
            'business_type' => $this->business_type,
            'camera_count' => $this->camera_count,
            'demo_status' => $this->demo_status->value,
            'demo_status_label' => $this->demo_status->label(),
            'follow_up_date' => $this->follow_up_date ? $this->follow_up_date->format('Y-m-d') : null,
            'notes' => $this->notes,
            'created_at' => $this->created_at->toISOString(),
            'updated_at' => $this->updated_at->toISOString(),
            
            // Eager-loaded Relationships
            'demo_detail' => new DemoDetailResource($this->whenLoaded('demoDetail')),
            'follow_ups' => FollowUpResource::collection($this->whenLoaded('followUps')),
        ];
    }
}
