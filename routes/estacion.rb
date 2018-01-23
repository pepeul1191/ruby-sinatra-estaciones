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

  post '/estacion/eliminar' do
    error = false
    execption = nil
    DB.transaction do
		  begin
        data = JSON.parse(request.body.read)
        Estacion.where(:id => data['id']).delete
			rescue Exception => e
				Sequel::Rollback
				error = true
				execption = e
      end
    end
    if error == false
			return {:tipo_mensaje => 'success', :mensaje => ['Se ha eliminado una estación']}.to_json
		else
      status 500
			return {:tipo_mensaje => 'error', :mensaje => ['Se ha producido un error en guardar la tabla de estaciones', execption.message]}.to_json
		end
  end
end
