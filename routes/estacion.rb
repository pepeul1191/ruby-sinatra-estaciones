class App < Sinatra::Base
  get '/estacion/listar' do
    Estacion.all.to_a.to_json
  end

  get '/estaciones' do
    data = {
      :tiempo => Time.now,
      :array_css => ['estacion/index'],
      :array_js => ['estacion/index']
    }
    erb :'estacion/index', :layout => :'layouts/blank', :locals => data
  end
end
