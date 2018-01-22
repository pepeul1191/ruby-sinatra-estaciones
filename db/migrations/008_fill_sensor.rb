require 'sequel'

Sequel.migration do
  up do
  	Sequel.connect('sqlite://db/db_estaciones.db')
		DB.transaction do
	  	file = File.new('db/data/sensor.txt', 'r')
			while (line = file.gets)
				line_array = line.split('::')
				nombre = line_array[0]
				descripcion = line_array[1]
				unidad_medida_id = line_array[2]
				estacion_id = line_array[3].strip
				DB[:sensores].insert(nombre: nombre, descripcion: descripcion, unidad_medida_id: unidad_medida_id, estacion_id: estacion_id)
			end
		end
  end

	down do
		DB = Sequel.connect('sqlite://db/db_estaciones.db')
		DB[:sensores].delete
	end
end