<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\Review;
use App\Models\Tag;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Jersey category
        $category = Category::create(['name' => 'Jersey']);

        // Generate tags
        $tags = Tag::factory()->count(3)->create();

        // Generate dummy products
        Product::factory(60)
            ->for($category)
            ->hasVariations(3)
            ->hasImages(10)
            ->hasAttached($tags)
            ->has(
                Review::factory()
                    ->count(3)
                    ->for($user)
            )
            ->create();
    }
}
