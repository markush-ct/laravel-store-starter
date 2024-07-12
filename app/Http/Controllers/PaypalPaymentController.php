<?php

namespace App\Http\Controllers;

use App\Models\Variation;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Session;

class PaypalPaymentController extends Controller
{
    private function getAccessToken(): string
    {
        $auth = base64_encode(config('paypal.client_id').':'.config('paypal.secret'));

        $response = Http::withHeaders([
            'Content-Type' => 'application/x-www-form-urlencoded',
            'Authorization' => 'Basic '.$auth,
        ])->withBody('grant_type=client_credentials')
            ->post(config('paypal.url').'/v1/oauth2/token');

        $responseData = $response->json();

        return $responseData['access_token'];
    }

    public function createOrder()
    {
        $variationIds = [...Session::get('cart', [])];
        $variations = Variation::with(['product.images' => function ($query) {
            $query->orderBy('order', 'asc');
        }])
            ->whereIn('id', $variationIds)
            ->get();
        $amount = Variation::whereIn('id', $variationIds)->get()->sum('price');
        $accessToken = $this->getAccessToken();
        $generatedId = uuid_create();
        $body = [
            'intent' => 'CAPTURE',
            'purchase_units' => [
                [
                    'reference_id' => $generatedId,
                    'items' => $this->generateItemsListForOrder($variations),
                    'amount' => [
                        'currency_code' => 'USD',
                        'value' => $amount,
                        'breakdown' => [
                            'item_total' => [
                                'currency_code' => 'USD',
                                'value' => $amount,
                            ],
                        ],
                    ],
                ],
            ],
        ];

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer '.$accessToken,
            'PayPal-Request-Id' => $generatedId,
        ])->withBody(json_encode($body))
            ->post(config('paypal.url').'/v2/checkout/orders');

        Session::put('request_id', $generatedId);
        Session::put('order_id', json_decode($response->body())->id);

        return json_decode($response->body())->id;
    }

    public function completeOrder()
    {
        $accessToken = $this->getAccessToken();
        $url = config('paypal.url').'/v2/checkout/orders/'.Session::get('order_id').'/capture';
        $headers = [
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer '.$accessToken,
        ];

        $response = Http::withHeaders($headers)
            ->post($url, null);

        return json_decode($response->body());
    }

    private function generateItemsListForOrder($array): array
    {
        $list = [];

        foreach ($array as $item) {
            array_push($list, [
                'name' => $item->product->name,
                'quantity' => 1,
                'unit_amount' => [
                    'currency_code' => 'USD',
                    'value' => $item->price,
                ],
            ]);
        }

        return $list;
    }
}
