<?php
require "../../conexion/conexion.php";
/////////////// CONSULTA A LA BD ///////////////////
#$usuarios = "SELECT * FROM usuario";
$usuarios = "SELECT * FROM  usuario order by id_usuario";
$resUsuarios = $conexion->query($usuarios);
$lista_usuarios=[];
while ($registroUsuarios = $resUsuarios->fetch_array(MYSQLI_BOTH)) {
    $lista_usuarios[] = $registroUsuarios;
}
echo json_encode($lista_usuarios);