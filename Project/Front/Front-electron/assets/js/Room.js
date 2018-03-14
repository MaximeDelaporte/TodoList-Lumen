$(document).ready(function(){

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

    //Get All Rooms where User is authorized
    $('[data-action="getRooms"]').ready( function(){
        $.get("http://192.168.33.10:8000/api/room/all",{ Authorization:localStorage.getItem('token')},function(data){
            for(let i = 0; i < data.result.length;i++) {
                $('[data-action="getRooms"]').append('<li class="room"><a href="#" data-section="mytodolist" data-action="showRoom" data-use="deleteRoom" data-value="' + data.result[i].room_id + '">' + data.result[i].name + '</a><b id="removeRoom" data-action="deleteRoom">X</b></li>');

            }
        });
    });

    // Delete a room with id
    $('#sidebar').on('click', '#removeRoom',function(){
        let $id = $(this).parent()["0"].children["0"].attributes[4].nodeValue;
        $.post("http://192.168.33.10:8000/api/room/delete/" + $id +"/", {Authorization:localStorage.getItem('token')},function(data){
            alert("Room Deleted");
            console.log(data);
        });
        $(this).parent().fadeToggle();
        $(this).parent()["0"].remove();

    });

    //SidebarMenuRoom
    $('#sidebar-btn').on('click', function(){
        $('#sidebar').toggleClass('visible');
    });
});
