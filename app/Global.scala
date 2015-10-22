import play.api.GlobalSettings
import play.api.mvc.WithFilters
import play.filters.gzip.GzipFilter
import controllers.LoggingFilter

object Global extends WithFilters(controllers.LoggingFilter, new GzipFilter(shouldGzip =
  (request, response) => {
    val contentType = response.headers.get("Content-Type")
    contentType.exists(_.startsWith("text/html")) || request.path.endsWith("jsroutes.js")
  }
)) with GlobalSettings
