package controllers

import play.api.libs.ws._
import scala.concurrent.Future
import play.api.mvc._
import play.api.Logger
import play.Play
import play.api.Play.current
import scala.concurrent.ExecutionContext.Implicits.global

object OAuthConsumers extends Controller {

  def callback = Action.async { implicit request =>

    // POST https://github.com/login/oauth/access_token

    // client_id, client_secret, code (get from request)
    // redirect_uri, state


    val code = request.getQueryString("code").getOrElse("")
    val clientId = Play.application.configuration.getString("github.clientId")
    val clientSecret = Play.application.configuration.getString("github.clientSecret")
    val postBody = Map("code" -> Seq(code), "client_id" -> Seq(clientId), "client_secret" -> Seq(clientSecret))

    WS.url("https://github.com/login/oauth/access_token")
      .post(postBody).map { response =>

      Logger.info("Response status: " + response.status)
      Logger.info("Response body: " + response.body)

      Ok(response.body.toString)
    }
  }

}