<?php
namespace App\Http\Controllers;
use App\Tasklists;
use App\Rooms;
use Illuminate\Http\Request;
use App\Todo;
use Auth;
class TodoController extends Controller
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
        $room_id = $request->input('room_id');
        $todos = Todo::join('rooms','rooms.id','=','todo.room_id')->select('*')->where('rooms.id','=', $room_id)->get();
        return response()->json(['status' => 'success','result' => $todos]);
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
            'todo' => 'required',
            'room_id' => 'required'
        ]);
        $user = Tasklists::join('users','tasklists.user_id','users.id')->where('users.api_key','=',$request->input('Authorization'))->get();
        $request->merge(['finished'=>false]);

        if($user)
            if(Todo::create($request->all())){
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
        $todo = Todo::where('room_id', $id)->get();
        return response()->json($todo);

    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $todo = Todo::where('id', $id)->get();
        return view('todo.edittodo',['todos' => $todo]);
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
            'room_id' => 'filled'
        ]);
        $todo = Todo::find($id);
        if($todo->fill($request->all())->save()){
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
        if(Todo::destroy($id)){
            return response()->json(['status' => 'success']);
        }
    }
}