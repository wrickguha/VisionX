<?php

namespace App\Services;

use App\Models\ShopLead;
use App\Models\FollowUp;
use App\Enums\DemoStatus;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardService
{
    /**
     * Compile all dashboard metrics and analytics.
     */
    public function getMetrics(): array
    {
        $today = Carbon::today()->format('Y-m-d');

        // 1. Basic Stats
        $totalLeads = ShopLead::count();
        $activeDemos = ShopLead::where('demo_status', DemoStatus::DEMO_SCHEDULED->value)->count();
        $convertedShops = ShopLead::where('demo_status', DemoStatus::CONVERTED->value)->count();
        $trialExpired = ShopLead::where('demo_status', DemoStatus::TRIAL_EXPIRED->value)->count();
        $trialsRunning = ShopLead::where('demo_status', DemoStatus::TRIAL_RUNNING->value)->count();
        $pendingFollowUpsCount = FollowUp::where('status', 'pending')->count();

        // 2. Conversion Percentage
        // Formula matching the React frontend: Converted / (Total - New)
        $newLeadsCount = ShopLead::where('demo_status', DemoStatus::NEW->value)->count();
        $eligibleForConversion = $totalLeads - $newLeadsCount;
        $conversionRate = $eligibleForConversion > 0
            ? round(($convertedShops / $eligibleForConversion) * 100, 1)
            : 0.0;

        // 3. Monthly Lead Growth (Last 6 Months)
        $driver = DB::getDriverName();
        $monthExpr = $driver === 'sqlite' ? "strftime('%m', created_at)" : "MONTH(created_at)";
        $yearExpr = $driver === 'sqlite' ? "strftime('%Y', created_at)" : "YEAR(created_at)";

        $monthlyGrowth = ShopLead::select(
            DB::raw("{$monthExpr} as month_num"),
            DB::raw("{$yearExpr} as year"),
            DB::raw("count(id) as count")
        )
        ->groupBy('year', 'month_num')
        ->orderBy('year', 'asc')
        ->orderBy('month_num', 'asc')
        ->limit(6)
        ->get()
        ->map(function ($item) {
            $monthName = Carbon::create(null, (int)$item->month_num, 1)->format('M');
            return [
                'name' => $monthName,
                'Leads' => (int) $item->count
            ];
        });

        // 4. Status Distribution
        $statusCounts = ShopLead::select('demo_status', DB::raw('count(id) as count'))
            ->groupBy('demo_status')
            ->get()
            ->mapWithKeys(function ($item) {
                return [$item->demo_status->value => (int) $item->count];
            });

        $statusDistribution = [];
        foreach (DemoStatus::cases() as $case) {
            $statusDistribution[] = [
                'status' => $case->value,
                'label' => $case->label(),
                'count' => $statusCounts[$case->value] ?? 0
            ];
        }

        // 5. Business Type Distribution
        $typeDistribution = ShopLead::select('business_type', DB::raw('count(id) as count'))
            ->groupBy('business_type')
            ->get()
            ->map(function ($item) {
                return [
                    'type' => $item->business_type,
                    'count' => (int) $item->count
                ];
            });

        // 6. Camera count distribution
        $cameraDistribution = [
            [
                'range' => '1-10 Cameras',
                'Shops' => ShopLead::where('camera_count', '<=', 10)->count()
            ],
            [
                'range' => '11-30 Cameras',
                'Shops' => ShopLead::where('camera_count', '>', 10)->where('camera_count', '<=', 30)->count()
            ],
            [
                'range' => '31-80 Cameras',
                'Shops' => ShopLead::where('camera_count', '>', 30)->where('camera_count', '<=', 80)->count()
            ],
            [
                'range' => '80+ Cameras',
                'Shops' => ShopLead::where('camera_count', '>', 80)->count()
            ],
        ];

        // 7. Upcoming and Overdue Follow-ups
        // Eager load shopLead to prevent N+1 queries when formatting response
        $upcomingFollowUps = FollowUp::with('shopLead')
            ->where('status', 'pending')
            ->where('follow_up_date', '>=', $today)
            ->orderBy('follow_up_date', 'asc')
            ->limit(5)
            ->get();

        $overdueFollowUps = FollowUp::with('shopLead')
            ->where('status', 'pending')
            ->where('follow_up_date', '<', $today)
            ->orderBy('follow_up_date', 'desc')
            ->limit(5)
            ->get();

        return [
            'summary' => [
                'total_leads' => $totalLeads,
                'active_demos' => $activeDemos,
                'trials_running' => $trialsRunning,
                'converted_shops' => $convertedShops,
                'trial_expired_leads' => $trialExpired,
                'pending_followups' => $pendingFollowUpsCount,
                'conversion_rate' => $conversionRate
            ],
            'monthly_growth' => $monthlyGrowth,
            'status_distribution' => $statusDistribution,
            'business_type_distribution' => $typeDistribution,
            'camera_distribution' => $cameraDistribution,
            'upcoming_followups' => $upcomingFollowUps,
            'overdue_followups' => $overdueFollowUps
        ];
    }
}
