$(document).ready(function(){
 /*   if(localStorage.getItem('token')){
        $('[data-use="connection"]').toggleClass('hidden');
        $('[data-use="account"]').toggleClass('hidden');
        $('[data-use="task"]').toggleClass('hidden');
        $('[data-action="disconnect"]').toggleClass('hidden');
        $('[data-use="room"]').toggleClass('hidden');
        $('[data-use="editProfile"]').toggleClass('hidden');
        $('[data-use="list"]').toggleClass('hidden');

    }

    ////////////////////////////////////// USER ///////////////////////////////////////////////////////////////////////////////

    //Add New User in Database
    $('[data-action="subscribe"]').on('click', function(){
        var pass = $('[data-use="newPassword"]')[0].value;
        var name = $('[data-use="newName"]')[0].value;
        var email = $('[data-use="newEmail"]')[0].value;
        $.post("http://192.168.33.10:8000/api/signup",{name: name, password: pass, email: email}, function(data){
            if(data.error){
                console.log('erreur');
            }
            else{
                var htmlRender = "<p>Vous pouvez maintenant vous connecter</p>";
                $('[data-use="result"]').html(htmlRender);
            }
        })
    });
*/
    //Login
    //adding in connexion.js
 /*   $('[data-action="connect"]').on('click',function(){
        var pass = $('[data-use="password"]')[0].value;
        var email = $('[data-use="email"]')[0].value;
        $.post("http://192.168.33.10:8000/api/login", {email: email, password: pass}, function(data){
            if(data.api_key)
            {
<<<<<<< HEAD
                let htmlRenderResult = "";
=======
                var htmlRender = "";
>>>>>>> 8e5b38b7c43aa4ad1503ae229dbd67efa042975e
                localStorage.setItem('token', data.api_key);
                $('[data-use="connection"]').toggleClass('hidden');
                $('[data-use="result"]').html(htmlRenderResult);
                $('[data-use="account"]').toggleClass('hidden');
                if(!($('[data-use="new"]').hasClass('hidden'))){
                    $('[data-use="new"]').toggleClass('hidden');
                }
                $('[data-use="task"]').toggleClass('hidden');
                $('[data-use="room"]').toggleClass('hidden');
                $('[data-action="disconnect"]').toggleClass('hidden');
                $('[data-use="editProfile"]').toggleClass('hidden');
                $('[data-use="list"]').toggleClass('hidden');

            }
            else
            {
                console.log('erreur');
            }
        });
    });
*/
    //Show all users having access to the current room
    $('[data-action="showUsers"]').on('click', function(){
<<<<<<< HEAD
       $.get("http://192.168.33.10:8000/api/room/" + localStorage.getItem('currentRoom') + "/users/",{Authorization: localStorage.getItem('token')});
    });

    //Create New ToDo_ in Current Room
    //Available in function.js
 /*   $('body').on('click', '[data-use="create-todo_-list"]', function(){
        let todo_ = $('[data-use="newTodo"]')[0].value;
        let description = $('[data-use="newDescription"]')[0].value;
        let category = $('[data-use="newCategory"]')[0].value;
        let htmlRenderResult = "";
        if (todo_ != "" && category != "" && description != ""){
            $.post("http://192.168.33.10:8000/api/todo_/",
                {
                    todo_:todo_ ,
                    description: description,
                    category: category,
                    Authorization: localStorage.getItem('token'),
                    room_id: localStorage.getItem('currentRoom')
            },function(data){
                if(data == "failed"){
                    htmlRenderResult = "<p>Task already added</p>";
                }
                else{
                     htmlRenderResult = "<p>Task added</p>";
                }
            })
        }
        else{
            htmlRenderResult = "<p>Give all info to register this task</p>"
        }
        $('[data-use="result"]').html(htmlRenderResult);
    });
*/
    //Add Coworker on current Room(Can be changed later)
    $('[data-action="addUser"]').on('click', function(){
        var email = $('[data-use="addUsers"]')[0].value;
        $.post("http://192.168.33.10:8000/api/room/users/add",{room: localStorage.getItem('currentRoom'), users: email, Authorization: localStorage.getItem('token')}, function(data){
        });
    });

    //Create New Room with Name
    //Adding in Room.js
/*    $('[data-action="newRoom"]').on('click', function(){
        let name = $('[data-use="newRoomName"]')[0].value;
        $.post("http://192.168.33.10:8000/api/room/",{
            name: name,
            Authorization: localStorage.getItem('token')
        },function(data){
            if(data.status == "failed"){
                console.log(data);
            }
           else {
                localStorage.setItem('currentRoom', data.room_id);
                }
            });
        $.get("http://192.168.33.10:8000/api/room/all",{Authorization:localStorage.getItem('token')})
    });
*/
    //Show Current Room
    //Adding in Room.js
 /*   $('[data-action="showRoom"]').on('click', function(){
        debugger;
        let dataRoom_id = $('[data-value]')[0].value;
        localStorage.setItem('currentRoom', dataRoom_id);
        $.get("http://192.168.33.10:8000/api/room/" + localStorage.getItem('currentRoom') + "/",{Authorization: localStorage.getItem('token')}, function(data){
            console.log(data);
        })
    });
*/
    //Add New User in Database
    //adding in connexion.js
 /*   $('[data-action="subscribe"]').on('click', function(){
        var pass = $('[data-use="newPassword"]')[0].value;
        var name = $('[data-use="newName"]')[0].value;
        var email = $('[data-use="newEmail"]')[0].value;
        $.post("http://192.168.33.10:8000/api/signup",{name: name, password: pass, email: email}, function(data){
            if(data.error){
                console.log('erreur');
            }
            else{
                let htmlRenderResult = "<p>Vous pouvez maintenant vous connecter</p>";
                $('[data-use="result"]').html(htmlRenderResult);
            }
        })
    });
*/
    // Doesn't work Right Now
=======
        $.get("http://192.168.33.10:8000/api/room/" + localStorage.getItem('currentRoom') + "/users/",{Authorization: localStorage.getItem('token')});
    });


    // Edit User profile
