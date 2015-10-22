package controllers

import play.api.mvc._

// current_sign_in_at current_sign_in_ip
// last_sign_in_at   last_sign_in_ip

// id, email, encrypted_password

object RegistrationsController extends Controller {

  // GET /user/sign_up
  def index = Action {
    Ok(views.html.registrations.index())
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
