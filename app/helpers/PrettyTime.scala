package helpers

import org.joda.time.{DateTime, Duration}
import play.api.Logger

object PrettyTime {
  val SECOND = 1
  val MINUTE = SECOND * 60
  val HOUR = MINUTE * 60
  val DAY = HOUR * 24
  val MONTH = DAY * 30
  val YEAR = MONTH * 12

  def apply(pastDateTime: DateTime, currentDateTime: DateTime = new DateTime()) = {

    val duration = new Duration(pastDateTime, currentDateTime)
    val intevals = duration.getStandardSeconds

    Logger.debug("TIME INTEVALS: " + intevals.toString)

    intevals match {
      case lessThanSecond if lessThanSecond <= SECOND
        =>  "刚刚"
      case lessThanMinute if lessThanMinute <= MINUTE
        => (lessThanMinute / SECOND).toString + " 秒以前"
      case lessThanHour if lessThanHour <= HOUR
        => (lessThanHour / MINUTE).toString + " 分钟以前"
      case lessThanDay if lessThanDay <= DAY
        => (lessThanDay / HOUR).toString + " 小时以前"
      case lessThanMonth if lessThanMonth <= MONTH
        => (lessThanMonth / DAY).toString + " 天以前"
      case lessThanYear if lessThanYear <= YEAR
        => (lessThanYear / MONTH).toString + " 月以前"
      case biggerThanYear if biggerThanYear > YEAR
        => (biggerThanYear / YEAR).toString + " 年以前"
    }
  }
}
