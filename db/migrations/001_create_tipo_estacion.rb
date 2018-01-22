Sequel.migration do
	up do
    create_table(:tipo_estaciones) do
      primary_key :id
      String :nombre, null: false, size: 30
    end
	end

	down do
		drop_table(:tipo_estaciones)
	end
end