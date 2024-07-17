package tv.codely.ecommerce.tables

import slick.jdbc.H2Profile.api._
import tv.codely.ecommerce.CustomColumnTypes.localDateTimeColumnType

import java.time.LocalDateTime
import java.util.UUID

class ShopUsersTable(tag: Tag)
    extends Table[(UUID, String, String, String, (LocalDateTime, String))](tag, Some("shop"), "users") {
  def id: Rep[UUID]                            = column[UUID]("id")
  def name: Rep[String]                        = column[String]("name")
  def email: Rep[String]                       = column[String]("email")
  def profile_picture: Rep[String]             = column[String]("profile_picture")
  def created_at: Rep[(LocalDateTime, String)] = column[(LocalDateTime, String)]("created_at")
  override def *                               = (id, name, email, profile_picture, created_at)
}
