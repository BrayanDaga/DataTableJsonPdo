<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

include_once 'empleados.php';

if(isset($_GET['accion'])){
    $accion = $_GET['accion'];

    if($accion == ''){
        echo json_encode(['statuscode'=>400, 'response' => 'No existe accion']);
    }else{
/************************************************************************************************************************/
    	 $empleados = new Empleados();
		
		switch ($accion) {
		    
		    case 'listar':
				$items=$empleados->getEmpleadosAll();
				echo json_encode(['statuscode'=>200,'items'=>$items]);
    		 break;

			case 'borrar':
				$respuesta=$empleados->delete($_GET['codigo']);
				echo json_encode($respuesta);
			break;

			case 'agregar':
				$respuesta = $empleados->insert(
					[
					'codigo' 			=> $_POST["codigo"],
					'nombres' 			=> $_POST["nombres"],
					'lugar_nacimiento'  => $_POST["lugar_nacimiento"],
					'fecha_nacimiento'  => $_POST["fecha_nacimiento"],
					'direccion'			=> $_POST["direccion"],
					'telefono'          => $_POST["telefono"],
					'puesto'            => $_POST["puesto"],
					'estado'            => $_POST["estado"]
					]
				);
				echo json_encode($respuesta);
			break;

			case 'consultar':
				$resultado = $empleados->getById($_GET['codigo']);
				echo json_encode([$resultado]);
			break;
		
			case 'modificar':
				$respuesta = $empleados->update(
					[
					'codigo' 			=> $_GET["codigo"],
					'nombres' 			=> $_POST["nombres"],
					'lugar_nacimiento'  => $_POST["lugar_nacimiento"],
					'fecha_nacimiento'  => $_POST["fecha_nacimiento"],
					'direccion'			=> $_POST["direccion"],
					'telefono'          => $_POST["telefono"],
					'puesto'            => $_POST["puesto"],
					'estado'            => $_POST["estado"]
					]
				);
				echo json_encode($respuesta);
			break;
			 
			
  		
  		}
/*********************************************************************************************************************/
    }
}else{
    echo json_encode(['statuscode'=>400, 'response' => 'No existe accion']);
}


?>