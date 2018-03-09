$(document).ready(function() {
    // Action qui est exécutée quand le formulaire est envoyé ( #connexion est l'ID du formulaire)

    $('#create').on('click', function(event) {
        event.preventDefault(); // On l'empèche de soumettre le formulaire
        const $this = $(this); // l'objet jquery du formulaire

        // Envoi de la requete HTTP en mode asynchrone
        $.ajax({
            url: $this.attr('form'), // recupération de form.js
            type: $this.attr('method'), // récuperation de la méthode POST
            data: $this.serialize(), //on sérialise les données = Envoi des valeurs du formulaire
            datatype: 'json',
            success: function(json){ // si ca s'est passé avec succes
                // test de la réponse ici
                if(json.response === 'ok'){
                    alert('création OK');
                    // On entre dans la todolist
                    window.location.href = '';
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
        });
    });


      jQuery.validator.addMethod("#emailCreate", function(value, element){
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value);
    },
        ' Le mot de passe doit contenir' +
        'Au mois une lettre minuscule' +
        'Au moins une lettre majuscule' +
        'Au moins un chiffre' +
        'Au moins six caractères'
        );

    const email = document.addEventListener("email");

    email.addEventListener("keyUp", function(event){
        if(email){
            error.innerHTML.email="Nous voudrions une adresse email";
            error.innerHTML.name="Nous voudrions un nom";
        }

    });

















});
