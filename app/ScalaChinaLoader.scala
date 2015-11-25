import play.api._
import play.api.ApplicationLoader.Context

import java.io.{ InputStream, File }

import play.api.routing.{SimpleRouter, Router}

class ScalaChinaLoader extends ApplicationLoader {

  def load(context: Context) = {
    Console.println("Hello world")
    new ScalaChinaComponent(context).application
  }
}

class ScalaChinaComponent(context: Context) extends BuiltInComponentsFromContext(context) {

  lazy val router = Router.empty
}
