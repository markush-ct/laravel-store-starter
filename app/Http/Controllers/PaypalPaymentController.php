<?php

namespace App\Http\Controllers;

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
        $accessToken = $this->getAccessToken();
        $generatedId = uuid_create();
        $amount = 1;
        $body = [
            'intent' => 'CAPTURE',
            'purchase_units' => [
                [
                    'reference_id' => $generatedId,
                    'amount' => [
                        'currency_code' => 'USD',
                        'value' => number_format($amount, 2),
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
        return 'Payment successfull!';
    }
}
