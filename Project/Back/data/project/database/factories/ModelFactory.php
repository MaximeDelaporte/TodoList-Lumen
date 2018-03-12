<?php
<<<<<<< HEAD

=======
>>>>>>> d0eaaf208f1cddcc633fcdc177837f439f942b1b
/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/
<<<<<<< HEAD

$factory->define(App\User::class, function (Faker\Generator $faker) {
=======
$factory->define(App\Users::class, function (Faker\Generator $faker) {
>>>>>>> d0eaaf208f1cddcc633fcdc177837f439f942b1b
    return [
        'name' => $faker->name,
        'email' => $faker->email,
    ];
<<<<<<< HEAD
});
=======
});
>>>>>>> d0eaaf208f1cddcc633fcdc177837f439f942b1b
