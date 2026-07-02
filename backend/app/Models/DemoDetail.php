<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DemoDetail extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'shop_lead_id',
        'dvr_available',
        'rtsp_available',
        'engine_url',
        'last_test_status',
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
            'dvr_available' => 'boolean',
            'rtsp_available' => 'boolean',
        ];
    }

    /**
     * Get the shop lead that owns the demo details.
     */
    public function shopLead(): BelongsTo
    {
        return $this->belongsTo(ShopLead::class);
    }
}
