import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';

import Items from '../../constants/items';

//import "../../../node_modules/font-awesome/css/font-awesome.css";
//import "./topic-action-bar.css";

const springConfig = {stiffness: 60, damping: 15};

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
    console.debug("[TopicActionBar] handleReplyStart");
    this.setState({isPressed: true});
  }

  handleReplyEnd(e) {
    e.stopPropagation();
    e.preventDefault();
    console.debug("[TopicActionBar] handleReplyEnd");
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

    let itemStyle = {
        minWidth: 60,
        display: 'flex',
        alignItems: 'center'
    };

    let itemSpanStyle = {
      marginLeft: 8
    };

    const style = this.state.isPressed ? {
      scale: spring(1.1, springConfig),
      shadow: spring(16, springConfig),
      size: spring(36, springConfig)
    } : {
      scale: spring(1.0, springConfig),
      shadow: spring(1, springConfig),
      size: spring(12, springConfig)
    };


    return (
      <div className="topic-action-container" style={containerStyle}>

        <Motion style={style}>
          {({scale, shadow, size}) =>
            <div className="topic-action-item"
                 onTouchTap={this.clickReply.bind(this)}
                 style={{
                 transform: `scale(${scale})`,
                 WebkitTransform: `scale(${scale})`,
                 color: this.state.isPressed ? '#EB5424' : '#AAB8B4'
              }}
            >
              <i className="fa fa-reply"  style={{
                fontSize: `${size}px`
              }}/>
              <span style={itemSpanStyle}>{this.props.replyCount}</span>
            </div>
          }
        </Motion>

        <div className="topic-action-item" onTouchTap={this.clickLike.bind(this)}>
          <i className="fa fa-thumbs-up" />
          <span style={itemSpanStyle}>{this.props.likeCount}</span>
        </div>

        <div className="topic-action-item" onTouchTap={this.clickFollow.bind(this)}>
          <i className="fa fa-eye" />
        </div>
      </div>
    );
  }
}