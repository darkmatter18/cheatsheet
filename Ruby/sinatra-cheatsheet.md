# Sinatra Cheat Sheet 
[Route params](#route-params)   
[Serving static assets](#serving-static-assets)   
[Sending data to client](#sending-data-to-client)   
[Handling forms](#handling-forms-post)   

## Getting started 
gem install sinatra  
gem install puma  
ruby main.rb

## Basic route  
```ruby
    require 'sinatra'
    get '/frank-says' do
        'Put this in your pipe & smoke it!'
    end 
```
## Route params 
```ruby
    # http://127.0.0.1:4567/hello/friend 
    get '/hello/:name' do
        # matches "GET /hello/foo" and "GET /hello/bar"
        # params['name'] is 'foo' or 'bar'
        "Hello #{params['name']}!"
    end
```

## Multiple route params 
```ruby
    # http://127.0.0.1:4567/hello/my/player 
    get '/hello/:first/:second' do 
        "Hello #{params['second']}!"
    end
```

## Serving static assets 
```ruby
    =begin
    /static/
    - index.html
    - style.css 
    http://127.0.0.1:4567/index.html 
    note: use a template language such as Erb or HAML for dynamic HTML
    =end
    set :public_folder, __dir__ + '/static' 
```

## Sending data to client 
```ruby
    get '/' do
        @name = "TIM" 
        @names = ["tom", "taylor", "tamara"]
        erb :index  
    end 
```

## Handling forms (POST) 
```ruby
    =begin
    /views/index.erb 
    <h1><%= @name %></h1>
    <ul>
    <% @names.each do |name| %>
        <li><%= name %></li>
    <% end %>
    <ul>
    <form method="POST" action="/greeting">
    <input type="text" placeholder="name" name="name" /> 
    <input type="submit" />
    </form>	  
    <b>Greeting: <%= greeting %> 
    =end 
    post '/greeting' do
        # investigate template layouts ;) 
        @name = "TIM" 
        @names = ["tom", "taylor", "tamara"]
        erb :index, :locals => {:greeting => "hi #{params[:name]}" }  
    end
```

## REST Endpoint 
```ruby
    # curl http://127.0.0.1:4567/rest-api 
    get '/rest-api' do 
        # todo: add cors example 
        content_type :json 
        { json: "rest-api examle"}.to_json 
    end 

    not_found do
        return if JSON.parse( body[0] ).include?( 'error' ) rescue nil # Error already defined
        [ 404, { message: 'Not found :/ ' }.to_json ]
    end
```

