package models

import javax.inject.Inject

import play.api.db.slick.DatabaseConfigProvider
import slick.driver.JdbcProfile

import scala.concurrent.ExecutionContext

class ScopeRoleModel @Inject()(dbConfigProvider: DatabaseConfigProvider)(implicit ex: ExecutionContext) {

  private val dbProfile = dbConfigProvider.get[JdbcProfile]
  import dbProfile._
  import driver.api._

  private class ScopeRoleTable(tag: Tag) extends Table[(Int, Int)](tag, "scope_role") {
    def scopeId = column[Int]("scope_id")
    def roleId = column[Int]("role_id")

    def * = (scopeId, roleId)
  }
}
