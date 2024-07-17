package tv.codely.ecommerce

import akka.Done
import akka.actor.ActorSystem
import akka.stream.alpakka.slick.scaladsl._
import akka.stream.scaladsl.{Flow, Sink}
import slick.jdbc.PostgresProfile.api._
import tv.codely.ecommerce.tables.ShopUsersTable

import scala.concurrent.Future

object Importer {
  def main(args: Array[String]): Unit = {
    implicit val system: ActorSystem   = ActorSystem()
    implicit val session: SlickSession = SlickSession.forConfig("ecommerce")
    import system.dispatcher

    system.registerOnTermination(session.close())

    val done: Future[Done] =
      Slick
        .source(TableQuery[ShopUsersTable].result)
        .via(Flow[ShopUsersTable#TableElementType].map { user =>
          println(s"Processing user: ${user._2}: ${user._1}")

			user._1
        })
        .via(
          Slick.flow { userId: String =>
            for {
              _ <- DBIO.successful(println(s"Processing user ID: $userId"))
              totalReviews <- sql"""
                SELECT COALESCE(COUNT(*), 0) AS total
                FROM shop.product_reviews
                WHERE user_id = $userId::uuid
              """.as[Int].headOption.map(_.getOrElse(0))
              _ <- DBIO.successful(println(s"Total reviews for user $userId: $totalReviews"))
              updatedRows <- sqlu"""
                UPDATE retention.users
                SET total_reviews = $totalReviews
                WHERE id = $userId::uuid
              """
              _ <- DBIO.successful(println(s"Updated rows: $updatedRows"))
            } yield updatedRows
          }
        )
        .runWith(Sink.ignore)

    done.onComplete { tryResult =>
      system.terminate()

      if (tryResult.isFailure) {
        println("ERROR")
        println(tryResult.failed.get)

        System.exit(1)
      }
    }
  }
}
