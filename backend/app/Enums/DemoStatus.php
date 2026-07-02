<?php

namespace App\Enums;

enum DemoStatus: string
{
    case NEW = 'new';
    case DEMO_SCHEDULED = 'demo_scheduled';
    case TRIAL_RUNNING = 'trial_running';
    case INTERESTED = 'interested';
    case CONVERTED = 'converted';
    case NOT_INTERESTED = 'not_interested';
    case TRIAL_EXPIRED = 'trial_expired';

    /**
     * Get the human-readable label for the status.
     */
    public function label(): string
    {
        return match($this) {
            self::NEW => 'New Lead',
            self::DEMO_SCHEDULED => 'Demo Scheduled',
            self::TRIAL_RUNNING => 'Trial Running',
            self::INTERESTED => 'Interested',
            self::CONVERTED => 'Converted',
            self::NOT_INTERESTED => 'Not Interested',
            self::TRIAL_EXPIRED => 'Trial Expired',
        };
    }
}
