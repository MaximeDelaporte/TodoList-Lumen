<?php
namespace App;
use Illuminate\Database\Eloquent\Model;
class Todo extends Model
{
    //
    protected $table = 'todo';
    protected $fillable = ['todo','category','room_id','description'];

    public function room()
    {
        return $this->belongTo(Rooms::class);
    }
}
