package controllers

import helpers.forms.UserForm.userForm
import models.database.UserEntity
import models.database.UsersDatabase._
import helpers.forms.UserForm

import play.Logger
import play.api.mvc._
import play.api.db.slick.Config.driver.simple._
import play.api.db.slick._
import play.api.Play.current
import org.joda.time.DateTime
import org.mindrot.jbcrypt.BCrypt

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
  def create = DBAction {implicit request =>

    userForm.bindFromRequest.fold(
      errors => {
        BadRequest(views.html.index())
      },
      user => {

        val encryptedPassword = BCrypt.hashpw(user.email, BCrypt.gensalt(12))
        val newUser = UserEntity(email = user.email, encryptedPassword = encryptedPassword)
        val userId = (users returning users.map(_.id)) += newUser

        Redirect("/").flashing("success" -> "User has successfully created")
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
