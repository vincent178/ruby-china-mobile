import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';

import "font-awesome/css/font-awesome.css";
import "./topic-action-bar.css";

const springConfig = {stiffness: 60, damping: 50};

export default class TopicActionBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isPressed: false
    };
  }

  handleReplyStart(e) {
    e.stopPropagation();
    console.debug("[TopicActionBar] handleReplyStart");
    this.setState({isPressed: true});
  }

  handleReplyEnd(e) {
    e.stopPropagation();
    console.debug("[TopicActionBar] handleReplyEnd");
    this.setState({isPressed: false});
  }

  clickLike(e) {
    console.debug("[TopicActionBar] clickLike");
    e.stopPropagation();
  }

  clickFollow(e) {
    console.debug("[TopicActionBar] clickFollow");
    e.stopPropagation();
  }

  render() {

    const style = this.state.isPressed ? {
      scale: spring(1.1, springConfig),
      shadow: spring(16, springConfig),
      size: spring(80, springConfig)
    } : {
      scale: spring(1.0, springConfig),
      shadow: spring(1, springConfig),
      size: spring(12, springConfig)
    };


    return (
      <div className="topic-action-container">

        <Motion style={style}>
          {({scale, shadow, size}) =>
            <div className="topic-action-item"
                 onTouchStart={this.handleReplyStart.bind(this)}
                 onTouchEnd={this.handleReplyEnd.bind(this)}
                 style={{
                 transform: `scale(${scale})`,
                 WebkitTransform: `scale(${scale})`
              }}
            >
              <i className="fa fa-reply"  style={{
                fontSize: `${size}px`
              }}/>
              <span>{this.props.replyCount}</span>
            </div>
          }
        </Motion>

        <div className="topic-action-item" onTouchTap={this.clickLike.bind(this)}>
          <i className="fa fa-thumbs-up" />
          <span>18</span>
        </div>

        <div className="topic-action-item" onTouchTap={this.clickFollow.bind(this)}>
          <i className="fa fa-eye" />
        </div>
      </div>
    );
  }
}