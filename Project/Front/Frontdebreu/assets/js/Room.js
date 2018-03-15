$(document).ready(function(){

    /*$(function(){
        let $ul = $('#list-room');

        $ul.children('li').each(function(){
            $(this).text($(this).text())
        });
    });*/

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
        //$.get("http://192.168.33.10:8000/api/room/all",{Authorization:localStorage.getItem('token')});
        let idRoom = localStorage.getItem('currentRoom');
        $('#sidebar ul').append('<li class="room"><a href="#" data-section="mytodolist" data-action="showRoom" data-use="deleteRoom" data-value="' + idRoom + '">' + name + '</a><b id="removeRoom" data-action="deleteRoom">X</b></li>');
    });
    $('[data-action="newRoomBar"]').on('click', function(){
        let name = $('[data-use="newRoomNameBar"]')[0].value;
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
        //$.get("http://192.168.33.10:8000/api/room/all",{Authorization:localStorage.getItem('token')});
        let idRoom = localStorage.getItem('currentRoom');
        $('#sidebar ul').append('<li class="room"><a href="#" data-section="mytodolist" data-action="showRoom" data-use="deleteRoom" data-value="' + idRoom + '">' + name + '</a><b id="removeRoom" data-action="deleteRoom">X</b></li>');
    });

    //Show Current Room
    $('[data-action="showRoom"]').on('click', function(){
        debugger;
        let dataRoom_id = $('[data-value]')[0].value;
        localStorage.setItem('currentRoom', dataRoom_id);
        $.get("http://192.168.33.10:8000/api/room/" + localStorage.getItem('currentRoom') + "/",{Authorization: localStorage.getItem('token')}, function(data){
            console.log(data);
        })
    });


    //Get All Rooms where User is authorized
    $('[data-action="getRooms"]').ready( function(){
        debugger;
        $.get("http://192.168.33.10:8000/api/room/all",{ Authorization:localStorage.getItem('token')},function(data){
            debugger;
            for(let i = 0; i < data.result.length;i++) {
                $('[data-action="getRooms"]').append('<li class="room"><a href="#" data-section="mytodolist" data-action="showRoom" data-use="deleteRoom" data-value="' + data.result[i].room_id + '">' + data.result[i].name + '</a><b id="removeRoom" data-action="deleteRoom">X</b></li>');

            }
        });
    });

    // Delete a room
    $(document).on('click', '#removeRoom',function(){
        $(this).parent().fadeToggle();
    });
    //Delete Room with Id
    $('[data-action="deleteRoom"]').on('click', function(){
        debugger;
        let $id = $('[data-use="deleteRoom"]')[0].value;
        $.post("http://192.168.33.10:8000/api/room/delete/" + $id +"/", {Authorization:localStorage.getItem('token')},function(data){

        });
    });

    //SidebarMenuRoom
    $('#sidebar-btn').on('click', function(){
        $('#sidebar').toggleClass('visible');
    });
});
