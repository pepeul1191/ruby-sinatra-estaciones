class App < Sinatra::Base
  get '/tipo_estacion/listar' do
    TipoEstacion.all.to_a.to_json
  end

  get '/tipo_estaciones' do
    data = {
      :tiempo => Time.now,
      :array_css => ['tipo_estacion/index'],
      :array_js => ['tipo_estacion/index']
    }
    erb :'tipo_estacion/index', :layout => :'layouts/blank', :locals => data
  end

  post '/tipo_estacion/crear' do
    error = false
    execption = nil
    nuevo_id = nil
    DB.transaction do
      begin
        data = JSON.parse(request.body.read)
        n = TipoEstacion.new(:nombre => data['nombre'])
        n.save
        nuevo_id = n.id
      rescue Exception => e
        Sequel::Rollback
        error = true
        execption = e
      end
    end
    if error == false
      return {:tipo_mensaje => 'success', :mensaje => ['Se ha creado un tipo estación', nuevo_id]}.to_json
    else
      #status 500
      return {:tipo_mensaje => 'error', :mensaje => ['Se ha producido un error en crear un nuevo tipo de estación', execption.message]}.to_json
    end
  end

  post '/tipo_estacion/editar' do
    error = false
    execption = nil
    nuevo_id = nil
    DB.transaction do
      begin
        data = JSON.parse(request.body.read)
        e = TipoEstacion.where(:id => data['id']).first
        e.nombre = data['nombre']
        e.save
      rescue Exception => e
        Sequel::Rollback
        error = true
        execption = e
      end
    end
    if error == false
      return {:tipo_mensaje => 'success', :mensaje => ['Se ha editado un tipo de estación']}.to_json
    else
      #status 500
      return {:tipo_mensaje => 'error', :mensaje => ['Se ha producido un error en crear un nuevo tipo de estación', execption.message]}.to_json
    end
  end

  post '/tipo_estacion/eliminar' do
    error = false
    execption = nil
    DB.transaction do
      begin
        data = JSON.parse(request.body.read)
        TipoEstacion.where(:id => data['id']).delete
      rescue Exception => e
        Sequel::Rollback
        error = true
        execption = e
      end
    end
    if error == false
      return {:tipo_mensaje => 'success', :mensaje => ['Se ha eliminado un tipo de estación']}.to_json
    else
      #status 500
      return {:tipo_mensaje => 'error', :mensaje => ['Se ha producido un error en guardar la tabla de tipos de estaciones', execption.message]}.to_json
    end
  end
end
