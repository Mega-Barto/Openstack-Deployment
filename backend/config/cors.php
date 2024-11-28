<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'], // Asegúrate de incluir 'api/*'
    'allowed_methods' => ['*'], // Permitir todos los métodos (GET, POST, etc.)
    'allowed_origins' => ['http://localhost:3000'], // Especifica el origen del frontend
    'allowed_headers' => ['*'], // Permitir todos los encabezados
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false, // Cambia a true si necesitas cookies o autenticación
];