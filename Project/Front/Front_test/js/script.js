$(document).ready(function(){
    if(localStorage.getItem('token')){
        $('[data-use="connection"]').toggleClass('hidden');
        $('[data-use="account"]').toggleClass('hidden');
        $('[data-use="books"]').toggleClass('hidden');
        $('[data-action="disconnect"]').toggleClass('hidden');
<<<<<<< HEAD
=======
        $('[data-use="room"]').toggleClass('hidden');
        $('[data-use="editProfile"]').toggleClass('hidden');
>>>>>>> d0eaaf208f1cddcc633fcdc177837f439f942b1b

    }

    $('[data-use="account"]').on('click', function(){
        $('[data-use="new"]').toggleClass('hidden');
<<<<<<< HEAD
    })
=======
    });

    //Login
>>>>>>> d0eaaf208f1cddcc633fcdc177837f439f942b1b
    $('[data-action="connect"]').on('click',function(){
        var pass = $('[data-use="password"]')[0].value;
        var email = $('[data-use="email"]')[0].value;
        $.post("http://192.168.33.10:8000/api/login", {email: email, password: pass}, function(data){
            if(data.api_key)
            {
<<<<<<< HEAD
=======
                debugger;
>>>>>>> d0eaaf208f1cddcc633fcdc177837f439f942b1b
                var htmlRender = "";
                localStorage.setItem('token', data.api_key);
                $('[data-use="connection"]').toggleClass('hidden');
                $('[data-use="result"]').html(htmlRender);
                $('[data-use="account"]').toggleClass('hidden');
                if(!($('[data-use="new"]').hasClass('hidden'))){
                    $('[data-use="new"]').toggleClass('hidden');
                }
                $('[data-use="task"]').toggleClass('hidden');
<<<<<<< HEAD
                $('[data-action="disconnect"]').toggleClass('hidden');

=======
                $('[data-use="room"]').toggleClass('hidden');
                $('[data-action="disconnect"]').toggleClass('hidden');
                $('[data-use="editProfile"]').toggleClass('hidden');
>>>>>>> d0eaaf208f1cddcc633fcdc177837f439f942b1b
            }
            else
            {
                console.log('erreur');
            }
        });
<<<<<<< HEAD
    })
    $('[data-action="newTask"]').on('click', function(){
        debugger;
=======
    });

    //Show all users having access to the current room
    $('[data-action="showUsers"]').on('click', function(){
       $.get("http://192.168.33.10:8000/api/room/" + localStorage.getItem('currentRoom') + "/users/",{Authorization: localStorage.getItem('token')});
    });

    //Create New ToDo in Current Room
    $('[data-action="newTask"]').on('click', function(){
>>>>>>> d0eaaf208f1cddcc633fcdc177837f439f942b1b
        var todo = $('[data-use="newTodo"]')[0].value;
        var description = $('[data-use="newDescription"]')[0].value;
        var category = $('[data-use="newCategory"]')[0].value;
        var htmlRender = "";
        if (todo != "" && category != "" && description != ""){
            $.post("http://192.168.33.10:8000/api/todo/",
<<<<<<< HEAD
                {todo:todo ,
                description: description,
                category: category,
                    Authorization: localStorage.getItem('token')
            },function(data){
                debugger;
=======
                {
                    todo:todo ,
                    description: description,
                    category: category,
                    Authorization: localStorage.getItem('token'),
                    room_id: localStorage.getItem('currentRoom')
            },function(data){
>>>>>>> d0eaaf208f1cddcc633fcdc177837f439f942b1b
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
<<<<<<< HEAD
    })
    $('[data-action="subscribe"]').on('click', function(){
        var pass = $('[data-use="newpassword"]')[0].value;
        var name = $('[data-use="newname"]')[0].value;
        var email = $('[data-use="newemail"]')[0].value;
=======
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
            if(data.status == "failed"){
                console.log(data);
            }
           else {
                localStorage.setItem('currentRoom', data.room_id);
                }
            });
        $.get("http://192.168.33.10:8000/api/room/all",{Authorization:localStorage.getItem('token')})
    });

    //Show Current Room
    $('[data-action="showRoom"]').on('click', function(){
        $.get("http://192.168.33.10:8000/api/room/" + localStorage.getItem('currentRoom') + "/",{Authorization: localStorage.getItem('token')}, function(data){
            debugger;
            console.log(data);
        })
    });

    //Add New User in Database
    $('[data-action="subscribe"]').on('click', function(){
        var pass = $('[data-use="newPassword"]')[0].value;
        var name = $('[data-use="newName"]')[0].value;
        var email = $('[data-use="newEmail"]')[0].value;
>>>>>>> d0eaaf208f1cddcc633fcdc177837f439f942b1b
        $.post("http://192.168.33.10:8000/api/signup",{name: name, password: pass, email: email}, function(data){
            if(data.error){
                console.log('erreur');
            }
            else{
                var htmlRender = "<p>Vous pouvez maintenant vous connecter</p>";
                $('[data-use="result"]').html(htmlRender);
            }
        })
<<<<<<< HEAD
    })
=======
    });

    // Doesn't work Right Now
    $('[data-action="editProfile"]').on('click', function(){
        var oldpass = $('[data-use="passwordOld"]')[0].value;
        var pass = $('[data-use="passwordNew"]')[0].value;
        var name = $('[data-use="editName"]')[0].value;
        var email = $('[data-use="editEmail"]')[0].value;
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
>>>>>>> d0eaaf208f1cddcc633fcdc177837f439f942b1b
    $('[data-action="disconnect"]').on('click', function(){
        localStorage.removeItem('token');
        alert("Vous etes deconnecté");
        location.reload();
<<<<<<< HEAD
    })
    $('[data-action="getTasks"]').on('click', function(){
        $.get("http://192.168.33.10:8000/api/todo/",{ Authorization:localStorage.getItem('token')},function(data){
=======
    });

    //Show Todo From Room
    $('[data-action="showTasks"]').on('click', function(){
        $.get("http://192.168.33.10:8000/api/todo", {Authorization:localStorage.getItem('token'), room_id:localStorage.getItem('currentRoom')})
    });

    //Get All Rooms where User is authorized
    $('[data-action="getRooms"]').on('click', function(){
        $.get("http://192.168.33.10:8000/api/room/all",{ Authorization:localStorage.getItem('token')},function(data){
>>>>>>> d0eaaf208f1cddcc633fcdc177837f439f942b1b
            var htmlRender = "";
            if(data.error){
                console.log(data);
            }
            else
            {
                htmlRender +="<ul>";
                for(var i = 0; i < data.length; i++)
                {
                    htmlRender += "<li class='bookList'>" + data[i].title + "<input type='checkbox'value=" + data[i].id + "></li>"
                }
                htmlRender +="</ul>";
                $('[data-use="result"]').html(htmlRender);
            }
        });
    })
<<<<<<< HEAD
    $('body').on('click', '[data-action="delete"]',function(){
=======
   /* $('body').on('click', '[data-action="delete"]',function(){
>>>>>>> d0eaaf208f1cddcc633fcdc177837f439f942b1b
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
<<<<<<< HEAD
=======
    */
>>>>>>> d0eaaf208f1cddcc633fcdc177837f439f942b1b
});