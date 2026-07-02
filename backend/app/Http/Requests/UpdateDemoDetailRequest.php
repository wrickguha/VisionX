<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDemoDetailRequest extends FormRequest
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
            'dvr_available' => 'required|boolean',
            'rtsp_available' => 'required|boolean',
            'engine_url' => 'nullable|string|max:255',
            'last_test_status' => 'nullable|string|max:100',
            'notes' => 'nullable|string',
        ];
    }
}
