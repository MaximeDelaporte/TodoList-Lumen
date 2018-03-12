
jQuery(document).ready(function(){

    $(function(){
    var $ul = $('#list-room');
    $ul.children('li').each(function(){
        $(this).text($(this).text())
    });

    // Ajouter une room
    $('#createRoom').on('click', function(){
        let text = $('[data-use="newRoomName"]')[0].value;
        $('#sidebarBis ul').append('<li class="room"><a href="#" data-use="deleteRoom">' + text + '</a><b id="removeRoom" data-action="deleteRoom">X</b></li>');
    });


    });

    // Supprimer une room
    $(document).on('click', '#removeRoom',function(){
        $(this).parent().fadeToggle();
    });
});
