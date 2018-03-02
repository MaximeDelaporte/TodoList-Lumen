<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
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
        //process the form
    }
}
