<?php
    require "../../conexion/conexion.php";
    
    $id = $_POST['id'];
    $r=false;

    try{
        $r =  mysqli_query($conexion, "UPDATE FROM `usuario` SET visible='0'  WHERE  `id_usuario`='{$id}';");// or die(mysqli_error($conexion)); ///OJO////
    }catch(Exception $e){  }
    header('Content-Type: application/json');
    echo json_encode($r);
    exit;
?>;