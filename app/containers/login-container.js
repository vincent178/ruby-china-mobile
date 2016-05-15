import React, { Component } from 'react';
import Items from '../constants/items';

export default class LoginContainer extends Component {

  componentDidMount() {
    this.username = "";
    this.password = "";
  }

  handleClick() {
    debugger;
  }

  handleUserInput(type, e) {

    if (type === Items.USERNAME) {
      this.username = e.target.value;
    }

    if (type === Items.PASSWORD) {
      this.password = e.target.value;
    }
  }

  render() {
    return (
      <div className="login-container">
        <h2>登录Ruby China</h2>

        <input
          type="text"
          className="form-input"
          placeholder="手机号码,邮箱或用户名"
          onChange={this.handleUserInput.bind(this, Items.USERNAME)}
        />

        <input
          type="password"
          className="form-input"
          placeholder="密码"
          onChange={this.handleUserInput.bind(this, Items.PASSWORD)}
        />

        <button className="login-button" onClick={this.handleClick.bind(this)}>登录</button>
      </div>
    );
  }
}