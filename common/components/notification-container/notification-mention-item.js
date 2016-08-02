import React, {
  Component,
  PropTypes
} from 'react';

export default class NotificationMentionItem extends Component {

  render() {
    return <div>NotificationMentionItem</div>;
  }
}

NotificationMentionItem.propTypes = {
  notification: PropTypes.object.isRequired,
  actor: PropTypes.object.isRequired,
  topic: PropTypes.object.isRequired
};