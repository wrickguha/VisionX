<?php

namespace App\Repositories\Eloquent;

use App\Models\ShopLead;
use App\Repositories\Contracts\ShopLeadRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class ShopLeadRepository implements ShopLeadRepositoryInterface
{
    /**
     * Get paginated shop leads with filters, search, and sorting.
     */
    public function paginate(
        int $perPage,
        ?string $search,
        ?string $status,
        ?string $type,
        string $sortField,
        string $sortOrder
    ): LengthAwarePaginator {
        return ShopLead::query()
            ->search($search)
            ->filterByStatus($status)
            ->filterByType($type)
            ->with(['demoDetail']) // Prevent N+1 queries
            ->orderBy($sortField, $sortOrder)
            ->paginate($perPage);
    }

    /**
     * Get all shop leads.
     */
    public function all(): Collection
    {
        return ShopLead::with(['demoDetail'])->get();
    }

    /**
     * Find a shop lead by ID.
     */
    public function find(int $id): ?ShopLead
    {
        return ShopLead::with(['demoDetail', 'followUps'])->find($id);
    }

    /**
     * Create a new shop lead.
     */
    public function create(array $data): ShopLead
    {
        return ShopLead::create($data);
    }

    /**
     * Update an existing shop lead.
     */
    public function update(int $id, array $data): bool
    {
        $lead = ShopLead::find($id);
        if (!$lead) {
            return false;
        }
        return $lead->update($data);
    }

    /**
     * Delete a shop lead.
     */
    public function delete(int $id): bool
    {
        $lead = ShopLead::find($id);
        if (!$lead) {
            return false;
        }
        return $lead->delete();
    }
}
