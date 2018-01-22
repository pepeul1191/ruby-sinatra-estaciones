class App < Sinatra::Base
  get '/estacion/listar' do
    Estacion.all.to_a.to_json
  end
end
