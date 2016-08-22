import React, {
  Component,
  PropTypes
} from 'react';

import { Link } from 'react-router';
import styles from './profile-list.css';

export default class ProfileTopicList extends Component {

  constructor(props) {

    super(props);
    this.renderTopicList = this.renderTopicList.bind(this);
  }

  renderTopicList() {

    const { user : { topics }, entities } = this.props;

    if (typeof topics === 'undefined' || topics.length === 0) {
      return <div>没有话题</div>;
    }

    return topics.map( topicId => {
      const topic = entities.topics[topicId];

      return (
        <div className={styles.profileListItemContainer} key={`ProfileTopicList-${topicId}`}>

          <Link to={`/topics/${topic.id}`}>
            <div className={styles.profileListItemTitle}>
              { topic.title }
            </div>
          </Link>

          <div className={styles.profileListItemInfo}>
            <span className={styles.profileListItemNode}>{topic.node_name}</span>
            <span className={styles.profileListItemAggregation}>{`${topic.likes_count}个赞•${topic.replies_count}条回复`}</span>
          </div>
        </div>
      );
    })
  }

  render() {

    return (
      <div className={styles.profileListContainer}>
        { this.renderTopicList() }
      </div>
    )
  }
}

ProfileTopicList.propTypes = {
  entities: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};
