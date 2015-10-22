package helpers

import org.joda.time.{Period, DateTime}
import org.joda.time.format.{PeriodFormatterBuilder, PeriodFormatter}

object PrettyTime {

  def apply(pastDateTime: DateTime, currentDateTime: DateTime = new DateTime()) = {

    val formatter: PeriodFormatter = new PeriodFormatterBuilder()
      .appendSeconds().appendPrefix(" seconds ago\n")
      .appendMinutes().appendPrefix(" minutes ago\n")
      .appendHours().appendPrefix(" hours ago\n")
      .appendWeeks().appendPrefix(" days ago\n")
      .appendMonths().appendPrefix(" weeks ago\n")
      .appendYears().appendPrefix(" years ago\n")
      .printZeroNever()
      .toFormatter

    val period = new Period(pastDateTime, currentDateTime)
    formatter.print(period)
  }
}
