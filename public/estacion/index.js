function helperSelectTipoEstacion(tipo_estaciones, tipo_estacion_id){
  var rpta = "<select>";
  for(var i = 0; i < tipo_estaciones.length; i++){
    if(tipo_estaciones[i]["id"] == tipo_estacion_id){
      rpta = rpta + '<option value="' + tipo_estaciones[i]['id'] + '" selected="selected">' + tipo_estaciones[i]['nombre'] + '</option>';
    }else{
      rpta = rpta + '<option value="' + tipo_estaciones[i]['id'] + '">' + tipo_estaciones[i]['nombre'] + '</option>';
    }
  }
  rpta = rpta + "</select>";
  return rpta;
}

function getTipoEstacion(){
  var rpta = [];
  $.ajax({
   url: BASE_URL + 'tipo_estacion/listar',
   type: "GET",
   async: false,
   success: function(data) {
      rpta = JSON.parse(data);
    }
  });
  return rpta;
}

$(document).ready(function() {
  $.ajax({
   url: BASE_URL + 'estacion/listar',
   type: "GET",
   async: false,
   success: function(data) {
   		var estaciones = JSON.parse(data);
      var tipo_estaciones = getTipoEstacion();
   		var rpta =  '<thead><tr><th class="oculto">id</th><th>Nombre</th><th>Descripción</th><th>Latitud</th><th>Longitud</th><th>Altura</th><th>Tipo Estación</th><th>Operaciones</th></tr></thead>';
   		rpta = rpta + '<tbody>';
   		for (var i = 0; i < estaciones.length; i++) {
		  	rpta = rpta + '<tr>';
		  	var operaciones = '<td><i class="fa fa-map-marker" aria-hidden="true" operacion="mostrarMapa"></i><i class="fa fa-pencil" aria-hidden="true" operacion="editarEstacion"></i><i class="fa fa-times" aria-hidden="true" operacion="eliminarEstacion"></i></td>';
		  	rpta = rpta +
          '<td class="oculto">' + estaciones[i]['id'] + '</td>' +
          '<td>' + '<input type="text" value="'+ estaciones[i]['nombre'] + '">' +'</td>' +
          '<td>' + '<input type="text" value="'+ estaciones[i]['descripcion'] + '">' +'</td>' +
          '<td>' + '<input type="text" value="'+ estaciones[i]['latitud'] + '">' +'</td>' +
          '<td>' + '<input type="text" value="'+ estaciones[i]['longitud'] + '">' +'</td>' +
          '<td>' + '<input type="text" value="'+ estaciones[i]['altura'] + '">' +'</td>' +
          '<td>' + helperSelectTipoEstacion(tipo_estaciones, estaciones[i]['tipo_estacion_id']) + '</td>' + operaciones;
		  	rpta = rpta + '</tr>';
  		}
  		rpta = rpta + '</tbody>';
  		rpta = rpta + '<tfoot><tr><td  colspan="3"><button class="btn btn-primary" id="btnAgregarEstacion"><i class="fa fa-plus" aria-hidden="true"></i>Agregar Estacion</button></tr></td></tfoot>';
   		$('#tablaEstaciones').append(rpta);
    }
  });
});

$(document).on('click', '#btnAgregarEstacion', function(event) {
	var id_boton = $(event.currentTarget).attr('id');
  var tipo_estaciones = getTipoEstacion();
  var fila = '<tr><td class="oculto">E</td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td><td>' + helperSelectTipoEstacion(tipo_estaciones, 99999) + '</td><td><i class="fa fa-plus" aria-hidden="true" operacion="crearEstacion"></i><i class="fa fa-times" aria-hidden="true" operacion="eliminarEstacion"></i></td></tr>';
  $('#tablaEstaciones tbody').append(fila);
});

