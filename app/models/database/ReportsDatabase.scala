package models.database

import models.ReportsModel
import ReportsModel._
import org.joda.time.LocalDate
import play.api.db.slick.Config.driver.simple._

object ReportsDatabase {
  val reports = TableQuery[Reports]
}

case class ReportEntity(world: String, date: LocalDate, detected: Int, banned: Int, deleted: Int)

class Reports(tag: Tag) extends Table[ReportEntity](tag, "report") {
  implicit val dateColumnType = MappedColumnType.base[LocalDate, String]({ dateFormatter.print(_) }, { dateFormatter.parseLocalDate })
  def world = column[String]("world", O.DBType("VARCHAR(5)"))
  def date = column[LocalDate]("date", O.DBType("DATE"))
  def detected = column[Int]("detected", O.Default(0))
  def banned = column[Int]("banned", O.Default(0))
  def deleted = column[Int]("deleted", O.Default(0))
  def pk = primaryKey("pk_entry", (world, date))
  def * = (world, date, detected, banned, deleted) <> (ReportEntity.tupled, ReportEntity.unapply)
}
