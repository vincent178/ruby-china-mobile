package helpers.actionbuilders

import play.api.mvc._
import models.{User, Users}
import scala.concurrent.{ExecutionContext, Future}

class AuthenticatedRequest[A](val user: Option[User], request: Request[A]) extends WrappedRequest[A](request)


trait AuthenticationBuilder {

  def AuthenticatedAction(userModel: Users)(implicit ec: ExecutionContext) = new ActionBuilder[AuthenticatedRequest] {

    def invokeBlock[A](request: Request[A], block: (AuthenticatedRequest[A]) => Future[Result]) = {

      request.session.get("username") match {
        case Some(username) =>
          userModel.find(username).flatMap { user =>
            block(new AuthenticatedRequest(user, request))
          }
        case None =>
          block(new AuthenticatedRequest(None, request))
      }
    }
  }
}

