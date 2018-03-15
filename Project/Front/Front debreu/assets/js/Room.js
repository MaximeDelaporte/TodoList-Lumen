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
                $('#sidebar ul').append('<li class="room"><a href="#" data-section="mytodolist" data-action="showRoom" data-use="deleteRoom" data-value="' + data.room_id + '">' + data.name + '</a><b id="removeRoom" data-action="deleteRoom">X</b></li>');
            }
        });
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
                $('#sidebar ul').append('<li class="room"><a href="#" data-section="mytodolist" data-action="showRoom" data-use="deleteRoom" data-value="' + data.room_id + '">' + data.name + '</a><b id="removeRoom" data-action="deleteRoom">X</b></li>');

            }
        });
    });


    //Show Current Room
    $('[data-action="showRoom"]').on('click', function(){
        let dataRoom_id = $('[data-value]')[0].value;
        localStorage.setItem('currentRoom', dataRoom_id);
        $.get("http://192.168.33.10:8000/api/room/" + localStorage.getItem('currentRoom') + "/",{Authorization: localStorage.getItem('token')}, function(data){
            console.log(data);
        })
    });


    //Get All Rooms where User is authorized
    $('[data-action="getRooms"]').ready( function(){
        $.get("http://192.168.33.10:8000/api/room/all",{ Authorization:localStorage.getItem('token')},function(data){
            for(let i = 0; i < data.result.length;i++) {
                $('[data-action="getRooms"]').append('<li class="room"><a href="#" data-section="mytodolist" data-action="showRoom" data-use="deleteRoom" data-value="' + data.result[i].room_id + '">' + data.result[i].name + '</a><b id="removeRoom" data-action="deleteRoom">X</b></li>');

            }
        });
    });
    $('body').on('click','.room', function(){
      let $room_id = $(this).contents().data("value");
      localStorage.setItem('currentRoom', $room_id);
       $.get("http://192.168.33.10:8000/api/room/list/all",{room_id: localStorage.getItem('currentRoom'), Authorization: localStorage.getItem('token')});
    });

    // Delete a room with id
    $('#sidebar').on('click', '#removeRoom',function(){
      let $id = $(this).parent().contents().data("value");
      $.post("http://192.168.33.10:8000/api/room/delete/"+ $id + "/", {Authorization:localStorage.getItem('token')},function(data){
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
