package libs.oauth2.provider

import libs.oauth2._
import play.api.{Logger, Play}
import play.api.http.{MimeTypes, HeaderNames}
import play.api.libs.ws.{WSResponse, WS}

import scala.concurrent.Future


object GithubAuthenticator extends Authenticator {

  val providerName = "github"

  // POST https://github.com/login/oauth/access_token
  // client_id, client_secret, code (get from request)
  val accessTokenUrl = "https://github.com/login/oauth/access_token"

  val clientId = Play.application.configuration.getString("github.clientId")

  val clientSecret = Play.application.configuration.getString("github.clientSecret")

  def retrieveAccessToken(code: String): Future[String] = {
    val postBody = Map("code" -> Seq(code), "client_id" -> Seq(clientId), "client_secret" -> Seq(clientSecret))
    WS.url(accessTokenUrl)
      .withHeaders(HeaderNames.ACCEPT -> MimeTypes.JSON)
      .post(postBody)
      .map { response =>
        Logger(getClass).debug("Retrieving access token from provider API: " + response.body)
        parseAccessTokenResponse(response)
      }
  }

  def parseAccessTokenResponse(response: WSResponse): String = {
    Logger(getClass).debug("Parsing access token response: " + response.body)

    try {
      (response.json \ "access_token").as[String]
    } catch {
      case _ =>
        println("Error happened here")
        ""
    }
  }
}
