<?php

namespace App\Http\Requests;

use App\Enums\DemoStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class StoreShopLeadRequest extends FormRequest
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
            'shop_name' => 'required|string|max:255',
            'owner_name' => 'required|string|max:255',
            'phone' => 'required|string|max:50|regex:/^\+?[0-9\s\-\(\)]+$/',
            'location' => 'required|string|max:255',
            'business_type' => 'required|string|in:restaurant,retail,medical_store,jewellery,electronics,grocery,warehouse,office,other',
            'camera_count' => 'required|integer|min:0',
            'demo_status' => ['nullable', new Enum(DemoStatus::class)],
            'follow_up_date' => 'nullable|date_format:Y-m-d',
            'notes' => 'nullable|string',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'phone.regex' => 'The phone number format is invalid. Please use digits, spaces, hyphens, and parentheses.',
            'demo_status.Illuminate\Validation\Rules\Enum' => 'The selected demo status is invalid.',
        ];
    }
}
