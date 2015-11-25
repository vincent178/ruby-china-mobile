package controllers

import javax.inject.Inject

import models.{Role, ScopeRoleModel}
import play.api._
import play.api.libs.json.{JsValue, Json}
import play.api.mvc._

import scala.concurrent.ExecutionContext

class HomeController @Inject()(scopeRoleModel: ScopeRoleModel)(implicit ex: ExecutionContext) extends Controller {

  def index = Action.async {
    scopeRoleModel.roleForScope.map { roles =>
      Ok(Json.toJson(roles))
    }
  }

  def convertRolesToJson(roles: Seq[Role]): JsValue = Json.toJson(roles)
}


