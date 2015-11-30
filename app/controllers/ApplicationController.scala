package controllers

import play.api.mvc._
import tables.UserModel

class ApplicationController extends Controller {


  def currentLoginUser(session: Session, userModel: UserModel) = {
    val username = session.get("username").getOrElse("anonymous")
    userModel.find(username)
  }
}