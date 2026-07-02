<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\ShopLeadController;
use App\Http\Controllers\Api\DemoDetailController;
use App\Http\Controllers\Api\FollowUpController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Future Sanctum protected routes placeholder
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Illuminate\Http\Request $request) {
        return $request->user();
    });
});

// Dashboard Analytics Route
Route::get('/dashboard', [DashboardController::class, 'index']);

// Shop Leads CRUD Routes
Route::apiResource('shop-leads', ShopLeadController::class);

// Demo Details Routes (Nested under Shop Leads)
Route::get('shop-leads/{id}/demo', [DemoDetailController::class, 'show']);
Route::put('shop-leads/{id}/demo', [DemoDetailController::class, 'update']);

// Follow-up Notes Routes (Nested & Standalone)
Route::get('shop-leads/{id}/followups', [FollowUpController::class, 'index']);
Route::post('shop-leads/{id}/followups', [FollowUpController::class, 'store']);
Route::put('followups/{id}', [FollowUpController::class, 'update']);
Route::delete('followups/{id}', [FollowUpController::class, 'destroy']);
