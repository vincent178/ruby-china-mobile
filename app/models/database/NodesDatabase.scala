import java.sql.Timestamp
import play.api.db.slick.Config.driver.simple._

import scala.slick.lifted.Tag

case class NodeEntity(id: Option[Int] = None,
                      name: String,
                      summary: String,
                      topicsCount: Option[Int] = None,
                      createdAt: Option[Timestamp] = None,
                      updatedAt: Option[Timestamp] = None)


class Nodes(tag: Tag) extends Table[NodeEntity](tag, "nodes") {
  def id = column[Int]("id", O.NotNull, O.PrimaryKey, O.AutoInc)
  def name = column[String]("name", O.NotNull)
  def summary = column[String]("summary", O.NotNull)
  def topicsCount = column[Int]("topics_count", O.NotNull, O.DBType("int(11) default 0"))
  def createdAt = column[Timestamp]("created_at", O.NotNull, O.DBType("timestamp default now()"))
  def updatedAt = column[Timestamp]("updated_at", O.NotNull, O.DBType("timestamp default now()"))

  def * = (id.?, name, summary, topicsCount.?, createdAt.?, updatedAt.?) <> (NodeEntity.tupled, NodeEntity.unapply)
}
