package controllers

import models.database.ReportsDatabase._
import play.api.test._
import play.api.test.Helpers._
import org.specs2.mutable._
import org.specs2.execute.{Result, AsResult}
import play.api.db.slick._
import play.api.db.slick.Config.driver.simple._

abstract class WithDbData extends WithApplication(FakeApplication(additionalConfiguration = inMemoryDatabase())) {
  override def around[T: AsResult](callback: => T): Result = super.around {
    prepareDbWithData()
    callback
  }

  def prepareDbWithData() = DB.withSession {
    implicit session => reports ++= TestData.inputData
  }
}

class ReportSpec extends Specification {
  "Reports Controller" should {
    "on worldsList return list of worlds" in new WithDbData {
      val result = route(FakeRequest(GET, "/reports/worldsList")).get

      status(result) must equalTo(OK)
      contentType(result) must beSome("application/json")
      contentAsJson(result) mustEqual TestData.expectedWorldsList
    }

    "on reports return list of reports" in new WithDbData {
      val result = route(FakeRequest(GET, "/reports")).get

      status(result) must equalTo(OK)
      contentType(result) must beSome("application/json")
      contentAsJson(result) mustEqual TestData.expectedReportsAll
    }

    "on reports return list of reports with date filter and sort" in new WithDbData {
      val result = route(FakeRequest(GET, "/reports?fromDate=2014-07-02&toDate=2014-07-04&field=detected&sort=asc")).get

      status(result) must equalTo(OK)
      contentType(result) must beSome("application/json")
      contentAsJson(result) mustEqual TestData.expectedReportsWithDateAndSort
    }

    "on reports return list of reports with world filter" in new WithDbData {
      val result = route(FakeRequest(GET, "/reports?world=ua")).get

      status(result) must equalTo(OK)
      contentType(result) must beSome("application/json")
      contentAsJson(result) mustEqual TestData.expectedReportsWithWorld
    }
  }
}
