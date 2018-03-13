
jQuery(document).ready(function(){

    $(function(){
        let $ul = $('#list-room');

        $ul.children('li').each(function(){
            $(this).text($(this).text())
        });

        // Add a room
        $('#createRoom').on('click', function(){
            let text = $('[data-use="newRoomName"]')[0].value;
            debugger;
            let idRoom = localStorage.getItem('currentRoom');
            $('#sidebar ul').append('<li class="room"><a href="#" data-section="mytodolist" data-action="showRoom" data-use="deleteRoom" data-value="' + idRoom + '">' + text + '</a><b id="removeRoom" data-action="deleteRoom">X</b></li>');
        });


    });

    // Delete a room
    $(document).on('click', '#removeRoom',function(){
        $(this).parent().fadeToggle();
    });

    $()
});
