require 'sinatra/base'
require 'oauth2'
require 'json'

APP_ID = '8e8d5c42'
APP_SECRET = 'eccbe71f8735a4dd2153337f5ec4242538f13bde423ca530062ca5ce6837b85a'

class GTServer < Sinatra::Base

  get '/' do
    'Hello world'
  end

  post '/oauth/access_token' do

   client = OAuth2::Client.new(APP_ID, APP_SECRET, site: 'https://ruby-china.org')
   access_token = client.password.get_token(params[:username], params[:password])

   { access_token: access_token }.to_json
  end
end
