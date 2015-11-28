package tables

import java.sql.Timestamp

import com.google.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.driver.JdbcProfile

case class Node(id: Int, name: String, summary: String, parentId: Int, depth: Int, createdAt: Timestamp, updatedAt: Timestamp)

@Singleton
class NodeModel @Inject()(dbConfigProvider: DatabaseConfigProvider) {

  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import driver.api._

  class NodeModel(tag: Tag) extends Table[Node](tag, "nodes") {
    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
    def name = column[String]("name")
    def summary = column[String]("summary")
    def parentId = column[Int]("parent_id")
    def depth = column[Int]("depth")
    def createdAt = column[Timestamp]("created_at")
    def updatedAt = column[Timestamp]("updated_at")

    def * = (id, name, summary, parentId, depth, createdAt, updatedAt) <> (Node.tupled, Node.unapply)
  }

  val nodes = TableQuery[NodeModel]
}
