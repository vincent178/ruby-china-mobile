package controllers

import play.api.Logger
import play.api.mvc._
import play.api.mvc.Action
import scala.concurrent.Future
import play.api.libs.concurrent.Execution.Implicits.defaultContext


object LoggingFilter extends Filter {
  def apply(nextFilter: (RequestHeader) => Future[Result])
           (requestHeader: RequestHeader): Future[Result] = {

    nextFilter(requestHeader).map { result =>
      result.withHeaders("hello" -> "Hello World").withHeaders("yes" -> "1223")
    }
  }
}