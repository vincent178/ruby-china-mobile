package controllers

import play.api.libs.ws._
import play.api.mvc._
import play.api.{Play, Logger}
import play.api.Play.current
import scala.concurrent.ExecutionContext.Implicits.global

import libs.oauth2.strategy.GithubAuthenticator

object OAuthConsumers extends Controller {

  def callback(provider: String) = Action.async { implicit request =>

    val code = request.getQueryString("code").getOrElse("")
    GithubAuthenticator.retrieveAccessToken(code).map { accessToken =>
      Ok(accessToken)
    }
  }
}

