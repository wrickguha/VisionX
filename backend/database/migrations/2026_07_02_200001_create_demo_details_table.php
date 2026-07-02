<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('demo_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('shop_lead_id')->constrained('shop_leads')->onDelete('cascade');
            $table->boolean('dvr_available')->default(false);
            $table->boolean('rtsp_available')->default(false);
            $table->string('engine_url')->nullable();
            $table->string('last_test_status')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('demo_details');
    }
};
