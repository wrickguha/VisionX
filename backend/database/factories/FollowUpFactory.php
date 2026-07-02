<?php

namespace Database\Factories;

use App\Models\FollowUp;
use App\Models\ShopLead;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FollowUp>
 */
class FollowUpFactory extends Factory
{
    protected $model = FollowUp::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = $this->faker->randomElement(['pending', 'completed']);
        $date = $status === 'completed'
            ? $this->faker->dateTimeBetween('-30 days', '-1 day')
            : $this->faker->randomElement([
                $this->faker->dateTimeBetween('-5 days', '-1 day'), // Overdue
                $this->faker->dateTimeBetween('now', '+14 days')   // Upcoming
            ]);

        return [
            'shop_lead_id' => ShopLead::factory(),
            'note' => $this->faker->sentence(10),
            'follow_up_date' => $date->format('Y-m-d'),
            'status' => $status,
            'created_by' => $this->faker->randomElement(['Alex Rivera', 'Sarah Jenkins', 'System Alert']),
        ];
    }
}
