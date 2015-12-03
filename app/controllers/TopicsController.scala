package controllers

import javax.inject.{Inject, Singleton}
import helpers.actionbuilders.AuthenticationBuilder
import play.api.Logger
import play.api.libs.json._
import play.api.mvc._
import models.{Topics, Users}
import scala.concurrent.ExecutionContext
import play.api.libs.functional.syntax._
import scala.language.postfixOps

@Singleton
class TopicsController @Inject()(users: Users, topics: Topics)(implicit ex: ExecutionContext) extends Controller with AuthenticationBuilder {

  def list = TODO

  def init = AuthenticatedAction(users)(ex) { implicit request =>
    Ok(views.html.topics.init(request.user))
  }

  def create = AuthenticatedAction(users)(ex)(BodyParsers.parse.json) { implicit request =>

    implicit val rds = (
      (__ \ 'title).read[String] and
      (__ \ 'content).read[String]
    ) tupled

    request.body.validate[(String, String)].fold(
      errors => {
        Logger.info(errors.toString)
      },
      topicData => {
        topics.create(topicData._1, topicData._2, request.user.map(_.id).getOrElse(0)).map { topic =>
          Logger.info(topic.toString)
        }
        Status(201)
      }
    )

    Status(201)
  }

  def detail(id: Int) = AuthenticatedAction(users)(ex) { implicit request =>

    Status(200)
  }
}
