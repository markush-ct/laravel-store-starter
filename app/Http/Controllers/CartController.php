<?php

namespace App\Http\Controllers;

use App\Http\Resources\CartListResource;
use App\Models\Variation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Number;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $variationIds = [...Session::get('cart', [])];
        $variations = CartListResource::collection(
            Variation::with(['product.images' => function ($query) {
                    $query->orderBy('order', 'asc');
                }])
                ->whereIn('id', $variationIds)
                ->paginate(10)
        );
        $cartTotalPrice = Number::format(
            Variation::whereIn('id', $variationIds)->get()->sum('price')
        );

        return Inertia::render('Store/Cart', [
            'cart' => $variations,
            'carttotalprice' => $cartTotalPrice,
            'breadcrumbs' => [
                [
                    'label' => 'Home',
                    'url' => '/',
                    'route' => 'home',
                ],
                [
                    'label' => 'Store',
                    'url' => route('store.index'),
                    'route' => 'store.index',
                ],
                [
                    'label' => 'Cart',
                    'url' => route('cart.index'),
                    'route' => 'cart.index',
                ],
            ],
        ]);
    }

    public function addToCartProduct(Request $request): RedirectResponse
    {
        $variation = Variation::with('product')->findOrFail($request->variation_id);
        $productId = $variation->product->id;
        $cart = Session::get('cart', []);
        $cart[$productId] = $request->variation_id;

        Session::put('cart', $cart);

        return Redirect::back()->with('message', 'Product successfully added');
    }

    public function removeProductInCart(Request $request): RedirectResponse
    {
        $variation = Variation::with('product')->findOrFail($request->variation_id);
        $productId = $variation->product->id;
        $cart = Session::get('cart', []);

        unset($cart[$productId]);

        Session::put('cart', $cart);

        return to_route('cart.index')->with('message', [
            'success' => $variation->product->name.' removed from your cart.',
        ]);
    }
}
