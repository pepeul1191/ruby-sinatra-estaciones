require 'sequel'

Sequel.migration do
  up do
  	Sequel.connect('sqlite://db/db_estaciones.db')
		DB.transaction do
	  	file = File.new('db/data/unidad_medida.txt', 'r')
			while (line = file.gets)
				line_array = line.split('::')
				nombre = line_array[0]
				simbolo = line_array[1].strip
				#puts id + " - " + nombre
				DB[:unidad_medidas].insert(nombre: nombre, simbolo: simbolo)
			end
		end
  end

	down do
		DB = Sequel.connect('sqlite://db/db_estaciones.db')
		DB[:unidad_medidas].delete
	end
end