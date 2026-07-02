<?php

namespace App\Repositories\Eloquent;

use App\Models\FollowUp;
use App\Repositories\Contracts\FollowUpRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class FollowUpRepository implements FollowUpRepositoryInterface
{
    /**
     * Get follow-ups for a specific shop lead, ordered newest first.
     */
    public function getByLeadId(int $leadId): Collection
    {
        return FollowUp::where('shop_lead_id', $leadId)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Create a follow-up for a specific shop lead.
     */
    public function create(array $data): FollowUp
    {
        return FollowUp::create($data);
    }

    /**
     * Update a follow-up.
     */
    public function update(int $id, array $data): bool
    {
        $followUp = FollowUp::find($id);
        if (!$followUp) {
            return false;
        }
        return $followUp->update($data);
    }

    /**
     * Delete a follow-up.
     */
    public function delete(int $id): bool
    {
        $followUp = FollowUp::find($id);
        if (!$followUp) {
            return false;
        }
        return $followUp->delete();
    }

    /**
     * Find a follow-up by ID.
     */
    public function find(int $id): ?FollowUp
    {
        return FollowUp::find($id);
    }
}
