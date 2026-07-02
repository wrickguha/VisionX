<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
            \App\Repositories\Contracts\ShopLeadRepositoryInterface::class,
            \App\Repositories\Eloquent\ShopLeadRepository::class
        );
        $this->app->bind(
            \App\Repositories\Contracts\DemoDetailRepositoryInterface::class,
            \App\Repositories\Eloquent\DemoDetailRepository::class
        );
        $this->app->bind(
            \App\Repositories\Contracts\FollowUpRepositoryInterface::class,
            \App\Repositories\Eloquent\FollowUpRepository::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
