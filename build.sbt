name := "scala-china"

version := "0.1.3"

// Scala Version, Play supports both 2.10 and 2.11
scalaVersion := "2.11.2"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

val akkaVersion = "2.3.3"

resolvers += "rediscala" at "http://dl.bintray.com/etaty/maven"

// Dependencies
libraryDependencies ++= Seq(
  filters,ws,
  cache,
  // WebJars (i.e. client-side) dependencies
  "org.webjars" % "requirejs" % "2.1.14",
  "org.webjars" % "underscorejs" % "1.6.0",
  "org.webjars" % "jquery" % "2.1.1",
  "org.webjars" % "bootstrap" % "3.2.0" exclude("org.webjars", "jquery"),
  "org.webjars" % "angularjs" % "1.3.0-beta.13" exclude("org.webjars", "jquery"),
  "org.webjars" % "angular-ui-bootstrap" % "0.11.0-2" exclude("org.webjars", "jquery"),
  "org.webjars" % "ng-table" % "0.3.3" exclude("org.webjars", "angularjs"),
  "org.scala-lang.modules" %% "scala-async" % "0.9.1",
  "joda-time" % "joda-time" % "2.3",
  "org.mindrot"  % "jbcrypt"   % "0.3m",
  "net.sf.barcode4j" % "barcode4j" % "2.0",
  "com.etaty.rediscala" %% "rediscala" % "1.5.0",
  // Database
  "com.typesafe.play" %% "play-slick" % "0.8.0-RC1",
  "mysql" % "mysql-connector-java" % "5.1.31",
  // test
  "org.scalatest" %% "scalatest" % "2.2.0" % "test",
  "com.h2database" % "h2" % "1.4.179" % "test"
)

//
// Scala Compiler Options
// If this project is only a subproject, add these to a common project setting.
 //
scalacOptions ++= Seq(
//  "-target:jvm-1.7",
  "-encoding", "UTF-8",
  "-deprecation", // warning and location for usages of deprecated APIs
  "-feature", // warning and location for usages of features that should be imported explicitly
  "-unchecked", // additional warnings where generated code depends on assumptions
  "-Xlint", // recommended additional warnings
  "-Ywarn-adapted-args", // Warn if an argument list is modified to match the receiver
  "-Ywarn-inaccessible",
  "-Ywarn-dead-code"
)
 
// Configure the steps of the asset pipeline (used in stage and dist tasks)
// rjs = RequireJS, uglifies, shrinks to one file, replaces WebJars with CDN
// digest = Adds hash to filename
// gzip = Zips all assets, Asset controller serves them automatically when client accepts them
pipelineStages := Seq(rjs, digest, gzip)

// RequireJS with sbt-rjs (https://github.com/sbt/sbt-rjs#sbt-rjs) 
RjsKeys.paths += ("jsRoutes" -> ("/jsroutes" -> "empty:"))

//RjsKeys.mainModule := "main"

// Asset hashing with sbt-digest (https://github.com/sbt/sbt-digest)
// ~~~
// md5 | sha1
//DigestKeys.algorithms := "md5"
//includeFilter in digest := "..."
//excludeFilter in digest := "..."

// HTTP compression with sbt-gzip (https://github.com/sbt/sbt-gzip)
// ~~~
// includeFilter in GzipKeys.compress := "*.html" || "*.css" || "*.js"
// excludeFilter in GzipKeys.compress := "..."

// JavaScript linting with sbt-jshint (https://github.com/sbt/sbt-jshint)
// ~~~
//JshintKeys.config := ".jshintrc"

includeFilter in (Assets, LessKeys.less) := "*.less"

excludeFilter in (Assets, LessKeys.less) := "_*.less"
