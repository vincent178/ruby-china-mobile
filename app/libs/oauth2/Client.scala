package libs.oauth2

import play.api.Logger
import strategy.Base

class Client(clientId: String, clientSecret: String, site: String,
             authorizeUrl: String = "/oauth/authorize",
             tokenUrl: String = "/oauth/token",
             tokenMethod: String = "POST",
             maxRedirects: Int = 5,
             raiseError: Boolean = true) {


  def getToken: AccessToken = {

    new AccessToken
  }



  def strategy[T <: Base](strategy: T) = {
    strategy
  }

  private def request = {
    Logger(getClass).debug("requesting")
    "HW"
  }
}

