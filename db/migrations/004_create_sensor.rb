Sequel.migration do
	up do
    create_table(:sensores) do
      primary_key :id
      String :nombre, null: false, size: 30
      String :descripcion, null: true, size: 100
    end

    alter_table(:sensores) do
      add_foreign_key :estacion_id, :estaciones
      add_foreign_key :unidad_medida_id, :unidad_medidas
    end
	end

	down do
    drop_column :sensores, :estacion_id
    drop_column :sensores, :unidad_medida_id
		drop_table(:sensores)
	end
end