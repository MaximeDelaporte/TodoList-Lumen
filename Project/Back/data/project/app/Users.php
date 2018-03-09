<?php
namespace App;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Auth\Authenticatable as AuthenticableTrait;
class Users extends Model implements Authenticatable
{
    //
    use AuthenticableTrait;
    protected $fillable = ['name','email','password','userimage'];
    protected $hidden = [
        'password',
        'id',
        'api_key'
    ];
    /*
    * Get Room of User
    *
    */
    public function tasklist()
    {
        return $this->hasMany('App\Tasklists','users_id');
    }
}