import React, {
  Component,
  PropTypes
} from 'react';

import { Link } from 'react-router';
import SpinnerCircle from '../shared/spinner-circle';
import styles from './profile-list.css';

export default class ProfileReplyList extends Component {

  constructor(props) {

    super(props);
    this.renderReplyList = this.renderReplyList.bind(this);
    this.renderSpinner = this.renderSpinner.bind(this);
  }

  renderReplyList() {

    const { user: { replies }, entities } = this.props;

    if (typeof replies === 'undefined' || replies.length === 0) {
      return <div>没有回复</div>;
    }

    return replies.map( replyId => {
      const reply = entities.replies[replyId];

      return (
        <div key={`ProfileReplyList-${replyId}`} className={styles.profileListItemContainer}>

          <Link to={`/topics/${reply.topic_id}`}>
            <div className={styles.profileListItemTitle}>
              {reply.topic_title}
              </div>
          </Link>

          <div dangerouslySetInnerHTML={{__html: reply.body_html}}></div>
        </div>
      )
    })
  }

  renderSpinner() {

    if (this.props.isLoadingMore) {
      return <SpinnerCircle width={30} color={"rgb(102, 117, 127)"} />
    }

  }

  render() {
    return (
      <div className={styles.profileListContainer}>
        { this.renderReplyList() }
        { this.renderSpinner() }
      </div>
    );
  }
}

ProfileReplyList.propTypes = {
  user: PropTypes.object.isRequired,
  entities: PropTypes.object.isRequired
};