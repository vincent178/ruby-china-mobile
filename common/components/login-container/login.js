import React, { Component } from 'react';
import Items from '../../constants/items';
import address from '../../constants/address'
import { getUserToken, dismissError } from '../../actions/application';

import './login.css';

export default class Login extends Component {

  componentDidMount() {
    this.username = "";
    this.password = "";
  }

  handleClick() {
    const { dispatch } = this.props;
    dispatch(getUserToken(this.username, this.password));
  }

  handleUserInput(type, e) {

    if (type === Items.USERNAME) {
      this.username = e.target.value;
    }

    if (type === Items.PASSWORD) {
      this.password = e.target.value;
    }
  }

  handleFocus() {
    const { dispatch } = this.props;
    dispatch(dismissError());
  }

  render() {

    return (
      <div className="login-container">

        <h2>登录Ruby China</h2>

        {
          this.props.application.requestTokenError.length > 0 ?
            <div className="alert-error">{this.props.application.requestTokenError}</div> :
            null
        }

        <input
          type="text"
          className="form-input"
          placeholder="手机号码,邮箱或用户名"
          onChange={this.handleUserInput.bind(this, Items.USERNAME)}
          onFocus={this.handleFocus.bind(this)}
        />

        <input
          type="password"
          className="form-input"
          placeholder="密码"
          onChange={this.handleUserInput.bind(this, Items.PASSWORD)}
          onFocus={this.handleFocus.bind(this)}
        />

        {
          this.props.application.isRequestToken ?
            <button className="login-button" disabled><i className="fa fa-spinner fa-pulse fa-spin fa-3x fa-fw" /></button> :
            <button className="login-button" onClick={this.handleClick.bind(this)}>登录</button>
        }

      </div>
    );
  }
}