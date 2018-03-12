function validateForm(){
  const identifiant = document.forms["nom"].value && document.forms["mdp"].value;
  if(identifiant == ""){
    alert("L'identifiant ou le mot de passe doit être rempli");
    console.log('marche pas');
    return false;
  }
}
