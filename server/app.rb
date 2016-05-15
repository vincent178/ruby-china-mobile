require 'sinatra'
require 'oauth2'
require 'json'

post '/login' do

 client = OAuth2::Client.new('client id', 'secret', site: 'https://ruby-china.org')
 access_token = client.password.get_token(params[:username], params[:password])

 { access_token: access_token }.to_json
end