$(document).on('click', '.fa', function(event) {
  var operacion = $(event.currentTarget).attr('operacion');
  switch(operacion) {
    //Inicio tabla departamento
    case 'cargarProvincia':
      var departamentoId = $(event.currentTarget).parent().parent().children().eq(0).html();
      cargarProvincia(departamentoId);
      break;
    case 'crearDepartamento':
      var departamentoNombre = $(event.currentTarget).parent().parent().children().eq(1).children().val();
      var fila = $(event.currentTarget).parent().parent();
      crearDepartamento(departamentoNombre, fila);
      break;
    case 'eliminarEstacion':
      var estacionId = $(event.currentTarget).parent().parent().children().eq(0).html();
      var fila = $(event.currentTarget).parent().parent();
      eliminarEstacion(estacionId, fila);
    break;
    /*
		case 'editarDepartamento':
			var departamentoId = $(event.currentTarget).parent().parent().children().eq(0).html();
	    	var departamentoNombre = $(event.currentTarget).parent().parent().children().eq(1).children().val();
	    	editarDepartamento(departamentoId, departamentoNombre);
			break;
		//Inicio tabla provincia
		case 'crearProvincia':
			var provinciaNombre = $(event.currentTarget).parent().parent().children().eq(1).children().val();
	   		var fila = $(event.currentTarget).parent().parent();
	   		var departamentoId = $('#departamentoId').html();
	   		crearProvincia(provinciaNombre, departamentoId, fila);
			break;
		case 'eliminarProvincia':
			var provinciaId = $(event.currentTarget).parent().parent().children().eq(0).html();
	    	var fila = $(event.currentTarget).parent().parent();
	    	eliminarProvincia(provinciaId, fila);
			break;
		case 'editarProvincia':
			var provinciaId = $(event.currentTarget).parent().parent().children().eq(0).html();
	    	var provinciaNombre = $(event.currentTarget).parent().parent().children().eq(1).children().val();
	    	editarProvincia(provinciaId, provinciaNombre);
			break;
		case 'cargarDistrito':
	   		var distritoId = $(event.currentTarget).parent().parent().children().eq(0).html();
	   		cargarDistrito(distritoId);
			break;
		//Inicio tabla distrito
		case 'crearDistrito':
			var distritoNombre = $(event.currentTarget).parent().parent().children().eq(1).children().val();
	   		var fila = $(event.currentTarget).parent().parent();
	   		var provinciaId = $('#provincaiId').html();
	   		crearDistrito(distritoNombre, provinciaId, fila);
			break;
		case 'eliminarDistrito':
			var distritoId = $(event.currentTarget).parent().parent().children().eq(0).html();
	    	var fila = $(event.currentTarget).parent().parent();
	    	eliminarDistrito(distritoId, fila);
			break;
		case 'editarDistrito':
			var distritoId = $(event.currentTarget).parent().parent().children().eq(0).html();
	    	var distritoNombre = $(event.currentTarget).parent().parent().children().eq(1).children().val();
	    	editarDistrito(distritoId, distritoNombre);
			break;
		//Inicio nuevo
		case 'eliminarFila':
			var fila = $(event.currentTarget).parent().parent();
	    	fila.remove();
			break;
    */
  default:
    alert('Operacion ' + operacion + ' no implementada');
  }
});

function eliminarEstacion(estacionId, fila){
  if (estacionId == 'E'){
    fila.remove();
  }else{
    var estacion = new Object();
    estacion.id = estacionId;
    $.ajax({
      url: BASE_URL + 'estacion/eliminar',
      type: "POST",
      async: false,
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      data : JSON.stringify(estacion),
      success: function(data) {
        var rpta = data;
        $('#mensaje').html(rpta['mensaje']);
        if(rpta['tipo_mensaje']=='error'){
          $('#mensaje').removeClass('success');
          $('#mensaje').addClass('error');
        }else{
          $('#mensaje').removeClass('error');
          $('#mensaje').addClass('success');
        }
        fila.remove();
      }
    });
  }
}
