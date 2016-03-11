import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router'

import TopicList from '../components/topic-list';
import Tabs from '../constants/tabs';

class TopicContainer extends Component {
  render() {
    return <TopicList {...this.props} />;
    //const { selectedTab } = this.props;
    //
    //function tabItemClass(tab) {
    //  if (tab === selectedTab) {
    //    return "tab-item-container selected";
    //  }
    //  return "tab-item-container";
    //}

    //return (
    //  <div className="container">
    //    <TopicList {...this.props} />
    //
    //    <div className="tab-bar">
    //      <div className={tabItemClass(Tabs.TOPIC_TAB)}>
    //        <span className="tab-item"><Link to={"/"}>Topics</Link></span>
    //      </div>
    //      <div className={tabItemClass(Tabs.NOTIFICATION_TAB)}>
    //        <span className="tab-item"><Link to={"/notifications"}>Notification</Link></span>
    //      </div>
    //      <div className={tabItemClass(Tabs.ME_TAB)}>
    //        <span className="tab-item"><Link to={"/me"}>Me</Link></span>
    //      </div>
    //    </div>
    //  </div>
    //);
  }
}

TopicContainer.propTypes = {
};

function mapStateToProps(state) {

  const { environment, entities, topic } = state;
  return {
    width: environment.width,
    height: environment.height,
    topic,
    entities
  }
}

export default connect(mapStateToProps)(TopicContainer);
