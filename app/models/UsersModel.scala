//package models
//
//import models.database.{UsersDatabase, UserEntity}
//import models.database.UsersDatabase.users
//import play.api.Logger
//import play.api.db.slick._
//import play.api.Play.current
//
//
//object UsersModel {
//
//  def create(newUser: UserEntity) = {
//    DB.withSession { implicit session =>
//
//      users.filter(_.username === newUser.username)
//
//      val exists = (for (u <- users if u.username === newUser.username) yield u).exists
//      val insert = UserEntity.unapply(newUser).get <> (UserEntity.apply _ tupled, UserEntity.unapply)
//      for (u <- Query(insert) if !exists) yield u
//    }
//  }
//
//  def update(newUser: UserEntity) = {
//    DB.withSession { implicit session =>
//      val query = for { u <- users if u.username === newUser.username} yield u
//      query.update(newUser)
//    }
//  }
//
//}
