import sbt._

object Dependencies {
  private val prod = Seq(
    "com.github.nscala-time" %% "nscala-time" % "2.32.0",
    "com.lihaoyi"            %% "pprint"      % "0.9.0"
  )

  private val test = Seq(
    "org.scalatest" %% "scalatest" % "3.2.19",
    "org.scalamock" %% "scalamock" % "6.0.0"
  ).map(_ % Test)

  val all = prod ++ test
}
