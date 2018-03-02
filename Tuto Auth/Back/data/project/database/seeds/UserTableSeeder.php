<?php

use Illuminate\Database\Seeder;
use App\User;

class UserTableSeeder extends Seeder
{
    public function run(){
        DB::table('users')->delete();
        User::create(array(
            'name'          => 'Maxime',
            'username'      => 'admin',
            'email'         =>'test@test.test',
            'password'      => hash('md5','test'),
        ));
    }
}