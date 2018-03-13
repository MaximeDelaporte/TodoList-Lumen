<?php
namespace App;
use Illuminate\Database\Eloquent\Model;
class Rooms extends Model
{
    //

    protected $fillable = ['name','users','admin'];
    protected $hidden = ['id'];
    /*
    * Get Todo of Rooms
    *
    */
    public function todolists()
    {
        return $this->hasMany('App\TodoLists','room_id');
    }
    public function user()
    {
        return $this->belongTo(Users::class);
    }
}