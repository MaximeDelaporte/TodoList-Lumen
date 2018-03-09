$(document).ready(function(){
    if(localStorage.getItem('token')){
        $('[data-use="connection"]').toggleClass('hidden');
        $('[data-use="account"]').toggleClass('hidden');
        $('[data-use="books"]').toggleClass('hidden');
        $('[data-action="disconnect"]').toggleClass('hidden');
        $('[data-use="room"]').toggleClass('hidden');

    }

    $('[data-use="account"]').on('click', function(){
        $('[data-use="new"]').toggleClass('hidden');
    })
    $('[data-action="connect"]').on('click',function(){
        var pass = $('[data-use="password"]')[0].value;
        var email = $('[data-use="email"]')[0].value;
        $.post("http://192.168.33.10:8000/api/login", {email: email, password: pass}, function(data){
            if(data.api_key)
            {
                debugger;
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

            }
            else
            {
                console.log('erreur');
            }
        });
    });
    $('[data-action="showUsers"]').on('click', function(){
       $.get("http://192.168.33.10:8000/api/room/" + localStorage.getItem('currentRoom') + "/users/",{Authorization: localStorage.getItem('token')});
    });
    $('[data-action="newTask"]').on('click', function(){
        debugger;
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
                debugger;
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
    $('[data-action="adduser"]').on('click', function(){
        var email = $('[data-use="addusers"]')[0].value;
        $.post("http://192.168.33.10:8000/api/room/users/add",{room: localStorage.getItem('currentRoom'), users: email, Authorization: localStorage.getItem('token')}, function(data){
            debugger;
        });
    });
    $('[data-action="newRoom"]').on('click', function(){
        var name = $('[data-use="newroomname"]')[0].value;
        var users = $('[data-use="addusers"]')[0].value;
        $.post("http://192.168.33.10:8000/api/room/",{
            name: name,
            Authorization: localStorage.getItem('token')
        },function(data){
            if(data.status == "failed"){
                debugger;
            }
           else {
                localStorage.setItem('currentRoom', data.room_id);
                }
            });
        $.get("http://192.168.33.10:8000/api/room/all",{Authorization:localStorage.getItem('token')})
    });
    $('[data-action="showRoom"]').on('click', function(){
        $.get("http://192.168.33.10:8000/api/room/" + localStorage.getItem('currentRoom') + "/",{Authorization: localStorage.getItem('token')}, function(data){
            debugger;
            console.log(data);
        })
    })
    $('[data-action="subscribe"]').on('click', function(){
        var pass = $('[data-use="newpassword"]')[0].value;
        var name = $('[data-use="newname"]')[0].value;
        var email = $('[data-use="newemail"]')[0].value;
        $.post("http://192.168.33.10:8000/api/signup",{name: name, password: pass, email: email}, function(data){
            if(data.error){
                console.log('erreur');
            }
            else{
                var htmlRender = "<p>Vous pouvez maintenant vous connecter</p>";
                $('[data-use="result"]').html(htmlRender);
            }
        })
    })
    $('[data-action="disconnect"]').on('click', function(){
        localStorage.removeItem('token');
        alert("Vous etes deconnecté");
        location.reload();
    })
    $('[data-action="getRooms"]').on('click', function(){
        $.get("http://192.168.33.10:8000/api/room/all",{ Authorization:localStorage.getItem('token')},function(data){
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
    $('body').on('click', '[data-action="delete"]',function(){
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
});