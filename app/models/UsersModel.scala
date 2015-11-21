package models

import models.database.{UsersDatabase, UserEntity}
import models.database.UsersDatabase.users
import play.api.db.slick.Config.driver.simple._
import play.api.db.slick._


object UsersModel {

  def create(newUser: UserEntity) = {
    DB.withSession { implicit session =>
      users += newUser
    }
  }
}
