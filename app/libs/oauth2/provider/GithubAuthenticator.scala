package libs.oauth2.provider

import libs.oauth2._
import play.api.mvc.Results
import play.api.{Logger, Play}
import play.api.http.{MimeTypes, HeaderNames}
import play.api.libs.ws.{WSResponse, WS}
import play.api.Play.current


import scala.concurrent.{ExecutionContext, Future}


object GithubAuthenticator extends Authenticator {

  val providerName = "github"

  // POST https://github.com/login/oauth/access_token
  // client_id, client_secret, code (get from request)
  val accessTokenUrl = "https://github.com/login/oauth/access_token"

  val clientId = Play.application.configuration.getString("github.clientId").getOrElse(sys.error("github.clientId is missiong"))

  val clientSecret = Play.application.configuration.getString("github.clientSecret").getOrElse(sys.error("github.clientSecret is mission"))

  def retrieveAccessToken(code: String)(implicit ex: ExecutionContext): Future[String] = {
    WS.url(accessTokenUrl)
      .withQueryString("code" -> code, "client_id" -> clientId, "client_secret" -> clientSecret)
      .withHeaders(HeaderNames.ACCEPT -> MimeTypes.JSON)
      .post(Results.EmptyContent())
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
      case _: Throwable =>
        println("Error happened here")
        ""
    }
  }
}
