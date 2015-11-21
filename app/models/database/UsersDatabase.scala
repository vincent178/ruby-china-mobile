package models.database

import java.sql.Timestamp
import play.api.db.slick.Config.driver.simple._
import play.api.Play.current
import scala.concurrent.ExecutionContext.Implicits.global


object UsersDatabase {
  val users = TableQuery[Users]
}

case class UserEntity(id: Option[Int] = None,
                      email: String,
                      username: Option[String] = None,
                      avatarUrl: Option[String] = None,
                      createdAt: Option[Timestamp] = None,
                      updatedAt: Option[Timestamp] = None)

class Users(tag: Tag) extends Table[UserEntity](tag, "users") {
  def id = column[Int]("id", O.NotNull, O.PrimaryKey, O.AutoInc)
  def email = column[String]("email", O.NotNull)
  def username = column[String]("username", O.NotNull)
  def avatarUrl = column[String]("avatar_url")
  def createdAt = column[Timestamp]("created_at", O.NotNull, O.DBType("timestamp default now()"))
  def updatedAt = column[Timestamp]("updated_at", O.NotNull, O.DBType("timestamp default now()"))

  def * = (id.?, email, username.?, avatarUrl.?, createdAt.?, updatedAt.?) <> (UserEntity.tupled, UserEntity.unapply)
}