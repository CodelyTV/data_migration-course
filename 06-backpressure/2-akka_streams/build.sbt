Settings.settings

libraryDependencies := Dependencies.all

resolvers += "Akka library repository".at("https://repo.akka.io/maven")

val AkkaVersion = "2.9.4"

libraryDependencies ++= Seq(
  "com.typesafe.akka" %% "akka-stream" % AkkaVersion,
  "com.lightbend.akka" %% "akka-stream-alpakka-slick" % "8.0.0",
  "org.postgresql" % "postgresql" % "42.7.3",
  "org.slf4j" % "slf4j-api" % "2.0.12",
  "ch.qos.logback" % "logback-classic" % "1.5.6"
)

SbtAliases.aliases.flatMap { case (alias, command) =>
  addCommandAlias(alias, command)
}
