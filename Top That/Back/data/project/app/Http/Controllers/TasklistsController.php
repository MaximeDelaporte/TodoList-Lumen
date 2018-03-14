<?php
namespace App\Http\Controllers;
use App\Rooms;
use App\Tasklists;
use Illuminate\Http\Request;
use App\Users;
use Auth;
use Illuminate\Support\Facades\DB;

class TasklistsController extends Controller
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
        $user_id = Users::where('api_key','=', $request->input('Authorization'))->value('id');
        $tasklists = Rooms::join('tasklists','rooms.id','=','tasklists.room_id')->select('*')->where('tasklists.user_id','=', $user_id)->get();

        return response()->json(['status' => 'success','result' => $tasklists]);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $admin = Users::where('api_key','=', $request->input('Authorization'))->value('id');
;

        $room = Rooms::where([['name','=', $request->input('room')],['admin','=', $admin]])->value('id');

        $exist = Tasklists::where([['user_id','=', $admin],['room_id','=', $room]])->exists();
        if($exist == true)
        {
            return response()->json(['status' => 'exists']);
        }
        else{
            $newRoom = new Tasklists;

            if ($newRoom->fill([
                'user_id' => $admin,
                'room_id' => $room
            ])->save()){
                return response()->json(['status' => 'success','room_id'=>$room]);
            }
        }
        return response()->json(['status' => 'failed']);
    }
    /**
     * Display the specified resource.
     *
     * @param  varchar  $room
     * @param  Request  $request
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $room)
    {
        $id = Tasklists::join('rooms','rooms.id','=','tasklists.room_id')->select('*')->where('rooms.id','=', $room)->value('id');
        $user_id = Users::where('api_key', '=', $request->input('Authorization'))->value('id');

        $auth = Tasklists::where([['user_id','=',$user_id],['room_id','=',$id]])->exists();

        if ($auth == true)
        {
            $room = Rooms::where('id', $id)->get();
            return response()->json($room);
        }
        return response()->json(['status' => 'forbidden'],403);
    }
    public function users($room)
    {

        $users = Users::join('tasklists', 'users.id','=','tasklists.user_id')->where('tasklists.room_id','=', $room)->get();

        return response()->json($users);
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

    /**
     * Create
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function adduser(Request $request){
        $this->validate($request, [
            'users' => 'filled',
            'room'  => 'filled'
        ]);
        $emailExists = Users::where('email','=', $request->input('users'))->exists();
        $roomExists = Rooms::where('name','=', $request->input('room'))->orWhere('id','=', $request->input('room'))->exists();
        $admin_id = Users::where('api_key','=',$request->input('Authorization'))->value('id');
        $room_id = Rooms::where([['id','=', $request->input('room')],['admin','=', $admin_id]])->orWhere([['name','=',$request->input('room')],['admin','=',$admin_id]])->value('id');
        $user_id = Users::where('email','=', $request->input('users'))->value('id');
        $exist = Tasklists::where([['user_id','=', $user_id],['room_id','=', $room_id]])->exists();
        if ($roomExists){

            if($emailExists) {
                if ($exist == false) {
                    if (!empty($room_id)) {
                        $newRoom = new Tasklists;

                        if ($newRoom->fill([
                            'user_id' => $user_id,
                            'room_id' => $room_id
                        ])->save()) {
                            return response()->json(['status' => 'success', 'room_id' => $room_id]);
                        }
                    }
                }
                else {
                    return response()->json(['status' => 'exists']);
                }
            }
        }
        return response()->json(['status' => 'failed'],401);
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