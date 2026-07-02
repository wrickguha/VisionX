<?php

namespace Database\Factories;

use App\Models\ShopLead;
use App\Enums\DemoStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ShopLead>
 */
class ShopLeadFactory extends Factory
{
    protected $model = ShopLead::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $businessTypes = ['restaurant', 'retail', 'medical_store', 'jewellery', 'electronics', 'grocery', 'warehouse', 'office'];
        $statuses = DemoStatus::cases();
        
        $status = $this->faker->randomElement($statuses);
        
        // If status is demo scheduled, trial running or interested, follow up is more likely
        $hasFollowUp = in_array($status, [DemoStatus::DEMO_SCHEDULED, DemoStatus::TRIAL_RUNNING, DemoStatus::INTERESTED]);
        $followUpDate = $hasFollowUp 
            ? ($this->faker->boolean(70) 
                ? $this->faker->dateTimeBetween('now', '+14 days') 
                : $this->faker->dateTimeBetween('-10 days', 'yesterday'))
            : null;

        return [
            'shop_name' => $this->faker->company() . ' ' . $this->faker->randomElement(['Outlet', 'Plaza', 'Store', 'Hub', 'HQ', 'Depot']),
            'owner_name' => $this->faker->name(),
            'phone' => $this->faker->numerify('+1 (555) ###-####'),
            'location' => $this->faker->streetAddress() . ', ' . $this->faker->city() . ', ' . $this->faker->stateAbbr() . ' ' . $this->faker->postcode(),
            'business_type' => $this->faker->randomElement($businessTypes),
            'camera_count' => $this->faker->numberBetween(4, 150),
            'demo_status' => $status,
            'follow_up_date' => $followUpDate ? $followUpDate->format('Y-m-d') : null,
            'notes' => $this->faker->boolean(80) ? $this->faker->paragraph(2) : null,
        ];
    }
}
