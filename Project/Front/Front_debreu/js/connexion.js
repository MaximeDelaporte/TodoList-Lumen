// CONNEXION / LOGIN



function validateForm(){
  const identifiant = document.forms["email"].value && document.forms["mdp"].value;
  if(identifiant === ""){
    alert("L'identifiant ou le mot de passe doit être rempli");
    return false;
  }

}

// CONNEXION ---------------------------------------------------------
$('#connexion').on('click', function(event) {
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
                window.location.href = 'yolo/template.html';
            }
        }
    });
});



$("#connectForm").validate({
    rules:{
        mdp : {
            // required : true,
            // email : true
        }
    },
    messages : {
        // mdp : "<p style='color:red;'>Veuillez fournir un mot de passe</p><br>",
        // email : "L'email est incorrect<br>"
    },
    submitHandler:  function(form) {
        form.submit();
    }
});
