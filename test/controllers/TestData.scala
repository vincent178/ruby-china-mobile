package controllers

import models.database.ReportEntity
import play.api.libs.json.{JsNumber, Json, JsString, JsArray}
import org.joda.time.LocalDate

object TestData {
  val inputData = Seq(
    ReportEntity("de1", new LocalDate("2014-07-01"), 10, 4, 1),
    ReportEntity("de1", new LocalDate("2014-07-02"), 12, 2, 0),
    ReportEntity("en2", new LocalDate("2014-07-03"), 8, 1, 1),
    ReportEntity("en2", new LocalDate("2014-07-04"), 14, 5, 3),
    ReportEntity("ua", new LocalDate("2014-07-05"), 10, 3, 2),
    ReportEntity("ru", new LocalDate("2014-07-06"), 4, 0, 0),
    ReportEntity("dk", new LocalDate("2014-07-07"), 2, 2, 1))

  val expectedWorldsList = JsArray(Seq(JsString("de1"), JsString("dk"), JsString("en2"), JsString("ru"), JsString("ua")))

  val expectedReportsAll = Json.obj(
    "rows" -> JsArray(Seq(
      Json.obj("world" -> "dk", "date" -> "2014-07-07", "detected" -> 2, "banned" -> 2, "deleted" -> 1),
      Json.obj("world" -> "ru", "date" -> "2014-07-06", "detected" -> 4, "banned" -> 0, "deleted" -> 0),
      Json.obj("world" -> "ua", "date" -> "2014-07-05", "detected" -> 10, "banned" -> 3, "deleted" -> 2),
      Json.obj("world" -> "en2", "date" -> "2014-07-04", "detected" -> 14, "banned" -> 5, "deleted" -> 3),
      Json.obj("world" -> "en2", "date" -> "2014-07-03", "detected" -> 8, "banned" -> 1, "deleted" -> 1),
      Json.obj("world" -> "de1", "date" -> "2014-07-02", "detected" -> 12, "banned" -> 2, "deleted" -> 0),
      Json.obj("world" -> "de1", "date" -> "2014-07-01", "detected" -> 10, "banned" -> 4, "deleted" -> 1)
    )),
    "totalRows" -> JsNumber(7),
    "totalDetected" -> JsNumber(60),
    "totalBanned" -> JsNumber(17),
    "totalDeleted" -> JsNumber(8))

  val expectedReportsWithDateAndSort = Json.obj(
    "rows" -> JsArray(Seq(
      Json.obj("world" -> "en2", "date" -> "2014-07-03", "detected" -> 8, "banned" -> 1, "deleted" -> 1),
      Json.obj("world" -> "de1", "date" -> "2014-07-02", "detected" -> 12, "banned" -> 2, "deleted" -> 0),
      Json.obj("world" -> "en2", "date" -> "2014-07-04", "detected" -> 14, "banned" -> 5, "deleted" -> 3)
    )),
    "totalRows" -> JsNumber(3),
    "totalDetected" -> JsNumber(34),
    "totalBanned" -> JsNumber(8),
    "totalDeleted" -> JsNumber(4))

  val expectedReportsWithWorld = Json.obj(
    "rows" -> JsArray(Seq(Json.obj("world" -> "ua", "date" -> "2014-07-05", "detected" -> 10, "banned" -> 3, "deleted" -> 2))),
    "totalRows" -> JsNumber(1),
    "totalDetected" -> JsNumber(10),
    "totalBanned" -> JsNumber(3),
    "totalDeleted" -> JsNumber(2))
}
