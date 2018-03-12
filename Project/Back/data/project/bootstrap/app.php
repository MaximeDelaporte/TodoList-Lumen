<?php
<<<<<<< HEAD

require_once __DIR__.'/../vendor/autoload.php';

=======
require_once __DIR__.'/../vendor/autoload.php';
>>>>>>> d0eaaf208f1cddcc633fcdc177837f439f942b1b
try {
    (new Dotenv\Dotenv(__DIR__.'/../'))->load();
} catch (Dotenv\Exception\InvalidPathException $e) {
    //
}
<<<<<<< HEAD

=======
>>>>>>> d0eaaf208f1cddcc633fcdc177837f439f942b1b
/*
|--------------------------------------------------------------------------
| Create The Application
|--------------------------------------------------------------------------
|
| Here we will load the environment and create the application instance
| that serves as the central piece of this framework. We'll use this
| application as an "IoC" container and router for this framework.
|
*/
<<<<<<< HEAD

$app = new Laravel\Lumen\Application(
    realpath(__DIR__.'/../')
);

$app->withFacades();

$app->withEloquent();

=======
$app = new Laravel\Lumen\Application(
    realpath(__DIR__.'/../')
);
$app->withFacades();
$app->withEloquent();
>>>>>>> d0eaaf208f1cddcc633fcdc177837f439f942b1b
/*
|--------------------------------------------------------------------------
| Register Container Bindings
|--------------------------------------------------------------------------
|
| Now we will register a few bindings in the service container. We will
| register the exception handler and the console kernel. You may add
| your own bindings here if you like or you can make another file.
|
*/
<<<<<<< HEAD

=======
>>>>>>> d0eaaf208f1cddcc633fcdc177837f439f942b1b
$app->singleton(
    Illuminate\Contracts\Debug\ExceptionHandler::class,
    App\Exceptions\Handler::class
);
<<<<<<< HEAD

=======
>>>>>>> d0eaaf208f1cddcc633fcdc177837f439f942b1b
$app->singleton(
    Illuminate\Contracts\Console\Kernel::class,
    App\Console\Kernel::class
);
<<<<<<< HEAD

=======
>>>>>>> d0eaaf208f1cddcc633fcdc177837f439f942b1b
/*
|--------------------------------------------------------------------------
| Register Middleware
|--------------------------------------------------------------------------
|
| Next, we will register the middleware with the application. These can
| be global middleware that run before and after each request into a
| route or middleware that'll be assigned to some specific routes.
|
*/
<<<<<<< HEAD

// $app->middleware([
//    App\Http\Middleware\ExampleMiddleware::class
// ]);

// $app->routeMiddleware([
//     'auth' => App\Http\Middleware\Authenticate::class,
// ]);

=======
$app->middleware([
    App\Http\Middleware\CorsMiddleware::class
]);
$app->routeMiddleware([
    'auth' => App\Http\Middleware\Authenticate::class,
]);
>>>>>>> d0eaaf208f1cddcc633fcdc177837f439f942b1b
/*
|--------------------------------------------------------------------------
| Register Service Providers
|--------------------------------------------------------------------------
|
| Here we will register all of the application's service providers which
| are used to bind services into the container. Service providers are
| totally optional, so you are not required to uncomment this line.
|
*/
<<<<<<< HEAD

// $app->register(App\Providers\AppServiceProvider::class);
// $app->register(App\Providers\AuthServiceProvider::class);
// $app->register(App\Providers\EventServiceProvider::class);

=======
$app->register(App\Providers\AppServiceProvider::class);
$app->register(App\Providers\AuthServiceProvider::class);
$app->register(App\Providers\CatchAllOptionsRequestsProvider::class);
//$app->register(Irazasyed\JwtAuthGuard\JwtAuthGuardServiceProvider::class);
// $app->register(App\Providers\EventServiceProvider::class);
>>>>>>> d0eaaf208f1cddcc633fcdc177837f439f942b1b
/*
|--------------------------------------------------------------------------
| Load The Application Routes
|--------------------------------------------------------------------------
|
| Next we will include the routes file so that they can all be added to
| the application. This will provide all of the URLs the application
| can respond to, as well as the controllers that may handle them.
|
*/
<<<<<<< HEAD

$app->router->group([
    'namespace' => 'App\Http\Controllers',
], function ($router) {
    require __DIR__.'/../routes/web.php';
});

return $app;
=======
$app->group(['namespace' => 'App\Http\Controllers'], function ($app) {
    require __DIR__.'/../routes/web.php';
});
return $app;
>>>>>>> d0eaaf208f1cddcc633fcdc177837f439f942b1b
