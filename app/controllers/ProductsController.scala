package controllers

import models.Product
import play.api.data.Form
import play.api.data.Forms._
import play.api.i18n.Messages
import play.api.mvc._

object ProductsController extends Controller {

  def list = Action { implicit request =>
    val products = models.Product.findAll

    Ok(views.html.products.list(products))
  }

  def show(ean: Long) = Action { implicit request =>

    Product.findByEan(ean).map { product =>
      Ok(views.html.products.details(product))
    }.getOrElse(NotFound)
  }

  def newProduct = Action { implicit request =>
    val form = if (request2flash.get("error").isDefined)
        productForm.bind(request2flash.data)
    else
      productForm

    Ok(views.html.products.editProduct(form))
  }

  def save = Action { implicit request =>

    val newProductForm = productForm.bindFromRequest()

    newProductForm.fold(
      hasErrors = { form =>
        Redirect(routes.ProductsController.newProduct())
          .flashing(Flash(form.data) + ("error" -> Messages("validation.errors")))
      },

      success = { newProduct =>
        Product.add(newProduct)
        val message = Messages("products.new.success", newProduct.name)
        Redirect(routes.ProductsController.show(newProduct.ean))
          .flashing("success" -> message)
      }
    )

  }

  private val productForm: Form[Product] = Form(
    mapping(
      "ean" -> longNumber.verifying(
        "validation.ean.duplicate", Product.findByEan(_).isEmpty),
      "name" -> nonEmptyText,
      "description" -> nonEmptyText
    )(Product.apply)(Product.unapply)
  )
}