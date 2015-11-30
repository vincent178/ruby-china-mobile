package controllers

import javax.inject.{Inject, Singleton}
import play.api.mvc._
import tables.UserModel

import scala.concurrent.ExecutionContext

@Singleton
class TopicsController @Inject()(userModel: UserModel)(implicit ex: ExecutionContext) extends ApplicationController {

  def index = Action.async { implicit request =>
    currentLoginUser(request.session, userModel).map { user =>
      Ok(views.html.topics.index(user))
    }
  }

  def init = TODO
}
