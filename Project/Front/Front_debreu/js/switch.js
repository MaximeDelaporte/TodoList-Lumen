// Permet de switcher entre la connexion et l'enregistrement.
$('.message a').click(function(){
  $("form").animate({height: "toggle", opacity:"toggle"}, "slow");
});
