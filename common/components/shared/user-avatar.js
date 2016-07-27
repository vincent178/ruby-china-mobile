import React, {
  Component,
  PropTypes
} from 'react';
import { Link } from 'react-router'

export default class UserAvatar extends Component {

  render() {
    var style = {
      width: this.props.size,
      height: this.props.size,
      borderRadius: this.props.radius || 0
    };

    return (
      <Link to={`/users/${this.props.userId}`}>
        <img style={style} src={this.props.src} />
      </Link>);
  }
}

UserAvatar.PropTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  borderRadius: PropTypes.number,
  userId: PropTypes.number.isRequired
};
