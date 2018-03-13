<?php
namespace App\Http\Controllers;
use App\Rooms;
use App\Tasklists;
use App\TodoLists;
use Illuminate\Http\Request;
use App\Users;
use Auth;
class TodoListsController extends Controller
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
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $room = $request->input('room_id');
        $todo = TodoLists::join('rooms','rooms.id','=','todo_list.room_id')->select('*')->where('rooms.id','=', $room)->get();
        return response()->json(['status' => 'success','result' => $todo]);
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

        $room = Rooms::where('id','=', $request->input('room_id'))->value('id');
        $exists =TodoLists::where([['name','=', $request->input('name')],['room_id','=',$room]])->exists();
        if ($exists){
            return response()->json(['status' => 'exists']);
        }
        if(TodoLists::Create([
            'name'  => $request->input('name'),
            'room_id' => $room
        ])->save()){
            $id = TodoLists::where([['name','=', $request->input('name')],['room_id','=',$room]])->value('id');
            return response()->json(['status' => 'success', 'todo_id' => $id]);
        }
        else{
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
        $todo_list = TodoLists::where('id', $id)->get();
        return response()->json($todo_list);

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
        $todo = TodoLists::where('id','=',$id);
        if($todo->update(['name' => $request->input('name')])){
            return response()->json(['status' => 'success'],200);
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
        if(TodoLists::where('id','=', $id)->delete()){
            return response()->json(['status' => 'success'],200);
        }
        return response()->json(['status' => 'failed'],401);
    }
}