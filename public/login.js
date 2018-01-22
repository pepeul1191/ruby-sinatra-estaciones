const BASE_URL = 'http://45.55.64.102/parcial/';

$( "#linkModal" ).on( "click", function() {
    $('#btnModal').click();
});

var formularioValido = false;

$(document).ready(function() {
	var chkTerminosCondiciones = $('#chkTerminosCondiciones');
	var txtCorreo = $('#txtCorreo');
	var txtCorreoRepetido = $('#txtCorreoRepetido');
	var txtUsuario = $('#txtUsuario');
	var txtContrasenia = $('#txtContrasenia');
	var txtContraseniaRepetir = $('#txtContraseniaRepetir');
	var btnGuardar = $('#btnGuardar');

	$('#chkTerminosCondiciones').change(function() {
       if($(this).is(":checked")) {
       	//alert("si");
			txtCorreo.prop("disabled", false);
			txtCorreoRepetido.prop("disabled", false);
			txtUsuario.prop("disabled", false);
			txtContrasenia.prop("disabled", false);
			txtContraseniaRepetir.prop("disabled", false);
			btnGuardar.prop("disabled", false);
       }else{
       	//alert("no");
       	txtCorreo.prop("disabled", true);
			txtCorreoRepetido.prop("disabled", true);
			txtUsuario.prop("disabled", true);
			txtContrasenia.prop("disabled", true);
			txtContraseniaRepetir.prop("disabled", true);
			btnGuardar.prop("disabled", true);
       }
    });
});

$('#txtCorreo').on('keyup', function(event) {
	var correo_texto = $(event.currentTarget).val();
	var correo = { correo: correo_texto };
	$.ajax({
	   url: BASE_URL + 'usuario/correo_repetido', 
	   type: "POST", 
	   async: false, 
	   contentType: 'application/json; charset=utf-8',
    	dataType: 'json',
	   data : JSON.stringify(correo), 
	   success: function(data) {
	   		if(data['mensaje'][0] == 1){
	   			$('#mensajeCorreo').html('Correo ingresado ya se encuentra en uso');
	   			$('#mensajeCorreo').removeClass('oculto');
	   			formularioValido = false;
	   		}else{
	   			$('#mensajeCorreo').html('');
	   			$('#mensajeCorreo').addClass('oculto');
	   			formularioValido = true;
	   		}
	   }
	});
});

$('#txtCorreo').on('focusout', function(event) {
	var correo = $(event.currentTarget).val();
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var rpta = re.test(correo);

	if(rpta == false){
		$('#mensajeCorreo').html('Correo ingresado no es de un formato válido');
		$('#mensajeCorreo').removeClass('oculto');
		formularioValido = false;
	}else{
		$('#mensajeCorreo').html('');
		$('#mensajeCorreo').addClass('oculto');
		formularioValido = true;
	}
});

$('#txtCorreoRepetido').on('focusout', function(event) {;
	var correo = $(txtCorreo).val();
	var correo_repetido = $(txtCorreoRepetido).val();
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var rpta = re.test(correo_repetido);

	if(rpta == false){
		$('#mensajeCorreoRepetido').html('Correo ingresado no es de un formato válido');
		$('#mensajeCorreoRepetido').removeClass('oculto');
		formularioValido = false;
	}else{
		if(correo != correo_repetido){
			$('#mensajeCorreoRepetido').html('El correo ingresado no coincide con el primero');
			$('#mensajeCorreoRepetido').removeClass('oculto');
			formularioValido = false;
		}else{
			$('#mensajeCorreoRepetido').html('');
			$('#mensajeCorreoRepetido').addClass('oculto');
			formularioValido = true;
		}
	}
});

$('#txtUsuario').on('keyup', function(event) {
	var usuario_texto = $(event.currentTarget).val();
	var usuario = { usuario: usuario_texto };
	
	$.ajax({
	   url: BASE_URL + 'usuario/usuario_repetido', 
	   type: "POST", 
	   async: false, 
	   contentType: 'application/json; charset=utf-8',
    	dataType: 'json',
	   data : JSON.stringify(usuario), 
	   success: function(rpta) {
	   		if(rpta['mensaje'][0] == 1){
	   			$('#mensajeUsuario').html('Usuario ingresado ya se encuentra en uso');
	   			$('#mensajeUsuario').removeClass('oculto');
	   			formularioValido = false;
	   		}else{
	   			$('#mensajeUsuario').html('');
	   			$('#mensajeUsuario').addClass('oculto');
	   			formularioValido = true;
	   		}
	   }
	});
});

