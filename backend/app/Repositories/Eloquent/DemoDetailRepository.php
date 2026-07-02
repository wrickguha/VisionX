<?php

namespace App\Repositories\Eloquent;

use App\Models\DemoDetail;
use App\Repositories\Contracts\DemoDetailRepositoryInterface;

class DemoDetailRepository implements DemoDetailRepositoryInterface
{
    /**
     * Get demo details for a specific shop lead.
     */
    public function findByLeadId(int $leadId): ?DemoDetail
    {
        return DemoDetail::where('shop_lead_id', $leadId)->first();
    }

    /**
     * Create or update demo details for a shop lead.
     */
    public function updateOrCreate(int $leadId, array $data): DemoDetail
    {
        return DemoDetail::updateOrCreate(
            ['shop_lead_id' => $leadId],
            $data
        );
    }
}
