<?php
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
class Todo extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('todo', function (Blueprint $table) {
            $table->increments('id');
            $table->string('todo');
            $table->string('description');
            $table->string('category');
            $table->boolean('finished');
            $table->integer('todo_id')->unsigned();
            $table->timestamps();
            $table->foreign('todo_id')->references('id')->on('todo_lists')->onDelete('cascade');
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::dropIfExists('todo');
    }
}