package libs.rbp

import models.Role

trait ScopeTrait {

  val scopeName: String = this.getClass.toString

  val scopeRoles: Seq[Role]

}
