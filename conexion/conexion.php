<?php
	//////////////// CONEXION A LA BD ////////////////////
	$host="localhost";
	$usuario="itesmeit_itesmei";
	$contrasena="^5zE]hcvfLRc";
	$base="itesmeit_itesme_Medellin";
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
	if(isset($_GET['actualizar'])){
		$id=$_POST['id_usuario'];
		$nick=$_POST['nick'];
		$nombre=$_POST['nombre'];
		$precio=$_POST['correo'];
	
		$sentenciaSQL=$conexion->prepare("UPDATE usuario SET nick=:nick,nombre=:nombre,correo=:correo WHERE id_usuario=:id");
		$sentenciaSQL->bindParam(':nick',$nick);
		$sentenciaSQL->bindParam(':nombre',$nombre);
		$sentenciaSQL->bindParam(':correo',$correo);
		$sentenciaSQL->bindParam(':id_usuario',$id);
		$sentenciaSQL->execute();
	
		echo json_encode(["success"=>1]);
		exit();
	}


?>