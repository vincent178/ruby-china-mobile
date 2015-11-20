package controllers

import play.api.libs.ws.{WSResponse, WS}
import play.api.mvc._
import libs.oauth2.provider.GithubAuthenticator
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import play.api.Play.current

object OAuthConsumers extends Controller {

  def callback(provider: String) = Action.async { implicit request =>

    val code = request.getQueryString("code").getOrElse("")
    val oauthUser: Future[WSResponse] = for {
      accessToken <- GithubAuthenticator.retrieveAccessToken(code)
      response <- WS.url("https://api.github.com/user").withHeaders("Authorization" -> s"token ${accessToken}").get()
    } yield response

    oauthUser.map { response =>

      val login = (response.json \ "login").as[String]
      Redirect(routes.HomeController.index()).withSession("username" -> login)
    }
  }
}

