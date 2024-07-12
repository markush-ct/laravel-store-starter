<?php

return [
    'environment' => env('PAYPAL_ENVIRONMENT', 'sandbox'),

    'url' => env('PAYPAL_ENVIRONMENT', 'sandbox') === 'sandbox' ? env('PAYPAL_SANDBOX_URL') : env('PAYPAL_LIVE_URL'),

    'client_id' => env('PAYPAL_CLIENT_ID'),

    'secret' => env('PAYPAL_SECRET'),
];
