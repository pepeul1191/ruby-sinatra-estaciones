class App < Sinatra::Base
  get '/tipo_estacion/listar' do
    TipoEstacion.all.to_a.to_json
  end
end
