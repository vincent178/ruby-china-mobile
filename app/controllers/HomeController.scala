package controllers

import actionbuilders.AuthenticationBuilder
import com.google.inject.{Inject, Singleton}
import tables.UserModel

import scala.concurrent.ExecutionContext

@Singleton
class HomeController @Inject()(userModel: UserModel)(implicit ex: ExecutionContext) extends ApplicationController with AuthenticationBuilder {

  def index = AuthenticatedAction(userModel)(ex) { implicit request =>
    Ok(views.html.home.index(request.user))
  }
}
