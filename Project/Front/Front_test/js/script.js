$(document).ready(function(){
    if(localStorage.getItem('token')){
        $('[data-use="connection"]').toggleClass('hidden');
        $('[data-use="account"]').toggleClass('hidden');
        $('[data-use="task"]').toggleClass('hidden');
        $('[data-action="disconnect"]').toggleClass('hidden');
        $('[data-use="room"]').toggleClass('hidden');
        $('[data-use="editProfile"]').toggleClass('hidden');

    }

    $('[data-use="account"]').on('click', function(){
        $('[data-use="new"]').toggleClass('hidden');
    });

    //Login
    $('[data-action="connect"]').on('click',function(){
        var pass = $('[data-use="password"]')[0].value;
        var email = $('[data-use="email"]')[0].value;
        $.post("http://192.168.33.10:8000/api/login", {email: email, password: pass}, function(data){
            if(data.api_key)
            {
                var htmlRender = "";
                localStorage.setItem('token', data.api_key);
                $('[data-use="connection"]').toggleClass('hidden');
                $('[data-use="result"]').html(htmlRender);
                $('[data-use="account"]').toggleClass('hidden');
                if(!($('[data-use="new"]').hasClass('hidden'))){
                    $('[data-use="new"]').toggleClass('hidden');
                }
                $('[data-use="task"]').toggleClass('hidden');
                $('[data-use="room"]').toggleClass('hidden');
                $('[data-action="disconnect"]').toggleClass('hidden');
                $('[data-use="editProfile"]').toggleClass('hidden');
            }
            else
            {
                console.log('erreur');
            }
        });
    });

    //Show all users having access to the current room
    $('[data-action="showUsers"]').on('click', function(){
       $.get("http://192.168.33.10:8000/api/room/" + localStorage.getItem('currentRoom') + "/users/",{Authorization: localStorage.getItem('token')});
    });

    //Create New ToDo in Current Room
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
                    room_id: localStorage.getItem('currentRoom')
            },function(data){
                if(data == "failed"){
                    htmlRender = "<p>Book already added</p>";
                }
                else{
                     htmlRender = "<p>Task added</p>";
                }
            })
        }
        else{
            htmlRender = "<p>Give all info to register this task</p>"
        }
        $('[data-use="result"]').html(htmlRender);
    });

    //Add Coworker on current Room(Can be changed later)
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
            debugger;
            if(data.status == "failed"){
                console.log(data);
            }
           else {
                localStorage.setItem('currentRoom', data.room_id);
                }
            });
        $.get("http://192.168.33.10:8000/api/room/all",{Authorization:localStorage.getItem('token')})
    });
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

    $('[data-action="modifTask"]').on('click', function(){
        var todo_name = $('[data-use="newToDoName"]')[0].value;
        var todo_id = $('[data-use="searchToDo"]')[0].value;
        var todo_desc = $('[data-use="newToDoDescription"]')[0].value;
        var todo_category = $('[data-use="newToDoCategory"]')[0].value;

        $.post("http://192.168.33.10:8000/api/todo/" + todo_id + "/edit/",{
            todo: todo_name,
            description: todo_desc,
            category: todo_category,
            room_id: localStorage.getItem('currentRoom'),
            Authorization: localStorage.getItem('token')
        },function(data){
        });
        $.get("http://192.168.33.10:8000/api/todo", {Authorization:localStorage.getItem('token'), room_id:localStorage.getItem('currentRoom')})
    });

    //Show Current Room
    $('[data-action="showRoom"]').on('click', function(){
        $.get("http://192.168.33.10:8000/api/room/" + localStorage.getItem('currentRoom') + "/",{Authorization: localStorage.getItem('token')}, function(data){
            console.log(data);
        })
    });

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

    // Edit User profile
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
                var htmlRender = "<p>Your Account has been edited</p>";
                $('[data-use="result"]').html(htmlRender);
            }
        })
    });

    //Basic Deconnection - Remove token From localStorage
    $('[data-action="disconnect"]').on('click', function(){
        localStorage.removeItem('token');
        alert("Vous etes deconnecté");
        location.reload();
    });

    //Show Todo From Room
    $('[data-action="showTasks"]').on('click', function(){
        $.get("http://192.168.33.10:8000/api/todo", {Authorization:localStorage.getItem('token'), room_id:localStorage.getItem('currentRoom')})
    });

    //Get All Rooms where User is authorized
    $('[data-action="getRooms"]').on('click', function(){
        $.get("http://192.168.33.10:8000/api/room/all",{ Authorization:localStorage.getItem('token')},function(data){

        });
    });
    $('[data-action="deleteRoom"]').on('click', function(){
        var $id = $('[data-use="deleteRoom"]')[0].value;
        debugger;
        $.post("http://192.168.33.10:8000/api/room/delete/" + $id +"/", {Authorization:localStorage.getItem('token'), id: $id, method: 'delete' },function(data){

        });
    })

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
                     }
                 })
             }
         }
         $('.bookList input:checked').parent().remove();
     })
     */
});