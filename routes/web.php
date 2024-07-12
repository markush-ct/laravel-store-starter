<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\MainStoreController;
use App\Http\Controllers\PaypalPaymentController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/store', [MainStoreController::class, 'index'])->name('store.index');
Route::get('/store/category/{category:slug}', [MainStoreController::class, 'showCategoryProducts'])->name('store.show.category');
Route::get('/store/tag/{tag:slug}', [MainStoreController::class, 'showTagProducts'])->name('store.show.tag');
Route::get('/store/product/{product:slug}', [MainStoreController::class, 'showProduct'])->name('store.show.product');

Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
Route::post('/cart', [CartController::class, 'addToCartProduct'])->name('cart.store.product');
Route::post('/cart/remove', [CartController::class, 'removeProductInCart'])->name('cart.remove.product');

Route::get('/cart/checkout', [PaypalPaymentController::class, 'createOrder'])->name('paypal.create.order');
Route::post('/cart/checkout/complete', [PaypalPaymentController::class, 'completeOrder'])->name('paypal.complete.order');

require __DIR__.'/auth.php';
