package helpers

import play.api.Logger
import play.Play
import play.api.libs.ws.WS
import play.api.Play.current
import scala.concurrent.ExecutionContext.Implicits.global

class OAuth {

  // need pass in code
  def githubAccessToken(code: String) = {
    val clientId = Play.application.configuration.getString("github.clientId")
    val clientSecret = Play.application.configuration.getString("github.clientSecret")
    val postBody = Map("code" -> Seq(code), "client_id" -> Seq(clientId), "client_secret" -> Seq(clientSecret))

    WS.url("https://github.com/login/oauth/access_token")
      .post(postBody).map { response =>

      Logger.info("Response status: " + response.status)
      Logger.info("Response body: " + response.body)

      val accessToken = response.body.toString.split("&")(0).split("=")(1)
      Logger.info("Access token: " + accessToken)

      response.body.toString
    }
  }
}
