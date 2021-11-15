<?php
	//////////////// CONEXION A LA BD ////////////////////
	$host="localhost";
	$usuario="root";
	$contrasena="admin123";
	$base="datos";
	$conexion=new mysqli($host,$usuario,$contrasena,$base);
	if($conexion -> connect_errno)
	{
		die("Fallo la conexion:(".$conexion -> mysqli_connect_errno().")".$conexion->mysqli_connect_error());
	}
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