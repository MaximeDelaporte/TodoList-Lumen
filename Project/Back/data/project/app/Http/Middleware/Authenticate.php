<?php
<<<<<<< HEAD

namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\Factory as Auth;

=======
namespace App\Http\Middleware;
use Closure;
use Illuminate\Contracts\Auth\Factory as Auth;
>>>>>>> d0eaaf208f1cddcc633fcdc177837f439f942b1b
class Authenticate
{
    /**
     * The authentication guard factory instance.
     *
     * @var \Illuminate\Contracts\Auth\Factory
     */
    protected $auth;

    /**
     * Create a new middleware instance.
     *
<<<<<<< HEAD
     * @param  \Illuminate\Contracts\Auth\Factory  $auth
=======
     * @param  \Illuminate\Contracts\Auth\Factory $auth
>>>>>>> d0eaaf208f1cddcc633fcdc177837f439f942b1b
     * @return void
     */
    public function __construct(Auth $auth)
    {
        $this->auth = $auth;
    }

    /**
     * Handle an incoming request.
     *
<<<<<<< HEAD
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
=======
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @param  string|null $guard
>>>>>>> d0eaaf208f1cddcc633fcdc177837f439f942b1b
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        if ($this->auth->guard($guard)->guest()) {
<<<<<<< HEAD
            return response('Unauthorized.', 401);
        }

=======
            return response()->json(['error' => 'Unauthorized'], 401);
        }
>>>>>>> d0eaaf208f1cddcc633fcdc177837f439f942b1b
        return $next($request);
    }
}