>>>>>>> 8e5b38b7c43aa4ad1503ae229dbd67efa042975e
    $('[data-action="editProfile"]').on('click', function(){
        var oldpass = $('[data-use="passwordOld"]')[0].value;
        var pass = $('[data-use="passwordNew"]')[0].value;
        var name = $('[data-use="editName"]')[0].value;
        var email = $('[data-use="editEmail"]')[0].value;
        debugger;
        $.post("http://192.168.33.10:8000/api/profile/" + localStorage.getItem('token') + "/edit/",{Authorization: localStorage.getItem('token'), name: name, oldpassword: oldpass, password: pass, email: email}, function(data){
            if(data.status == "failed"){
                console.log('erreur');
            }
            else{
                let htmlRenderResult = "<p>Your Account has been edited</p>";
                $('[data-use="result"]').html(htmlRenderResult);
            }
        })
    });

    //Basic Deconnection - Remove token From localStorage
    //adding in connexion.js
/*    $('[data-action="disconnect"]').on('click', function(){
        localStorage.removeItem('token');
        alert("Vous etes deconnecté");
        location.reload();
    });
<<<<<<< HEAD
*/
    //Show Todo_ From Room
 /*   $('[data-action="showTasks"]').on('click', function(){
        debugger;
        $.get("http://192.168.33.10:8000/api/todo_", {Authorization:localStorage.getItem('token'), room_id:localStorage.getItem('currentRoom'), todo_id:localStorage.getItem('currentTodoList')})
=======

    ////////////////////////////////////// ROOM ///////////////////////////////////////////////////////////////////////////////

    //Show Current Room
    $('[data-action="showRoom"]').on('click', function(){
        $.get("http://192.168.33.10:8000/api/room/" + localStorage.getItem('currentRoom') + "/",{Authorization: localStorage.getItem('token')}, function(data){
            console.log(data);
        })
>>>>>>> 8e5b38b7c43aa4ad1503ae229dbd67efa042975e
    });
*/
    //Get All Rooms where User is authorized
    //adding in Room.js
  /*  $('[data-action="getRooms"]').on('click', function(){
        $.get("http://192.168.33.10:8000/api/room/all",{ Authorization:localStorage.getItem('token')},function(data){
<<<<<<< HEAD
            let htmlRenderResult = "";
            if(data.error){
                console.log(data);
            }
            else
            {

            }
        });
    })*/


   /* $('body').on('click', '[data-action="delete"]',function(){
        test = $(this).parent().text()
        debugger;
    })
    $('#deleteAcc').on('click', function(){
        var checkList= $('[type="checkbox"]');
        for(var i = 0; i < checkList.length; i++){
            if(checkList[i].checked == true){
                $.post("http://192.168.33.30:4000/admin/books/delete?token=" + localStorage.getItem('token'), {id: checkList[i].id}, function(data){
                    if(data.error){
                        alert("Error, No book found in database")
=======

        });
    });

    //Add Coworker on current Room
    $('[data-action="addUser"]').on('click', function(){
        var email = $('[data-use="addUsers"]')[0].value;
        $.post("http://192.168.33.10:8000/api/room/users/add",{room: localStorage.getItem('currentRoom'), users: email, Authorization: localStorage.getItem('token')}, function(data){
        });
    });


    //Create New Room with Name
    $('[data-action="newRoom"]').on('click', function(){
        var name = $('[data-use="newRoomName"]')[0].value;
        $.post("http://192.168.33.10:8000/api/room/",{
            name: name,
            Authorization: localStorage.getItem('token')
        },function(data){
            if(data.status == "failed"){
                console.log(data);
            }
            else {
                localStorage.setItem('currentRoom', data.room_id);
            }
        });
        $.get("http://192.168.33.10:8000/api/room/all",{Authorization:localStorage.getItem('token')})
    });

    //Edit Room to alter Name
    $('[data-action="editRoom"]').on('click', function(){
        var name = $('[data-use="roomNameNew"]')[0].value;
        var oldName = $('[data-use="roomNameOld"]')[0].value;
        console.log(encodeURIComponent(oldName));
        $.post("http://192.168.33.10:8000/api/room/" + encodeURIComponent(oldName) + "/settings/",{
            name: name,
            oldname: oldName,
            Authorization: localStorage.getItem('token')
        },function(data){
        });
        $.get("http://192.168.33.10:8000/api/room/all",{Authorization:localStorage.getItem('token')})
    });

    //Delete Room with Id
    $('[data-action="deleteRoom"]').on('click', function(){
        var $id = $('[data-use="deleteRoom"]')[0].value;
        $.post("http://192.168.33.10:8000/api/room/delete/" + $id +"/", {Authorization:localStorage.getItem('token')},function(data){

        });
    });

    ////////////////////////////////////// TO DO LIST ///////////////////////////////////////////////////////////////////////////

    //Create New To Do List in Current Room
    $('[data-action="createList"]').on('click', function(){
        var name = $('[data-use="createList"]')[0].value;
        var htmlRender = "";
        if (name != ""){
            $.post("http://192.168.33.10:8000/api/room/list",
                {
                    name:name ,
                    Authorization: localStorage.getItem('token'),
                    room_id: localStorage.getItem('currentRoom')
                },function(data){
                    if(data == "failed"){
                        console.log(data);
                    }
                    else{
                        localStorage.setItem('currentTodoList', data.todo_id);
                        htmlRender = "<p>Task added</p>";
>>>>>>> 8e5b38b7c43aa4ad1503ae229dbd67efa042975e
                    }
                })
        }
        else{
            htmlRender = "<p>Give all info to register this task</p>"
        }
        $('[data-use="result"]').html(htmlRender);
    });

    ///////////////////////////////////////  TO DO ///////////////////////////////////////////////////////////////////////////////

    //Show To do From To Do List
    $('[data-action="showTasks"]').on('click', function(){
        $.get("http://192.168.33.10:8000/api/todo", {Authorization:localStorage.getItem('token'), todo_id:localStorage.getItem('currentTodoList')})
    });

    //Create New To Do in Current To Do List
    $('[data-action="newTask"]').on('click', function(){
        var todo = $('[data-use="newTodo"]')[0].value;
        var description = $('[data-use="newDescription"]')[0].value;
        var category = $('[data-use="newCategory"]')[0].value;
        var htmlRender = "";
        if (todo != "" && category != "" && description != ""){
            $.post("http://192.168.33.10:8000/api/todo/",
                {
                    todo:todo ,
                    description: description,
                    category: category,
                    Authorization: localStorage.getItem('token'),
                    todo_id: localStorage.getItem('currentTodoList')
                },function(data){
                    if(data == "failed"){
                        console.log(data);
                    }
                    else{

                    }
                })
        }
        else{
        }
    });

    //Edit To Do (Name, description, category)
    $('[data-action="modifTask"]').on('click', function(){
        var todo_name = $('[data-use="newTodoName"]')[0].value;
        var todo_id = $('[data-use="searchTodo"]')[0].value;
        var todo_desc = $('[data-use="newTodoDescription"]')[0].value;
        var todo_category = $('[data-use="newTodoCategory"]')[0].value;

        $.post("http://192.168.33.10:8000/api/todo/" + todo_id + "/edit/",{
            todo: todo_name,
            description: todo_desc,
            category: todo_category,
            todo_id: localStorage.getItem('currentTodoList'),
            Authorization: localStorage.getItem('token')
        },function(data){
        });
        $.get("http://192.168.33.10:8000/api/todo", {Authorization:localStorage.getItem('token'), todo_id:localStorage.getItem('currentTodoList')})
    });

    //Delete To do  with Id
    $('[data-action="deleteTodo"]').on('click', function(){
        var $id = $('[data-use="deleteTodo"]')[0].value;
        debugger;
        $.get("http://192.168.33.10:8000/api/todo/"+ $id + "/delete/", {Authorization:localStorage.getItem('token')},function(data){

        });
    })
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
});