<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FollowUp extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'follow_ups';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'shop_lead_id',
        'note',
        'follow_up_date',
        'status',
        'created_by'
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'follow_up_date' => 'date:Y-m-d',
        ];
    }

    /**
     * Get the shop lead that owns the follow-up note.
     */
    public function shopLead(): BelongsTo
    {
        return $this->belongsTo(ShopLead::class);
    }
}
