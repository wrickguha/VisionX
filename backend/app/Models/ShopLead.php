<?php

namespace App\Models;

use App\Enums\DemoStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Builder;

class ShopLead extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'shop_name',
        'owner_name',
        'phone',
        'location',
        'business_type',
        'camera_count',
        'demo_status',
        'follow_up_date',
        'notes'
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'demo_status' => DemoStatus::class,
            'follow_up_date' => 'date:Y-m-d',
            'camera_count' => 'integer',
        ];
    }

    /**
     * Get the demo details associated with the shop lead.
     */
    public function demoDetail(): HasOne
    {
        return $this->hasOne(DemoDetail::class);
    }

    /**
     * Get the follow-ups associated with the shop lead.
     */
    public function followUps(): HasMany
    {
        return $this->hasMany(FollowUp::class);
    }

    /**
     * Scope a query to search leads by shop name, owner name, phone, or location.
     */
    public function scopeSearch(Builder $query, ?string $search): Builder
    {
        if (empty($search)) {
            return $query;
        }

        return $query->where(function (Builder $q) use ($search) {
            $q->where('shop_name', 'like', "%{$search}%")
              ->orWhere('owner_name', 'like', "%{$search}%")
              ->orWhere('phone', 'like', "%{$search}%")
              ->orWhere('location', 'like', "%{$search}%");
        });
    }

    /**
     * Scope a query to filter leads by business type.
     */
    public function scopeFilterByType(Builder $query, ?string $type): Builder
    {
        if (empty($type) || $type === 'all') {
            return $query;
        }

        return $query->where('business_type', $type);
    }

    /**
     * Scope a query to filter leads by status.
     */
    public function scopeFilterByStatus(Builder $query, ?string $status): Builder
    {
        if (empty($status) || $status === 'all') {
            return $query;
        }

        return $query->where('demo_status', $status);
    }
}
