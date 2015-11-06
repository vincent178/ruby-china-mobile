package controllers

import models.Product
import play.api.mvc._

object ProductsController extends Controller {

  def list = Action { implicit request =>
    val products = models.Product.findAll

    Ok(views.html.products.list(products))
  }

  def show(ean: Long) = Action { implicit resquest =>

    Product.findByEan(ean).map { product =>
      Ok(views.html.products.details(product))
    }.getOrElse(NotFound)
  }
}