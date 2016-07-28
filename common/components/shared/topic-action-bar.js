import React, { Component } from 'react';
import Items from '../../constants/items';
import styles from "./topic-action-bar.css";

export default class TopicActionBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isPressed: false
    };
  }

  handleReplyStart(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({isPressed: true});
  }

  handleReplyEnd(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({isPressed: false});
  }

  clickReply(e) {
    e.preventDefault();
    this.setState({isPressed: true});
    setTimeout(() => {
      this.setState({isPressed: false});
    }, 300);
  }

  clickLike(e) {
    console.debug("[TopicActionBar] clickLike");
    e.preventDefault();
  }

  clickFollow(e) {
    console.debug("[TopicActionBar] clickFollow");
    e.preventDefault();
  }

  render() {

    return (
      <div className={styles.topicActionContainer}>

        <div>
          <i className="fa fa-reply" />
          <span>{this.props.replyCount}</span>
        </div>

        <div>
          <i className="fa fa-thumbs-up" />
          <span>{this.props.likeCount}</span>
        </div>

        <div>
          <i className="fa fa-eye" />
          <span>{this.props.viewCount}</span>
        </div>
      </div>
    );
  }
}