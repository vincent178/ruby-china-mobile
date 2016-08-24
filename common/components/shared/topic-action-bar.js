import React, {
  Component,
  PropTypes
} from 'react';

import {
  likeTopic,
  unlikeTopic,
  followTopic,
  unfollowTopic
} from '../../actions/topic';

import { authenticatedAction } from '../../lib/util';
import styles from "./topic-action-bar.css";

export default class TopicActionBar extends Component {

  constructor(props) {

    super(props);
    this.clickLike = this.clickLike.bind(this);
    this.clickFollow = this.clickFollow.bind(this);
  }

  clickLike(e) {

    if (this.props.interactive) {
      e.preventDefault();
      e.stopPropagation();

      const { topic, dispatch } = this.props;

      authenticatedAction(dispatch, () => {
        if (topic.meta && topic.meta.liked) {
          dispatch(unlikeTopic(topic));
        } else {
          dispatch(likeTopic(topic));
        }
      });
    }
  }

  clickFollow(e) {

    if (this.props.interactive) {
      e.preventDefault();
      e.stopPropagation();

      const { topic, dispatch } = this.props;

      authenticatedAction(dispatch, () => {
        if (topic.meta && topic.meta.followed) {
          dispatch(unfollowTopic(topic));
        } else {
          dispatch(followTopic(topic));
        }
      });
    }
  }

  render() {

    const { topic, interactive } = this.props;

    return (
      <div className={styles.topicActionContainer}>

        <div>
          <i className="fa fa-reply"/>
          <span>{topic['replies_count']}</span>
        </div>

        <div onClick={this.clickLike}>
          <i className="fa fa-thumbs-up" style={{color: interactive && topic.meta && topic.meta.liked ? '#e76f3c' : null }} />
          <span>{topic['likes_count']}</span>
        </div>

        <div onClick={this.clickFollow}>
          <i className="fa fa-eye" style={{color: interactive && topic.meta && topic.meta.followed ? '#e76f3c' : null }} />
        </div>
      </div>
    );
  }
}

TopicActionBar.propTypes = {
  topic: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  interactive: PropTypes.bool
};