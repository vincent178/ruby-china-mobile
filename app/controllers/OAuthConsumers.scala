package controllers

import play.api.libs.ws._
import scala.concurrent.Future
import play.api.mvc._
import play.Play
import play.api.Play.current
import scala.concurrent.ExecutionContext.Implicits.global

object OAuthConsumers extends Controller {

  def callback = Action.async { implicit request =>

    // POST https://github.com/login/oauth/access_token

    // client_id, client_secret, code (get from request)
    // redirect_uri, state


    val code = request.getQueryString("code")
    val clientId = Play.application.configuration.getString("github.clientId")
    val clientSecret = Play.application.configuration.getString("github.clientSecret")

    WS.url("https://github.com/login/oauth/access_token")
      .withHeaders("Content-Type" -> "application/json")
      .withQueryString("code" -> code.getOrElse(""), "client_id" -> clientId, "client_secret" -> clientSecret).post("").map { response =>

      // response.body = "access_token=76d10c2c197a13c31655485e39d4cc11235201cd&scope=&token_type=bearer"
      Ok(response.json.toString)
    }
  }

}