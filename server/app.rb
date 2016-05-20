require 'sinatra/base'
require 'json'
require 'httparty'
require 'byebug'

APP_ID = '8e8d5c42'
APP_SECRET = 'eccbe71f8735a4dd2153337f5ec4242538f13bde423ca530062ca5ce6837b85a'
RUBY_CHINA_SITE = 'https://ruby-china.org/oauth/token'
PASSWORD_TYPE = 'password'
REFRESH_TYPE = 'refresh_token'

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

    if @request_payload["grant_type"] == PASSWORD_TYPE
      body = {
        username: @request_payload["username"],
        password: @request_payload["password"]
      }
    elsif @request_payload["grant_type"] == REFRESH_TYPE
      body = {
        refresh_token: @request_payload["refresh_token"]
      }
    else
      halt 400, { "error": "grant_type_invalid", error_description: "" }.to_json
    end

    body.merge!({
      grant_type: @request_payload["grant_type"],
      client_id: APP_ID,
      client_secret: APP_SECRET
    })


    response = HTTParty.post(RUBY_CHINA_SITE, body: body.to_json, headers: { 'Content-Type' => 'application/json' })

    if response.parsed_response["error"]
      halt 400, response.parsed_response.to_json
    else
      data = response.parsed_response
      halt 200, {
        OAuth: {
          accessToken: data["access_token"],
          refreshToken: data["refresh_token"],
          expiresAt: Time.at(data["created_at"] + data["expires_in"])
        }
      }.to_json
    end
  end
end
