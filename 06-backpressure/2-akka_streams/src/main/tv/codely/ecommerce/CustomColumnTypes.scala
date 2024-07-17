package tv.codely.ecommerce

import slick.jdbc.H2Profile.api._

import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

object CustomColumnTypes {
  private val customFormatter: DateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSSSSS")

  implicit val localDateTimeColumnType: BaseColumnType[(LocalDateTime, String)] =
    MappedColumnType.base[(LocalDateTime, String), String](
      { case (localDateTime, offset) =>
        localDateTime.format(customFormatter) + offset
      },
      string => {
        val dateTimePart = string.substring(0, 26)
        val offsetPart   = string.substring(26)
        (LocalDateTime.parse(dateTimePart, customFormatter), offsetPart)
      }
    )
}
