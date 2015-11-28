package tables

import java.sql.Timestamp
import javax.inject.{ Inject, Singleton}
import libs.validation.Validation
import play.api.Logger
import play.api.db.slick.DatabaseConfigProvider
import slick.driver.JdbcProfile

import scala.concurrent.{Future, ExecutionContext}

// User model, the email should be the only field which can't modify
case class User(id: Int,
                email: String,
                username: Option[String] = None,
                avatarUrl: Option[String] = None,
                createdAt: Timestamp,
                updatedAt: Timestamp) extends Validation {

  validatesLengthOf("12321")
}

class UserBM(user: User) extends Validation {

  validatesLengthOf("12321")
  user



}


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

  def create(username: String = "", email: String = "", avatarUrl: String = "") = {
    val userInsertAction = {
      users.filter(_.username === username).result.headOption.flatMap {
        case Some(user) =>
          Logger.info("Hello world")
          DBIO.successful(user)

        case None =>
          users.map( u => (u.username, u.email, u.avatarUrl)) += (username, email, avatarUrl)
      }
    }.transactionally

    db.run(userInsertAction)
  }


  /**
    *
    * Create user method and verify all fields
    * @param username
    * @param email
    * @param avatarUrl
    */
  def createUser(username: String = "", email: String = "", avatarUrl: String = ""): Unit = {
  }


  def list(): Future[Seq[User]] = db.run {
    users.result
  }
}
