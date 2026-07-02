<?php

namespace App\Services;

use App\Repositories\Contracts\FollowUpRepositoryInterface;
use App\Repositories\Contracts\ShopLeadRepositoryInterface;
use App\Models\FollowUp;
use Illuminate\Database\Eloquent\Collection;

class FollowUpService
{
    protected FollowUpRepositoryInterface $followUpRepository;
    protected ShopLeadRepositoryInterface $shopLeadRepository;

    public function __construct(
        FollowUpRepositoryInterface $followUpRepository,
        ShopLeadRepositoryInterface $shopLeadRepository
    ) {
        $this->followUpRepository = $followUpRepository;
        $this->shopLeadRepository = $shopLeadRepository;
    }

    /**
     * Get follow-ups for a specific shop lead.
     */
    public function getByLeadId(int $leadId): Collection
    {
        return $this->followUpRepository->getByLeadId($leadId);
    }

    /**
     * Create a follow-up for a lead and sync dates.
     */
    public function createFollowUp(array $data): FollowUp
    {
        $followUp = $this->followUpRepository->create($data);
        $this->syncLeadFollowUpDate($data['shop_lead_id']);
        return $followUp;
    }

    /**
     * Update a follow-up and sync dates.
     */
    public function updateFollowUp(int $id, array $data): bool
    {
        $followUp = $this->followUpRepository->find($id);
        if (!$followUp) {
            return false;
        }

        $updated = $this->followUpRepository->update($id, $data);
        if ($updated) {
            $this->syncLeadFollowUpDate($followUp->shop_lead_id);
        }

        return $updated;
    }

    /**
     * Delete a follow-up and sync dates.
     */
    public function deleteFollowUp(int $id): bool
    {
        $followUp = $this->followUpRepository->find($id);
        if (!$followUp) {
            return false;
        }

        $deleted = $this->followUpRepository->delete($id);
        if ($deleted) {
            $this->syncLeadFollowUpDate($followUp->shop_lead_id);
        }

        return $deleted;
    }

    /**
     * Recalculate and update the shop lead's follow_up_date.
     * Sets it to the nearest pending follow-up date, or null if none are pending.
     */
    protected function syncLeadFollowUpDate(int $leadId): void
    {
        $lead = $this->shopLeadRepository->find($leadId);
        if (!$lead) {
            return;
        }

        $nearestPending = $lead->followUps()
            ->where('status', 'pending')
            ->orderBy('follow_up_date', 'asc')
            ->first();

        $this->shopLeadRepository->update($leadId, [
            'follow_up_date' => $nearestPending ? $nearestPending->follow_up_date->format('Y-m-d') : null
        ]);
    }
}
