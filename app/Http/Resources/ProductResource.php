<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'long_description' => $this->long_description,
            'images' => ImagesListResource::collection($this->images->sortBy('order')),
            'variations' => VariationsListResource::collection($this->variations->sortBy('price')),
            'reviews' => ReviewsListResource::collection($this->reviews),
            'tags' => TagsListResource::collection($this->tags),
        ];
    }
}
