<?php
namespace App;
use Illuminate\Database\Eloquent\Model;
class Todo extends Model
{
    //
    protected $table = 'todo';
    protected $fillable = ['todo','category','todo_id','description','finished'];
    protected $hidden = [];

    public function todolist()
    {
        return $this->belongTo(TodoLists::class);
    }
}
