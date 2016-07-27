import React, { Component } from 'react';

import { fetchUserToken } from '../../actions/application';
import Items from '../../constants/items';
import address from '../../constants/address'
import SpinnerCircle from '../shared/spinner-circle';
import styles from './login.css';

// component 保存着自己的 state, 例如 登录加载, 登录错误
// 好处就是不会污染全局的 state, 不用 state 的清理
// 不增加全局 state 的复杂度
export default class Login extends Component {

  constructor() {
    super();
    this.state = {
      isSubmitting: false,
      errorMessage: ""
    };
  }

  handleSubmit() {
    if (this.state.isSubmitting === false) {
      const { dispatch } = this.props;
      this.setState({ isSubmitting: true });
      dispatch(fetchUserToken(this.username || "", this.password || ""))
        .then( res => {
          this.setState({
            isSubmitting: false,
            errorMessage: res.errorMessage
          });
        });
    }
  }

  handleInput(type, e) {

    switch (type) {
      case Items.USERNAME:
        this.username = e.target.value;
        break;
      case Items.PASSWORD:
        this.password = e.target.value;
        break;
    }
  }

  render() {

    return (
      <div className={styles.loginContainer}>

        <h1 className={styles.hero}>Ruby China</h1>

        <input
          type="text"
          placeholder="用户名或邮箱"
          onChange={this.handleInput.bind(this, Items.USERNAME)}
        />

        <input
          type="password"
          placeholder="密码"
          onChange={this.handleInput.bind(this, Items.PASSWORD)}
        />

        <button className={styles.loginButton} onClick={this.handleSubmit.bind(this)}>
          {
            this.state.isSubmitting ?
              <SpinnerCircle width={26} /> :
              "登录"
          }
        </button>

        <div className={styles.error}>
          {
            this.state.errorMessage ?
              this.state.errorMessage :
              null
          }
        </div>
      </div>
    );
  }
}