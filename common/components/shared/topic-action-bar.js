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

    let containerStyle = {
      display: "flex",
      flex: 1,
      justifyContent: "space-between",
      alignItems: "stretch",
      color: "#AAB8B4",
      fontSize: 14,
      height: 30
    };

    return (
      <div className={styles.topicActionContainer} style={containerStyle}>

        <div>
          <i className="fa fa-reply" />
          <span>{this.props.replyCount}</span>
        </div>

        <div className={styles.topicActionItem} onTouchTap={this.clickLike.bind(this)}>
          <i className="fa fa-thumbs-up" />
          <span className={styles.topicActionContainerSpan}>{this.props.likeCount}</span>
        </div>

        <div className={styles.topicActionItem} onTouchTap={this.clickFollow.bind(this)}>
          <i className="fa fa-eye" />
          <span className={styles.topicActionContainerSpan}>{this.props.viewCount}</span>
        </div>
      </div>
    );
  }
}