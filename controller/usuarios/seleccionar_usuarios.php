<?php
if(isset($_GET["consultar"])){
    $id=$_GET["consultar"];
    $sentenciaSQL=$conexion->prepare("SELECT * FROM usuarios WHERE id=".$id);
    $sentenciaSQL->execute();
    $listaMochilas=$sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($listaMochilas);
    exit();
}
?>