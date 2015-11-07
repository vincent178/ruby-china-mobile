package models

case class Product(ean: Long, name: String, description: String)

object Product {
  var products = Set(
    Product(501025550797L, "Paperclips Large", "Large Plain Pack of 1000"),
    Product(501820624466L, "Giant Paperclips", "Giant Plain 51mm 100 pack"),
    Product(501830633281L, "Paperclip Giant Plain", "Giant Plain Pack of 1000"),
    Product(501183063129L, "No Tear Paper Clip", "No Tear Extra Large Pack of 1000"),
    Product(501822062446L, "Zebra Paperclips", "Zebra Length 28mm Assorted 150 Pack")
  )

  def findAll = products.toList.sortBy(_.ean)

  def findByEan(ean: Long) = products.find(_.ean == ean)

  def add(product: Product) = {
    products = products + product
  }
}