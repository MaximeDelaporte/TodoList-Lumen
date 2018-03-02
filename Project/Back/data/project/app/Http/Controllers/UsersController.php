<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Users;
use Auth;
class UsersController extends Controller
{
    public function __construct()
    {
        //  $this->middleware('auth:api');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function authenticate(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email|',
            'password' => 'required'
        ]);
        $user = Users::where('email', $request->input('email'))->first();
        if(Hash::check($request->input('password'), $user->password)){
            $apikey = base64_encode(str_random(40));
            Users::where('email', $request->input('email'))->update(['api_key' => "$apikey"]);;
            return response()->json(['status' => 'success','api_key' => $apikey]);
        }else{
            return response()->json(['status' => 'fail'],401);
        }
    }
    public function setPasswordAttribute($password)
    {
        $this->attributes['password']= Hash::make($password);
    }
    public function create(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'password' => 'required',
            'email' => 'required'
        ]);
        $password = Hash::make($request->input('password'));
        $request->merge(['password'=> $password]);
        if(Users::create($request->all())){
            return response()->json(['status' => 'success']);
        }else{
            return response()->json(['status' => 'fail']);
        }
    }
    public function exist(Request $request)
    {
        $this->validate($request,[
            'email' =>'required|email|'
        ]);
        $user = Users::where('email', $request->input('email'))->first();
        if(!empty($user)){
            return response()->json(['status' =>'success'],200);
        }
        else {
            return response()->json(['status' => 'fail'], 401);
        }
    }
}
?>