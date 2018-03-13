$(document).ready(function(){
    if(localStorage.getItem('token')){
        $('[data-use="connection"]').toggleClass('hidden');
        $('[data-use="account"]').toggleClass('hidden');
        $('[data-use="books"]').toggleClass('hidden');
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
                debugger;
                let htmlRenderResult = "";
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

    //Create New ToDo_ in Current Room
    $('[data-action="newTask"]').on('click', function(){
        debugger;
        let todo = $('[data-use="newTodo"]')[0].value;
        let description = $('[data-use="newDescription"]')[0].value;
        let category = $('[data-use="newCategory"]')[0].value;
        let htmlRenderResult = "";
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

    //Add Coworker on current Room(Can be changed later)
    $('[data-action="addUser"]').on('click', function(){
        var email = $('[data-use="addUsers"]')[0].value;
        $.post("http://192.168.33.10:8000/api/room/users/add",{room: localStorage.getItem('currentRoom'), users: email, Authorization: localStorage.getItem('token')}, function(data){
        });
    });

    //Create New Room with Name
    $('[data-action="newRoom"]').on('click', function(){
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
                let htmlRenderResult = "<p>Vous pouvez maintenant vous connecter</p>";
                $('[data-use="result"]').html(htmlRenderResult);
            }
        })
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
                let htmlRenderResult = "<p>Your Account has been edited</p>";
                $('[data-use="result"]').html(htmlRenderResult);
            }
        })
    });

    //Basic Deconnection - Remove token From localStorage
    $('[data-action="disconnect"]').on('click', function(){
        localStorage.removeItem('token');
        alert("Vous etes deconnecté");
        location.reload();
    });

    //Show Todo_ From Room
    $('[data-action="showTasks"]').on('click', function(){
        $.get("http://192.168.33.10:8000/api/todo", {Authorization:localStorage.getItem('token'), room_id:localStorage.getItem('currentRoom')})
    });

    //Get All Rooms where User is authorized
    $('[data-action="getRooms"]').on('click', function(){
        $.get("http://192.168.33.10:8000/api/room/all",{ Authorization:localStorage.getItem('token')},function(data){
            let htmlRenderResult = "";
            if(data.error){
                console.log(data);
            }
            else
            {
                htmlRenderResult +="<ul>";
                for(let i = 0; i < data.length; i++)
                {
                    htmlRenderResult += "<li class='bookList'>" + data[i].title + "<input type='checkbox' value=" + data[i].id + "></li>"
                }
                htmlRenderResult +="</ul>";
                $('[data-use="result"]').html(htmlRenderResult);
            }
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