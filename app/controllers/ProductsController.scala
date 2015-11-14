package controllers

import models.Product
import play.api.data.Form
import play.api.data.Forms._
import play.api.i18n.Messages
import play.api.libs.json._
import play.api.mvc._

object ProductsController extends Controller {

  def list(page: Int) = Action { implicit request =>
//    val products = models.Product.findAll
//    Ok(views.html.products.list(products))

    val product = Json.obj(
      "name" -> JsString("Blue Paper clips"),
      "ean" -> JsString("Big box of paper clips"),
      "pieces" -> JsNumber(500),
      "manufacturer" -> Json.obj(
        "name" -> JsString("Paperclipfactory Inc."),
        "contact_details" -> Json.obj(
          "email" -> JsString("contact@paperclipfactory.example.com"),
          "fax" -> JsNull,
          "phone" -> JsString("+123456789")
        )
      ),
      "tags" -> Json.arr(
        JsString("paperclips"),
        JsString("coated")
      ),
      "active" -> JsBoolean(true)
    )

    val productString = Json.stringify(product)

    /*
    val productCodes = Product.findAll.map(_.ean)
    // if return JsValue, Play will add Content-Type: application/json HTTP response header
    Ok(Json.toJson(productCodes))
    */


    Ok(productString)
  }

  def details(ean: Long) = Action { implicit request =>


    Product.findByEan(ean).map { product =>
      Ok(views.html.products.details(product))
    }.getOrElse(NotFound)
  }

  def edit(ean: Long) = Action { implicit request =>
    NotImplemented
  }

  def update(ean: Long) = Action { implicit request =>
    NotImplemented
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
        Redirect(routes.ProductsController.details(newProduct.ean))
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