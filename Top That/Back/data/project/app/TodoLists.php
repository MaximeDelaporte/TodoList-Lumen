<?php
namespace App;
use Illuminate\Database\Eloquent\Model;
class TodoLists extends Model
{
    //
    protected $table = 'todo_lists';
    protected $fillable = ['name','room_id'];
    protected $hidden = [];

    public function room()
    {
        return $this->belongTo(Rooms::class);
    }
    public function todo()
    {
        return $this->hasMany('App\Todo','todo_id');
    }
}
