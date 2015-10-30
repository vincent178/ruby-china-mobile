package controllers

import helpers.PostBody
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
    val postBody = Map(
      "code" -> code,
      "client_id" -> clientId,
      "client_secret" -> clientSecret
    )

    WS.url("https://github.com/login/oauth/access_token")
      .withHeaders("Content-Type" -> "application/json")
      .post(PostBody(postBody)).map { response =>

      Logger.info("Response body: " + response.body)

      // response.body = "access_token=76d10c2c197a13c31655485e39d4cc11235201cd&scope=&token_type=bearer"
      Ok(response.body.toString)
    }
  }

}