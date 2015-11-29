package controllers

import javax.inject.Inject
import javax.script.ScriptEngineManager

import play.api.libs.json.{JsValue, Json}
import play.api.mvc._
import tables.{UserModel, ScopeRoleModel}

import scala.concurrent.ExecutionContext

class HomeController @Inject()(userModel: UserModel)(implicit ex: ExecutionContext) extends Controller {

  def index = Action {

    val engine = new ScriptEngineManager().getEngineByName("nashorn")

    if (engine == null) {
      BadRequest("Nashorn script engine not found. Are you using JDK 8?")
    } else {

      engine.eval("var aaa = 'Hello world'")

      Ok(views.html.home.index())
    }
  }
}
