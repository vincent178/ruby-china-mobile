package controllers

import com.google.inject.{Inject, Singleton}
import scala.concurrent.ExecutionContext
import play.api.mvc._

import actionbuilders.AuthenticationBuilder
import tables.UserModel



@Singleton
class HomeController @Inject()(userModel: UserModel)(implicit ex: ExecutionContext) extends Controller with AuthenticationBuilder {


  def index = AuthenticatedAction(userModel)(ex) { implicit request =>
    Ok(views.html.home.index(request.user))
  }
}
