import React, { Component } from 'react';

export default class LoginContainer extends Component {

  handleClick() {
    console.log("onClick");
  }

  render() {
    return (
      <div className="login-container">
        <h2>登录Ruby China</h2>
        <input type="text" className="form-input" name="user[username]" placeholder="手机号码,邮箱或用户名"/>
        <input type="password" className="form-input" name="user[password]" placeholder="密码"/>

        <button className="login-button" onClick={this.handleClick.bind(this)}>登录</button>
      </div>
    );
  }
}