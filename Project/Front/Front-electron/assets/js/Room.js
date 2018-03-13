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

    //Show Current Room
    $('[data-section="mytodolist"]').on('click', function(){
        debugger;
        let dataRoom_id = $('[data-value]')[0].value;
        localStorage.setItem('currentRoom', dataRoom_id);
        $.get("http://192.168.33.10:8000/api/room/" + localStorage.getItem('currentRoom') + "/",{Authorization: localStorage.getItem('token')}, function(data){
            console.log(data);
        })
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

            }
        });
    });

    // Delete a room
    $(document).on('click', '#removeRoom',function(){
        $(this).parent().fadeToggle();
    });

    //SidebarMenuRoom
    $('#sidebar-btn').on('click', function(){
        $('#sidebar').toggleClass('visible');
    });
});
