package models

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

@Singleton
class Users @Inject()(dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {

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

  /**
    * Create user with information username, email, and avatarUrl.
    * Check database if the email has already exist before save it.
    * @param username
    * @param email
    * @param avatarUrl
    * @return
    */
  def create(username: String = "", email: String = "", avatarUrl: String = "") = {
    val userInsertAction = {
      users.filter(_.email === email).result.headOption.flatMap {
        case Some(user) =>
          Logger.info(s"User with $email has already exists!")
          DBIO.successful(user)

        case None =>
          users.map(u => (u.username, u.email, u.avatarUrl)) += ((username, email, avatarUrl))
      }
    }.transactionally

    db.run(userInsertAction)
  }

  def find(username: String) = {
    val selectQuery = for {
      u <- users if u.username === username
    } yield u

    db.run(selectQuery.result.headOption)
  }

  def list(): Future[Seq[User]] = db.run {
    users.result
  }
}

