<?php
    require "../../conexion/conexion.php";
    
    $nic = $_POST['nick'];
    $nom = $_POST['nombre'];
    $corr = $_POST['correo'];
    $r=false;

    try{

        $r =  mysqli_query($conexion, "insert into usuario (nick, nombre, correo) 
        values ('$nic', '$nom', '$corr')");// or die(mysqli_error($conexion)); ///OJO////
    }catch(Exception $e){  }
    header('Content-Type: application/json');
    echo json_encode($r);
    exit;
?>;