package models

import java.sql.Timestamp

import com.google.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.driver.JdbcProfile
import scala.concurrent.{Future, ExecutionContext}




@Singleton
class Topics @Inject()(dbConfigProvider: DatabaseConfigProvider)(implicit ex: ExecutionContext) {

  val dbConfig = dbConfigProvider.get[JdbcProfile]
  import dbConfig._
  import driver.api._

  class TopicTable(tag: Tag) extends Table[Topic](tag, "topics") {

    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
    def title = column[String]("title")
    def content = column[String]("content")
    def userId = column[Int]("user_id")
    def createdAt = column[Timestamp]("created_at")
    def updatedAt = column[Timestamp]("updated_at")

    def * = (id, title, content, userId, createdAt, updatedAt) <> ((Topic.apply _).tupled, Topic.unapply)
  }

  val topics = TableQuery[TopicTable]

  def create(title: String, content: String, creatorId: Int) = db.run {
    (topics.map(t => (t.title, t.content, t.userId)) returning topics) += ((title, content, creatorId))
  }
}

case class Topic(id: Int, title: String, content: String, userId: Int, createdAt: Timestamp, updatedAt: Timestamp)
