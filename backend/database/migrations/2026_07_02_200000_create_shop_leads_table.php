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
        Schema::create('shop_leads', function (Blueprint $table) {
            $table->id();
            $table->string('shop_name');
            $table->string('owner_name');
            $table->string('phone');
            $table->string('location');
            $table->string('business_type'); // e.g. retail, restaurant, etc.
            $table->integer('camera_count');
            $table->string('demo_status')->default('new'); // Maps to DemoStatus Enum
            $table->date('follow_up_date')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shop_leads');
    }
};
