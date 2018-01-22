$(document).ready(function() {
    $.ajax({
	   url: BASE_URL + 'estacion/listar',
	   type: "GET",
	   async: false,
	   success: function(data) {
	   		var estaciones = JSON.parse(data);
	   		var rpta =  '<thead><tr><th class="oculto">id</th><th>Nombre</th><th>Descripción</th><th>Latitud</th><th>Longitud</th><th>Altura</th><th>Tipo Estación</th><th>Operaciones</th></tr></thead>';
	   		rpta = rpta + '<tbody>';
	   		for (var i = 0; i < estaciones.length; i++) {
			  	rpta = rpta + '<tr>';
			  	var operaciones = '<td><i class="fa fa-search" aria-hidden="true" operacion="cargarProvincia"></i><i class="fa fa-pencil" aria-hidden="true" operacion="editarDepartamento"></i><i class="fa fa-times" aria-hidden="true" operacion="eliminarDepartamento"></i></td>';
			  	rpta = rpta +
            '<td class="oculto">' + estaciones[i]['id'] + '</td>' +
            '<td>' + '<input type="text" value="'+ estaciones[i]['nombre'] + '">' +'</td>' +
            '<td>' + '<input type="text" value="'+ estaciones[i]['descripcion'] + '">' +'</td>' +
            '<td>' + '<input type="text" value="'+ estaciones[i]['latitud'] + '">' +'</td>' +
            '<td>' + '<input type="text" value="'+ estaciones[i]['longitud'] + '">' +'</td>' +
            '<td>' + '<input type="text" value="'+ estaciones[i]['altura'] + '">' +'</td>' +
            '<td>' + '<input type="text" value="'+ estaciones[i]['tipo_estacion_id'] + '">' +'</td>' +
            + operaciones;
			  	rpta = rpta + '</tr>';
			}
			rpta = rpta + '</tbody>';
			rpta = rpta + '<tfoot><tr><td  colspan="3"><button class="btn btn-primary" id="btnAgregarDepartamento"><i class="fa fa-plus" aria-hidden="true"></i>Agregar Departamento</button></tr></td></tfoot>';

   		$('#tablaEstaciones').append(rpta);
	  }
	});
});
