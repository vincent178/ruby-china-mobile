package models

import models.database.{ReportEntity, Reports}
import models.database.ReportsDatabase._
import org.joda.time.LocalDate
import org.joda.time.format.DateTimeFormat
import play.api.Play.current
import play.api.db.slick.Config.driver.simple._
import play.api.db.slick._

object ReportsModel {
  val dateFormatter = DateTimeFormat.forPattern("yyyy-MM-dd")

  implicit val dateColumnType = MappedColumnType.base[LocalDate, String]({ dateFormatter.print(_) }, { dateFormatter.parseLocalDate })

  type Q = Query[Reports, ReportEntity, Seq]

  def getWorldsList: Seq[String] = DB.withSession { implicit session => reports.groupBy(_.world).map(_._1).sorted.run }

  def getReports(offset: Int, limit: Int, fromDate: Option[String], toDate: Option[String], world: Option[String], field: Option[String], sort: Option[String]) =
    DB.withSession { implicit session => getFilteredQuery(fromDate, toDate, world).sortBy(getReportSortField(_, field, sort)).drop(offset * limit).take(limit).run }

  def getTotalReports(fromDate: Option[String], toDate: Option[String], world: Option[String]) =
    DB.withSession { implicit session => getFilteredQuery(fromDate, toDate, world).length.run }

  def getSumDetected(fromDate: Option[String], toDate: Option[String], world: Option[String]) =
    DB.withSession { implicit session => getFilteredQuery(fromDate, toDate, world).map(_.detected).sum.run }

  def getSumBanned(fromDate: Option[String], toDate: Option[String], world: Option[String]) =
    DB.withSession { implicit session => getFilteredQuery(fromDate, toDate, world).map(_.banned).sum.run }

  def getSumDeleted(fromDate: Option[String], toDate: Option[String], world: Option[String]) =
    DB.withSession { implicit session => getFilteredQuery(fromDate, toDate, world).map(_.deleted).sum.run }

  private[this] def getReportSortField(rep: Reports, field: Option[String], sort: Option[String]) = field.map {
      case "world" => rep.world
      case "date" => rep.date
      case "detected" => rep.detected
      case "banned" => rep.banned
      case "deleted" => rep.deleted
      case _ => rep.date
    } map {
      col =>
        sort.map {
          case "asc" => col.asc
          case _ => col.desc
        } getOrElse col.desc
    } getOrElse rep.date.desc

  private[this] def getFilteredQuery(fromDate: Option[String], toDate: Option[String], world: Option[String]) =
    Seq(
      filterRowBased[String, String](world, { case (row, w) => row.world === w }) _,
      filterRowBased[LocalDate, String](fromDate.map { dateFormatter.parseLocalDate }, { case (row, date) => row.date >= date }) _,
      filterRowBased[LocalDate, String](toDate.map { dateFormatter.parseLocalDate }, { case (row, date) => row.date <= date }) _
    ).foldLeft(reports.asInstanceOf[Q]) { case (query, filter) => filter(query) }

  private[this] def filterRowBased[I, C](inputOption: Option[I], filterColumn: (Reports, I) => Column[Boolean])(query: Q) =
    inputOption.map { input => query.filter(row => filterColumn(row, input)) } getOrElse query
}

