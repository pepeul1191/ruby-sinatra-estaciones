Sequel.migration do
	up do
    create_table(:unidad_medidas) do
      primary_key :id
      String :nombre, null: false, size: 30
      String :simbolo, null: false, size: 5
    end
	end

	down do
		drop_table(:unidad_medidas)
	end
end