<?php
<<<<<<< HEAD

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

=======
namespace App\Providers;
use Illuminate\Support\ServiceProvider;
>>>>>>> d0eaaf208f1cddcc633fcdc177837f439f942b1b
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
<<<<<<< HEAD
    }
}
=======
        $request = app('request');
        if ($request->isMethod('OPTIONS'))
        {
            app()->options($request->path(), function() { return response('', 200); });
        }
    }
}
>>>>>>> d0eaaf208f1cddcc633fcdc177837f439f942b1b
