<?php

try {
   $host = 'localhost';
   $login = 'root';
   $password = '';
   $database = '';
   $options = array(
       PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
       PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC

   );


   $bdd = new PDO("mysql:host=$host;dbname=$database", $login, $password, $options);


   $information_profil = $bdd->prepare('SELECT name, email, password FROM table_users WHERE email = ?');
   $information_profil->execute(array($_COOKIE['email']));


    while ($donnees = $information_profil->fetch())
    {
$name = htmlspecialchars($donnees['name']);
$email = htmlspecialchars($donnees['email']);
$password = htmlspecialchars($donnees['password']);
    }

    $information_profil->closeCursor();
}

catch(Exception $e)
{
    die('Erreur : '.$e->getMessage());
}


 if(isset($_COOKIE['email'])) {
 ?>
  <p> name :    <input type='text' value='<?php echo htmlspecialchars($name); ?>' />
  <p> email :  <input type='text' name='email' value='<?php echo htmlspecialchars($email); ?>' />
  <p> password : <input type='text' name='password'value='<?php echo htmlspecialchars($password); ?>' />


 <?php
 }
 else {

 echo 'problem !  ';

 }

 ?>
