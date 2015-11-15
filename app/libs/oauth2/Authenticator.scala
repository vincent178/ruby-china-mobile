package libs.oauth2

import scala.concurrent.Future

trait Authenticator {

  val providerName: String

  val accessTokenUrl: String

  val clientId: String

  val clientSecret: String

  def retrieveAccessToken(code: String): Future[String]
}
