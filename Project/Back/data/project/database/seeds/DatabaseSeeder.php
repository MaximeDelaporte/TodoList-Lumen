<?php
<<<<<<< HEAD

use Illuminate\Database\Seeder;

=======
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
>>>>>>> d0eaaf208f1cddcc633fcdc177837f439f942b1b
class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
<<<<<<< HEAD
        $this->call('UserTableSeeder');
    }
}
=======
        DB::table('users')->insert([
            'name' => 'admin',
            'email' => 'test@test.test',
            'password' => Hash::make('test')
        ]);
    }
}
>>>>>>> d0eaaf208f1cddcc633fcdc177837f439f942b1b
