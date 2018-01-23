# Parical - PP

### Tecnologías

+ Ruby
+ SQLite3
+ MongoLiteDB

### Instalación - Despliegue

 	$ bundler install && bower install

### Para arrancar la aplicación:

 	$ puma

Thanks/Credits

    Pepe Valdivia: developer Software Web Perú [http://softweb.pe]

### Descipción

Servicio web desarrollado en Ruby usando el framework Sinatra, con base de datos SQLite3 y MongoLiteDB en la persistencia de datos.

### Migraciones

Ejecutar migración

  $ sequel -m path/to/migrations postgres://host/database
  $ sequel -m path/to/migrations sqlite://db/estaciones.db

Ejecutar el 'down' de las migraciones de la última a la primera:

  $ sequel -m db/migrations -M 0 sqlite://db/estaciones.db

Ejecutar el 'up' de las migraciones hasta un versión especifica:

  $ sequel -m db/migrations -M #version sqlite://db/estaciones.db

Tipos de Datos de Columnas

+ :string=>String
+ :integer=>Integer
+ :date=>Date
+ :datetime=>[Time, DateTime].freeze,
+ :time=>Sequel::SQLTime,
+ :boolean=>[TrueClass, FalseClass].freeze,
+ :float=>Float
+ :decimal=>BigDecimal
+ :blob=>Sequel::SQL::Blob

### Rutas

+ (1) GET : tipo_estacion/listar
+ (2) POST : tipo_estacion/crear
+ (3) POST : tipo_estacion/editar
+ (4) POST : tipo_estacion/eliminar
+ (5) GET : estacion/listar
+ (6) POST : estacion/crear
+ (7) POST : estacion/editar
+ (8) POST : estacion/eliminar

### Preguntas

Hacer vistas HTML para dar mantenimiento a las tablas 'estaciones' y 'tipo_estaciones', para lo cuál se debe seguir las siguientes operaciones:

+ Mostrar tipos de estaciones (servicio 1).
+ Crear tipos de  estaciónes (servicio 2).
+ Editar tipos de  estaciónes (servicio 3).
+ Eliminar tipos de  estaciónes (servicio 4).
+ Mostrar estaciones con su respectivo nombre de tipo de estación(servicio 5).
+ Crear estaciónes asociando su tipo de estación(servicio 6).
+ Editar estaciónes asociando su tipo de estación(servicio 7).
+ Eliminar estaciónes (servicio 8).
+ Mostrar con una marca en un mapa la ubicación de la estación usando su latitud y longitud.

---

#### Fuentes

+ https://github.com/Wixel/Frank-Sinatra
+ https://github.com/jeremyevans/sequel
+ http://sequel.jeremyevans.net/rdoc/files/doc/dataset_filtering_rdoc.html
+ http://sequel.jeremyevans.net/rdoc/files/doc/cheat_sheet_rdoc.html
+ https://github.com/hamiltop/MongoLiteDB
