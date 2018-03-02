<?php
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
class CreateRoomsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('admin')->unique();
            $table->string('users');
            $table->timestamps();
            $table->foreign('admin')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('users')->references('id')->on('users');
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('rooms');
    }
}