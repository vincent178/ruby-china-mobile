package models

import java.sql.Timestamp
import libs.rbp.RoleTrait
import play.api.libs.json._

case class Role(id: Int, name: String, createdAt: Timestamp, updatedAt: Timestamp)

object Role {

  val allRoles = Seq(SuperAdminRole, AdminRole, ModeratorRole, MemberRole)

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

object SuperAdminRole extends RoleTrait {
  val name = "super_admin"
}

object AdminRole extends RoleTrait {
  val name = "admin"
}

object ModeratorRole extends RoleTrait {
  val name = "moderator"
}

object MemberRole extends RoleTrait {
  val name = "member"
}



