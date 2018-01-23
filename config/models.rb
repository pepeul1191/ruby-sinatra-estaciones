require_relative './database'

class Estacion < Sequel::Model(DB[:estaciones])

end

class TipoEstacion < Sequel::Model(DB[:tipo_estaciones])

end
