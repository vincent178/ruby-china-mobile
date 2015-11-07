package controllers

import org.joda.time.DateTime
import play.api.mvc._

case class Topic(val title: String, val userName: String, val nodeName: String, val createdAt: DateTime)


object TopicsController extends Controller {

  def init = Action { implicit request =>
    Ok(views.html.topics.init())
  }

  def index = Action { implicit request =>

    val topics = Seq(
      Topic("[广州][2015年10月28日 19:00] GZRUBY 第 27 次聚会 [Post RubyConf 专场]", "allenfantasy", "线下活动", new DateTime("2015-09-13T21:39:45.618-08:00")),
      Topic("欢迎 3 位新的 Ruby China 社区管理员", " huacnlee", "公告", new DateTime("2015-10-13T21:39:45.618-08:00")),
      Topic("RubyConf China 2015 大会照片收集贴", "lgn21st", "RubyConf", new DateTime("2004-12-13T21:39:45.618-08:00"))
    )
    Ok(views.html.topics.index(topics))
  }
}
