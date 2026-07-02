<?php

namespace Database\Seeders;

use App\Models\ShopLead;
use App\Models\DemoDetail;
use App\Models\FollowUp;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create 30 Shop Leads
        $leads = ShopLead::factory()->count(30)->create();

        // 2. Create 30 Demo Details (one for each lead)
        foreach ($leads as $lead) {
            DemoDetail::factory()->create([
                'shop_lead_id' => $lead->id
            ]);
        }

        // 3. Create 80 Follow-up Notes assigned to random leads
        for ($i = 0; $i < 80; $i++) {
            $randomLead = $leads->random();
            FollowUp::factory()->create([
                'shop_lead_id' => $randomLead->id,
            ]);
        }

        // 4. Synchronize follow_up_date in shop_leads with the nearest pending follow-up date
        foreach ($leads as $lead) {
            $nearestPendingFollowUp = $lead->followUps()
                ->where('status', 'pending')
                ->orderBy('follow_up_date', 'asc')
                ->first();
            
            if ($nearestPendingFollowUp) {
                $lead->update([
                    'follow_up_date' => $nearestPendingFollowUp->follow_up_date
                ]);
            } else {
                // If there are no pending follow-ups, set to null or keep random
                $lead->update([
                    'follow_up_date' => null
                ]);
            }
        }
    }
}
