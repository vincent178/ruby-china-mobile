package models

import java.sql.Timestamp
import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.driver.JdbcProfile

import scala.concurrent.{Future, ExecutionContext}

case class Role(id: Int, name: String, createdAt: Timestamp, updatedAt: Timestamp)

@Singleton
class RoleModel @Inject()(dbConfigProvider: DatabaseConfigProvider)(implicit ex: ExecutionContext) {


  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import driver.api._

  private class RoleTable(tag: Tag) extends Table[Role](tag, "roles") {
    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
    def name = column[String]("name")
    def createdAt = column[Timestamp]("created_at")
    def updatedAt = column[Timestamp]("updated_at")

    def * = (id, name, createdAt, updatedAt) <> (Role.tupled, Role.unapply
  }

  private val roles = TableQuery[RoleTable]


  def list: Future[Seq[Role]] = db.run {
    roles.result
  }
}
