package controllers

import play.api.mvc._
import libs.oauth2.provider.GithubAuthenticator
import scala.concurrent.ExecutionContext.Implicits.global

object OAuthConsumers extends Controller {

  def callback(provider: String) = Action.async { implicit request =>

    val code = request.getQueryString("code").getOrElse("")
    GithubAuthenticator.retrieveAccessToken(code).map { accessToken =>

      Ok(accessToken)
    }
  }
}

