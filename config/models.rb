require_relative './database'

class Estacion < Sequel::Model(DB[:estaciones])

end
