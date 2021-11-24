<?php
    require "../../conexion/conexion.php";
    
    $temporada = $_POST['id_temporada'];
    $usuario = $_POST['id_usuario'];
    $episodio = $_POST['episodio'];
    $opinion = $_POST['opinion'];
    $r=false;

    try{

        $r =  mysqli_query($conexion, "insert into opiniones (id_temporada, id_usuario, episodio, opinion) 
        values ('$temporada', '$usuario', '$episodio', '$opinion')"); //or die(mysqli_error($conexion)); ///OJO////
    }catch(Exception $e){  }
    header('Content-Type: application/json');
    echo json_encode($r);
    exit;
?>;