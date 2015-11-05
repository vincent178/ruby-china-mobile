package controllers

import play.api.mvc._

object ProductsController extends Controller {

  def list = Action { implicit request =>
    val products = models.Product.findAll

    Ok(views.html.products.list(products))
  }

}