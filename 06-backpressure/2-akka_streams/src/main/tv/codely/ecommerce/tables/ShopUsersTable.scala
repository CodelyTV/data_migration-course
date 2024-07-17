package tv.codely.ecommerce.tables

import slick.jdbc.H2Profile.api._
import tv.codely.ecommerce.CustomColumnTypes.localDateTimeColumnType

import java.time.LocalDateTime

class ShopUsersTable(tag: Tag)
    extends Table[(String, String, String, String, (LocalDateTime, String))](tag, Some("shop"), "users") {
  def id: Rep[String]                                  = column[String]("id")
  def name: Rep[String]                                = column[String]("name")
  def email: Rep[String]                               = column[String]("email")
  private def profile_picture: Rep[String]             = column[String]("profile_picture")
  private def created_at: Rep[(LocalDateTime, String)] = column[(LocalDateTime, String)]("created_at")
  override def *                                       = (id, name, email, profile_picture, created_at)
}
