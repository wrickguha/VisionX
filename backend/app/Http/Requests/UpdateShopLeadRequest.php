<?php

namespace App\Http\Requests;

use App\Enums\DemoStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class UpdateShopLeadRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'shop_name' => 'sometimes|required|string|max:255',
            'owner_name' => 'sometimes|required|string|max:255',
            'phone' => 'sometimes|required|string|max:50|regex:/^\+?[0-9\s\-\(\)]+$/',
            'location' => 'sometimes|required|string|max:255',
            'business_type' => 'sometimes|required|string|in:restaurant,retail,medical_store,jewellery,electronics,grocery,warehouse,office,other',
            'camera_count' => 'sometimes|required|integer|min:0',
            'demo_status' => ['sometimes', 'required', new Enum(DemoStatus::class)],
            'follow_up_date' => 'nullable|date_format:Y-m-d',
            'notes' => 'nullable|string',
        ];
    }
}
