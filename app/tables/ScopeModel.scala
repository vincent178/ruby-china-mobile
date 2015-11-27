package tables

import java.sql.Timestamp
import javax.inject.{Inject, Singleton}

import models.Role
import play.api.db.slick.DatabaseConfigProvider
import slick.driver.JdbcProfile
import scala.concurrent.{ExecutionContext, Future}


@Singleton
class ScopeModel @Inject()(dbConfigProvider: DatabaseConfigProvider)(implicit ex: ExecutionContext) {

  val dbConfig = dbConfigProvider.get[JdbcProfile]
  import dbConfig._
  import driver.api._

  class ScopeTable(tag: Tag) extends Table[Role](tag, "roles") {
    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
    def name = column[String]("name")
    def createdAt = column[Timestamp]("created_at")
    def updatedAt = column[Timestamp]("updated_at")

    def * = (id, name, createdAt, updatedAt) <> ((Role.apply _).tupled, Role.unapply)
  }

  val ScopeQuery = TableQuery[ScopeTable]


  def list: Future[Seq[Role]] = db.run {
    ScopeQuery.result
  }
}
