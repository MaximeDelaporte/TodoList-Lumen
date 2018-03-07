<?php
namespace App\Http\Controllers;
use App\Rooms;
use App\Tasklists;
use Illuminate\Http\Request;
use App\Users;
use Auth;
class RoomsController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $room = Auth::user()->room()->get();
        return response()->json(['status' => 'success','result' => $room]);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required'
        ]);
        $admin = Users::where('api_key','=', $request->input('Authorization'))->value('id');
        if(Rooms::Create([
            'name'  => $request->input('name'),
            'admin' => $admin
        ])->save()){
            return response()->json(['status' => 'success']);
        }else{
            return response()->json(['status' => 'fail']);
        }
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $room = Rooms::where('id', $id)->get();
        return response()->json($room);

    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $room = Rooms::where('id', $id)->get();
        return view('room.editroom',['rooms' => $room]);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'filled'
        ]);
        $room = Rooms::find($id);
        if($room->fill($request->all())->save()){
            return response()->json(['status' => 'success']);
        }
        return response()->json(['status' => 'failed']);
    }
    public function addusers(Request $request){

        $room = Rooms::find($request->input('id'))->get();

        $user = Users::select('id')->where('email', $request->input('email'))->first();
        return response()->json($user);

        if ($room->insert('users', $user)->save()){
            return response()->json(['status' => 'success']);
        }
        return response()->json(['status' => 'failed']);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if(Rooms::destroy($id)){
            return response()->json(['status' => 'success']);
        }
    }
}