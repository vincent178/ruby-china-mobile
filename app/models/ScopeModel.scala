package models

import java.sql.Timestamp
import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.driver.JdbcProfile

import scala.concurrent.{Future, ExecutionContext}

case class Scope(id: Int, name: String, createdAt: Timestamp, updatedAt: Timestamp)

@Singleton
class ScopeModel @Inject()(dbConfigProvider: DatabaseConfigProvider)(implicit ex: ExecutionContext) {

  val dbConfig = dbConfigProvider.get[JdbcProfile]
  import dbConfig._
  import driver.api._

  class ScopeTable(tag: Tag) extends Table[Scope](tag, "scopes") {
    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
    def name = column[String]("name")
    def createdAt = column[Timestamp]("created_at")
    def updatedAt = column[Timestamp]("updated_at")

    def * = (id, name, createdAt, updatedAt) <> ((Scope.apply _).tupled, Scope.unapply)
  }

  val scopes = TableQuery[ScopeTable]

  def list: Future[Seq[Scope]] = db.run {
    scopes.result
  }
}
