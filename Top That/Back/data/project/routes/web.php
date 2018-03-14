<?php
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/
$app->get('/', function () use ($app) {
    return $app->version();
});
$app->group(['prefix' => 'api/'], function ($app) {
    $app->post('login/','UsersController@authenticate');
    $app->post('signup/','UsersController@create');
    $app->get('profile/', 'UsersController@show');
    $app->post('profile/{token}/edit/','UsersController@update');
    $app->post('room/', 'RoomsController@store');
    $app->get('room/all/', 'TasklistsController@index');
    $app->get('room/{room}/','TasklistsController@show');
    $app->get('room/{room}/users/', 'TasklistsController@users');
    $app->post('room/users/', 'TasklistsController@store');
    $app->post('room/users/add/', 'TasklistsController@adduser');
    $app->post('room/{name}/settings/','RoomsController@update');
    $app->post('room/delete/{id}/', 'RoomsController@destroy');
    $app->get('room/list/all', 'TodoListsController@index');
    $app->get('room/list/{id}', 'TodoListsController@show');
    $app->post('room/list/', 'TodoListsController@store');
    $app->post('room/list/{id}/edit', 'TodoListsController@update');
    $app->get('room/list/{id}/delete', 'TodoListsController@destroy');
    $app->post('todo/','TodoController@store');
    $app->get('todo/', 'TodoController@index');
    $app->get('todo/{id}/', 'TodoController@show');
    $app->post('todo/{id}/edit', 'TodoController@update');
    $app->post('todo/{id}/finished', 'TodoController@finished');
    $app->get('todo/{id}/delete', 'TodoController@destroy');
});