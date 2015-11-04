package controllers

import play.api.mvc._


object SessionController extends Controller {

  def login = Action { implicit request =>

    Redirect(routes.HomeController.index()).withSession(Security.username -> "vincent178")
  }

  def init = TODO
  def create = TODO
  def destroy = TODO
}
