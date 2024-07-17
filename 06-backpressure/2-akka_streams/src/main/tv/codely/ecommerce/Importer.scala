package tv.codely.ecommerce

import akka.Done
import akka.actor.ActorSystem
import akka.stream.alpakka.slick.scaladsl._
import akka.stream.scaladsl.{Flow, Sink}
import slick.jdbc.H2Profile.api._
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
          println(s"Processing user: ${user._2}")
          user
        })
        .runWith(Sink.ignore)

    done.onComplete { _ =>
      system.terminate()
    }
  }
}
