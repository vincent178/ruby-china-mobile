package helpers

import views.html.helper
import play.api.Logger

object PostBody {

  def apply(pairs: Map[String, String]): String = {

    val rawString = pairs.foldLeft("") { (s: String, pair: (String, String)) =>
      s + pair._1 + "=" + pair._2 + "&"
    }
    val encodeString = helper.urlEncode(rawString)

    Logger.debug("[Object PostBody][def apply] rawString: " + rawString)
    Logger.debug("[Object PostBody][def apply] encodeString: " + encodeString)

    encodeString
  }
}
