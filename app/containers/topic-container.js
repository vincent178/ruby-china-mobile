import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import TopicList from '../components/topic-list';
import { getTopic } from '../actions/topic';

class TopicContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        TopicContainer
        <TopicList actions={getTopic} />
      </div>
    );
  }
}

TopicContainer.propTypes = {

};

function mapStateToProps(state) {
  //const { environment, application } = state;
  //return {
  //  width: environment.width,
  //  height: environment.height,
  //  selectedTab: application.selectedTab
  //}

  return { state };
}

export default connect(mapStateToProps)(TopicContainer);




