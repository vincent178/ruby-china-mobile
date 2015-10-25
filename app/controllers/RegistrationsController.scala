package controllers

import helpers.forms.UserForm.userForm
import models.database.UserEntity
import models.database.UsersDatabase._
import helpers.forms.UserForm

import org.joda.time.DateTime
import play.Logger

import play.api.mvc._
import play.api.db.slick.Config.driver.simple._
import play.api.db.slick._
import play.api.Play.current

// current_sign_in_at current_sign_in_ip
// last_sign_in_at   last_sign_in_ip

// id, email, encrypted_password

object RegistrationsController extends Controller {

  // GET /user/sign_up
  def index = DBAction { implicit request =>

//    val user = UserEntity(email = "hello", encryptedPassword = "afjkal")
//    users += user

//    Ok(views.html.registrations.index())
    Ok(views.html.registrations.index(userForm))
  }

  // POST /user
  def create = Action {implicit request =>

    userForm.bindFromRequest.fold(
      errors => {

        Logger.debug("我错了")
        Logger.debug(errors.toString)

        BadRequest(views.html.index())
      },
      user => {
        Logger.debug("我对了")
        Logger.info(user.email)
        Logger.info(user.password)
        Redirect("/")
      }
    )


//    Ok("Hello world")
  }

  // GET /user/edit
  def edit = TODO

  // PUT /user
  def update = TODO

  // DELETE /user
  def destroy = TODO

}
