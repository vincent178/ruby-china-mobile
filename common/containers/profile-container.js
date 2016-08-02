import React, { Component } from 'react';

class ProfileContainer extends Component {

  componentDidMount() {
    window.scrollTo(0, 0);
    const pathname = this.props.route.location.pathname;

    if (pathname === 'me') {
    }
  }

  render() {
    return (
      <div className="profile-container">
        <div>Profile Container</div>
      </div>
    );
  }
}

function mapStateToProps(state) {

  const { entities, topic, reply } = state;
  return {
    topic,
    reply,
    entities
  }
}

export default connect(mapStateToProps)(ProfileContainer);


