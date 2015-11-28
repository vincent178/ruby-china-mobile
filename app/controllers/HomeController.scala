package controllers

import javax.inject.Inject

import play.api.libs.json.{JsValue, Json}
import play.api.mvc._
import tables.{UserModel, ScopeRoleModel}

import scala.concurrent.ExecutionContext

class HomeController @Inject()(userModel: UserModel)(implicit ex: ExecutionContext) extends Controller {

  def index = Action {

    val username = "vincent_178"
    val email = "vincent.007.cn@gmail.com"
    val avatarUrl = ""

    userModel.create(username = username, email = email, avatarUrl = avatarUrl)
    userModel.create(username = username, email = email, avatarUrl = avatarUrl)
    userModel.create(username = username, email = email, avatarUrl = avatarUrl)
    userModel.create(username = username, email = email, avatarUrl = avatarUrl)
    userModel.create(username = username, email = email, avatarUrl = avatarUrl)

    Ok(views.html.home.index())
  }
}


