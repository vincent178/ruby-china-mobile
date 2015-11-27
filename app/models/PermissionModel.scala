package models

import libs.rbp.PermissionTrait

class PermissionModel {
}

object ReadPermission extends PermissionTrait {
  val name = "read"
}

object ModifyPermission extends PermissionTrait {
  val name = "modify"
}

