package tables

import java.sql.Timestamp
import javax.inject.Inject

import models.Role
import play.api.db.slick.DatabaseConfigProvider
import slick.driver.JdbcProfile

import scala.concurrent.{Future, ExecutionContext}

class ScopeRoleTable @Inject()(dbConfigProvider: DatabaseConfigProvider, roleTable: RoleTable, scopeTable: ScopeTable)(implicit ex: ExecutionContext) {

  val dbProfile = dbConfigProvider.get[JdbcProfile]
  import dbProfile._
  import driver.api._

  class ScopeRoleTable(tag: Tag) extends Table[(Int, Int, Int, Timestamp, Timestamp)](tag, "scope_role") {
    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
    def scopeId = column[Int]("scope_id")
    def roleId = column[Int]("role_id")
    def createdAt = column[Timestamp]("created_at")
    def updatedAt = column[Timestamp]("updated_at")

    def * = (id, scopeId, roleId, createdAt, updatedAt)
  }

  val ScopeRoleQuery = TableQuery[ScopeRoleTable]

  def roleForScope: Future[Seq[Role]] = db.run {

    val crossJoin = for {
      ((r, sr), s) <- roleTable.RoleQuery joinLeft ScopeRoleQuery on (_.id === _.roleId) joinLeft scopeTable.ScopeQuery on (_._2.map(_.scopeId) === _.id)
    } yield r

    crossJoin.result
  }
}
