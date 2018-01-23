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
