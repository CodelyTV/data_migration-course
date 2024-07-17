package tv.codely.ecommerce.tables

import slick.jdbc.H2Profile.api._
import tv.codely.ecommerce.CustomColumnTypes.localDateTimeColumnType

import java.time.LocalDateTime
import java.util.UUID

class RetentionUsersTable(tag: Tag)
	extends Table[(UUID, String, (LocalDateTime, String), (LocalDateTime, String), Int)](
		tag,
		Some("shop"),
		"users"
	) {
	def id: Rep[UUID]                                    = column[UUID]("id")
	def email: Rep[String]                               = column[String]("email")
	def last_activity_date: Rep[(LocalDateTime, String)] = column[(LocalDateTime, String)]("last_activity_date")
	def registration_date: Rep[(LocalDateTime, String)]  = column[(LocalDateTime, String)]("registration_date")
	def total_reviews: Rep[Int]                          = column[Int]("total_reviews")
	override def * = (id, email, last_activity_date, registration_date, total_reviews)
}
