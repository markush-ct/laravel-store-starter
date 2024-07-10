<?php

namespace App\Http\Controllers;

use App\Models\Variation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        return Inertia::render('Store/Cart', [
            'cart' => [...Session::get('cart', [])],
        ]);
    }

    public function addToCartProduct(Request $request): RedirectResponse
    {
        $variation = Variation::with(['product.images' => function ($query) {
            $query->orderBy('order');
        }])->findOrFail($request->variation_id);

        $productCoverImage = $variation->product->images[0]->path;
        $productId = $variation->product->id;
        $cart = Session::get('cart', []);

        $cart[$productId] = [
            'product' => [
                'id' => $variation->product->id,
                'slug' => $variation->product->slug,
                'cover_image' => $productCoverImage,
                'name' => $variation->product->name,
            ],
            'variation' => [
                'name' => $variation->name,
                'price' => $variation->price,
            ]
        ];

        Session::put('cart', $cart);

        return Redirect::back()->with('message', 'Product successfully added');
    }
}
