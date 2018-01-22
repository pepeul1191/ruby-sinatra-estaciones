Sequel.migration do
	up do
    create_table(:estaciones) do
      primary_key :id
      String :nombre, null: false, size: 30
      String :descripcion, null: true, size: 100
      Float :latitud, null: false
      Float :longitud, null: false
      Float :altura, null: false
      Integer :campo_id, null: true
    end

    alter_table(:estaciones) do
      add_foreign_key :tipo_estacion_id, :tipo_estaciones
    end
	end

	down do
    drop_column :estaciones, :estacion_id
		drop_table(:estaciones)
	end
end