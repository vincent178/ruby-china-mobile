require 'sinatra/base'
require 'oauth2'
require 'json'
require 'byebug'

APP_ID = '8e8d5c42'
APP_SECRET = 'eccbe71f8735a4dd2153337f5ec4242538f13bde423ca530062ca5ce6837b85a'

class GTServer < Sinatra::Base

  before do
    headers 'Access-Control-Allow-Origin' => '*', 
      'Access-Control-Allow-Methods' => 'POST, OPTIONS',
      'Access-Control-Max-Age' => '3600',
      'Access-Control-Allow-Headers' => 'Content-Type'
  end

  options '/oauth/access_token' do
    status 204
  end

  post '/oauth/access_token' do

    content_type 'application/json', 'charset' => 'utf-8'
    request.body.rewind
    @request_payload = JSON.parse request.body.read
    client = OAuth2::Client.new(APP_ID, APP_SECRET, site: 'https://ruby-china.org')
    access_token = client.password.get_token(@request_payload["username"], @request_payload["password"])

    { 
      OAuth: {
        token_type: access_token.params["token_type"],
        access_token: access_token.token,
        refresh_token: access_token.refresh_token,
        expires_at: Time.at(access_token.expires_at)
      }
    }.to_json
  end
end
