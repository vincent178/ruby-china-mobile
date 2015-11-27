package models

import java.sql.Timestamp
import play.api.libs.json._

case class Role(id: Int, name: String, createdAt: Timestamp, updatedAt: Timestamp)

object Role {

  implicit object RoleFormat extends Writes[Role] {
    def writes(role: Role): JsValue = {
      val roleSeq = Seq(
        "id" -> JsNumber(role.id),
        "name" -> JsString(role.name),
        "createdAt" -> JsString(role.createdAt.toString),
        "updatedAt" -> JsString(role.updatedAt.toString)
      )
      JsObject(roleSeq)
    }
  }
}

