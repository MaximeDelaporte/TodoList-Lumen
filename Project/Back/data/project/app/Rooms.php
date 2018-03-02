<?php
namespace App;
use Illuminate\Database\Eloquent\Model;
class Rooms extends Model
{
    //

    protected $fillable = ['name','admin','users'];
    protected $hidden = [];
    /*
    * Get Todo of Rooms
    *
    */
    public function todo()
    {
        return $this->hasMany('App\Todo','room_id');
    }
}