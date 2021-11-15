<?php

require "../../conexion/conexion.php";

    
    $id = $_POST['id'];
if(isset($_GET["consultar"])){
    $id=$_GET["consultar"];
    $usuarios = "SELECT * FROM  usuario where id_usuario='$id'";
    $resUsuarios = $conexion->query($usuarios);
    $lista_usuarios=[];
    while ($registroUsuarios = $resUsuarios->fetch_array(MYSQLI_BOTH)) {
        $lista_usuarios[] = $registroUsuarios;
    }
    echo json_encode($lista_usuarios);
}
?>