'use strict';

import React, {
  Component,
  PropTypes
} from 'react';
import { connect } from 'react-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';
import NavigationBar from '../components/app/navigation-bar';
import '../assets/stylesheets/global.css';

injectTapEventPlugin();

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          <div className="container">
            <NavigationBar {...this.props} />
            {this.props.children}
          </div>
        </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { environment, application } = state;
  return {
    width: environment.width,
    height: environment.height,
    selectedTab: application.selectedTab
  }
}

export default connect(mapStateToProps)(App);
