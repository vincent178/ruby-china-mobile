package controllers


import play.api.mvc._

object BarcodesController extends Controller {

  val ImageResolution = 144

  def barcode(ean: Long) = Action {

    val MineType = "image/png"

    try {

      val imageData = ean13BarCode(ean, MineType)
      Ok(imageData).as(MineType)
    } catch {

      case e: IllegalArgumentException =>
        BadRequest("Couldn't generate bar code. Error: " + e.getMessage)
    }
  }

  def ean13BarCode(ean: Long, mineType: String): Array[Byte] = {

    import java.awt.image.BufferedImage
    import java.io.ByteArrayOutputStream
    import org.krysalis.barcode4j.impl.upcean.EAN13Bean
    import org.krysalis.barcode4j.output.bitmap.BitmapCanvasProvider

    val output = new ByteArrayOutputStream
    val canvas = new BitmapCanvasProvider(
      output, mineType, ImageResolution, BufferedImage.TYPE_BYTE_BINARY, false, 0)
    val barcode = new EAN13Bean

    barcode.generateBarcode(canvas, ean.toString)
    canvas.finish

    output.toByteArray
  }
}