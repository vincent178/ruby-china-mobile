package tables

import java.sql.Timestamp
import javax.inject.{ Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.driver.JdbcProfile

import scala.concurrent.{Future, ExecutionContext}

case class User(id: Int,
                email: String,
                username: Option[String] = None,
                avatarUrl: Option[String] = None,
                createdAt: Timestamp,
                updatedAt: Timestamp)


@Singleton
class UserModel @Inject()(dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {

  private val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import driver.api._

  private class UserTable(tag: Tag) extends Table[User](tag, "users") {
    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
    def email = column[String]("email" )
    def username = column[String]("username")
    def avatarUrl = column[String]("avatar_url")
    def createdAt = column[Timestamp]("created_at")
    def updatedAt = column[Timestamp]("updated_at")

    def * = (id, email, username.?, avatarUrl.?, createdAt, updatedAt) <> (User.tupled, User.unapply)
  }

  private val users = TableQuery[UserTable]

  def list(): Future[Seq[User]] = db.run {
    users.result
  }
}
