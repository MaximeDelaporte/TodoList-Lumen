$(document).ready(function() {
    // Action qui est executee quand le formulaire est envoye ( #connexion est l'ID du formulaire)

    $('#create').on('click', function(event) {
        event.preventDefault(); // On l'empeche de soumettre le formulaire
        /*const $this = $(this); // l'objet jquery du formulaire

        // Envoi de la requete HTTP en mode asynchrone
        $.ajax({
            url: $this.attr('form'), // recuperation de form.js
            type: $this.attr('method'), // recuperation de la méthode POST
            data: $this.serialize(), //on serialise les donnees = Envoi des valeurs du formulaire
            datatype: 'json',
            success: function(json){ // si ca s'est passe avec succes
                // test de la reponse ici
                if(json.response === 'ok'){
                    alert('creation OK');
                    // On entre dans la todolist
                    window.location.href = '#';
                }
                $("#createForm").validate({
                    rules:{
                        name : {
                            required : true
                        },
                        mdp : {
                            required : true,
                            email : true
                        }
                    },
                    messages : {
                        name : "Veuillez fournir un nom",
                        email : "L'email est incorrect"
                    },
                    submitHandler:  function(form) {
                        form.submit();
                    }
                });
            }
        });*/
    });

/*
      jQuery.validator.addMethod("#emailCreate", function(value, element){
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value);
    },
        ' Le mot de passe doit contenir' +
        'Au mois une lettre minuscule' +
        'Au moins une lettre majuscule' +
        'Au moins un chiffre' +
        'Au moins six caracteres'
        );
*/
});
