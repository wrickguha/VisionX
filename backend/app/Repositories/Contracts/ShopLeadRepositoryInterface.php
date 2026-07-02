<?php

namespace App\Repositories\Contracts;

use App\Models\ShopLead;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

interface ShopLeadRepositoryInterface
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
    ): LengthAwarePaginator;

    /**
     * Get all shop leads.
     */
    public function all(): Collection;

    /**
     * Find a shop lead by ID.
     */
    public function find(int $id): ?ShopLead;

    /**
     * Create a new shop lead.
     */
    public function create(array $data): ShopLead;

    /**
     * Update an existing shop lead.
     */
    public function update(int $id, array $data): bool;

    /**
     * Delete a shop lead.
     */
    public function delete(int $id): bool;
}
