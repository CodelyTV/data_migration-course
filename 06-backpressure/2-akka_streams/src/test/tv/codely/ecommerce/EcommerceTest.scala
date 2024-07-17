package tv.codely.ecommerce

import org.scalatest.wordspec.AnyWordSpec
import org.scalatest.matchers.should._

final class EcommerceTest extends AnyWordSpec with Matchers {
  "Ecommerce" should {
    "greet" in {
      val ecommerce = new Ecommerce

      val nameToGreet = "Codely"
      val greeting    = ecommerce.greet(nameToGreet)

      greeting shouldBe "Hello " + nameToGreet
    }
  }
}
