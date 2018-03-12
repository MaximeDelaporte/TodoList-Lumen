$('body').ready(function () {
    // Permet de switcher entre la connexion et l'enregistrement.
    $('.message a').on('click', function(){
        $("form").animate({height: "toggle", opacity:"toggle"}, "slow");
    });
});
