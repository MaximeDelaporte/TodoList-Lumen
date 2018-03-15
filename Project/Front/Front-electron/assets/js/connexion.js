$('body').ready(function () {
    // CONNEXION / LOGIN

    if(localStorage.getItem('token')){
        $('[data-use="connection"]').toggleClass('hidden');
        $('[data-use="account"]').toggleClass('hidden');
        $('[data-action="disconnect"]').toggleClass('hidden');
        $('[data-use="room"]').toggleClass('hidden');
        $('[data-use="editProfile"]').toggleClass('hidden');
        $('[data-use="sidebar"]').toggleClass('hidden');
    }

    $('[data-use="account"]').on('click', function(){
        $('[data-use="new"]').toggleClass('hidden');
    });

    //Login
    $('[data-action="connect"]').on('click',function(){
        debugger;
        let pass = $('[data-use="password"]')[0].value;
        let email = $('[data-use="email"]')[0].value;
        $.post("http://192.168.33.10:8000/api/login", {email: email, password: pass}, function(data){
            if(data.api_key)
            {
                let htmlRenderResult = "";
                localStorage.setItem('token', data.api_key);
                $('[data-use="connection"]').toggleClass('hidden');
                $('[data-use="result"]').html(htmlRenderResult);
                $('[data-use="account"]').toggleClass('hidden');
                if(!($('[data-use="new"]').hasClass('hidden'))){
                    $('[data-use="new"]').toggleClass('hidden');
                }
                $('[data-use="task"]').toggleClass('hidden');
                $('[data-use="room"]').toggleClass('hidden');
                $('[data-action="disconnect"]').toggleClass('hidden');
                $('[data-use="editProfile"]').toggleClass('hidden');
                $('[data-use="sidebar"]').toggleClass('hidden');
            }
            else
            {
                console.log('erreur');
            }
        });
    });

    //Add New User in Database
    $('[data-action="subscribe"]').on('click', function(){
        let pass = $('[data-use="newPassword"]')[0].value;
        let name = $('[data-use="newName"]')[0].value;
        let email = $('[data-use="newEmail"]')[0].value;
        $.post("http://192.168.33.10:8000/api/signup",{name: name, password: pass, email: email}, function(data){
            if(data.error){
                console.log('erreur');
            }
            else{
                let htmlRenderResult = "<p>Vous pouvez maintenant vous connecter</p>";
                $('[data-use="result"]').html(htmlRenderResult);
            }
        })
    });

    // CONNEXION ---------------------------------------------------------
    $('[data-action="connect"]').on('click', function(event) {
        event.preventDefault(); // On l'empèche de soumettre le formulaire
    });

    //Basic Deconnection - Remove token From localStorage
    $('[data-action="disconnect"]').on('click', function(){
        localStorage.removeItem('token');
        alert("Vous etes deconnecté");
        location.reload();
    });

    // Permet de switcher entre la connexion et l'enregistrement.
    $('.message a').on('click', function(){
        $("form").animate({height: "toggle", opacity:"toggle"}, "slow");
    });
});
