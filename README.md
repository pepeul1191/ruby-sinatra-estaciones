# Parical - PP

### Tecnologías

+ Ruby
+ SQLite3
+ MongoLiteDB

### Instalación - Despliegue

 	$ bundler install

### Para arrancar la aplicación:

 	$ puma

Thanks/Credits

    Pepe Valdivia: developer Software Web Perú [http://softweb.pe]

### Descipción

Servicio web desarrollado en Ruby usando el framework Sinatra, con base de datos SQLite3 y MongoLiteDB en la persistencia de datos.

### SERVICIOS

+ (1) POST : usuario/correo_repetido?correo=@correo
+ (2) POST : usuario/usuario_repetido?correo=@usuario
+ (3) POST : cipher/encode?texto=@texto
+ (4) POST : usuario/guardar?data=@json_string[usuario, correo, contrasenia]
+ (5) POST : usuario/validar?usuario=@usuario&contrasenia=@contrasenia
+ (6) GET : departamento/listar
+ (7) POST : departamento/crear?nombre=@nombre
+ (8) POST : departamento/editar?id=@id&nombre=@nombre
+ (9) POST : departamento/eliminar?id=@id
+ (10) GET : provincia/listar/@departamento_id
+ (11) POST : provincia/crear?departamento_id=@departamento_id&nombre=@nombre
+ (12) POST : provincia/editar?id=@id&nombre=@nombre
+ (13) POST : provincia/eliminar?id=@id
+ (14) GET : distrito/listar/@provincia_id
+ (15) POST : distrito/crear?provincia_id=@provincia_id&nombre=@nombre
+ (16) POST : distrito/editar?id=@id&nombre=@nombre
+ (17) POST : distrito/eliminar?id=@id

### PREGUNTAS

1) Si "Acepto los Términos y Condiciones" está checkado, los campos y el botón del Formulario de Registro deberá estar habilitado, caso contrario estarán desabilitados.
2) Cada vez que precione una tecla al escribir el Correo, se deberá llamar al servicio (1), el cuál validará que el correo no se encuentre en uso. En caso que el servicio web diga que el correo ya se encuentra en uso, se deberá mostrar un mensaje en el formulario diciendo que el correo ingresado ya se encuentra en uso. Una vez corregido el error, el mensaje deberá borrarse.
3) Cuando se escriba el Correo Repetir y se salga de ese input[text], se deberá validar que el correo repetido coincida con el Correo. En caso que no coincidan deberá ser mostrado un mensaje en el formulario diciendo que el segundo correo no coincide con el primero. Una vez corregido el error, el mensaje deberá borrarse.
4) Cuando se salga del input[text] de Correo y Correo Repetir, se deberá validar que el texto ingresado sea un correo electrónico válido. En caso que no sean un correo electrónico válido deberá ser mostrado un mensaje en el formulario diciendo que el error ocurrido. Una vez corregido el error, el mensaje deberá borrarse.
5) Cada vez que precione una tecla al escribir el Usuario, se deberá llamar al servicio (2), el cuál validará que el usuario no se encuentre en uso. En caso que el servicio web diga que el usuario ya se encuentra en uso, se deberá mostrar un mensaje en el formulario diciendo que el usuario ingresado ya se encuentra en uso.
6) Cuando se salga del input[text] de Repetir Contraseña, se deberá validar que el texto ingresado coincida con Contraseña. En caso que no coincidan, deberá ser mostrado un mensaje en el formulario diciendo que el error ocurrido. Una vez corregido el error, el mensaje deberá borrarse.
7) Si al apretar el botón Guardar Cambios no se han solucionado los errores de validación de los campos del formulario, no se deberá mandar los datos del formulario al servidor.
8) En caso que los campos del formulario pasen sus respectivas validaciones, antes de ser enviado dichos campos al servidor, la contraseña deberá ser encriptada usando el servicio (3). Una vez que se encripte la contraseña usando dicho servicio, se deberá mandar los campos del formulario al servicio(4), el cuál se encargará de guardar los datos de usuario y devolver un mensaje. Dicho mensaje deberá ser mostrado en el formulario.
9) Una vez registrado el usuario, se deberá ingresar al formulario de login, y al usuario el usuario y contraseña recién creados, se deberá validar dicho usuario y contraseña contra el servicio (5). Si la validación es satisfactoria, se deberá redireccionar a una vista del requerimiento (10), en caso contrario, se deberá mostrar un mensaje indicando que el "Usuario y/o contraseña no coinciden".
10) La vista inicial a cargar luego de que el login sea satisfactorio, deberá cargarse una vista html con la lista de departamentos. Esta lista de departamentos usando el servicio (6)deberá ser editable y con tres botones, uno que nos permita ver las provincias de dicho departamento mediante el servicio (10) en la misma vista; y como cada fila será editable, una vez editado el campo al apretar un segundo botón (también de la fila) permitirá grabar los cambios de dicho departamento usando el servicio (8), y por último, al apretar el tercer botón de la fila, se deberá usar el servicio (9) para eliminarlos de base de datos y además se deberá eliminar el DOM dicho registro. Para confirmar que las operaciones de edición y eliminación han sido realizadas con éxito, se deberá mostrar un mensaje en la pantalla.
11) Al final de la tabla de departamentos deberá haber un botón que permita agrear una fila, la cuál una vez grabada tendra las mismas tres operaciones de cada fila del requerimiento 10. El servicio a usar para crear un nuevo Departamento es (7).
12) Este requerimiento depende de la lista de provincias de cada departamento generada con el primer botón de la fila de departamentos del requerimiento (10). Esta lista de provincias usando el servicio (10) deberá ser editable y con tres botones, uno que nos permita ver los distritos de dicha provincia mediante el servicio (14) en la misma vista; y como cada fila será editable, una vez editado el campo al apretar un segundo botón (también de la fila) permitirá grabar los cambios de dicha provincia usando el servicio (12), y por último, al apretar el tercer botón de la fila, se deberá usar el servicio (13) para eliminarlos de base de datos y además se deberá eliminar el DOM dicho registro. Para confirmar que las operaciones de edición y eliminación han sido realizadas con éxito, se deberá mostrar un mensaje en la pantalla.
13) Al final de la tabla de provincias deberá haber un botón que permita agrear una fila, la cuál una vez grabada tendra las mismas tres operaciones de cada fila del requerimiento (12). El servicio a usar para crear una nueva provincia es (11). Cabe resaltar que dicha provincia creada deberá tener relacionado el departamento al que pertenece.
14) Este requerimiento depende de la lista de distritos de cada provincia generada con el primer botón de la fila de provincias del requerimiento (12). Esta lista de distritos usando el servicio (14) deberá ser editable y con dos botones, uno  para que cada vez editado el campo al apretar permitirá grabar los cambios de dicho distrito usando el servicio (16), y por último, al apretar el segundo botón de la fila, se deberá usar el servicio (17) para eliminarlos de base de datos y además se deberá eliminar el DOM dicho registro. Para confirmar que las operaciones de edición y eliminación han sido realizadas con éxito, se deberá mostrar un mensaje en la pantalla.
15) Al final de la tabla de distritos deberá haber un botón que permita agrear una fila, la cuál una vez grabada tendra las mismas dos operaciones de cada fila del requerimiento (14). El servicio a usar para crear una nuevo distrito es (15). Cabe resaltar que dicho departamento creado deberá tener relacionado la provincia al que pertenece.

http://ulima-parcial.000webhostapp.com/ -> 7GEv)8M!J$b5^SJRgjZe

---

#### Fuentes

+ https://github.com/Wixel/Frank-Sinatra
+ https://github.com/jeremyevans/sequel
+ http://sequel.jeremyevans.net/rdoc/files/doc/dataset_filtering_rdoc.html
+ http://sequel.jeremyevans.net/rdoc/files/doc/cheat_sheet_rdoc.html
+ https://github.com/hamiltop/MongoLiteDB
