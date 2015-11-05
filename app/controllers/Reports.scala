package controllers

import actionbuilders.LoggingAction
import models.ReportsModel
import models.database.ReportEntity
import play.api.Routes
import play.api.mvc._
import play.api.mvc.Action
import play.api.libs.json._
import scala.concurrent.Future



object Reports extends Controller {

  def index = LoggingAction(Ok(views.html.home.index()))


  /**
   * Method return rows from DB for reports with specified limit, and filters like from date, to date, which world and how to sort
   */
  def reports(offset: Int, limit: Int, fromDate: Option[String], toDate: Option[String], world: Option[String], field: Option[String], sort: Option[String]) = Action { implicit request =>
    implicit val reportEntryWrites = Json.writes[ReportEntity]

    Ok(Json.obj(
      "rows" -> Json.toJson(ReportsModel.getReports(offset, limit, fromDate, toDate, world, field, sort)),
      "totalRows" -> Json.toJson(ReportsModel.getTotalReports(fromDate, toDate, world)),
      "totalDetected" -> Json.toJson(ReportsModel.getSumDetected(fromDate, toDate, world)),
      "totalBanned" -> Json.toJson(ReportsModel.getSumBanned(fromDate, toDate, world)),
      "totalDeleted" -> Json.toJson(ReportsModel.getSumDeleted(fromDate, toDate, world))))
  }

  /**
   * Method returns distinct list of worlds in report table in DB, like: de2, dk1, en8, etc
   */
  def worldsList = Action { request => Ok(Json.toJson(ReportsModel.getWorldsList)) }

  def jsRoutes(varName: String = "jsRoutes") = Action { implicit request =>
    Ok(Routes.javascriptRouter(varName)(
      routes.javascript.Reports.reports,
      routes.javascript.Reports.worldsList
    )).as(JAVASCRIPT)
  }
}

