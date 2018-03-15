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
        $todo_id = $request->input('todo_id');
     
        $todo = Todo::where('todo_id','=', $todo_id)->groupBy('category')->get();
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
            'todo' => 'required',
            'todo_id' => 'required'
        ]);
        $user = Tasklists::join('users','tasklists.user_id','users.id')->where('users.api_key','=',$request->input('Authorization'))->get();

        if($user)
            if(Todo::Create([
                'todo' => $request->input('todo'),
                'description'=> $request->input('description'),
                'category' => $request->input('category'),
                'finished' => false,
                'todo_id' =>$request->input('todo_id')
                ])->save($todo)){
            return response()->json(['status' => 'success', 'result' => $todo ]);
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
        $todo = Todo::where('todo_id', $id)->get();
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
            'todo_id' => 'filled'
        ]);
        $todo = Todo::where([['id','=',$id],['todo','=', $request->input('todo_id')]]);
        if ($request->input('todo') && $request->input('description') && $request->input('category')){
            if($todo->update(['todo' => $request->input('todo'), 'description' => $request->input('description'), 'category'=> $request->input('category')])){
                return response()->json(['status' => 'success'],200);
            }
        }
        elseif ($request->input('todo') && $request->input('description')){
            if($todo->update(['todo' => $request->input('todo'), 'description' => $request->input('description')])){
                return response()->json(['status' => 'success'],200);
            }
        }
        elseif ($request->input('todo') &&  $request->input('category')){
            if($todo->update(['todo' => $request->input('todo'), 'category'=> $request->input('category')])){
                return response()->json(['status' => 'success'],200);
            }
        }
        elseif ( $request->input('description') && $request->input('category')){
            if($todo->update(['description' => $request->input('description'), 'category'=> $request->input('category')])){
                return response()->json(['status' => 'success'],200);
            }
        }
        elseif ($request->input('todo')){
            if($todo->update(['todo' => $request->input('todo')])){
                return response()->json(['status' => 'success'],200);
            }
        }
        elseif ($request->input('description')){
            if($todo->update([ 'description' => $request->input('description')])){
                return response()->json(['status' => 'success'],200);
            }
        }
        elseif ($request->input('category')){
            if($todo->update(['category'=> $request->input('category')])){
                return response()->json(['status' => 'success'],200);
            }
        }

        return response()->json(['status' => 'failed'],401);
    }
    public function finished(Request $request, $id)
    {
        $todo = Todo::where('id','=', $id);
        if ($request->input('finished')== true){
            if($todo->update(['finished','=',true])){
                return response()->json(['status' => 'success'],200);
            }
        }
        elseif ($request->input('finished')== false){
            if($todo->update(['finished','=',false])){
                return response()->json(['status' => 'success'],200);
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
        if(Todo::destroy($id)){
            return response()->json(['status' => 'success']);
        }
    }
}