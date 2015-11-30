package controllers

import play.api.libs.ws.{WS, WSResponse}
import play.api.mvc._
import libs.oauth2.provider.GithubAuthenticator
import tables.UserModel
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import play.api.Play.current
import javax.inject.Inject


class OAuthConsumers @Inject()(userModel: UserModel) extends Controller {

  def callback(provider: String) = Action.async { implicit request =>

    val code = request.getQueryString("code").getOrElse("")
    val oauthUser: Future[WSResponse] = for {
      accessToken <- GithubAuthenticator.retrieveAccessToken(code)
      response <- WS.url("https://api.github.com/user").withHeaders("Authorization" -> s"token ${accessToken}").get()
    } yield response

    oauthUser.flatMap { response =>
      val username = (response.json \ "name").as[String]
      val email = (response.json \ "email").as[String]
      val avatarUrl = (response.json \ "avatar_url").as[String]

      userModel.create(username = username, email = email, avatarUrl = avatarUrl).map { user =>
        Redirect(routes.HomeController.index()).withSession("username" -> username)
      }
    }
  }
}

