import React, { Component } from 'react';
import Items from '../../constants/items';
import address from '../../constants/address'
import { getUserToken, dismissError } from '../../actions/application';
import SpinnerCircle from '../shared/spinner-circle';

import styles from './login.css';

// component 保存着自己的 state, 例如 登录加载, 登录错误
// 好处就是不会污染全局的 state, 不用 state 的清理
// 不增加全局 state 的复杂度

export default class Login extends Component {

  constructor() {
    super();
    this.state = {
      isSubmitting: false
    };
  }

  componentDidMount() {
    this.username = "";
    this.password = "";
  }

  handleSubmit() {
    this.setState({isSubmitting: true})
  }

  handleInput(type, e) {

    if (type === Items.USERNAME) {
      this.username = e.target.value;
    }

    if (type === Items.PASSWORD) {
      this.password = e.target.value;
    }
  }

  handleFocus() {
    const { dispatch } = this.props;
  }

  handleBlur() {
    const { dispatch } = this.props;
  }

  render() {

    return (
      <div className={styles.loginContainer}>

        <h1 className={styles.hero}>Ruby China</h1>

        <input
          type="text"
          placeholder="手机号码,邮箱或用户名"
          onChange={this.handleInput.bind(this, Items.USERNAME)}
          onFocus={this.handleFocus.bind(this)}
          onBlur={this.handleBlur.bind(this)}
        />

        <input
          type="password"
          placeholder="密码"
          onChange={this.handleInput.bind(this, Items.PASSWORD)}
          onFocus={this.handleFocus.bind(this)}
          onBlur={this.handleBlur.bind(this)}
        />

        <button className={styles.loginButton} onClick={this.handleSubmit.bind(this)}>
          {
            this.state.isSubmitting ?
              <SpinnerCircle width={26} /> :
              "登录"
          }
        </button>

        <div className={styles.error}>
          Sorry, your password was incorrect. Please double-check your password.
        </div>
      </div>
    );
  }
}