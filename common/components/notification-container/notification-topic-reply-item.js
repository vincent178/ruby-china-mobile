import React, {
  Component,
  PropTypes
} from 'react';


export default class NotificationTopicReplyItem extends Component {

  render() {
    return <div>NotificationTopicReplyItem</div>;
  }
}

NotificationTopicReplyItem.propTypes = {
  notification: PropTypes.object.isRequired,
  actor: PropTypes.object.isRequired,
  topic: PropTypes.object.isRequired,
  reply: PropTypes.object.isRequired
};