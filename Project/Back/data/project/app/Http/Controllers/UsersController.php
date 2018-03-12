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
            $username = Users::where('api_key','=',$apikey)->value('name');
            return response()->json(['status' => 'success','api_key' => $apikey,'username'=> $username]);
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
    public function exist($email)
    {
        $user = Users::where('email', $email)->get();
        if(!empty($user)){
            return response()->json(['status' =>'success'],200);
        }
        else {
            return response()->json(['status' => 'fail'], 401);
        }
    }
    public function update(Request $request, $token)
    {
        $this->validate($request, [
            'oldpassword' => 'required'
        ]);
        $email = Users::find($request->input('email'));
        $passVerif = Hash::make($request->input('oldpassword'));
        $user = Users::where([['api_key','=', $request->input('Authorization')],['password','=', $passVerif]])->exists();
        if ($user == true){
            $pass = Hash::make($request->input('password'));
            if($request->input('name') != "" && $request->input('password') !="" && isset($email) == false){
                if($user->fill([
                    'password' => $pass,
                    'name' => $request->input('name'),
                    'email' => $request->input('email')
                ])->save()){
                    return response()->json(['status' => 'success'],200);
                }
            }
            elseif ($request->input('name') != "" && $request->input('password') !="")
            {
                if($user->fill([
                    'password' => $pass,
                    'name' => $request->input('name'),
                ])->save()){
                    return response()->json(['status' => 'success'], 200);
                }
            }
            elseif ($request->input('name') != "")
            {
                if($user->fill([
                    'name' => $request->input('name'),
                ])->save()){
                    return response()->json(['status' => 'success'],200);
                }
            }
            elseif ($request->input('password') != "")
            {
                if($user->fill([
                    'password' => $pass,
                ])->save()){
                    return response()->json(['status' => 'success']);
                }
            }
        }
        return response()->json(['status' => 'failed'],401);
    }
}
