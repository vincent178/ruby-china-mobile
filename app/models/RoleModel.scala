package models

import java.sql.Timestamp
import javax.inject.{Inject, Singleton}
import libs.rbp.RoleTrait
import play.api.db.slick.DatabaseConfigProvider
import play.api.libs.json._
import slick.driver.JdbcProfile
import scala.concurrent.{Future, ExecutionContext}

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




@Singleton
class RoleModel @Inject()(dbConfigProvider: DatabaseConfigProvider)(implicit ex: ExecutionContext) {

  val dbConfig = dbConfigProvider.get[JdbcProfile]
  import dbConfig._
  import driver.api._

  class RoleTable(tag: Tag) extends Table[Role](tag, "roles") {
    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
    def name = column[String]("name")
    def createdAt = column[Timestamp]("created_at")
    def updatedAt = column[Timestamp]("updated_at")

    def * = (id, name, createdAt, updatedAt) <> ((Role.apply _).tupled, Role.unapply)
  }

  val RoleQuery = TableQuery[RoleTable]


  def list: Future[Seq[Role]] = db.run {
    RoleQuery.result
  }
}
