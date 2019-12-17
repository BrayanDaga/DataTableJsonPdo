<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Datos de empleados</title>

  <link href="bootstrap-4.3.1/css/bootstrap.min.css" rel="stylesheet">
  <link href="datatables/datatables.min.css" rel="stylesheet">

  <script src="js/jquery-3.4.1.js"></script>
  <script src="js/popper.min.js"></script>
  <script src="bootstrap-4.3.1/js/bootstrap.min.js"></script>
  <script src="datatables/datatables.min.js"></script>    

</head>
<body>
	<nav class="navbar navbar-light bg-light fixed-top navbar-expand-md">
		<?php include('layout/nav.html');?>
	</nav>
	<div class="container">
	<br>
	<br>
	<br>
			
	<div class="row">
		<h2>Lista de empleados</h2>
	</div>
	
   <button class="btn btn-sm btn-primary" id="BotonAgregar">Agregar empleado</button>
<br>
  <br />

	<div class="table-responsive">

		<table class="table table-striped table-hover" id="tablaEmpleados">
			<thead>
				<tr>
					<th>Código</th>
					<th>Nombre</th>
          <th>Lugar de nacimiento</th>
          <th>Fecha de nacimiento</th>
					<th>Teléfono</th>
					<th>Cargo</th>
					<th>Estado</th>
					<td>Modificar</td>
      		<td>Borrar</td>
				</tr>
			</thead>
		</table>
	</div>			

	</div>

  <?php include_once('layout/modal.html');?>
	<center>
	<p>&copy; Sistemas Web <?php echo date("Y");?></p>
	</center>

    <script src="js/main.js">  </script>
</body>
</html>