package controllers

import javax.inject.Inject

import play.api.libs.json.{JsValue, Json}
import play.api.mvc._
import tables.ScopeRoleTable

import scala.concurrent.ExecutionContext

class HomeController @Inject()(scopeRoleModel: ScopeRoleTable)(implicit ex: ExecutionContext) extends Controller {

  def index = Action.async {
    scopeRoleModel.roleForScope.map { roles =>
      Ok(Json.toJson(roles))
    }
  }
}


