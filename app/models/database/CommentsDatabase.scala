package models.database

import java.sql.Timestamp

import play.api.db.slick.Config.driver.simple._

object CommentsDatabase {
  val comments = TableQuery[Comments]
}

case class CommentEntity(id: Option[Int] = None,
                         body: String,
                         bodyHtml: String,
                         userId: Int,
                         createdAt: Option[Timestamp] = None,
                         updatedAt: Option[Timestamp] = None)

class Comments(tag: Tag) extends Table[CommentEntity](tag, "comments") {
  def id = column[Int]("id", O.NotNull, O.PrimaryKey, O.AutoInc)
  def body = column[String]("body", O.NotNull)
  def bodyHtml = column[String]("body_html", O.NotNull)
  def userId = column[Int]("user_id", O.NotNull)
  def createdAt = column[Timestamp]("created_at", O.NotNull, O.DBType("timestamp default now()"))
  def updatedAt = column[Timestamp]("updated_at", O.NotNull, O.DBType("timestamp default now()"))

  def * = (id.?, body, bodyHtml, userId, createdAt.?, updatedAt.?) <> (CommentEntity.tupled, CommentEntity.unapply)
}

