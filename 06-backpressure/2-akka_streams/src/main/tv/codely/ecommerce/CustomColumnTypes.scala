package tv.codely.ecommerce

import slick.jdbc.H2Profile.api._

import java.time.LocalDateTime
import java.time.format.{DateTimeFormatter, DateTimeFormatterBuilder}
import java.time.temporal.ChronoField

object CustomColumnTypes {
  private val customFormatter: DateTimeFormatter = new DateTimeFormatterBuilder()
    .appendPattern("yyyy-MM-dd HH:mm:ss")
    .appendFraction(ChronoField.MICRO_OF_SECOND, 0, 6, true)
    .toFormatter()

  implicit val localDateTimeColumnType: BaseColumnType[(LocalDateTime, String)] =
    MappedColumnType.base[(LocalDateTime, String), String](
      { case (localDateTime, offset) =>
        localDateTime.format(customFormatter) + offset
      },
      string => {
        val parts                      = string.splitAt(string.lastIndexWhere(c => c == '+' || c == '-'))
        val (dateTimePart, offsetPart) = (parts._1, parts._2)
        (LocalDateTime.parse(dateTimePart, customFormatter), offsetPart)
      }
    )
}
