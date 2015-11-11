package controllers

import play.api.mvc._

object HomeController extends Controller {

  def index(flag: String) = Action { implicit request =>

    /*
      NodeSeq then content-type is text/xml
      JsValue then content-type is application/json
     */


    flag match {
      case "json" =>
        val json = """{"status": "success"}"""
        Ok(json).withHeaders(CONTENT_TYPE -> "application/json")
      case "redirect" =>
        Status(302).withHeaders(LOCATION -> routes.ProductsController.list().toString)
      case "html" =>
        Ok(views.html.home.index())
      case _ =>
        Ok(views.html.home.index())
    }
  }
}