package controllers

import com.google.inject.Singleton
import play.api.mvc._

@Singleton
class SessionsController extends Controller {

  def destroy = Action {
    Redirect(routes.HomeController.index()).withNewSession
  }
}