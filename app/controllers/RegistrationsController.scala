package controllers

import models.database.UserEntity
import models.database.UsersDatabase._
import helpers.forms.UserForm

import org.joda.time.DateTime

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
    Ok(views.html.registrations.index(UserForm.userForm))
  }

  // POST /user
  def create = Action {implicit request =>


    Ok("Hello world")
  }

  // GET /user/edit
  def edit = TODO

  // PUT /user
  def update = TODO

  // DELETE /user
  def destroy = TODO

}
