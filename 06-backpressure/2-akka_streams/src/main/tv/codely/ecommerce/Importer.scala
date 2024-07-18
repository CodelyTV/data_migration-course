package tv.codely.ecommerce

import akka.actor.ActorSystem
import akka.stream.alpakka.slick.scaladsl._
import akka.stream.scaladsl.{Flow, Sink}
import com.typesafe.config.ConfigFactory
import slick.jdbc.PostgresProfile.api._
import tv.codely.ecommerce.tables.ShopUsersTable

object Importer {
  def main(args: Array[String]): Unit = {
    implicit val system: ActorSystem   = ActorSystem("mySystem", ConfigFactory.load())
    implicit val session: SlickSession = SlickSession.forConfig("ecommerce")
    import system.dispatcher

    system.registerOnTermination(session.close())

    case class UserReviews(userId: String, totalReviews: Int)

    val selectTotalReviewsFlow = Flow[String].mapAsync(parallelism = 2) { userId =>
//      Thread.sleep(1000)

      session.db.run(
        for {
          _ <- DBIO.successful(println(s"Processing user ID: $userId"))
          totalReviews <- sql"""
            SELECT COALESCE(COUNT(*), 0) AS total
            FROM shop.product_reviews
            WHERE user_id = $userId::uuid
          """.as[Int].headOption.map(_.getOrElse(0))
          _ <- DBIO.successful(println(s"Total reviews for user $userId: $totalReviews"))
        } yield UserReviews(userId, totalReviews)
      )
    }

    val updateSink = Sink.foreach[UserReviews] { userReviews =>
//      Thread.sleep(2000)

      session.db.run(
        for {
          updatedRows <- sqlu"""
            UPDATE retention.users
            SET total_reviews = ${userReviews.totalReviews}
            WHERE id = ${userReviews.userId}::uuid
          """
          _ <- DBIO.successful(println(s"Updated rows: $updatedRows"))
        } yield updatedRows
      )
    }

    Slick
      .source(TableQuery[ShopUsersTable].result)
      .via(Flow[ShopUsersTable#TableElementType].map { user =>
        println(s"Processing user: ${user._2}: ${user._1}")
        user._1
      })
      .via(selectTotalReviewsFlow)
      .runWith(updateSink)
      .onComplete { tryResult =>
        system.terminate()

        if (tryResult.isFailure) {
          println("ERROR")
          println(tryResult.failed.get)

          System.exit(1)
        }
      }
  }
}
