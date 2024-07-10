<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'variation' => [
                'id' => $this->id,
                'name' => $this->name,
                'short_description' => $this->short_description,
                'price' => $this->price,
            ],
            'product' => [
                'name' => $this->product->name,
                'slug' => $this->product->slug,
                'cover_image' => $this->product->images[0]->path,
            ],
        ];
    }
}
