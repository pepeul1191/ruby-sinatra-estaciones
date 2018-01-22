class App < Sinatra::Base
  get '/estacion/listar' do
    Estacion.all.to_a.to_json
  end

  get '/estacion/xd' do
    MDB.insert({
      'first_name' => 'Joan',
      'last_name' => 'Of Arc',
      'age' => 15,
      'armor_size' => 'small'
    })
    'hola'
  end
end
