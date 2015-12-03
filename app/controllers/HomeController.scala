package controllers

import com.google.inject.{Inject, Singleton}
import scala.concurrent.ExecutionContext
import play.api.mvc._

import helpers.actionbuilders.AuthenticationBuilder
import models.Users



@Singleton
class HomeController @Inject()(userModel: Users)(implicit ex: ExecutionContext) extends Controller with AuthenticationBuilder {


  def index = AuthenticatedAction(userModel)(ex) { implicit request =>
    Ok(views.html.home.index(request.user))
  }
}
