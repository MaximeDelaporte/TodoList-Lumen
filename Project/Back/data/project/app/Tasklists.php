<?php
namespace App;
use Illuminate\Database\Eloquent\Model;
class Tasklists extends Model
{
    //

    protected $fillable = ['user_id','room_id'];
    protected $hidden = ['user_id', 'room_id'];
    /*
    * Get Todo of Rooms
    *
    */
}