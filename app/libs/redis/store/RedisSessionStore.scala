package libs.redis.store

object RedisSessionStore {

  val SESSION_KEY = ""


  def prefix() = {

  }

  def loadSessionFromRedis(sId: String) = {

  }

  def decode(data: String): Map[String, String] = {

    Map("A" -> "B")
  }

  def encode(data: Map[String, String]): String = {

    ""
  }

  def destroySession() = {

  }

  def destroySessionFromSid() = {

  }


}
