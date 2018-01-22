require 'sequel'

Sequel.migration do
  up do
  	Sequel.connect('sqlite://db/db_estaciones.db')
		DB.transaction do
	  	file = File.new('db/data/tipo_estacion.txt', 'r')
			while (line = file.gets)
				line_array = line.split('::')
				nombre = line_array[0].strip
				DB[:tipo_estaciones].insert(nombre: nombre)
			end
		end
  end

	down do
		DB = Sequel.connect('sqlite://db/db_estaciones.db')
		DB[:tipo_estaciones].delete
	end
end