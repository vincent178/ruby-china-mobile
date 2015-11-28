package controllers

import com.google.inject.Singleton
import play.api.mvc._

@Singleton
class AdminController extends Controller {


  def index = Action {
    Ok(views.html.admin.index())
  }

}