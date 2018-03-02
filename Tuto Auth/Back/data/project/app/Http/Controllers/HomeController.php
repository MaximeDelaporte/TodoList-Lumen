<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function index()
    {
        return view('home');
    }
    public function showLogin()
    {
        return View::make('login');
    }
    public function doLogin()
    {
        $rules = array(
            'email'     =>'required|email',
            'password'  =>'required|alphaNum|min:3'
        );
        $validator = Validator::make(Input::all(), $rules);

        if ($validator->fails()){
            return Reidrect::to('login')
                ->withErrors($validator)
                ->withInput(Input::except('password'));
        }
        else{
            $userdata = array(
                'email'     =>Input::get('email'),
                'password'  =>Input::get('password')
            );
            if(Auth::attempt($userdata)){
                echo 'SUCCESS !';
            }
            else{
                return Redirect::to('login');
            }
        }
    }
    public function doLogout(){
        Auth::logout();
        return Redirect::to('login');
    }
}
