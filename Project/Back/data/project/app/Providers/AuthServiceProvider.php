<?php
<<<<<<< HEAD

namespace App\Providers;

use App\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

=======
namespace App\Providers;
use App\Users;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;
>>>>>>> d0eaaf208f1cddcc633fcdc177837f439f942b1b
class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
<<<<<<< HEAD

=======
>>>>>>> d0eaaf208f1cddcc633fcdc177837f439f942b1b
    /**
     * Boot the authentication services for the application.
     *
     * @return void
     */
    public function boot()
    {
        // Here you may define how you wish users to be authenticated for your Lumen
        // application. The callback which receives the incoming request instance
        // should return either a User instance or null. You're free to obtain
        // the User instance via an API token or any other method necessary.

        $this->app['auth']->viaRequest('api', function ($request) {
<<<<<<< HEAD
            if ($request->input('api_token')) {
                return User::where('api_token', $request->input('api_token'))->first();
            }
        });
    }
}
=======
            if ($request->input('Authorization')) {
                $key = $request->input('Authorization');
                $user = Users::where('api_key', $key)->first();
                if(!empty($user)){
                    $request->request->add(['userid' => $user->id]);

                }
                return $user;
            }
        });
    }
}
>>>>>>> d0eaaf208f1cddcc633fcdc177837f439f942b1b
