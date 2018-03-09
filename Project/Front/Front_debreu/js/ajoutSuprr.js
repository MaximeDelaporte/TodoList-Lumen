
jQuery(document).ready(function(){

  $(function(){
    var $ul = $('#list-room');
    $ul.children('li').each(function(){
      $(this).text($(this).text())
    });

    // Ajouter une room
    $('#creer').click(function(){
      var text = document.getElementById('text').value;
      var listRoom = document.getElementById('list-room');
      var newRoom = document.createElement('li');
      $('ul').append('<li class="room"><a href="#">'+ text + ' </a><b id="removeRoom">X</b></li>');
    });


  });

  // Supprimer une room
  $(document).on('click', '#removeRoom',function(){
    $(this).parent().fadeToggle();
  });
});
