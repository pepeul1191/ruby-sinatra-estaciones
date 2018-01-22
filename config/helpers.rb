require 'sinatra'

class App < Sinatra::Base
  helpers do
    def css(array_css)
      if array_css.length >= 1
        rpta = ''
        array_css.each do |css|
          t = '<link href="' + CONSTANTS[:STATIC_URL] + css + '.css" rel="stylesheet">'
          rpta = rpta + t
        end
        rpta
      end
    end

    def js(array_js)
      if array_js.length >= 1
        rpta = ''
        array_js.each do |js|
          t = '<script type="text/javascript" src="' + CONSTANTS[:STATIC_URL] + js + '.js" ></script>'
          rpta = rpta + t
        end
        rpta
      end
    end
  end
end
