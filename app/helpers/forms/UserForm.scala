package helpers.forms

import play.api.data._
import play.api.data.Forms._

case class UserData(email: String, password: String)

object UserForm {
  val userForm = Form(
    mapping(
      "email" -> email,
      "passwordd" -> nonEmptyText(minLength = 6)
    )(UserData.apply)(UserData.unapply)
  )
}
