package libs.redis.store

import redis.RedisClient

import scala.concurrent.Await
import scala.concurrent.duration._
import scala.concurrent.ExecutionContext.Implicits.global

object RedisSessionStore {

  val SESSION_KEY = ""


  def prefix() = {

  }

  def loadSessionFromRedis(sId: String) = {
        implicit val akkaSystem = akka.actor.ActorSystem()
        val redis = RedisClient()

        val futurePong = redis.ping()
        println("Ping sent!")
        futurePong.map( pong => {
          println(s"Redis replied with a $pong")
        })

        Await.result(futurePong, 5.seconds)
        akkaSystem.shutdown()
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
