
jQuery(document).ready(function(){

    $(function(){
    var $ul = $('#list-room');
    $ul.children('li').each(function(){
        $(this).text($(this).text())
    });

    // Ajouter une room
    $('#creer').on('click', function(){
        debugger;
        //var text = $('text')[0].value;
        $('#sidebar ul').append('<li class="room"><a href="#"></a><b id="removeRoom">X</b></li>');
    });


    });

    // Supprimer une room
    $(document).on('click', '#removeRoom',function(){
        $(this).parent().fadeToggle();
    });
});
