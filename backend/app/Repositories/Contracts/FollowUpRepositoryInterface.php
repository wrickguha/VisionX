<?php

namespace App\Repositories\Contracts;

use App\Models\FollowUp;
use Illuminate\Database\Eloquent\Collection;

interface FollowUpRepositoryInterface
{
    /**
     * Get follow-ups for a specific shop lead.
     */
    public function getByLeadId(int $leadId): Collection;

    /**
     * Create a follow-up for a specific shop lead.
     */
    public function create(array $data): FollowUp;

    /**
     * Update a follow-up.
     */
    public function update(int $id, array $data): bool;

    /**
     * Delete a follow-up.
     */
    public function delete(int $id): bool;

    /**
     * Find a follow-up by ID.
     */
    public function find(int $id): ?FollowUp;
}
