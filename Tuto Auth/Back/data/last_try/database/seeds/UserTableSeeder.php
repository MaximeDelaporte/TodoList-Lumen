<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Model;
use App\Users;

class UserTableSeeder extends Seeder
{
    public function run(){
        DB::table('users')->delete();

        $user = app()->make('App\Users');
        $user->fill([
            'name'          => 'Maxime',
            'email'         =>'test@test.test',
            'password'      => Hash::make('test')
        ]);
        $user->save();
    }
}