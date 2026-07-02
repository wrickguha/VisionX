<?php

namespace App\Services;

use App\Repositories\Contracts\ShopLeadRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use App\Models\ShopLead;

class ShopLeadService
{
    protected ShopLeadRepositoryInterface $shopLeadRepository;

    public function __construct(ShopLeadRepositoryInterface $shopLeadRepository)
    {
        $this->shopLeadRepository = $shopLeadRepository;
    }

    /**
     * Get paginated leads with filters, search, and sorting.
     */
    public function getLeads(array $filters): LengthAwarePaginator
    {
        $perPage = (int) ($filters['per_page'] ?? 8);
        $search = $filters['search'] ?? null;
        $status = $filters['status'] ?? null;
        $type = $filters['business_type'] ?? null;
        
        $sortField = $filters['sort'] ?? 'created_at';
        $sortOrder = $filters['order'] ?? 'desc';

        // Whitelist sorting fields for security
        $allowedSortFields = ['shop_name', 'camera_count', 'created_at'];
        if (!in_array($sortField, $allowedSortFields)) {
            $sortField = 'created_at';
        }

        $sortOrder = strtolower($sortOrder) === 'asc' ? 'asc' : 'desc';

        return $this->shopLeadRepository->paginate($perPage, $search, $status, $type, $sortField, $sortOrder);
    }

    /**
     * Get a single shop lead by ID.
     */
    public function getLeadById(int $id): ?ShopLead
    {
        return $this->shopLeadRepository->find($id);
    }

    /**
     * Create a new shop lead.
     */
    public function createLead(array $data): ShopLead
    {
        return $this->shopLeadRepository->create($data);
    }

    /**
     * Update an existing shop lead.
     */
    public function updateLead(int $id, array $data): bool
    {
        return $this->shopLeadRepository->update($id, $data);
    }

    /**
     * Delete a shop lead.
     */
    public function deleteLead(int $id): bool
    {
        return $this->shopLeadRepository->delete($id);
    }
}
