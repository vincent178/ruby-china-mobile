package controllers

import play.api.mvc._
import play.Play

object OAuthConsumers extends Controller {

  def callback = Action { implicit request =>

    // POST https://github.com/login/oauth/access_token

    // client_id, client_secret, code (get from request)
    // redirect_uri, state

    val code = request.getQueryString("code")
    val clientId = Play.application().configuration().getString("github.clientId")
    val clientSecret = Play.application.configuration.getString("github.clientSecret")

    Ok(views.html.home.index())
  }

}