$('#txtContraseniaRepetir').on('focusout', function(event) {;
	var contrasenia = $(txtContrasenia).val();
	var contrasenia_repetido = $(txtContraseniaRepetir).val();

	if(contrasenia != contrasenia_repetido){
		$('#mensajeContraseniaRepetir').html('La contraseña ingresada no coincide con la primera');
		$('#mensajeContraseniaRepetir').removeClass('oculto');
		formularioValido = false;
	}else{
		$('#mensajeContraseniaRepetir').html('');
		$('#mensajeContraseniaRepetir').addClass('oculto');
		formularioValido = true;
	}
});

$('#btnGuardar').on('click', function(event) {
	if(formularioValido == false){
		$('#mensajeFormulario').html('No puede continuar hasta que solucione las validaciones del formulario');
		$('#mensajeFormulario').removeClass('oculto');
	}else{
		$('#mensajeFormulario').html('');
		$('#mensajeFormulario').addClass('oculto');
		
		var usuario = new Object();
		usuario.usuario = $(txtUsuario).val();
		usuario.correo = $(txtCorreo).val();
		usuario.contrasenia = encriptar($(txtContrasenia).val());

		$.ajax({
		   url: BASE_URL + 'usuario/guardar', 
		   type: "POST", 
		   //data: 'data=' + JSON.stringify(usuario), 
		   async: false, 
		   contentType: 'application/json; charset=utf-8',
	    	dataType: 'json',
		   data : JSON.stringify(usuario), 
		   success: function(data) {
		   		var rpta = data;

		   		if(rpta['tipo_mensaje']=='error'){
		   			$('#mensajeFormulario').removeClass('success');
		   			$('#mensajeFormulario').removeClass('oculto');
		   			$('#mensajeFormulario').html('Ha ocurrido un error en guardar el formulario');
		   			$('#mensajeFormulario').addClass('error');
		   		}else{
		   			$('#mensajeFormulario').removeClass('oculto');
		   			$('#mensajeFormulario').html('Usuario registrado');
		   			$('#mensajeFormulario').removeClass('error');
		   			$('#mensajeFormulario').addClass('success');
		   		}	
		   }
		});
	}
});

function encriptar(dato){
	console.log(dato);
	var rpta = null;
	var data = new Object();
	data.texto = dato;

	$.ajax({
	    url: BASE_URL + 'cipher/encode', 
	    type: "POST", 
	    async: false, 
	    contentType: 'application/json; charset=utf-8',
	    dataType: 'json',
		data : JSON.stringify(data), 
	    success: function(data_encode) {
	   		rpta = data_encode['mensaje'][0];
	   }
	});
	
	return rpta;
}

$('#btnIngresar').on('click', function(event) {
	var usuario = new Object();
	usuario.usuario = $(txtLoginUsuario).val();
	usuario.contrasenia = encriptar($(txtLoginContrasenia).val());

	$.ajax({
	   url: BASE_URL + 'usuario/validar', 
	   type: "POST", 
	   //data: 'data=' + JSON.stringify(usuario), 
	   async: false, 
	   contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		data : JSON.stringify(usuario), 
	   success: function(rpta) {
	   		if(rpta['tipo_mensaje']=='error'){
	   			$('#mensajeLogin').removeClass('success');
	   			$('#mensajeLogin').removeClass('oculto');
	   			$('#mensajeLogin').html('Ha ocurrido un error en guardar el formulario');
	   			$('#mensajeLogin').addClass('error');
	   		}else{
	   			if(rpta['mensaje'][0] == 0){
	   				$('#mensajeLogin').removeClass('success');
		   			$('#mensajeLogin').removeClass('oculto');
		   			$('#mensajeLogin').html('Usuario y/o contraseña no coinciden');
		   			$('#mensajeLogin').addClass('error');
	   			}else{
		   			$('#mensajeLogin').removeClass('oculto');
		   			$('#mensajeLogin').html('Login OK');
		   			$('#mensajeLogin').removeClass('error');
		   			$('#mensajeLogin').addClass('success');
		   			console.log(BASE_URL + 'home');
	   			}
	   		}	
	   }
	});
	console.log(1);
	window.location.assign(BASE_URL + 'home');
	console.log(2);
});
