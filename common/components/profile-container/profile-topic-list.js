import React, {
  Component,
  PropTypes
} from 'react';

import styles from './profile-list.css';

export default class ProfileTopicList extends Component {

  constructor(props) {

    super(props);
    this.renderTopicList = this.renderTopicList.bind(this);
  }

  renderTopicList() {

    const { user : { topics }, entities } = this.props;

    return topics.map( topicId => {
      const topic = entities.topics[topicId];

      return (
        <div className={styles.profileListItemContainer} key={`ProfileTopicList-${topicId}`}>
          <div className={styles.profileListItemTitle}>
            { topic.title }
          </div>
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
