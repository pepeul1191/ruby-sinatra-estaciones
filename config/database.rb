require 'sequel'
require 'sqlite3'
require 'mongolitedb'
require 'pp'

Sequel::Model.plugin :json_serializer

DB = Sequel.connect('sqlite://db/estaciones.db')
MDB = MongoLiteDB.new 'db/estaciones.mglite'
