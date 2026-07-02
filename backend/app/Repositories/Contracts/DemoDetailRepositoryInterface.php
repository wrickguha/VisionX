<?php

namespace App\Repositories\Contracts;

use App\Models\DemoDetail;

interface DemoDetailRepositoryInterface
{
    /**
     * Get demo details for a specific shop lead.
     */
    public function findByLeadId(int $leadId): ?DemoDetail;

    /**
     * Create or update demo details for a shop lead.
     */
    public function updateOrCreate(int $leadId, array $data): DemoDetail;
}
