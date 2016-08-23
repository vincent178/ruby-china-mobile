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

    e.preventDefault();
    e.stopPropagation();

    const { topicId, dispatch } = this.props;

    authenticatedAction(dispatch, () => {
      dispatch(likeTopic(topicId));
    });

  }

  clickFollow(e) {

    e.preventDefault();
    e.stopPropagation();

    const { topicId, dispatch } = this.props;

    authenticatedAction(dispatch, () => {
      dispatch(followTopic(topicId));
    });

  }

  render() {

    const { replyCount, likeCount, viewCount } = this.props;

    return (
      <div className={styles.topicActionContainer}>

        <div>
          <i className="fa fa-reply" />
          <span>{replyCount}</span>
        </div>

        <div onClick={this.clickLike}>
          <i className="fa fa-thumbs-up" />
          <span>{likeCount}</span>
        </div>

        <div onClick={this.clickFollow}>
          <i className="fa fa-eye" />
          <span>{viewCount}</span>
        </div>
      </div>
    );
  }
}

TopicActionBar.propTypes = {
  topicId: PropTypes.number.isRequired,
  replyCount: PropTypes.number.isRequired,
  likeCount: PropTypes.number.isRequired,
  viewCount: PropTypes.number
};