package controllers

import javax.inject.{Inject, Singleton}
import actionbuilders.AuthenticationBuilder
import play.api.mvc._
import tables.UserModel

import scala.concurrent.ExecutionContext

@Singleton
class TopicsController @Inject()(userModel: UserModel)(implicit ex: ExecutionContext) extends Controller with AuthenticationBuilder {

  def index = TODO

  def init = AuthenticatedAction(userModel)(ex) { implicit request =>
    Ok(views.html.topics.init(request.user))
  }

  def create = AuthenticatedAction(userModel)(ex)(BodyParsers.parse.json) { implicit request =>

    Status(201)
  }
}
