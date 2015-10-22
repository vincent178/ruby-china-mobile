package actionbuilders

import play.api.Logger
import play.api.mvc._
import scala.concurrent.Future

object LoggingAction extends ActionBuilder[Request] {

  def invokeBlock[A](request: Request[A], block: (Request[A]) => Future[Result]) = {
    Logger.info("Hello world")
    block(request)
  }
}



