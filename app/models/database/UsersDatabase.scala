package models.database

import java.sql.Timestamp

import org.joda.time.DateTime

import play.api.db.slick.Config.driver.simple._
import play.api.Play.current
import scala.concurrent.ExecutionContext.Implicits.global


object UsersDatabase {
  val users = TableQuery[Users]
}

case class UserEntity(id: Option[Int] = None,
                      email: String,
                      encryptedPassword: String,
                      createdAt: Option[Timestamp] = None,
                      updatedAt: Option[Timestamp] = None)

class Users(tag: Tag) extends Table[UserEntity](tag, "users") {
  def id = column[Int]("id", O.NotNull, O.PrimaryKey, O.AutoInc)
  def email = column[String]("email", O.NotNull)
  def encryptedPassword = column[String]("encrypted_password", O.NotNull)
  def createdAt = column[Timestamp]("created_at", O.NotNull, O.DBType("timestamp default now()"))
  def updatedAt = column[Timestamp]("updated_at", O.NotNull, O.DBType("timestamp default now()"))

  def * = (id.?, email, encryptedPassword, createdAt.?, updatedAt.?) <> (UserEntity.tupled, UserEntity.unapply)
}


