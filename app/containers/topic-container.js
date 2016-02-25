import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import TopicList from '../components/topic-list';
import PullToRefresh from '../components/pull-to-refresh';

import { getTopic } from '../actions/topic';

class TopicContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div style={{height: this.props.height, overflow: "hidden"}}>
          <div style={{height: "100%", overflow: "auto", paddingRight: "15px", width: "100%"}}>
        TopicContainer
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <PullToRefresh />
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>

          <PullToRefresh />
          <PullToRefresh />
          <PullToRefresh />
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
          <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>
        <div>H</div>

          </div>

      </div>
    );
  }
}

TopicContainer.propTypes = {

};

function mapStateToProps(state) {

    const { environment, application } = state;
    return {
        width: environment.width,
        height: environment.height,
        selectedTab: application.selectedTab
    }
}

export default connect(mapStateToProps)(TopicContainer);




