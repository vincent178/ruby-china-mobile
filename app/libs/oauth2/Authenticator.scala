package libs.oauth2

import scala.concurrent.{ExecutionContext, Future}

trait Authenticator {

  val providerName: String

  val accessTokenUrl: String

  val clientId: String

  val clientSecret: String

  def retrieveAccessToken(code: String)(implicit ec: ExecutionContext): Future[String]
}
