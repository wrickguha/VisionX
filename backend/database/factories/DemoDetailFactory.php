<?php

namespace Database\Factories;

use App\Models\DemoDetail;
use App\Models\ShopLead;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DemoDetail>
 */
class DemoDetailFactory extends Factory
{
    protected $model = DemoDetail::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $dvr = $this->faker->boolean(70);
        $rtsp = $dvr && $this->faker->boolean(80);
        $status = $this->faker->randomElement(['online', 'offline', 'error', 'connecting']);

        return [
            'shop_lead_id' => ShopLead::factory(),
            'dvr_available' => $dvr,
            'rtsp_available' => $rtsp,
            'engine_url' => $rtsp ? 'rtsp://admin:password@' . $this->faker->ipv4() . ':554/stream1' : null,
            'last_test_status' => $status,
            'notes' => $this->faker->boolean(60) ? $this->faker->sentence() : null,
        ];
    }
}
