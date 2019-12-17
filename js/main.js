document.addEventListener("DOMContentLoaded", function() {
        
    let tabla1 = $("#tablaEmpleados").DataTable({
      "ajax": {
        url: "/api/empleados/api-empleados.php?accion=listar",
        dataSrc: "items"
      },
      "columns": [{
          "data": "codigo"
        },
        {
          "data": "nombres"
        },
        {
          "data": "lugar_nacimiento"
        },
        {
          "data": "fecha_nacimiento"
        },
        {
          "data": "telefono"
        },
        {
          "data": "puesto"
        },
        {
          "data": "estado"
        },
        {
          "data": null,
          "orderable": false
        },
        {
          "data": null,
          "orderable": false
        }
      ],
      "columnDefs": [{
        targets: 7,
        "defaultContent": "<button class='btn btn-sm btn-warning botonmodificar'>Modifica?</button>",
        data: null
      }, {
        targets: 8,
        "defaultContent": "<button class='btn btn-sm btn-danger botonborrar'>Borra?</button>",
        data: null
      }],
      "language": {
        "url": "DataTables/spanish.json",
      },
    });

    
$('#BotonAgregar').click(function() {
  $('#ConfirmarAgregar').show();
  $('#ConfirmarModificar').hide();
  limpiarFormulario();
  $("#FormularioEmpleado").modal('show');
});

$('#ConfirmarAgregar').click(function() {
  $("#FormularioEmpleado").modal('hide');
  let registro = recuperarDatosFormulario();
  agregarRegistro(registro);
});

$('#ConfirmarModificar').click(function() {
  $("#FormularioEmpleado").modal('hide');
  let registro = recuperarDatosFormulario();
  modificarRegistro(registro);
});

$('#tablaEmpleados tbody').on('click', 'button.botonmodificar', function() {
  $('#ConfirmarAgregar').hide();
  $('#ConfirmarModificar').show();
  $('#codigo').prop("disabled", true);
  let registro = tabla1.row($(this).parents('tr')).data();
  recuperarRegistro(registro.codigo);
});

$('#tablaEmpleados tbody').on('click', 'button.botonborrar', function() {
  if (confirm("¿Realmente quiere borrar el artículo?")) {
    let registro = tabla1.row($(this).parents('tr')).data();
    borrarRegistro(registro.codigo);
  }
});

// funciones que interactuan con el formulario de entrada de datos
function limpiarFormulario() {
  $('#codigo').val('');
  $('#codigo').prop("disabled", false);
  $('#nombres').val('');
  $('#lugar_nacimiento').val('');
  $('#fecha_nacimiento').val('');
  $('#direccion').val('');
  $('#telefono').val('');
  $('#puesto').val('');
  $("#estado").val($("#estado option:first").val()); 

}

function recuperarDatosFormulario() {
  let registro = {
    codigo: $('#codigo').val(),
    nombres: $('#nombres').val(),
    lugar_nacimiento: $('#lugar_nacimiento').val(),
    fecha_nacimiento: $('#fecha_nacimiento').val(),
    direccion:$('#direccion').val(),
    telefono: $('#telefono').val(),
    puesto: $('#puesto').val(),
    estado: $("#estado option:selected").val()

  };
  return registro;
}


// funciones para comunicarse con el servidor via ajax
function agregarRegistro(registro) {
  $.ajax({
    type: 'POST',
    url: '/api/empleados/api-empleados.php?accion=agregar',
    data: registro,
    success: function(msg) {
      tabla1.ajax.reload();
    },
    error: function() {
      alert("Hay un problema");
    }
  });
}

function borrarRegistro(codigo) {
  $.ajax({
    type: 'GET',
    url: '/api/empleados/api-empleados.php?accion=borrar&codigo=' + codigo,
    data: '',
    success: function(msg) {
      tabla1.ajax.reload();
    },
    error: function() {
      alert("Hay un problema");
    }
  });
}


function recuperarRegistro(codigo) {
  $.ajax({
    type: 'GET',
    url: '/api/empleados/api-empleados.php?accion=consultar&codigo=' + codigo,
    data: '',
    success: function(datos) {
      $('#codigo').val(datos[0].codigo);
      $('#nombres').val(datos[0].nombres);
      $('#lugar_nacimiento').val(datos[0].lugar_nacimiento);
      $('#fecha_nacimiento').val(datos[0].fecha_nacimiento);
      $('#direccion').val(datos[0].direccion);
      $('#telefono').val(datos[0].telefono);
      $('#puesto').val(datos[0].puesto);
      $("#estado option[value="+ datos[0].estado +"]").attr("selected",true);

      //$("#estado").val($("#estado option:first").val());
      
      $("#FormularioEmpleado").modal('show');
    },
    error: function() {
      alert("Hay un problema");
    }
  });
}

function modificarRegistro(registro) {
  $.ajax({
    type: 'POST',
    url: '/api/empleados/api-empleados.php?accion=modificar&codigo=' + registro.codigo,
    data: registro,
    success: function(msg) {
      tabla1.ajax.reload();
    },
    error: function() {
      alert("Hay un problema");
    }
  });
}

  });
