import akka.actor.{Actor, Props}
import play.Logger
import play.api.GlobalSettings
import play.api.libs.concurrent.Akka
import play.api.mvc.WithFilters
import play.filters.gzip.GzipFilter

object Global extends WithFilters(filters.LoggingFilter, new GzipFilter(shouldGzip =
  (request, response) => {
    val contentType = response.headers.get("Content-Type")
    contentType.exists(_.startsWith("text/html")) || request.path.endsWith("jsroutes.js")
  }
)) with GlobalSettings {
  override def onStart(application: play.api.Application): Unit = {

    import scala.concurrent.duration._
    import play.api.Play.current
    import play.api.libs.concurrent.Execution.Implicits.defaultContext

    val actor = Akka.system.actorOf(
      Props(new LoggerActor("10 min interval"))
    )

    Akka.system.scheduler.schedule(
      0.seconds, 10.minutes, actor, "send"
    )

  }
}

class LoggerActor(msg: String) extends Actor {

  def receive = {
    case "send" => Logger.info(msg)
    case _ => Logger.info("_ got mapped")
  }
}
