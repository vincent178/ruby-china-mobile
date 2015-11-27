package models

import libs.rbp.ScopeTrait


// node should have parentNode, in a word, the node model is a Tree

case class Node(name: String, summary: String) extends ScopeTrait {

  val scopeRoles = Seq()

}
