<?php

namespace App\Services;

use App\Repositories\Contracts\DemoDetailRepositoryInterface;
use App\Models\DemoDetail;

class DemoDetailService
{
    protected DemoDetailRepositoryInterface $demoDetailRepository;

    public function __construct(DemoDetailRepositoryInterface $demoDetailRepository)
    {
        $this->demoDetailRepository = $demoDetailRepository;
    }

    /**
     * Get demo details for a specific shop lead.
     */
    public function getByLeadId(int $leadId): ?DemoDetail
    {
        return $this->demoDetailRepository->findByLeadId($leadId);
    }

    /**
     * Update or create demo details.
     */
    public function saveDemoDetails(int $leadId, array $data): DemoDetail
    {
        return $this->demoDetailRepository->updateOrCreate($leadId, $data);
    }
}
