<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Todo;
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
        $user = Users::where(api_key, $request->input('authorization'))->first();
        $id = $user.id;
        if(Auth::user()->room()->Create($request, [
            'name'  => $request->input('name'),
            'admin' => $id,
            'users' => $id
        ])){
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
            'users' => 'filled'
        ]);
        $room = Rooms::find($id);
        if($room->fill($request->all())->save()){
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