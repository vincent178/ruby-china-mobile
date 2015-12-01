package actionbuilders

import play.api.mvc._
import tables.{User, UserModel}
import scala.concurrent.{ExecutionContext, Future}

class AuthenticatedRequest[A](val user: Option[User], request: Request[A]) extends WrappedRequest[A](request)


trait AuthenticationBuilder {

  def AuthenticatedAction(userModel: UserModel)(implicit ec: ExecutionContext) = new ActionBuilder[AuthenticatedRequest] {

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

