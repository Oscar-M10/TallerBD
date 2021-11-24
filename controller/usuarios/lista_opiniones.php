<?php
require "../../conexion/conexion.php";
/////////////// CONSULTA A LA BD ///////////////////
#$usuarios = "SELECT * FROM usuario";
$opiniones = "SELECT * FROM  opiniones order by id";
$resOpiniones = $conexion->query($opiniones);
$lista_opiniones=[];
while ($registroOpiniones = $resOpiniones->fetch_array(MYSQLI_BOTH)) {
    $lista_opiniones[] = $registroOpiniones;
}
echo json_encode($lista_opiniones);