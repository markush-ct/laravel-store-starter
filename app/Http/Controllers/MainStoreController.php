<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoriesListResource;
use App\Http\Resources\ProductsListResource;
use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class MainStoreController extends Controller
{
    public function index(): Response
    {
        return Inertia::render(('Store/Index'), [
            'products' => ProductsListResource::collection(
                Product::with('images', 'variations')->paginate(27)
            ),
            'categories' => CategoriesListResource::collection(
                Category::all()
            ),
            'breadcrumbs' => [
                [
                    'label' => 'Home',
                    'url' => '/',
                    'route' => 'home',
                    'separator' => true,
                ],
                [
                    'label' => 'Store',
                    'url' => route('store.index'),
                    'route' => 'store.index',
                    'separator' => false,
                ],
            ],
        ]);
    }

    public function showCategoryProducts(Category $category)
    {
        return Inertia::render(('Store/Index'), [
            'products' => ProductsListResource::collection(
                $category->products()
                    ->with('images', 'variations')
                    ->paginate(27)
            ),
            'categories' => CategoriesListResource::collection(
                Category::all()
            ),
            'breadcrumbs' => [
                [
                    'label' => 'Home',
                    'url' => '/',
                    'route' => 'home',
                    'separator' => true,
                ],
                [
                    'label' => 'Store',
                    'url' => route('store.index'),
                    'route' => 'store.index',
                    'separator' => true,
                ],
                [
                    'label' => $category->name,
                    'url' => route('store.show.category', $category),
                    'route' => 'store.show.category',
                    'separator' => false,
                ],
            ],
        ]);
    }
}
